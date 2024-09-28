from database.mongodb import MongoManager
from flask import Flask, request, jsonify, render_template
from utils import trigger_metadata, generate_uid
from object.calendar import *
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

    if mongo_client.find_one('users', {'UserName': username}):
        if mongo_client.find('users', {'UserName': username, 'Password': password}):
            record = mongo_client.find_one('users',{'UserName': username})
            trigger_metadata(record['userID'])
            userID = record['userID']
            return jsonify({"message": "Login successful","userID":userID}), 200
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

    if mongo_client.find_one('users', {"UserName": username}):
        return jsonify({"error": "Username already exists"}), 400
    userID = generate_uid(username)
    mongo_client.insert_one('users', {"userID": userID,"UserName": username, "Password": password})
    return jsonify({"message": "Account created successfully"}), 201

@app.route('/add-task',methods=['POST'])
def add_task():
    data = request.json
    task_id = data.get("task_id") 
    task_name = data.get("task_name")
    start_time = data.get("start_time")
    end_time = data.get("end_time")
    status = data.get("status")
    description = data.get("description")
    color = data.get("color")
    projectID = data.get("projectID")
    add_task()


@app.route('/delete-task',methods=['DELETE'])
def delete_task():
    pass

@app.route('/change-task', methods=['POST'])
def change_task():
    pass

if __name__ == '__main__':
    app.run(debug=True,port='5001',host='0.0.0.0')