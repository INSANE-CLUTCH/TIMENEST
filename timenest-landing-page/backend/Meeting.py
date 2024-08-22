from database.mongodb import MongoManager
from datetime import datetime, timedelta
from backend.Calender import Calender, Calender_with_userid, Calender_with_userpass

mongo_client = MongoManager('Timenest')
class Time_table:
    def __init__(self):
        self.numbers_of_participants = [0]*100
        self.name = [[] for _ in range(100)]
        self.time_interval = [1]*100
    
class Meeting:
    def __init__(self, groupid):
        snt = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73]
        group = mongo_client.find_one(collection_name='group', filter = {"GroupID": groupid})
        self.all_tasks = []
        self.keyid = {}
        for index,userid in enumerate(group['Users']):
            member = Calender_with_userid(userid = userid)
            self.all_tasks.append(member.list_of_task) 
            self.keyid[userid] = (snt[index], member.user['UserName'])
        self.group_calender = [Time_table() for _ in range(2000)]
        print(self.keyid)
        for tasks in self.all_tasks:
            for task in tasks:
                key, name = self.keyid[task['UserID']]
                start_time_index = self.get_time_index(task['StartTime'])
                end_time_index = self.get_time_index(task['EndTime'])
                day_index = start_time_index[0]
                for time_index in range(start_time_index[1], end_time_index[1]):
                    if(self.group_calender[day_index].time_interval[time_index] % key != 0):
                        self.group_calender[day_index].time_interval[time_index] *= key
                        self.group_calender[day_index].name[time_index].append(name)
                        self.group_calender[day_index].numbers_of_participants[time_index] += 1

    def day_of_year(self, year, month, day):
        #tạo index cho ngày ở trong mảng group_calender
        date = datetime(year, month, day)
        start_of_year = datetime(year, 1, 1)
        day_of_year = (date - start_of_year).days + 1
        return (day_of_year + 367*(year-2024)) # ngày 1-1-2024 sẽ là phần tử 1
    
    def get_time_index(self, time_str):
        date, time = time_str.split(' ')
        year, month, day = map(int, date.split('-'))
        hour, minute, sec = map(int, time.split(':'))
        time_index = (hour * 60 + minute) / 15
        return (int(self.day_of_year(year, month, day)), int(time_index) )
    
    def get_time_from_index(self, time_index):
        minutes = time_index * 15
        hours = minutes // 60
        minutes = minutes % 60
        return f"{hours:02}:{minutes:02}"
    
    def find_busy_time(self, required_participants):
        for date_index in range(1,2000):
            for time_index in range(0, 96):
                # if(self.group_calender[date_index].numbers_of_participants[time_index] < required_participants):
                #     time_index +=1
                #     continue
                # start = time_index
                # while(time_index<=95 and self.group_calender[date_index].numbers_of_participants[time_index]>= required_participants): 
                #     time_index += 1
                if(self.group_calender[date_index].time_interval[time_index] == 1): continue
                print(f"Date: {date_index} - {self.group_calender[date_index].numbers_of_participants[time_index]}")
                print(f"{self.get_time_from_index(time_index)}+{self.get_time_from_index(time_index+1)}:")
                print(f"    Name of busy people: {self.group_calender[date_index].name[time_index]}")
                    
    