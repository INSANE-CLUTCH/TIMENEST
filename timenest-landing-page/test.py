from database.mongodb import MongoManager
from datetime import datetime
from backend.Calender import *
from backend.Meeting import *

# mongo_client = MongoManager("Timenest")
# group = mongo_client.find_one(collection_name='group', filter = {"GroupID":123})
# print(group["Users"])

client = Meeting(123)
client.find_busy_time(0)

# print(datetime(2023,3,2))

