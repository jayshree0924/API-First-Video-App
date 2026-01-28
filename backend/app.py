from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import mongo, bcrypt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    mongo.init_app(app)
    bcrypt.init_app(app)

    from routes.auth_routes import auth_bp
    from routes.dashboard_routes import dashboard_bp
    from routes.video_routes import video_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(video_bp)
    
    print("\nREGISTERED ROUTES:")
    for rule in app.url_map.iter_rules():
        print(rule)


    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
