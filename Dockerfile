# Dockerfile
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file if you have one (optional)
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the application files
COPY . /app/

# The command will be overridden in docker-compose.yml for each service
CMD ["python", "main.py"]
