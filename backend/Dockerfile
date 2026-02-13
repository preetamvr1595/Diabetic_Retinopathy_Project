FROM python:3.10-slim

WORKDIR /app

# Install system dependencies for OpenCV and other libraries
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure the models folder is copied correctly
# RUN ls -R models/

ENV PORT 5000
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:$PORT app:app"]
