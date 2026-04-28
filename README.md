🚀 Service Marketplace (ServiceHub)

A full-stack service marketplace platform where customers can browse and book services, and providers can manage their services and bookings in real-time.

📌 Project Overview

ServiceHub is a two-sided platform:

👤 Customers → Browse services, view details, and book

🧑‍🔧 Providers → Create services, manage bookings, respond in real-time

🏗️ Tech Stack

Frontend

React.js

CSS (Custom Styling)

Axios

Socket.IO Client

Backend

Node.js

Express.js

MongoDB (Mongoose)

Socket.IO

📂 Project Structure

service-marketplace/ │ ├── backend/ │ ├── config/ │ ├── controllers/ │ ├── middleware/ │ ├── models/ │ ├── routes/ │ ├── server.js │ └── package.json │ ├── servicehub-app/ │ ├── public/ │ ├── src/ │ │ ├── customer/ │ │ ├── provider/ │ │ ├── assets/ │ │ └── pages/ │ └── package.json │ └── .gitignore 

✨ Features

👤 Customer Features

Browse professional services

Search functionality

View service details

Booking system

Responsive UI

🧑‍🔧 Provider Features

Add/Edit/Delete services

Manage bookings

Accept/Reject requests

Mark service as completed

⚡ Real-Time Features

Socket.IO integration

Instant booking updates

Live notifications

⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-username/service-marketplace.git cd service-marketplace 

2️⃣ Backend Setup

cd backend npm install 
Create a .env file:
PORT=5000 MONGO_URI=your_mongodb_connection 
Run backend:
node server.js 

3️⃣ Frontend Setup

cd servicehub-app npm install npm start 

🌐 Running the Project

Frontend → http://localhost:3000

Backend → http://localhost:5000

🔌 API Endpoints (Sample)

Auth

POST /api/auth/register

POST /api/auth/login

Services

GET /api/services

POST /api/services

Bookings

POST /api/bookings

GET /api/bookings

📸 Screens (Optional)

(Add screenshots later for better presentation)

🚀 Future Enhancements

💳 Razorpay Payment Integration

🔔 Notification system

📱 Mobile optimization

🌍 Deployment (Render / Vercel)

⭐ Ratings & Reviews

👨‍💻 Author

Likith Machireddy

📄 License

This project is open-source and available under the MIT License.
