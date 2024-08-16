from database.mongodb import MongoManager
from datetime import datetime
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
class Calender():
    def __init__(self, username, password):
        mongo_client = MongoManager('Timenest')
        user = mongo_client.find_one('user', {'UserName':username, 'Password': password})
        list_of_task = sorted(mongo_client.find(collection_name='task', filter={'UserID':user['UserID']}), key=lambda x: x['StartTime'])
        
        # Tạo cây AVL
        self.avl_tree = AVLTree()
        for task in list_of_task:
            self.avl_tree.insert(task)

        # In danh sách nhiệm vụ
        self.print_tasks()
        
    def print_tasks(self):
        tasks = self.avl_tree.get_tasks()
        for task in tasks:
            print(task)
    
    def add_task(self, new_task):
        self.avl_tree.insert(new_task)
        
    def _day_eval(self, year, month , day):
        strdate =f"{year}-{month}-{day}"
        print(datetime.strptime(strdate, '%Y-%m-%d'))
        {completed_time, sum_time}=calculate_time()