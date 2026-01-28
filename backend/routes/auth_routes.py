from flask import Blueprint, request, jsonify
from extensions import mongo, bcrypt
import jwt, datetime, os
from bson.objectid import ObjectId
from utils.jwt_utils import decode_token


from utils.jwt_utils import decode_token


auth_bp = Blueprint("auth", __name__)
SECRET = os.getenv("JWT_SECRET")

# SIGNUP
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if mongo.db.users.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

    user_id = mongo.db.users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hashed_pw
    }).inserted_id

    token = jwt.encode(
        {"user_id": str(user_id), "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)},
        SECRET,
        algorithm="HS256"
    )

    return jsonify({"token": token})


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = mongo.db.users.find_one({"email": data["email"]})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not bcrypt.check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Incorrect password"}), 401

    token = jwt.encode(
        {"user_id": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)},
        SECRET,
        algorithm="HS256"
    )

    return jsonify({"token": token})

@auth_bp.route("/me", methods=["GET"])
def get_me():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Missing token"}), 401

    token = auth_header.split(" ")[1]

    try:
        data = decode_token(token)
        user = mongo.db.users.find_one({"_id": ObjectId(data["user_id"])})
        return jsonify({
            "name": user["name"],
            "email": user["email"]
        })
    except:
        return jsonify({"error": "Invalid token"}), 401
