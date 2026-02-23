import os
from app import create_app

app = create_app()

if __name__ == '__main__': 
    # Render sets a PORT environment variable. If not found, it defaults to 5000.
    port = int(os.environ.get("PORT", 5000))
    # host='0.0.0.0' is required for the app to be accessible externally on Render
    app.run(host='0.0.0.0', port=port)