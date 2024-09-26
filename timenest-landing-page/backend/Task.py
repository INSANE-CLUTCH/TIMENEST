class Task: 
    def __init__(self, task_name: str = 'No title', start_time: str = '', end_time: str = '',
                 status: str = '', description: str = '', color: str = '', task_id: int = None,
                 projectID: int = 0): 
        self.task_id = task_id 
        self.task_name: str = task_name
        self.start_time: str = start_time
        self.end_time: str = end_time
        self.status = status 
        self.description = description
        self.color = color
        self.projectID = projectID

    def change(self, task_name: str = '', start_time: str = '', end_time: str = '', status: str = '', description: str = '', color: str = '', projectID: int = none): 
        
        dict1 = {
            'TaskID': self.task_id, 
            'TaskName': self.task_name, 
            'StartTime': self.start_time, 
            'EndTime': self.end_time,
            'Status': self.status,
            'Color': self.color, 
            'Description': self.description
        }

        if(task_name != ''): 
            self.task_name = task_name
        if(start_time != ''):
            self.start_time = start_time
        if(end_time != ''): 
            self.start_time = start_time 
        if(status != ''):
            self.status = status
        if(description != ''): 
            self.description = description
        
        dict2 = {
            'TaskID': self.task_id, 
            'TaskName': self.task_name, 
            'StartTime': self.start_time, 
            'EndTime': self.end_time,
            'Status': self.status,
            'Color': self.color, 
            'Description': self.description
        }

        return dict1, dict2
    
    def print_detail(self): 
        print(self.task_name + " " + self.start_time + " " + self.end_time)
