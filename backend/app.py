from flask import Flask, render_template, request
import cv2
import numpy as np
import os
import tensorflow as tf

app = Flask(__name__)

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = tf.keras.models.load_model("dr_model.h5")
classes = ["No_DR", "Mild_DR", "Moderate_DR", "Severe_DR"]

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None

    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return render_template("result.html", result="Invalid Image")

    file = request.files["image"]

    if file.filename == "":
        return render_template("result.html", result="Invalid Image")

    image_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(image_path)

    img = preprocess_image(image_path)
    if img is None:
        return render_template("result.html", result="Invalid Image")

    prediction = model.predict(img)
    result = classes[np.argmax(prediction)]

    return render_template("result.html", result=result)

if __name__ == "__main__":
    app.run(debug=True)
