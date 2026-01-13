from predict import predict_dr

image_path = "backend/sample.jpg"

result, confidence = predict_dr(image_path)

print("Prediction:", result)
print("Confidence:", confidence)
