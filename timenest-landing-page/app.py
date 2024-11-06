import subprocess
import os
import time
commands = [
    ["python", "login.py"],
    ["npm", "run", "dev"],   
]

processes = []
for command in commands:
    cwd = None
    if command == ["npm", "run", "dev"]:
        cwd = os.path.join(os.getcwd(), 'NextJSCalendarTut')  

    processes.append(subprocess.Popen(command, cwd=cwd))
    time.sleep(5)

for process in processes:
    process.wait()
