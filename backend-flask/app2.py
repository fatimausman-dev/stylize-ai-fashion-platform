# MAIN CODE (cam clicks type)

import base64
import os
from flask import Flask, request, jsonify, send_file
from rembg import remove
from PIL import Image
from io import BytesIO
import cv2
import numpy as np
import cvzone
from cvzone.PoseModule import PoseDetector

app = Flask(__name__)

# Global variables
prepared_image_path = "prepared_image.png"
productType = ''
detector = PoseDetector()

@app.route('/prepare-image', methods=['POST'])
def prepare_image():
    data = request.json
    if 'image_url' not in data:
        return jsonify({'error': 'No image URL provided'}), 400

    global productType 
    productType = data['type']
    print(productType)
    image_url = data['image_url']
    # print(image_url)
    try:
        # Download the image from the URL
        image_bytes = base64.b64decode(image_url.split(",")[1])
        image = Image.open(BytesIO(image_bytes))

        # Optionally remove the background
        output = remove(image)

        # Save the image for later use
        output.save(prepared_image_path)
        return jsonify({'message': 'Image prepared successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_frame(frame):
    img = cv2.imdecode(np.frombuffer(frame, np.uint8), cv2.IMREAD_COLOR)
    img = detector.findPose(img, draw=False)
    lmList, _ = detector.findPosition(img, bboxWithHands=False, draw=False)

    if lmList:
        if productType == "top":
            print("Processing top")
            left_shoulder_x, left_shoulder_y = lmList[11][0], lmList[11][1]
            right_shoulder_x, right_shoulder_y = lmList[12][0], lmList[12][1]

            shoulder_distance = abs(right_shoulder_x - left_shoulder_x)

            imgShirt = cv2.imread(prepared_image_path, cv2.IMREAD_UNCHANGED)
            if imgShirt is None:
                print(f"Error loading prepared image from {prepared_image_path}")
                return img

            shirt_width, shirt_height = imgShirt.shape[1], imgShirt.shape[0]
            shirt_aspect_ratio = shirt_height / shirt_width

            scaling_factor = 2
            shirt_width_scaled = int(shoulder_distance * scaling_factor)
            shirt_height_scaled = int(shirt_width_scaled * shirt_aspect_ratio)

            shirt_top_left_x = (left_shoulder_x + right_shoulder_x) // 2 - shirt_width_scaled // 2
            vertical_offset = 50
            shirt_top_left_y = min(left_shoulder_y, right_shoulder_y) - vertical_offset

            if shirt_width_scaled > 0 and shirt_height_scaled > 0:
                imgShirtResized = cv2.resize(imgShirt, (shirt_width_scaled, shirt_height_scaled))
                try:
                    img = cvzone.overlayPNG(img, imgShirtResized, [shirt_top_left_x, shirt_top_left_y])
                except Exception as e:
                    print(f"Error overlaying prepared image: {e}")
            else:
                print(f"Invalid image dimensions: Width={shirt_width_scaled}, Height={shirt_height_scaled}")
        elif productType == "bottom":
            # Example hip landmarks for width
            left_hip_x, left_hip_y = lmList[23][0], lmList[23][1]
            right_hip_x, right_hip_y = lmList[24][0], lmList[24][1]
            hip_distance_px = abs(right_hip_x - left_hip_x)

            # Example ankle landmarks for length
            left_ankle_y = lmList[27][1]
            right_ankle_y = lmList[28][1]
            leg_length_px = max(left_ankle_y, right_ankle_y) - min(left_hip_y, right_hip_y)

            imgPants = cv2.imread(prepared_image_path, cv2.IMREAD_UNCHANGED)

            if imgPants is None:
                print(f"Error loading pants image: {prepared_image_path}")
                return img
            
            # Adjust scaling factor as needed
            pants_width_scaled = int(hip_distance_px * 3)  # Adjust based on the pants image
            pants_aspect_ratio = imgPants.shape[0] / imgPants.shape[1]
            pants_height_scaled = int(leg_length_px)

            imgPantsResized = cv2.resize(imgPants, (pants_width_scaled, pants_height_scaled))

            pants_top_left_x = (left_hip_x + right_hip_x) // 2 - pants_width_scaled // 2
            pants_top_left_y = min(left_hip_y, right_hip_y)

            try:
                img = cvzone.overlayPNG(img, imgPantsResized, (pants_top_left_x, pants_top_left_y))
            except Exception as e:
                print(f"Error overlaying pants: {e}")

    return img

@app.route('/try-on-frame', methods=['POST'])
def try_on_frame():
    frame = request.get_data()
    try:
        processed_frame = process_frame(frame)
        _, buffer = cv2.imencode('.jpg', processed_frame)
        return send_file(BytesIO(buffer.tobytes()), mimetype='image/jpeg')
    except Exception as e:
        return str(e), 500

@app.route('/delete-prepared-image', methods=['DELETE'])
def delete_prepared_image():
    global prepared_image_path
    try:
        if os.path.exists(prepared_image_path):
            os.remove(prepared_image_path)
            return jsonify({'message': 'Prepared image deleted successfully'}), 200
        else:
            return jsonify({'error': 'Prepared image does not exist'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
