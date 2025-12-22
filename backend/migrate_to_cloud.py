import json
import os
import time
from datetime import datetime
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# Cloudinary Config
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# MongoDB Config
MONGO_URI = os.getenv('MONGO_URI')
if not MONGO_URI:
    print("❌ MONGO_URI is missing. Please set it in .env")
    exit(1)

try:
    client = MongoClient(MONGO_URI)
    db = client.get_database('racrec_db')
    print("✅ Connected to MongoDB")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    exit(1)

def migrate_projects():
    print("\n--- Migrating Projects ---")
    if not os.path.exists('projects.json'):
        print("No projects.json found. Skipping.")
        return

    with open('projects.json', 'r') as f:
        projects = json.load(f)

    for p in projects:
        # Check if exists
        if db.projects.find_one({'id': p['id']}):
            print(f"Skipping project {p['id']} (already exists)")
            continue

        print(f"Processing project: {p['title']}")
        
        # Upload image if local
        image_val = p.get('image')
        if image_val and not image_val.startswith('http'):
            local_path = os.path.join('uploads', image_val)
            if os.path.exists(local_path):
                print(f"  Uploading image: {image_val}...")
                try:
                    upload_result = cloudinary.uploader.upload(local_path)
                    p['image'] = upload_result['secure_url']
                    print("  ✅ Image uploaded")
                except Exception as e:
                    print(f"  ❌ Image upload failed: {e}")
            else:
                print(f"  ⚠️ Local image not found: {local_path}")
        
        # Insert
        db.projects.insert_one(p)
        print("  ✅ Project inserted")

def migrate_gallery():
    print("\n--- Migrating Gallery ---")
    if not os.path.exists('gallery.json'):
        print("No gallery.json found. Skipping.")
        return

    with open('gallery.json', 'r') as f:
        gallery = json.load(f)

    for img in gallery:
        if db.gallery.find_one({'id': img['id']}):
            print(f"Skipping image {img['id']} (already exists)")
            continue

        print(f"Processing gallery image: {img['filename']}")
        
        # Upload image if local (filename is usually the path in gallery.json?)
        # Current app.py saved filename only.
        filename = img.get('filename')
        if filename and not filename.startswith('http'):
            local_path = os.path.join('gallery_uploads', filename)
            if os.path.exists(local_path):
                print(f"  Uploading: {filename}...")
                try:
                    upload_result = cloudinary.uploader.upload(local_path)
                    img['filename'] = upload_result['secure_url']
                    img['width'] = upload_result.get('width', img.get('width'))
                    img['height'] = upload_result.get('height', img.get('height'))
                    print("  ✅ Image uploaded")
                except Exception as e:
                    print(f"  ❌ Upload failed: {e}")
            else:
                print(f"  ⚠️ Local file not found: {local_path}")

        db.gallery.insert_one(img)
        print("  ✅ Gallery item inserted")

if __name__ == "__main__":
    print("Starting migration...")
    migrate_projects()
    migrate_gallery()
    print("\n✅ Migration completed!")
