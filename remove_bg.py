import os
from rembg import remove
from PIL import Image
import sys

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".png"):
                input_path = os.path.join(root, file)
                
                # Check if this image already has transparency (optional optimization, but we can just process anyway)
                print(f"Processing: {input_path}")
                try:
                    input_img = Image.open(input_path)
                    output_img = remove(input_img)
                    output_img.save(input_path)
                    print(f"Successfully processed {input_path}")
                except Exception as e:
                    print(f"Failed to process {input_path}: {e}")

if __name__ == "__main__":
    base_dir = r"e:\Projects\SST\public\SST-HERO-ASSETS"
    dirs_to_process = [
        os.path.join(base_dir, "transport"),
        os.path.join(base_dir, "infrastructure")
    ]
    
    # Process directories
    for d in dirs_to_process:
        if os.path.exists(d):
            process_directory(d)
    
    # Process port.png individually
    port_path = os.path.join(base_dir, "environment", "port.png")
    if os.path.exists(port_path):
        print(f"Processing: {port_path}")
        try:
            input_img = Image.open(port_path)
            output_img = remove(input_img)
            output_img.save(port_path)
            print(f"Successfully processed {port_path}")
        except Exception as e:
            print(f"Failed to process {port_path}: {e}")
