from flask_pymongo import PyMongo

# We initialize it here without the 'app' yet (Application Factory Pattern)
mongo = PyMongo()