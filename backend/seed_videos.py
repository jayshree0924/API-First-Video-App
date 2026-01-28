from app import create_app, mongo

app = create_app()

with app.app_context():
    videos = [
        {
            "title": "Why Startups Fail",
            "description": "Lessons from real founders",
            "youtube_id": "dQw4w9WgXcQ",
            "thumbnail_url": "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
            "is_active": True
        },
        {
            "title": "How Billionaires Think",
            "description": "Mindset of top entrepreneurs",
            "youtube_id": "3tmd-ClpJxA",
            "thumbnail_url": "https://img.youtube.com/vi/3tmd-ClpJxA/0.jpg",
            "is_active": True
        }
    ]

    mongo.db.videos.insert_many(videos)
    print("Videos inserted successfully!")
