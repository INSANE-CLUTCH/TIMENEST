from database.mongodb import MongoManager
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

mongo_client = MongoManager("Timenest")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create-account')
def create_account_page():
    return render_template('login.html')

@app.route("/login", methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if mongo_client.find_one('user', {'UserName': username}):
        if mongo_client.find('user', {'UserName': username, 'Password': password}):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Wrong password"}), 200
    else:
        return jsonify({"message": 'User not found, would you like to create an account?'}), 401

@app.route('/create-account', methods=['POST'])
def create_account():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    confirm_password = data.get("confirm_password")
    
    if not username or not password or not confirm_password:
        return jsonify({"error": "All fields are required"}), 400
    
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    if mongo_client.find_one('user', {"UserName": username}):
        return jsonify({"error": "Username already exists"}), 400

    mongo_client.insert_one('user', {"UserName": username, "Password": password})
    return jsonify({"message": "Account created successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
