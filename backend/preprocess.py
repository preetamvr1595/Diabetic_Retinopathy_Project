import cv2
import numpy as np
from filters_all import novel_AHREF_filter

IMG_SIZE = 224

def preprocess_image(image_path):
    img = cv2.imread(image_path)

    if img is None:
        raise ValueError("Image not found")

    # Apply Novel Filter
    img = novel_AHREF_filter(img)

    # Resize
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

    # Normalize
    img = img / 255.0

    # Add batch dimension
    img = np.expand_dims(img, axis=0)

    return img
