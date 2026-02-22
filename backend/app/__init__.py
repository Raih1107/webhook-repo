import os
from dotenv import load_dotenv
from flask import Flask
from app.webhook.routes import webhook
from app.extensions import mongo
from flask_cors import CORS

load_dotenv() # This loads the variables from .env
def create_app():
    app = Flask(__name__)
    
    # This allows both your local dev and potential production needs
    CORS(app, resources={r"/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "OPTIONS"]
    }})

    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)
    
    # Ensure this matches the endpoint you hit in the browser
    app.register_blueprint(webhook, url_prefix='/webhook') 
    
    return app