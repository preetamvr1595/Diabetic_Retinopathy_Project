import traceback
import os
import sys

# Add the current directory to sys.path to allow importing backend module
sys.path.append(os.getcwd())

try:
    print("Attempting to import backend.app...")
    from backend import app
    print("Application imported successfully.")
    print("Starting Flask server...")
    app.app.run(host='0.0.0.0', debug=False, port=5000)
except Exception as e:
    print("\n--- ERROR DETECTED ---")
    with open("backend_error.txt", "w") as f:
        traceback.print_exc(file=f)
    traceback.print_exc()
    print("Full error written to backend_error.txt")
    print("----------------------\n")
