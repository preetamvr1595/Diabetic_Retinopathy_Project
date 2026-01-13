import tensorflow as tf
import numpy as np
from preprocess import preprocess_image

# Load trained model
model = tf.keras.models.load_model("dr_model.h5")

classes = ['No_DR', 'Mild_DR', 'Moderate_DR', 'Severe_DR']

def predict_dr(image_path):
    img = preprocess_image(image_path)
    prediction = model.predict(img)
    class_index = np.argmax(prediction)
    confidence = prediction[0][class_index]

    return classes[class_index], float(confidence)
