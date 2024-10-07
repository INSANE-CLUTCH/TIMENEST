from database.mongodb import MongoManager

mongo_client = MongoManager("Timenest")


data = {
  "UserID": 123,
  "UserName": "sucvatanhtuananmandaikhai",
  "Password": "anhnhoem",
  "Calendar": {
    "$oid": "123456"
  }
}

mongo_client.insert_one(
    collection_name='user',
    data=data
)

result_1 = mongo_client.find_one('user',{'UserName':'sucvatanhtuananmandaikhai'})
result_2 = mongo_client.find_user_by_username('sucvatanhtuananmandaikhai')



