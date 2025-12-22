from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import json
import os
from datetime import datetime
from pathlib import Path
import bcrypt
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
from pymongo import MongoClient
from bson.objectid import ObjectId

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
MONGO_URI = os.getenv('MONGO_URI')
CLOUDINARY_CLOUD_NAME = os.getenv('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.getenv('CLOUDINARY_API_KEY')
CLOUDINARY_API_SECRET = os.getenv('CLOUDINARY_API_SECRET')

# Cloudinary Config
cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET
)

# MongoDB Config
cursor = None
db = None
if MONGO_URI:
    try:
        client = MongoClient(MONGO_URI)
        db = client.get_database('racrec_db') # Default DB name
        # Test connection
        client.admin.command('ping')
        print("Connected to MongoDB!")
    except Exception as e:
        print(f"MongoDB connection error: {e}")
else:
    print("⚠️  WARNING: MONGO_URI not found!")

# Load hashed password
ADMIN_PASSWORD_HASH = os.getenv('ADMIN_PASSWORD_HASH')
if not ADMIN_PASSWORD_HASH:
    # Default fallback for safety warning
    print("⚠️  WARNING: ADMIN_PASSWORD_HASH not found!")

def verify_password(password):
    if not password: return False
    # If no hash is set in env, deny all for security
    if not ADMIN_PASSWORD_HASH: return False
    try:
        return bcrypt.checkpw(password.encode('utf-8'), ADMIN_PASSWORD_HASH.encode('utf-8'))
    except Exception:
        return False

# Helper to serialize MongoDB objects (ObjectId to str)
def serialize_doc(doc):
    if not doc: return None
    doc['id'] = str(doc['_id'])
    del doc['_id']
    return doc

# --- API ENDPOINTS ---

@app.route('/api/projects', methods=['GET'])
def get_projects():
    if not db: return jsonify([])
    projects = list(db.projects.find().sort('id', 1)) # Sorting by ID preservation if needed, or date
    return jsonify([serialize_doc(p) for p in projects])

@app.route('/api/projects', methods=['POST'])
def add_project():
    password = request.form.get('password')
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
    
    title = request.form.get('title')
    description = request.form.get('description')
    avenue = request.form.get('avenue')
    
    if not all([title, description, avenue]):
        return jsonify({'error': 'Required fields missing'}), 400

    # Image Upload to Cloudinary
    image_url = None
    if 'image' in request.files:
        file = request.files['image']
        if file:
            try:
                upload_result = cloudinary.uploader.upload(file)
                image_url = upload_result['secure_url']
            except Exception as e:
                print(f"Cloudinary upload failed: {e}")
                return jsonify({'error': 'Image upload failed'}), 500

    # Create project
    # We use timestamps or manual IDs. Let's use auto-incrementing integer ID simulation or just count?
    # For compatibility with frontend expecting numeric IDs, we might need a counter.
    # But simple approach: use current timestamp as ID or count.
    # Let's count existing document for simple ID generation (race condition prone but okay for this scale)
    count = db.projects.count_documents({})
    new_id = count + 1

    project_data = {
        'id': new_id,
        'title': title,
        'description': description,
        'oneLiner': request.form.get('oneLiner', ''),
        'eventDate': request.form.get('eventDate', datetime.now().strftime('%d-%m-%Y')),
        'venue': request.form.get('venue', 'RACREC'),
        'avenue': avenue,
        'isSignature': request.form.get('isSignature') == 'true',
        'status': request.form.get('status', 'active'),
        'image': image_url,
        'createdAt': datetime.now().isoformat()
    }
    
    result = db.projects.insert_one(project_data)
    return jsonify(serialize_doc(db.projects.find_one({'_id': result.inserted_id}))), 201

@app.route('/api/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    password = request.form.get('password')
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
        
    # Find existing
    project = db.projects.find_one({'id': project_id})
    if not project:
        return jsonify({'error': 'Project not found'}), 404
        
    # Image Update
    image_url = project.get('image')
    if 'image' in request.files:
        file = request.files['image']
        if file:
            try:
                upload_result = cloudinary.uploader.upload(file)
                image_url = upload_result['secure_url']
            except Exception as e:
                return jsonify({'error': 'Image upload failed'}), 500

    update_data = {
        'title': request.form.get('title', project['title']),
        'description': request.form.get('description', project['description']),
        'oneLiner': request.form.get('oneLiner', project.get('oneLiner', '')),
        'eventDate': request.form.get('eventDate', project.get('eventDate')),
        'venue': request.form.get('venue', project.get('venue')),
        'avenue': request.form.get('avenue', project.get('avenue')),
        'isSignature': request.form.get('isSignature') == 'true',
        'status': request.form.get('status', project.get('status')),
        'image': image_url,
        'updatedAt': datetime.now().isoformat()
    }
    
    db.projects.update_one({'id': project_id}, {'$set': update_data})
    
    updated_project = db.projects.find_one({'id': project_id})
    return jsonify(serialize_doc(updated_project))

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    password = request.args.get('password')
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
        
    result = db.projects.delete_one({'id': project_id})
    if result.deleted_count == 0:
        return jsonify({'error': 'Project not found'}), 404
        
    return jsonify({'message': 'Project deleted'})

# --- GALLERY ENDPOINTS ---

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    if not db: return jsonify([])
    images = list(db.gallery.find().sort('id', 1))
    return jsonify([serialize_doc(img) for img in images])

@app.route('/api/gallery', methods=['POST'])
def add_gallery_image():
    password = request.form.get('password')
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
    
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
        
    file = request.files['image']
    if not file: return jsonify({'error': 'No file'}), 400
    
    try:
        upload_result = cloudinary.uploader.upload(file)
        image_url = upload_result['secure_url']
        width = upload_result.get('width', 1080)
        height = upload_result.get('height', 1440)
    except Exception as e:
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500

    count = db.gallery.count_documents({})
    new_id = count + 1
    
    new_image = {
        'id': new_id,
        'filename': image_url, # Storing full URL in filename field for frontend compatibility
        'title': request.form.get('title', 'Gallery Image'),
        'width': int(request.form.get('width', width)),
        'height': int(request.form.get('height', height)),
        'createdAt': datetime.now().isoformat()
    }
    
    result = db.gallery.insert_one(new_image)
    return jsonify(serialize_doc(db.gallery.find_one({'_id': result.inserted_id}))), 201

@app.route('/api/gallery/<int:image_id>', methods=['DELETE'])
def delete_gallery_image(image_id):
    password = request.args.get('password')
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
        
    # Optional: Delete from Cloudinary if we stored public_id
    # For now just delete record
    result = db.gallery.delete_one({'id': image_id})
    if result.deleted_count == 0:
        return jsonify({'error': 'Image not found'}), 404
        
    return jsonify({'message': 'Image deleted'})

@app.route('/api/login', methods=['POST'])
def login():
    password = request.json.get('password') if request.is_json else request.form.get('password')
    if verify_password(password):
        return jsonify({'success': True, 'message': 'Login successful'}), 200
    return jsonify({'error': 'Invalid password'}), 401

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'database': 'connected' if db is not None else 'disconnected'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
