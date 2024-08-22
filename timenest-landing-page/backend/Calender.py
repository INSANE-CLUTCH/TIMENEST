from database.mongodb import MongoManager
from datetime import datetime, timedelta
mongo_client = MongoManager('Timenest')
class AVLNode:
    def __init__(self, task):
        self.task = task
        self.left = None
        self.right = None
        self.height = 1  # Chiều cao của nút

class AVLTree:
    def __init__(self):
        self.root = None
    
    def _height(self, node):
        if not node:
            return 0
        return node.height
    
    def _balance_factor(self, node):
        if not node:
            return 0
        return self._height(node.left) - self._height(node.right)
    
    def _update_height(self, node):
        if node:
            node.height = max(self._height(node.left), self._height(node.right)) + 1
    
    def _rotate_right(self, y):
        x = y.left
        T2 = x.right
        
        x.right = y
        y.left = T2
        
        self._update_height(y)
        self._update_height(x)
        
        return x
    
    def _rotate_left(self, x):
        y = x.right
        T2 = y.left
        
        y.left = x
        x.right = T2
        
        self._update_height(x)
        self._update_height(y)
        
        return y
    
    def _rebalance(self, node):
        balance = self._balance_factor(node)
        
        # Left heavy
        if balance > 1:
            if self._balance_factor(node.left) < 0:
                node.left = self._rotate_left(node.left)
            return self._rotate_right(node)
        
        # Right heavy
        if balance < -1:
            if self._balance_factor(node.right) > 0:
                node.right = self._rotate_right(node.right)
            return self._rotate_left(node)
        
        return node
    
    def _insert(self, node, task):
        if not node:
            return AVLNode(task)
        
        if task['StartTime'] < node.task['StartTime']:
            node.left = self._insert(node.left, task)
        else:
            node.right = self._insert(node.right, task)
        
        self._update_height(node)
        return self._rebalance(node)
    
    def insert(self, task):
        self.root = self._insert(self.root, task)
    
    def _in_order_traversal(self, node, result):
        if node:
            self._in_order_traversal(node.left, result)
            result.append(node.task)
            self._in_order_traversal(node.right, result)
    
    def get_tasks(self):
        result = []
        self._in_order_traversal(self.root, result)
        return result
    def _search_in_range(self, node, start_of_day, end_of_day, result):
        if not node:
            return
        
        task_start = datetime.strptime(node.task['StartTime'], '%Y-%m-%d %H:%M:%S')
        task_end = datetime.strptime(node.task['EndTime'], '%Y-%m-%d %H:%M:%S')

        if task_start < end_of_day and task_end > start_of_day:
            result.append(node.task)
        
        # Tìm kiếm trong các nút con
        if task_start >= start_of_day:
            self._search_in_range(node.left, start_of_day, end_of_day, result)
        if task_end <= end_of_day:
            self._search_in_range(node.right, start_of_day, end_of_day, result)
    def search_in_range(self, start_of_day, end_of_day):
        results = []
        self._search_in_range(self.root, start_of_day, end_of_day, results)
        return results
class Calender:    
    _instances = {}
    def print_tasks(self):
        tasks = self.avl_tree_task.get_tasks()
        for task in tasks:
            print(task)
    
    def add_task(self, new_task):
        self.avl_tree_task.insert(new_task)
    #Đánh giá hiệu suất trong một ngày
    def _day_eval(self, year, month, day):
        target_date = datetime(year, month, day)
        start_of_day = target_date
        end_of_day = target_date + timedelta(days=1)

        tasks_in_day = self.avl_tree_task.search_in_range(start_of_day, end_of_day)

        completed_time = 0
        completed_count = 0
        total_time = 0
        for task in tasks_in_day:
            start_time = datetime.strptime(task['StartTime'], '%Y-%m-%d %H:%M:%S')
            end_time = datetime.strptime(task['EndTime'], '%Y-%m-%d %H:%M:%S')
            time_spent = (end_time - start_time).total_seconds()
            if task['Status'] == 'Completed':
                completed_count += 1
                completed_time += time_spent
            total_time += time_spent
            
        print(tasks_in_day)
        print(f"Total time of completed tasks: {completed_time} (s)")
        print(f"Total time of all of tasks: {total_time} (s)")
        if(total_time == 0): print("This day is free")
        else: print(f"The efficiency evaluation for {year}-{month}-{day} is {completed_time/total_time*100:.0f}%")
    
class Calender_with_userpass(Calender):
    def __new__(cls, self, username, password):
        self.user = mongo_client.find_one('user', {'UserName':username, 'Password': password})
        userid = self.user['UserID']
        if userid not in cls._instances:
            instance = super(Calender_with_userid, cls).__new__(cls)
            cls._instances[userid] = instance
        return cls._instances[userid]

    def __init__(self, username, password):
        if not hasattr(self, 'initialized'):
            list_of_task = mongo_client.find(collection_name='task', filter={'UserID':self.user['UserID']})
            self.avl_tree_task = AVLTree()
            for task in list_of_task:
                self.avl_tree_task.insert(task)

class Calender_with_userid(Calender):
    # def __new__(cls, userid):
    #     if userid not in cls._instances:
    #         instance = super(Calender_with_userid, cls).__new__(cls)
    #         cls._instances[userid] = instance
    #     return cls._instances[userid]

    def __init__(self, userid):
        # if not hasattr(self, 'initialized'):
        self.user = mongo_client.find_one('user', {"UserID":userid})
        self.list_of_task = mongo_client.find(collection_name='task', filter={'UserID': userid})
        self.initialized = True