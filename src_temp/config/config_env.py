import os
from dotenv import load_dotenv
load_dotenv()

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
MONGODB_URL = os.getenv("MONGODB_URL")