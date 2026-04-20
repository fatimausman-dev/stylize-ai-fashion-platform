# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import base64

# app = Flask(__name__)
# CORS(app)

# @app.route('/try-on', methods=['POST'])
# def process_video():
#     # Get the camera stream and product image from the request
#     camera_stream = request.files['video']
#     product_image = request.files['product_image']

#     # Convert the camera stream to a numpy array
#     camera_stream_np = np.frombuffer(camera_stream.read(), dtype=np.uint8)
#     camera_stream_np = cv2.imdecode(camera_stream_np, cv2.IMREAD_COLOR)

#     # Convert the product image to a numpy array
#     product_image_np = np.frombuffer(product_image.read(), dtype=np.uint8)
#     product_image_np = cv2.imdecode(product_image_np, cv2.IMREAD_COLOR)

#     # Process the camera stream and product image (e.g., superimpose the product image on the camera stream)
#     processed_image = process_images(camera_stream_np, product_image_np)

#     # Convert the processed image to base64
#     _, processed_image_encoded = cv2.imencode('.png', processed_image)
#     processed_image_base64 = base64.b64encode(processed_image_encoded).decode('utf-8')

#     # Return the processed image as a base64 string
#     return jsonify({'processed_image': processed_image_base64})

# def process_images(camera_stream, product_image):
#     # Process the camera stream and product image (e.g., superimpose the product image on the camera stream)
#     # This is just a placeholder function, you'll need to replace it with your actual processing logic
#     processed_image = cv2.addWeighted(camera_stream, 0.5, product_image, 0.5, 0)

#     return processed_image

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import requests
from PIL import Image
import io

app = Flask(__name__)

# Database setup
DATABASE_URI = 'postgresql://postgres:dawar2011@localhost/stylize'
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
Base = declarative_base()

# Define a model for the products table
class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    images = Column(ARRAY(String))

@app.route('/try-on', methods=['POST'])
def process_image_url():
    data = request.json
    if 'image_url' not in data:
        return jsonify({'error': 'No image URL provided'}), 400

    image_url = data['image_url']
    
    session = Session()
    # Fetch the product with the given image URL
    product = session.query(Product).filter(Product.images.contains([image_url])).first()
    if product is None:
        return jsonify({'error': 'Image URL not found in any product'}), 404
    
    # Fetch the image from the URL
    response = requests.get(image_url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch image from URL'}), 400

    # Process the image
    image = Image.open(io.BytesIO(response.content))
    # Example processing (convert to grayscale)
    image = image.convert('L')
    # You can then save or further process the image as needed
    
    return jsonify({'message': 'Image processed successfully'}), 200

if __name__ == '__main__':
    Base.metadata.create_all(engine)  # Create tables based on models (if not already existing)
    app.run(debug=True)

