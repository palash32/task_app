# Task App

## Overview

This repository contains the code for a task management application built using Node.js, Express, MongoDB, and Twilio. The app allows users to create, manage, and track their tasks, and it sends automated reminder calls for overdue tasks using Twilio.

## Features

Create, read, update, and delete tasks
Set task priorities and due dates
View tasks in a list or calendar view
Receive automated reminder calls for overdue tasks
(Optional) Organize tasks into subtasks (if the subtaskRoutes feature is included)
## Technologies Used

Node.js
Express
Mongoose
MongoDB
Twilio
Cron
## Getting Started

Clone this repository:
Bash
git clone https://github.com/your-username/task_app.git

Install dependencies:

npm install <package_name>

Create a .env file in the root directory and add the following environment variables:
MONGODB_URI=<your_MongoDB_connection_string>
TWILIO_ACCOUNT_SID=<your_Twilio_account_SID>
TWILIO_AUTH_TOKEN=<your_Twilio_auth_token>
TWILIO_PHONE_NUMBER=<your_Twilio_phone_number>
TWILIO_CALL_URL=<your_Twilio_call_URL>

Start the server:
npm start

Access the app in your browser at http://localhost:3000

## Additional Information

API Endpoints:
/tasks: GET (list tasks), POST (create task), PUT (update task), DELETE (delete task)
/subtasks: GET (list subtasks), POST (create subtask), PUT (update subtask), DELETE (delete subtask) (if included)
Database Structure:
tasks collection: stores task data
users collection: stores user data (if included)
Twilio Integration:
The maketwiliocalls.js script handles automated reminder calls.

## Contributing

We welcome contributions! Please follow these steps:

Fork this repository
Create a branch for your changes
Make your changes
Submit a pull request
## License

This project is licensed under the MIT License.

