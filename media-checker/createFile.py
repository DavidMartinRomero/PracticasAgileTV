import argparse
drm_map={
    1: b"WIDEVINE:",
    2: b"FAIRPLAY:",
    3: b"SMOOTHSTREAMING:"
}

def createFile(name, size, drm):
    try:
        path = f"ingest/{name}"
        sizeMB = size * 1048576
        drm_data = drm_map[drm]

        with open(path, "wb") as f:
            f.write(drm_data)
            f.truncate(sizeMB)
            
        print(f"Archivo creado en: '{path}' ({size} MB) (DRM: {drm_data})")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", required=True)
    parser.add_argument("--size", type=int, required=True)
    parser.add_argument("--drm", type=int,choices=[1, 2, 3], required=True)
    args = parser.parse_args()
    
    createFile(args.name, args.size, args.drm)