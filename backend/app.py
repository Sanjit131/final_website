from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import json
import os
from datetime import datetime
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Configuration
PROJECTS_FILE = 'projects.json'
GALLERY_FILE = 'gallery.json'
ADMIN_PASSWORD = '#Rotaract@RACREC'  # Change this to a secure password
UPLOAD_FOLDER = 'uploads'
GALLERY_FOLDER = 'gallery_uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

# Create upload folders if they don't exist
Path(UPLOAD_FOLDER).mkdir(exist_ok=True)
Path(GALLERY_FOLDER).mkdir(exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['GALLERY_FOLDER'] = GALLERY_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_projects():
    """Load projects from JSON file"""
    if os.path.exists(PROJECTS_FILE):
        with open(PROJECTS_FILE, 'r') as f:
            return json.load(f)
    return []

def save_projects(projects):
    """Save projects to JSON file"""
    with open(PROJECTS_FILE, 'w') as f:
        json.dump(projects, f, indent=2)

def verify_password(password):
    """Verify admin password"""
    return password == ADMIN_PASSWORD

def load_gallery():
    """Load gallery images from JSON file"""
    if os.path.exists(GALLERY_FILE):
        with open(GALLERY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_gallery(gallery):
    """Save gallery images to JSON file"""
    with open(GALLERY_FILE, 'w') as f:
        json.dump(gallery, f, indent=2)

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all projects"""
    projects = load_projects()
    return jsonify(projects)

@app.route('/api/projects', methods=['POST'])
def add_project():
    """Add a new project"""
    password = request.form.get('password')
    
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
    
    # Get form data
    title = request.form.get('title')
    description = request.form.get('description')
    one_liner = request.form.get('oneLiner', '')
    event_date = request.form.get('eventDate', datetime.now().strftime('%d-%m-%Y'))
    venue = request.form.get('venue', 'RACREC')
    avenue = request.form.get('avenue')
    is_signature = request.form.get('isSignature') == 'true'
    status = request.form.get('status', 'active')
    
    if not all([title, description, avenue]):
        return jsonify({'error': 'Title, description, and avenue are required'}), 400
    
    # Handle image upload
    image_filename = None
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(f"{datetime.now().timestamp()}_{file.filename}")
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_filename = filename
    
    projects = load_projects()
    
    # Create project data
    project_data = {
        'id': len(projects) + 1,
        'title': title,
        'description': description,
        'oneLiner': one_liner,
        'eventDate': event_date,
        'venue': venue,
        'avenue': avenue,
        'isSignature': is_signature,
        'status': status,
        'image': image_filename,
        'createdAt': datetime.now().isoformat()
    }
    
    projects.append(project_data)
    save_projects(projects)
    
    return jsonify(project_data), 201

@app.route('/api/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    """Update a project"""
    password = request.form.get('password')
    
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
    
    projects = load_projects()
    project_index = None
    old_project = None
    
    for i, project in enumerate(projects):
        if project['id'] == project_id:
            project_index = i
            old_project = project
            break
    
    if project_index is None:
        return jsonify({'error': 'Project not found'}), 404
    
    # Get form data
    title = request.form.get('title')
    description = request.form.get('description')
    one_liner = request.form.get('oneLiner', '')
    event_date = request.form.get('eventDate', datetime.now().strftime('%d-%m-%Y'))
    venue = request.form.get('venue', 'RACREC')
    avenue = request.form.get('avenue')
    is_signature = request.form.get('isSignature') == 'true'
    status = request.form.get('status', 'active')
    
    if not all([title, description, avenue]):
        return jsonify({'error': 'Title, description, and avenue are required'}), 400
    
    # Handle image upload
    image_filename = old_project.get('image')
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            # Delete old image if exists
            if image_filename:
                old_path = os.path.join(app.config['UPLOAD_FOLDER'], image_filename)
                if os.path.exists(old_path):
                    os.remove(old_path)
            
            filename = secure_filename(f"{datetime.now().timestamp()}_{file.filename}")
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_filename = filename
    
    # Update project data
    project_data = {
        'id': project_id,
        'title': title,
        'description': description,
        'oneLiner': one_liner,
        'eventDate': event_date,
        'venue': venue,
        'avenue': avenue,
        'isSignature': is_signature,
        'status': status,
        'image': image_filename,
        'createdAt': old_project.get('createdAt', datetime.now().isoformat()),
        'updatedAt': datetime.now().isoformat()
    }
    
    projects[project_index] = project_data
    save_projects(projects)
    
    return jsonify(project_data)

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Delete a project"""
    password = request.args.get('password')
    
    if not verify_password(password):
        return jsonify({'error': 'Unauthorized'}), 401
    
    projects = load_projects()
    projects = [p for p in projects if p['id'] != project_id]
    save_projects(projects)
    
    return jsonify({'message': 'Project deleted'})

@app.route('/api/uploads/<filename>', methods=['GET'])
def download_file(filename):
    """Serve uploaded files"""
    from flask import send_from_directory
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    """Get all gallery images"""
    gallery = load_gallery()
    return jsonify(gallery)

@app.route('/api/gallery', methods=['POST'])
def add_gallery_image():
    """Add a new gallery image"""
    password = request.form.get('password')
    
    if not verify_password(password):
        return jsonify({'error': 'Invalid password'}), 401
    
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file format'}), 400
    
    filename = secure_filename(f"{datetime.now().timestamp()}_{file.filename}")
    filepath = os.path.join(app.config['GALLERY_FOLDER'], filename)
    file.save(filepath)
    
    # Get image dimensions (basic)
    gallery = load_gallery()
    new_image = {
        'id': len(gallery) + 1,
        'filename': filename,
        'title': request.form.get('title', 'Gallery Image'),
        'width': int(request.form.get('width', 1080)),
        'height': int(request.form.get('height', 1440)),
        'createdAt': datetime.now().isoformat()
    }
    
    gallery.append(new_image)
    save_gallery(gallery)
    
    return jsonify(new_image), 201

@app.route('/api/gallery/<int:image_id>', methods=['DELETE'])
def delete_gallery_image(image_id):
    """Delete a gallery image"""
    password = request.args.get('password')
    
    if not verify_password(password):
        return jsonify({'error': 'Invalid password'}), 401
    
    gallery = load_gallery()
    image = next((img for img in gallery if img['id'] == image_id), None)
    
    if not image:
        return jsonify({'error': 'Image not found'}), 404
    
    # Delete file
    filepath = os.path.join(app.config['GALLERY_FOLDER'], image['filename'])
    if os.path.exists(filepath):
        os.remove(filepath)
    
    gallery = [img for img in gallery if img['id'] != image_id]
    save_gallery(gallery)
    
    return jsonify({'message': 'Image deleted'}), 200

@app.route('/api/gallery-uploads/<filename>', methods=['GET'])
def serve_gallery_image(filename):
    """Serve gallery images"""
    from flask import send_from_directory
    return send_from_directory(app.config['GALLERY_FOLDER'], filename)

@app.route('/api/login', methods=['POST'])
def login():
    """Verify admin password"""
    password = request.json.get('password') if request.is_json else request.form.get('password')
    
    if not password:
        return jsonify({'error': 'Password required'}), 400
    
    if verify_password(password):
        return jsonify({'success': True, 'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid password'}), 401

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
