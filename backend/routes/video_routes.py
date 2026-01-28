from flask import Blueprint, jsonify, request
import jwt, datetime
from config import Config
from extensions import mongo
from bson.objectid import ObjectId


video_bp = Blueprint("video", __name__)

def generate_playback_token(video_id):
    payload = {
        "video_id": video_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
    }
    return jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")

@video_bp.route("/video/<video_id>/playback-token")
def playback_token(video_id):
    token = generate_playback_token(video_id)
    return jsonify({"token": token})

@video_bp.route("/video/<video_id>/stream")
def stream_video(video_id):
    token = request.args.get("token")
    try:
        data = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
    except:
        return jsonify({"error": "Invalid token"}), 403

    video = mongo.db.videos.find_one({"_id": ObjectId(video_id)})
    stream_url = f"https://www.youtube.com/watch?v={video['youtube_id']}"




    return jsonify({"stream_url": stream_url})
