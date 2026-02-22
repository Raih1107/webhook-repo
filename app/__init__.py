import os
from dotenv import load_dotenv
from flask import Flask
from app.webhook.routes import webhook
from app.extensions import mongo
from flask_cors import CORS

load_dotenv() # This loads the variables from .env

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Use os.getenv to pull the string from the .env file
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    
    mongo.init_app(app)
    app.register_blueprint(webhook)
    
    return app