import cv2
import numpy as np
import os
from tensorflow.keras.models import load_model

model = None

def get_model():
    global model
    if model is not None:
        return model
    
    curr_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(curr_dir, "models", "dr_classifier.h5")
    
    if not os.path.exists(model_path):
        print(f"Warning: Classification model not found at {model_path}")
        return None
        
    print(f"Loading Classification Model from {model_path}...")
    model = load_model(model_path)
    return model

CLASSES = ["No_DR", "Mild_DR", "Severe_DR"]

def classify_image(image_path):
    clf_model = get_model()
    if clf_model is None:
        return "Unknown", 0.0

    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=(0, -1))

    preds = clf_model.predict(img)[0]
    idx = np.argmax(preds)

    return CLASSES[idx], float(preds[idx])
