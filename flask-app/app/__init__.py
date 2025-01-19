from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'CHANGEME'  # Wijzig deze key
    jwt = JWTManager(app)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    from app.routes import auth
    app.register_blueprint(auth, url_prefix='/api/auth')
    from app.routes import api
    app.register_blueprint(api, url_prefix='/api')

    # Serve Angular app
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_angular(path):
        from flask import send_from_directory
        return send_from_directory("angular-app/dist", path)

    return app
