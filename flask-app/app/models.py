from datetime import datetime
from app import db
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    recipes = db.relationship('Recipe', back_populates='user')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at
        }


class Recipe(db.Model):
    __tablename__ = 'recipes'

    recipe_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    instructions = db.Column(db.Text, nullable=False)
    prep_time = db.Column(db.Integer)  # Tijd in minuten
    cook_time = db.Column(db.Integer)  # Tijd in minuten
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='recipes')
    categories = db.relationship('Category', secondary='recipe_categories', back_populates='recipes')
    ingredients = db.relationship('RecipeIngredient', back_populates='recipe')
    ratings = db.relationship('RecipeRating', back_populates='recipe')
    images = db.relationship('RecipeImage', back_populates='recipe')

    def to_dict(self):
        return {
            "recipe_id": self.recipe_id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "instructions": self.instructions,
            "prep_time": self.prep_time,
            "cook_time": self.cook_time,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "categories": [category.to_dict() for category in self.categories],
            "ingredients": [ingredient.to_dict() for ingredient in self.ingredients],
            "ratings": [rating.to_dict() for rating in self.ratings],
            "images": [image.to_dict() for image in self.images]
        }


class Category(db.Model):
    __tablename__ = 'categories'

    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    recipes = db.relationship('Recipe', secondary='recipe_categories', back_populates='categories')

    def to_dict(self):
        return {
            "category_id": self.category_id,
            "name": self.name
        }


class RecipeCategory(db.Model):
    __tablename__ = 'recipe_categories'

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'), primary_key=True)


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    ingredient_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    recipes = db.relationship('RecipeIngredient', back_populates='ingredient')

    def to_dict(self):
        return {
            "ingredient_id": self.ingredient_id,
            "name": self.name
        }


class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.ingredient_id'), primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)

    recipe = db.relationship('Recipe', back_populates='ingredients')
    ingredient = db.relationship('Ingredient', back_populates='recipes')

    def to_dict(self):
        return {
            "ingredient_id": self.ingredient_id,
            "name": self.ingredient.name,
            "amount": self.amount,
            "unit": self.unit
        }


class RecipeRating(db.Model):
    __tablename__ = 'recipe_ratings'

    rating_id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    recipe = db.relationship('Recipe', back_populates='ratings')

    def to_dict(self):
        return {
            "rating_id": self.rating_id,
            "recipe_id": self.recipe_id,
            "user_id": self.user_id,
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at
        }


class RecipeImage(db.Model):
    __tablename__ = 'recipe_images'

    image_id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), nullable=False)
    url = db.Column(db.Text, nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    recipe = db.relationship('Recipe', back_populates='images')

    def to_dict(self):
        return {
            "image_id": self.image_id,
            "recipe_id": self.recipe_id,
            "url": self.url,
            "uploaded_at": self.uploaded_at
        }
