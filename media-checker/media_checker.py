import json
import sys
import re
from pathlib import Path

def check_media(ingest_dir: str):
    ingest_path = Path(ingest_dir)
    if not ingest_path.exists():
        print(f"[ERROR] Directory {ingest_dir} not found.")
        sys.exit(1)

    files = list(ingest_path.glob("*"))
    report = {
        "scanned": len(files),
        "errors": 0,
        "details": []
    }

    print(f"\n[INFO] Scanning: {ingest_path.resolve()}")
    print(f"[INFO] Files found: {len(files)}\n")

    # Pattern: <code(3-6 chars)>_<title>.<ext>
    name_pattern = re.compile(r"^[A-Z0-9]{3,6}_[\w -]+\.(mp4|mxf)$")

    for file in files:
        if file.is_dir():
            continue
            
        file_errors = []
        
        # 1. Check Extension
        if file.suffix.lower() not in ['.mp4', '.mxf']:
            file_errors.append("unsupported extension")
        
        # 2. Check Naming Convention
        if not name_pattern.match(file.name):
            file_errors.append("invalid filename (must be CODE_title.ext)")

        # 3. Chech Spaces in file name.
        if " " in file.name:
            file_errors.append("invalid filename (spaces are not allowed)")
            
        # 4. Check Size
        if file.stat().st_size == 0:
            file_errors.append("file size is 0 bytes")

        # 5. Check DRM
        else:
            try:
                valid_drm = ["WIDEVINE", "FAIRPLAY", "SMOOTHSTREAMING"]

                with open(file, "rb") as f:
                    chunk = f.read(20)
                    header_text = chunk.decode('utf-8', errors='ignore')
                    drm_found = header_text.split(":")[0]
                    if drm_found not in valid_drm:
                        file_errors.append("invalid or missing DRM header")
            except Exception as e:
                file_errors.append("Could not read DRM header")

        if file_errors:
            errors = ", ".join(file_errors)

            print(f"[WARN] {file.name} -> {errors}")
            report["errors"] += len(file_errors)
            report["details"].append({"file": file.name, "reason": file_errors})

    # Save report
    with open("report.json", "w") as f:
        json.dump(report, f, indent=2)

    print("\n" + "-"*30)
    print(" Media Checker -- Report")
    print("-"*30)
    print(f" Files analyzed : {report['scanned']}")
    print(f" Errors found   : {report['errors']}")
    print("-"*30)

    return 0 if report["errors"] == 0 else 1

if __name__ == "__main__":
    directory = sys.argv[1] if len(sys.argv) > 1 else "./ingest"
    sys.exit(check_media(directory))
