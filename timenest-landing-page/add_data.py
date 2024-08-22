from database.mongodb import MongoManager
from datetime import datetime
from backend.Calender import *
mongo_client = MongoManager("Timenest")


data=  [
    {
      "UserID": 1,
      "TaskID": 101,
      "TaskName": "Morning Yoga",
      "StartTime": "2024-08-22 06:00:00",
      "EndTime": "2024-08-22 07:00:00",
      "Status": "Completed",
      "Description": "Morning yoga session at the park.",
      "Color": "blue",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 1,
      "TaskID": 102,
      "TaskName": "Team Meeting",
      "StartTime": "2024-08-22 09:00:00",
      "EndTime": "2024-08-22 10:30:00",
      "Status": "Pending",
      "Description": "Weekly team meeting via Zoom.",
      "Color": "green",
      "Subtasks": ["64ea285f1b2e3e7f7d4d1111"],
      "Notes": ["64ea285f1b2e3e7f7d4d2222"]
    },
    {
      "UserID": 1,
      "TaskID": 103,
      "TaskName": "Client Presentation",
      "StartTime": "2024-08-23 14:00:00",
      "EndTime": "2024-08-23 15:30:00",
      "Status": "Pending",
      "Description": "Present the project update to the client.",
      "Color": "red",
      "Subtasks": [],
      "Notes": ["64ea285f1b2e3e7f7d4d3333"]
    },
    {
      "UserID": 1,
      "TaskID": 104,
      "TaskName": "Grocery Shopping",
      "StartTime": "2024-08-24 17:00:00",
      "EndTime": "2024-08-24 18:00:00",
      "Status": "Pending",
      "Description": "Buy groceries for the week.",
      "Color": "yellow",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 1,
      "TaskID": 105,
      "TaskName": "Read Book",
      "StartTime": "2024-08-24 20:00:00",
      "EndTime": "2024-08-24 21:30:00",
      "Status": "Pending",
      "Description": "Continue reading the new novel.",
      "Color": "purple",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 2,
      "TaskID": 201,
      "TaskName": "Gym Workout",
      "StartTime": "2024-08-22 07:00:00",
      "EndTime": "2024-08-22 08:00:00",
      "Status": "Completed",
      "Description": "Morning workout at the gym.",
      "Color": "blue",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 2,
      "TaskID": 202,
      "TaskName": "Project Planning",
      "StartTime": "2024-08-22 10:00:00",
      "EndTime": "2024-08-22 12:00:00",
      "Status": "Pending",
      "Description": "Plan the next phase of the project.",
      "Color": "green",
      "Subtasks": ["64ea285f1b2e3e7f7d4d4444"],
      "Notes": ["64ea285f1b2e3e7f7d4d5555"]
    },
    {
      "UserID": 2,
      "TaskID": 203,
      "TaskName": "Lunch with Client",
      "StartTime": "2024-08-23 12:00:00",
      "EndTime": "2024-08-23 13:30:00",
      "Status": "Pending",
      "Description": "Lunch meeting with the client at the downtown restaurant.",
      "Color": "red",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 2,
      "TaskID": 204,
      "TaskName": "Code Review",
      "StartTime": "2024-08-24 15:00:00",
      "EndTime": "2024-08-24 17:00:00",
      "Status": "Pending",
      "Description": "Review the new code changes.",
      "Color": "yellow",
      "Subtasks": [],
      "Notes": ["64ea285f1b2e3e7f7d4d6666"]
    },
    {
      "UserID": 2,
      "TaskID": 205,
      "TaskName": "Dinner with Family",
      "StartTime": "2024-08-24 19:00:00",
      "EndTime": "2024-08-24 21:00:00",
      "Status": "Pending",
      "Description": "Family dinner at home.",
      "Color": "purple",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 3,
      "TaskID": 301,
      "TaskName": "Morning Run",
      "StartTime": "2024-08-22 06:30:00",
      "EndTime": "2024-08-22 07:30:00",
      "Status": "Completed",
      "Description": "Morning run around the neighborhood.",
      "Color": "blue",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 3,
      "TaskID": 302,
      "TaskName": "Design Meeting",
      "StartTime": "2024-08-22 11:00:00",
      "EndTime": "2024-08-22 12:30:00",
      "Status": "Pending",
      "Description": "Meeting with the design team to finalize the layouts.",
      "Color": "green",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 3,
      "TaskID": 303,
      "TaskName": "Doctor Appointment",
      "StartTime": "2024-08-23 16:00:00",
      "EndTime": "2024-08-23 17:00:00",
      "Status": "Pending",
      "Description": "Routine check-up at the clinic.",
      "Color": "red",
      "Subtasks": [],
      "Notes": []
    },
    {
      "UserID": 3,
      "TaskID": 304,
      "TaskName": "Prepare Presentation",
      "StartTime": "2024-08-24 09:00:00",
      "EndTime": "2024-08-24 12:00:00",
      "Status": "Pending",
      "Description": "Prepare the slides for the upcoming presentation.",
      "Color": "yellow",
      "Subtasks": ["64ea285f1b2e3e7f7d4d7777"],
      "Notes": []
    },
    {
      "UserID": 3,
      "TaskID": 305,
      "TaskName": "Watch Movie",
      "StartTime": "2024-08-24 20:00:00",
      "EndTime": "2024-08-24 22:00:00",
      "Status": "Pending",
      "Description": "Watch the latest movie release.",
      "Color": "purple",
      "Subtasks": [],
      "Notes": []
    }
]


mongo_client.insert_many(
    collection_name='task',
    data=data
)