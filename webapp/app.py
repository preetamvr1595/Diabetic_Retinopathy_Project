from flask import Flask, render_template, request
import tensorflow as tf
import numpy as np
import cv2
import os

app = Flask(__name__)

# Load trained model
model = tf.keras.models.load_model("../dr_model.h5")

classes = ['No_DR', 'Mild_DR', 'Moderate_DR', 'Severe_DR']

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/', methods=['GET', 'POST'])
def index():
    prediction = None

    if request.method == 'POST':
        file = request.files['image']
        image_path = os.path.join('static', file.filename)
        file.save(image_path)

        img = preprocess_image(image_path)
        result = model.predict(img)
        prediction = classes[np.argmax(result)]

    return render_template('index.html', prediction=prediction)

if __name__ == '__main__':
    app.run(debug=True)
