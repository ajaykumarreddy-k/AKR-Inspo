import os
import shutil

base_dir = "/home/prince/ProjectsMain/akr-inspo-component-library (1)/Remotion-prompts"
thumbnail_dir = os.path.join(base_dir, "thumbnail")
prompt_dir = os.path.join(base_dir, "prompt")

for filename in os.listdir(thumbnail_dir):
    if filename.endswith(".png"):
        base_name = os.path.splitext(filename)[0]
        
        target_dir = os.path.join(base_dir, base_name)
        os.makedirs(target_dir, exist_ok=True)
        
        # Move thumbnail
        src_thumb = os.path.join(thumbnail_dir, filename)
        dst_thumb = os.path.join(target_dir, filename)
        if os.path.exists(src_thumb):
            shutil.move(src_thumb, dst_thumb)
            
        # Move prompt
        src_prompt = os.path.join(prompt_dir, f"{base_name}.txt")
        dst_prompt = os.path.join(target_dir, f"{base_name}.txt")
        if os.path.exists(src_prompt):
            shutil.move(src_prompt, dst_prompt)

print("Done moving files.")
