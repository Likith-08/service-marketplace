🚀 ServiceHub – Full Stack Service Marketplace Platform

📌 Introduction

ServiceHub is a full-stack service marketplace web application designed to connect customers with service providers in a seamless and efficient way.
It allows users to:

Discover professional services

Book services easily

Manage bookings in real-time

Enable providers to handle service requests dynamically

This project demonstrates real-world scalable architecture, including REST APIs, real-time communication, and modular design.

🎯 Objective

The main goal of this project is to:

Build a production-like full-stack application

Implement role-based functionality (Customer & Provider)

Integrate real-time updates using Socket.IO

Follow clean architecture (MVC pattern)

Prepare a portfolio-ready project for interviews

🏗️ Architecture Overview

This application follows a client-server architecture:

Frontend (React) → Handles UI/UX

Backend (Node.js + Express) → Handles API & logic

Database (MongoDB) → Stores data

Socket.IO → Handles real-time communication

Client (React) → Express API → MongoDB ↘ Socket.IO (Real-time updates) 

🧰 Tech Stack

Frontend

React.js

CSS3 (Custom Responsive Design)

Axios (API calls)

React Router DOM

Socket.IO Client

Backend

Node.js

Express.js

MongoDB

Mongoose

Socket.IO

Tools & Environment

VS Code

Git & GitHub

Postman (API testing)

📁 Project Structure

service-marketplace/ │ ├── backend/ │ ├── config/ # Database configuration │ ├── controllers/ # Business logic │ ├── middleware/ # Authentication middleware │ ├── models/ # Mongoose schemas │ ├── routes/ # API routes │ ├── server.js # Entry point │ └── package.json │ ├── servicehub-app/ │ ├── public/ │ ├── src/ │ │ ├── customer/ # Customer features │ │ ├── provider/ # Provider features │ │ ├── assets/ │ │ └── pages/ │ └── package.json │ └── .gitignore 

🔥 Core Features

👤 Customer Module

View all available services

Search services

View detailed service info

Book services

Responsive UI for mobile

🧑‍🔧 Provider Module

Register/Login

Create new services

Edit/Delete services

View incoming bookings

Accept/Reject bookings

Mark bookings as completed

⚡ Real-Time System

Socket.IO integration

Instant updates when: 

Booking is created

Booking status changes

No need for page refresh

🔄 Application Flow

Customer Flow

User visits platform

Browses services

Views service details

Books a service

Booking stored in database

Provider gets real-time notification

Provider Flow

Provider logs in

Views bookings

Accepts or rejects request

Status updated in real-time

Customer sees updated status instantly

🗄️ Database Design (MongoDB)

User Model

name

email

password

role (customer/provider)

Service Model

title

description

price

category

providerId

Booking Model

serviceId

customerId

providerId

status (pending/accepted/rejected/completed)

date

🔌 API Design

Auth Routes

POST /api/auth/register

POST /api/auth/login

Service Routes

GET /api/services

POST /api/services

PUT /api/services/:id

DELETE /api/services/:id

Booking Routes

POST /api/bookings

GET /api/bookings

PUT /api/bookings/:id

⚙️ Installation Guide

1️⃣ Clone Repository

git clone https://github.com/your-username/service-marketplace.git cd service-marketplace 

2️⃣ Backend Setup

cd backend npm install 
Create .env file:
PORT=5000 MONGO_URI=your_mongodb_connection JWT_SECRET=your_secret_key 
Run backend:
node server.js 

3️⃣ Frontend Setup

cd servicehub-app npm install npm start 

🌐 Running the Application

ServiceURL  
Frontend : http://localhost:3000 
Backend  :  http://localhost:5000 

⚠️ Important Notes

node_modules is ignored using .gitignore

Environment variables are not pushed to GitHub

Backend and frontend run independently

🧪 Testing

API tested using Postman

Manual UI testing for frontend

Real-time events tested using multiple tabs

💡 Key Learnings

Full-stack architecture design

REST API development

Real-time communication (Socket.IO)

MongoDB schema design

State management in React

Git & GitHub workflow

👨‍💻 Author

Likith Machireddy

📌 Conclusion

ServiceHub is a scalable, real-world inspired project that demonstrates strong understanding of:

Full-stack development

Real-time systems

Clean architecture

Industry-level coding practices

⭐ If you like this project, give it a star on GitHub!
