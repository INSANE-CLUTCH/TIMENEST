from database.mongodb import MongoManager
from datetime import datetime
import json
# from backend.Calender import *
# from backend.Meeting import *

mongo_client = MongoManager("Timenest")
# group = mongo_client.find_one(collection_name='group', filter = {"GroupID":123})
# # print(group["Users"])

# client = Meeting(65416200)
# client.find_busy_time(1)

# print(datetime(2023,3,2))

# client = Calender_with_userpass(username="franklinandrea", password="93753Dq9$C")
# print(client._day_eval(2024,8,14))
# print(type(client.list_of_task[0]))
dict = mongo_client.find_with_userid(userid=70270660)
name_file_cat = 'file_6' + ".json"