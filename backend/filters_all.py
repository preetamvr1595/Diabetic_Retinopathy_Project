# ================================
# ALL FILTERS IN ONE FILE
# File: backend/filters_all.py
# ================================

import cv2
import numpy as np
import os
from skimage.filters import gabor

# ================================
# IMAGE LOAD
# ================================

def load_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Image not found. Check path.")
    img = cv2.resize(img, (512, 512))
    return img

# ================================
# BASIC FILTERS
# ================================

def mean_filter(img):
    return cv2.blur(img, (5, 5))

def median_filter(img):
    return cv2.medianBlur(img, 5)

def gaussian_filter(img):
    return cv2.GaussianBlur(img, (5, 5), 0)

def bilateral_filter(img):
    return cv2.bilateralFilter(img, 9, 75, 75)

# ================================
# EDGE FILTERS
# ================================

def sobel_filter(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    sobel = cv2.Sobel(gray, cv2.CV_64F, 1, 1, ksize=3)
    return cv2.convertScaleAbs(sobel)

def prewitt_filter(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    kernelx = np.array([[1,0,-1],[1,0,-1],[1,0,-1]])
    kernely = np.array([[1,1,1],[0,0,0],[-1,-1,-1]])
    x = cv2.filter2D(gray, -1, kernelx)
    y = cv2.filter2D(gray, -1, kernely)
    return cv2.add(x, y)

def laplacian_filter(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    lap = cv2.Laplacian(gray, cv2.CV_64F)
    return cv2.convertScaleAbs(lap)

# ================================
# ADVANCED FILTERS
# ================================

def gabor_filter(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    filt_real, _ = gabor(gray, frequency=0.6)
    return cv2.normalize(filt_real, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

def clahe_filter(img):
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)
    merged = cv2.merge((cl, a, b))
    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)

# ================================
# 🔥 NOVEL FILTER (HYBRID)
# Gaussian + CLAHE + Sobel
# ================================

def novel_AHREF_filter(img):
    g = gaussian_filter(img)
    c = clahe_filter(g)
    s = sobel_filter(c)
    return cv2.cvtColor(s, cv2.COLOR_GRAY2BGR)

# ================================
# MAIN EXECUTION
# ================================

if __name__ == "__main__":

    image_path = "backend/sample.jpg"  # ✅ correct path

    img = load_image(image_path)

    output_dir = "filter_outputs"
    os.makedirs(output_dir, exist_ok=True)

    filters = {
        "mean": mean_filter(img),
        "median": median_filter(img),
        "gaussian": gaussian_filter(img),
        "bilateral": bilateral_filter(img),
        "sobel": sobel_filter(img),
        "prewitt": prewitt_filter(img),
        "laplacian": laplacian_filter(img),
        "gabor": gabor_filter(img),
        "clahe": clahe_filter(img),
        "novel_AHREF": novel_AHREF_filter(img)
    }

    for name, output in filters.items():
        cv2.imwrite(f"{output_dir}/{name}.png", output)

    print("✅ All 10 filters + Novel filter applied successfully")


# ================================
# METRICS (MSE & PSNR)
# ================================

def mse(img1, img2):
    img1 = img1.astype(np.float32)
    img2 = img2.astype(np.float32)
    return np.mean((img1 - img2) ** 2)

def psnr(img1, img2):
    mse_val = mse(img1, img2)
    if mse_val == 0:
        return 100
    PIXEL_MAX = 255.0
    return 20 * np.log10(PIXEL_MAX / np.sqrt(mse_val))



if __name__ == "__main__":

    image_path = "backend/sample.jpg"
    img = load_image(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    output_dir = "filter_outputs"
    os.makedirs(output_dir, exist_ok=True)

    filters = {
        "mean": mean_filter(img),
        "median": median_filter(img),
        "gaussian": gaussian_filter(img),
        "bilateral": bilateral_filter(img),
        "sobel": sobel_filter(img),
        "prewitt": prewitt_filter(img),
        "laplacian": laplacian_filter(img),
        "gabor": gabor_filter(img),
        "clahe": clahe_filter(img),
        "novel_AHREF": novel_AHREF_filter(img)
    }

    print("\n📊 FILTER COMPARISON RESULTS")
    print("Filter\t\tMSE\t\tPSNR")

    for name, output in filters.items():

        if len(output.shape) == 3:
            out_gray = cv2.cvtColor(output, cv2.COLOR_BGR2GRAY)
        else:
            out_gray = output

        m = mse(gray, out_gray)
        p = psnr(gray, out_gray)

        cv2.imwrite(f"{output_dir}/{name}.png", output)
        print(f"{name:12s} {m:.2f}\t {p:.2f}")
