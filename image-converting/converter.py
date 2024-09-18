import os
import glob
import argparse

def rename_images(directory, base_name):
    os.chdir(directory)

    # get all the possible image files we care about.
    image_files = glob.glob('*.[jp][pn]g') + glob.glob('*.jpeg') + glob.glob('*.png') + glob.glob('*.webp')

    for index, file_path in enumerate(image_files):
        _, file_extension = os.path.splitext(file_path)
        
        new_name = f"{base_name}-{index + 1}{file_extension}"

        print(new_name)
        os.rename(file_path, new_name)

if __name__ == "__main__":
    directory = './images'

    parser = argparse.ArgumentParser(description="Rename image files in a directory.")
    parser.add_argument('name', type=str, help="Base name of the new image files")
    
    args = parser.parse_args()
    rename_images(directory, args.name)