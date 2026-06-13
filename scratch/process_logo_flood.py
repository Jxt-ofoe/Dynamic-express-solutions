import os
from PIL import Image, ImageDraw

def process():
    src_path = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\28459a0c-c7f9-44e6-9aae-601a6ea934a0\media__1781314847431.jpg"
    dest_path = r"c:\Users\LENOVO\Desktop\Dynamic express solutions\images\logo.png"

    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    print(f"Original size: {width}x{height}")

    # Bounding box of non-white pixels
    # We define white as RGB close to 255 (e.g., each channel >= 240)
    left, top, right, bottom = width, height, 0, 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            if r < 240 or g < 240 or b < 240:
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y

    print(f"Non-white bounding box: L={left}, T={top}, R={right}, B={bottom}")
    
    box_w = right - left + 1
    box_h = bottom - top + 1
    
    # We want to crop a square box with some margin to ensure we don't clip anything
    margin = 20
    
    center_x = left + box_w // 2
    center_y = top + box_h // 2
    
    side = max(box_w, box_h) + margin * 2
    
    crop_left = max(0, center_x - side // 2)
    crop_top = max(0, center_y - side // 2)
    crop_right = min(width, crop_left + side)
    crop_bottom = min(height, crop_top + side)
    
    # Ensure it's exactly square
    final_w = crop_right - crop_left
    final_h = crop_bottom - crop_top
    min_side = min(final_w, final_h)
    crop_right = crop_left + min_side
    crop_bottom = crop_top + min_side
    
    cropped_img = img.crop((crop_left, crop_top, crop_right, crop_bottom))
    w, h = cropped_img.size
    print(f"Cropped square size: {w}x{h}")
    
    # Now flood-fill the white background with transparency.
    # The background is white (255, 255, 255, 255).
    # We flood fill starting from the four corners (0,0), (w-1, 0), (0, h-1), (w-1, h-1).
    # Since the background is not perfectly uniform (lossy JPG compression might have minor noise),
    # we use a threshold/tolerance for matching the color.
    # ImageDraw.floodfill doesn't have a built-in tolerance in PIL's standard floodfill,
    # but we can implement a simple flood-fill with tolerance or convert colors first.
    # Let's write a standard queue-based flood fill with tolerance to make sure it is extremely robust!
    
    pixels = cropped_img.load()
    visited = set()
    queue = []
    
    # Seed corners
    seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    # Also add all border pixels to make sure any isolated white pockets on the border are cleared
    for x in range(w):
        seeds.append((x, 0))
        seeds.append((x, h - 1))
    for y in range(1, h - 1):
        seeds.append((0, y))
        seeds.append((w - 1, y))
        
    for sx, sy in seeds:
        r, g, b, a = pixels[sx, sy]
        # Seed must be white-ish
        if r >= 230 and g >= 230 and b >= 230:
            queue.append((sx, sy))
            visited.add((sx, sy))
            
    # BFS flood fill
    while queue:
        cx, cy = queue.pop(0)
        # Set transparent
        pixels[cx, cy] = (0, 0, 0, 0)
        
        # Check 4-neighbors
        for nx, ny in [(cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)]:
            if 0 <= nx < w and 0 <= ny < h:
                if (nx, ny) not in visited:
                    nr, ng, nb, na = pixels[nx, ny]
                    # If neighbor is white-ish, add to queue
                    if nr >= 220 and ng >= 220 and nb >= 220:
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
    # Let's resize it to 512x512 with high quality filtering
    final_img = cropped_img.resize((512, 512), Image.Resampling.LANCZOS)
    
    # Save the processed image
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    final_img.save(dest_path, "PNG")
    print(f"Saved flood-filled logo to {dest_path}")

if __name__ == "__main__":
    process()
