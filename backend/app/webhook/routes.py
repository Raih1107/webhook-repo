from flask import Blueprint, request, jsonify
from app.extensions import mongo
from datetime import datetime
import traceback

#url_prefix is set to /webhook, so routes are /webhook/receiver and /webhook/latest
webhook = Blueprint('Webhook', __name__, url_prefix='/webhook')

@webhook.route('/receiver', methods=["POST"])
def receiver():
    try:
        payload = request.get_json()
        event_type = request.headers.get('X-GitHub-Event')

        if not payload:
            return jsonify({"error": "No payload received"}), 400

        # Core logic variables
        action = None
        author = payload.get('sender', {}).get('login')
        from_branch = None
        to_branch = None
        request_id = None

        # 1. Handle PUSH
        if event_type == "push":
            action = "PUSH"
            request_id = payload.get('after')
            to_branch = payload.get('ref', '').split('/')[-1]
        
        # 2. Handle PULL REQUEST & MERGE
        elif event_type == "pull_request":
            pr_data = payload.get('pull_request', {})
            is_merged = pr_data.get('merged', False)
            gh_action = payload.get('action')

            if gh_action == "closed" and is_merged:
                action = "MERGE"
            else:
                action = "PULL_REQUEST"
                
            request_id = str(pr_data.get('id'))
            from_branch = pr_data.get('head', {}).get('ref')
            to_branch = pr_data.get('base', {}).get('ref')

        # Only store if it's one of the three required actions
        if action in ["PUSH", "PULL_REQUEST", "MERGE"]:
            event_data = {
                "request_id": request_id,
                "author": author,
                "action": action,
                "from_branch": from_branch,
                "to_branch": to_branch,
                "timestamp": datetime.utcnow().strftime("%d %B %Y - %I:%M %p UTC")
            }

            if mongo.db is None:
                return jsonify({"error": "Database connection failed"}), 500

            mongo.db.actions.insert_one(event_data)
            return jsonify({"status": "success", "action_captured": action}), 200
        
        return jsonify({"status": "ignored", "reason": "event type not required"}), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500


@webhook.route('/latest', methods=["GET"])
def get_latest():
    """
    Endpoint for the React Frontend.
    Returns the latest 10 events.
    """
    try:
        if mongo.db is None:
            return jsonify({"error": "Database connection failed"}), 500

        # Fetch latest 10 events, sorting by MongoDB _id (descending)
        events = list(mongo.db.actions.find().sort("_id", -1).limit(10))
        
        # Convert MongoDB ObjectId to string so JSON can handle it
        for event in events:
            event["_id"] = str(event["_id"])

        return jsonify(events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@webhook.route('/ping', methods=["GET"])
def ping():
    """
    Lightweight endpoint for cron-job.org to keep the server awake
    without fetching large amounts of data.
    """
    return jsonify({"status": "active", "message": "PONG"}), 200