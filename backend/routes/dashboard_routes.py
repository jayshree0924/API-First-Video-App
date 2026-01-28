from flask import Blueprint, jsonify
from extensions import mongo

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():
    videos = list(mongo.db.videos.find({"is_active": True}).limit(2))
    for v in videos:
        v["_id"] = str(v["_id"])
        v.pop("youtube_id")
    return jsonify(videos)
