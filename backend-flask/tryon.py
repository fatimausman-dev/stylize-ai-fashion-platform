# import cv2

# # Load the pre-trained body detector
# body_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')

# # Load the virtual clothing image
# clothing_img = cv2.imread("shirt.jpg", cv2.IMREAD_UNCHANGED)

# # Capture video from the webcam
# cap = cv2.VideoCapture(0)

# while True:
#     # Read a frame from the webcam
#     ret, frame = cap.read()
#     if not ret:
#         break

#     # Convert the frame to grayscale
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#     # Detect bodies in the frame
#     bodies = body_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

#     for (x, y, w, h) in bodies:
#         # Resize the virtual clothing image to fit the body
#         resized_clothing_img = cv2.resize(clothing_img, (w, h))

#         # Overlay the virtual clothing on the body
#         for i in range(h):
#             for j in range(w):
#                 if resized_clothing_img[i, j, 3] != 0:
#                     frame[y + i, x + j, :] = resized_clothing_img[i, j, :3]

#     # Display the frame with the virtual clothing
#     cv2.imshow("Virtual Try-On", frame)

#     # Press 'q' to exit
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release the video capture object and close all windows
# cap.release()
# cv2.destroyAllWindows()

import os
import cv2
from cvzone.PoseModule import PoseDetector

# Initialize webcam
cap = cv2.VideoCapture(0)
detector = PoseDetector()

# Path to shirt images
shirtFolderPath = "resources/tops"
listShirts = os.listdir(shirtFolderPath)

# Calculate the fixed aspect ratio
fixedRatio = 262 / 190  # widthOfShirt / widthOfPoint11to12
shirtRatioHeightWidth = 581 / 440

# Initialize image number for shirt selection
imageNumber = 0

# Capture webcam feed and detect pose
while True:
    success, img = cap.read()
    img = detector.findPose(img)
    
    lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)
    if lmList:
        # Your code here
        pass

        # Calculate necessary parameters for shirt placement
        lm11 = lmList[11][1:3]
        lm12 = lmList[12][1:3]
        imgShirt = cv2.imread(os.path.join(shirtFolderPath, listShirts[imageNumber]), cv2.IMREAD_UNCHANGED)

        # Calculate the width of the shirt based on pose landmarks
        widthOfShirt = int((lm11[0] - lm12[0]) * fixedRatio)
        imgShirt = cv2.resize(imgShirt, (widthOfShirt, int(widthOfShirt * shirtRatioHeightWidth)))

        # Calculate offset based on current scale
        currentScale = (lm11[0] - lm12[0]) / 190
        offset = int(44 * currentScale), int(48 * currentScale)
        
        # Overlay the shirt on the person's body
        try:
            for c in range(3):
                img[lm12[1] - offset[1]:lm12[1] - offset[1] + imgShirt.shape[0], 
                    lm12[0] - offset[0]:lm12[0] - offset[0] + imgShirt.shape[1], c] = \
                    img[lm12[1] - offset[1]:lm12[1] - offset[1] + imgShirt.shape[0], 
                    lm12[0] - offset[0]:lm12[0] - offset[0] + imgShirt.shape[1], c] * \
                    (1 - imgShirt[:, :, 3] / 255.0)
        except:
            pass