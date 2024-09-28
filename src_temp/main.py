from database.mongodb import MongoManager
from flask import Flask, request, jsonify, render_template
from utils import trigger_metadata, generate_uid
from object.calendar import *

app = Flask(__name__)

mongo_client = MongoManager("Timenest")

@app.route('/')
def index():
    username = request.args.get('username', 'Guest')
    userID = mongo_client.find_one(collection_name='users',filter={'UserName':username})['userID']
    return render_template('main.html', username=username,userID=userID)


@app.route('/get-user-metadata', methods=['GET'])
def get_user_metadata():
    try:
        data = request.json
        userID = data.get("userID")
        metadata = mongo_client.find_info(userID)
        # print(metadata)
        return jsonify(metadata),200
    except Exception as e:
        return jsonify({'message':f'Internal server error: {e}'}), 500
    
    
@app.route('/add-task',methods=['POST'])
def add_task():
    data = request.json
    print(data)
    userID = data.get("userID")
    taskName = data.get("taskName")
    taskDescription = data.get("taskDescription")
    startTime = data.get("startTime")
    endTime = data.get("endTime")
    color = data.get("taskColor")
    if not all([taskName, startTime, endTime]):
        return jsonify({'error': 'Missing required fields'}), 400
    mongo_client.insert_one('tasks',{'userID':userID,'taskName':taskName,'taskDescription':taskDescription,'startTime':startTime,'endTime':endTime,'taskcolor':color})
    trigger_metadata(userID)
    return jsonify({'message':'add task successfully'})


@app.route('/delete-task',methods=['DELETE'])
def delete_task():
    data = request.json
    print(data)
    userID = data.get("userID")
    taskName = data.get("taskName")
    taskDescription = data.get("taskDescription")
    # startTime = data.get("startTime")
    # endTime = data.get("endTime")
    # color = data.get("taskColor")
    if not all([userID, taskName, taskDescription]):
        return jsonify({'error': 'Missing required fields'}), 400
    mongo_client.delete_many('tasks',{'taskName':taskName,'taskDescription':taskDescription})
    trigger_metadata(userID)
    return jsonify({'message':'delete task successfully'})

"""
Example usage of /get-user-metadata

request:
{
    "userID":"19f7a031bb1a54584b9d8773d01616ade63d4794e1d270c38f0ff578e40d07c9"
}
response:
{
    "group": [],
    "project": [],
    "tasks": [
        {
            "endTime": "2024-09-27T12:00:00Z",
            "startTime": "2024-09-27T10:00:00Z",
            "taskDescription": "Finish the quarterly report by end of the day.",
            "taskName": "Complete Report",
            "taskcolor": "#FF5733",
            "userID": "19f7a031bb1a54584b9d8773d01616ade63d4794e1d270c38f0ff578e40d07c9"
        }
    ],
    "username": "hungzin"
}

Example usage of /add-task
request:
{
    "userID": "19f7a031bb1a54584b9d8773d01616ade63d4794e1d270c38f0ff578e40d07c9",
    "taskName": "Complete Report",
    "taskDescription": "Finish the quarterly report by end of the day.",
    "startTime": "2024-09-27T10:00:00Z",
    "endTime": "2024-09-27T12:00:00Z",
    "taskColor": "#FF5733"
}
response:
{
    "message": "add task successfully"
}



"""

if __name__ == '__main__':
    app.run(debug=True,port='5004',host='0.0.0.0')