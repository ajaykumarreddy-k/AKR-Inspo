import os

base_dir = "/home/prince/ProjectsMain/akr-inspo-component-library (1)/Remotion-prompts"
readme_path = os.path.join(base_dir, "README.md")

with open(readme_path, "w") as f:
    f.write("# AKR Remotion Prompts\n\n")
    f.write("Gallery of prompts and their corresponding thumbnails. Click on any thumbnail or title to view the specific folder containing the image and its prompt text.\n\n")
    
    # Iterate over directories
    dirs = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]
    dirs.sort()
    
    for d in dirs:
        if d in [".venv", "prompt", "thumbnail", "__pycache__", ".git"]:
            continue
            
        # Check if the image exists in this directory
        img_path = os.path.join(base_dir, d, f"{d}.png")
        if os.path.exists(img_path):
            # Format a nice title
            title = d.replace("-", " ").title()
            
            # Write markdown entry
            f.write(f"## [{title}](./{d})\n\n")
            
            # Add the image that links to the directory
            f.write(f"[![{title}](./{d}/{d}.png)](./{d})\n\n")
            f.write("---\n\n")

print("README.md has been generated successfully!")
