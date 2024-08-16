from database.mongodb import MongoManager
from datetime import datetime
from backend.Backend import Calender
# mongo_client = MongoManager("Timenest")


# data = [
#     {
#         "UserID": 1102004,
#         "TaskID": "P7T5V3Z9B0",
#         "TaskName": "Documentation",
#         "StartTime": "2023-01-20T09:00:00",
#         "EndTime": "2023-02-28T17:00:00",
#         "Status": "Completed",
#         "Description": "Update the project documentation with the latest changes and improvements.",
#         "Color": "Green",
#         "Subtasks": ["7482", "9263"],
#         "Notes": ["3145"]
#     },
#     {
#         "UserID": 1102004,
#         "TaskID": "Q9W8X7Y5Z6",
#         "TaskName": "Testing",
#         "StartTime": "2023-06-22T10:15:00",
#         "EndTime": "2023-07-30T16:30:00",
#         "Status": "In Progress",
#         "Description": "Plan and execute the testing phase for the new application module.",
#         "Color": "Blue",
#         "Subtasks": ["1324"],
#         "Notes": ["5678", "9123"]
#     },
#     {
#         "UserID": 1102004,
#         "TaskID": "N6M5K4L3J2",
#         "TaskName": "Report",
#         "StartTime": "2023-03-05T08:30:00",
#         "EndTime": "2023-03-15T12:00:00",
#         "Status": "Pending",
#         "Description": "Prepare the quarterly financial report and present it to the team.",
#         "Color": "Red",
#         "Subtasks": ["8452", "6791"],
#         "Notes": ["1234"]
#     },
#     {
#         "UserID": 1102004,
#         "TaskID": "H4G6F7E8D9",
#         "TaskName": "Meeting",
#         "StartTime": "2023-07-10T13:00:00",
#         "EndTime": "2023-07-10T15:00:00",
#         "Status": "Completed",
#         "Description": "Organize a team meeting to discuss the upcoming project milestones.",
#         "Color": "Yellow",
#         "Subtasks": ["3456"],
#         "Notes": ["7890", "4567"]
#     },
#     {
#         "UserID": 1102004,
#         "TaskID": "B8C7D6E5F4",
#         "TaskName": "Development",
#         "StartTime": "2023-05-15T11:00:00",
#         "EndTime": "2023-06-25T18:00:00",
#         "Status": "In Progress",
#         "Description": "Develop the new feature based on the requirements from the product team.",
#         "Color": "Blue",
#         "Subtasks": ["9823"],
#         "Notes": ["3456"]
#     },
#     {
#         "UserID": 1102004,
#         "TaskID": "R1S3T4U5V6",
#         "TaskName": "Planning",
#         "StartTime": "2023-10-01T09:00:00",
#         "EndTime": "2023-10-10T12:00:00",
#         "Status": "Pending",
#         "Description": "Plan the project roadmap and set up milestones for the next quarter.",
#         "Color": "Green",
#         "Subtasks": ["2741"],
#         "Notes": ["6789"]
#     },
#     {
#         "UserID": 1102004,
#         "TaskID": "J2K4L6M8N9",
#         "TaskName": "Research",
#         "StartTime": "2023-11-15T10:00:00",
#         "EndTime": "2023-12-05T15:00:00",
#         "Status": "In Progress",
#         "Description": "Conduct market research to identify new trends and opportunities.",
#         "Color": "Red",
#         "Subtasks": ["3912"],
#         "Notes": ["1234", "5678"]
#     }
# ]

# print(type(data[0]["StartTime"]))
# print(type(data[0]["StartTime"]))
# print(datetime.fromisoformat(data[0]["StartTime"]).date())
# print(datetime.fromisoformat("2023-01-20").date())
# # mongo_client.insert_many(
# #     collection_name='task',
# #     data=data
# # )

client = Calender("hoangmanh", "anhnhoem")
client._day_eval(2023,1,3)

