import os
from dotenv import load_dotenv
from flask import Flask
from app.webhook.routes import webhook
from app.extensions import mongo
from flask_cors import CORS

load_dotenv() # This loads the variables from .env
def create_app():
    app = Flask(__name__)   #flask app instance
    
    # This allows Render frontend to talk to  Render backend
    CORS(app, resources={r"/*": {
        "origins": "*", 
        "methods": ["GET", "POST", "OPTIONS"]
    }})

    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)
    
    #Ensure this matches the endpoint that is hit in the browser
    app.register_blueprint(webhook)
    
    return app