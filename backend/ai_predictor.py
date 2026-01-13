import cv2
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from tensorflow.keras.applications.mobilenet_v2 import decode_predictions
from filters_all import novel_AHREF_filter

# Load pre-trained AI model (NO TRAINING)
model = MobileNetV2(weights="imagenet")

def predict_dr_blackbox(image_path):
    img = cv2.imread(image_path)

    if img is None:
        return "Invalid Image"

    # Apply Novel Filter
    img = novel_AHREF_filter(img)

    # Resize for AI
    img = cv2.resize(img, (224, 224))
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)

    # AI Prediction
    preds = model.predict(img)
    label = decode_predictions(preds, top=1)[0][0][1]

    return label
