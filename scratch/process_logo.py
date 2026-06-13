import os
from PIL import Image, ImageDraw

def process():
    src_path = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\28459a0c-c7f9-44e6-9aae-601a6ea934a0\media__1781314847431.jpg"
    dest_path = r"c:\Users\LENOVO\Desktop\Dynamic express solutions\images\logo.png"

    img = Image.open(src_path).convert("RGB")
    width, height = img.size
    print(f"Original size: {width}x{height}")

    # Find bounding box of non-white pixels
    # Let's check pixel distances from white (255, 255, 255)
    left, top, right, bottom = width, height, 0, 0
    for y in range(height):
        for x in range(width):
            r, g, b = img.getpixel((x, y))
            # If not white (using a small threshold)
            if r < 240 or g < 240 or b < 240:
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y

    print(f"Non-white bounding box: L={left}, T={top}, R={right}, B={bottom}")
    
    # Calculate dimensions
    box_w = right - left + 1
    box_h = bottom - top + 1
    print(f"Box dimensions: {box_w}x{box_h}")

    # We want a square bounding box. Let's find the center of the detected box.
    center_x = left + box_w // 2
    center_y = top + box_h // 2
    
    # Since the logo is circular, the radius is approximately half of the box width/height.
    # Let's take the maximum of box_w and box_h as the side length of our square.
    side = max(box_w, box_h)
    
    # Crop a square centered at (center_x, center_y)
    half_side = side // 2
    crop_left = max(0, center_x - half_side)
    crop_top = max(0, center_y - half_side)
    crop_right = min(width, center_x + half_side)
    crop_bottom = min(height, center_y + half_side)
    
    # Adjust to make it exactly square
    final_w = crop_right - crop_left
    final_h = crop_bottom - crop_top
    min_side = min(final_w, final_h)
    
    # Re-crop to be perfectly square
    crop_right = crop_left + min_side
    crop_bottom = crop_top + min_side
    
    cropped_img = img.crop((crop_left, crop_top, crop_right, crop_bottom))
    print(f"Cropped square size: {cropped_img.size}")

    # Now make everything outside the circular logo transparent
    # The logo is a circle filling the cropped square.
    size = cropped_img.size[0]
    
    # Create a circular mask
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    # Draw a filled circle. We can add a 1-pixel margin if needed, or fill it completely.
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)
    
    # Put mask as alpha channel
    rgba_img = cropped_img.copy()
    rgba_img.putalpha(mask)
    
    # Let's also resize the logo to a standard high-quality size (e.g. 512x512)
    # The original img width is 552, so the cropped logo size is probably around 500x500.
    # We can save it in its original high-res cropped size, e.g. 500x500 or 512x512.
    final_size = 512
    rgba_img = rgba_img.resize((final_size, final_size), Image.Resampling.LANCZOS)
    
    # Create the directory if it doesn't exist
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    rgba_img.save(dest_path, "PNG")
    print(f"Saved processed logo to {dest_path}")

if __name__ == "__main__":
    process()
