# Vinderlust - Stay Comfort Hotels

Welcome to Vinderlust, your gateway to luxury and comfort. Our hotels provide the perfect blend of elegance, convenience, and exceptional service to ensure a memorable stay.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Contact](#contact)

## Features

- **Luxury Accommodations**: Experience top-notch rooms and suites designed for comfort and style.
- **Dining Options**: Enjoy a variety of dining experiences from our in-house restaurants.
- **Amenities**: Access to a range of amenities including a spa, gym, swimming pool, and more.
- **Booking System**: Easy online booking and reservation management with real-time updates.
- **Razorpay Integration**: Secure and seamless payment processing with Razorpay for hassle-free transactions.

## Technologies Used

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
  - **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
  - **React Icons**: A collection of popular icons for React applications.
- **Backend**:
  - **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
  - **Express**: A minimal and flexible Node.js web application framework.
- **Database**:
  - **Firebase Firestore**: A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.
- **Payment Gateway**:
  - **Razorpay**: Payment gateway to accept, process, and disburse payments.
- **Hosting**:
  - **Vercel**: A platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

- Node.js and npm installed
- Firebase project and Firestore database set up
- Razorpay account

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Vishal-Piprotar/vinderlust-hotel.git
    ```
2. Install NPM packages:
    ```bash
    cd vinderlust-hotel
    npm install
    ```
3. Create a `.env` file in the root directory and add your Firebase and Razorpay configuration.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret

```

### Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```bash
vinderlust-hotel/
├── public/
│ ├── index.html
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── App.jsx
│ ├── main.jsx
│ ├── router.js
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js

```


- **public/**: Contains static files.
- **src/**: Contains the main codebase.
  - **assets/**: Assets like images, fonts, etc.
  - **components/**: Reusable React components.
  - **pages/**: Different pages of the application.
  - **styles/**: Global and component-specific styles.
  - **App.jsx**: Main application component.
  - **main.jsx**: Entry point for the React application.
  - **router.js**: Application routing setup.

## Deployment

The application is hosted on Vercel. Follow these steps to deploy your own version:

1. Push your code to a GitHub repository.
2. Sign up for a Vercel account and connect your GitHub repository.
3. Configure your environment variables on Vercel.
4. Deploy the project.

## Contact

For any inquiries, please contact us at:
- Email: piprotarvishal20@gmail.com
- Phone: +91 6352497433

Visit our website: [Vinderlust - Stay Comfort Hotels](https://hotel-puce-beta.vercel.app/)
 give me proper