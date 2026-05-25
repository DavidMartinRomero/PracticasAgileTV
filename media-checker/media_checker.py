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
    name_pattern = re.compile(r"^[A-Z0-9]{3,6}_[\w-]+\.(mp4|mxf)$")

    for file in files:
        if file.is_dir():
            continue
            
        error_reason = None
        
        # 1. Check Extension
        if file.suffix.lower() not in ['.mp4', '.mxf']:
            error_reason = "unsupported extension"
        
        # 2. Check Naming Convention
        elif not name_pattern.match(file.name):
            error_reason = "invalid filename (must be CODE_title.ext)"
            
        # 3. Check Size
        elif file.stat().st_size == 0:
            error_reason = "file size is 0 bytes"

        if error_reason:
            print(f"[WARN] {file.name} -> {error_reason}")
            report["errors"] += 1
            report["details"].append({"file": file.name, "reason": error_reason})

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
