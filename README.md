<img src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708750197/Natural_Fresh_Food_Logo_uzq4gs.png" alt="EventHub logo" title="EventHub" align="right" height="60" />

# EdenFood <br/>
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Table of Contents

- [Project Details](#project-details)
- [Features](#features)
- [Tech Stack and API dependencies](#tech-stack-and-api-dependencies)
- [Installation](#installation)
- [Contributions](#contributions)
- [License](#license)

## Project Details

EdenFood is a mobile friendly e-commerce platform designed to connect fresh food farm grocers and wet market sellers directly with consumers. The primary goal of this project is to provide a seamless online marketplace for selling and purchasing fresh produce, meats, seafood, and other locally-sourced products.

_Made for NUS' IS3106 - Enterprise Systems Interface Design and Development._

<img src=https://github.com/tristantanjh/EdenFood/assets/99729861/30c23875-83d6-45d6-b9c7-aec0bf24bcb2 width=1000> <br />

## Features

- **User Accounts**: Users can create accounts to both purchase and list products on the platform, acting as buyers or sellers, or both simultaneously.
  
- **Product Listings**: Sellers can easily list their fresh produce, meats, seafood, and other products, providing detailed descriptions, pricing, and availability information.
  
- **Inventory Management**: The platform includes an intuitive inventory management system that allows sellers to track stock levels, update product availability, and manage orders efficiently.
  
- **Search and Filters**: Users can search for specific products or apply filters based on various criteria, such as product category, seller location, or dietary preferences (e.g., organic, gluten-free, etc.).
  
- **Order Tracking**: Both sellers and customers can track the status of orders, from placement to delivery or pickup.
  
- **Secure Payments**: EdenFood integrates with popular payment gateways like Paypal to ensure secure and reliable transactions for customers. Recurrent monthly payment scripts are also set up to ensure sellers are paid for their items at regular and predictable intervals.
  
- **Delivery and Pickup Options**: Customers can choose between numerous convenient delivery options.

## Tech Stack and API Dependencies

### Tech Stack
This project utilizes the MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js. Below is a brief overview of each technology:

- **MongoDB:** NoSQL database used for storing and managing data in a flexible, schema-less format. It is employed in this project to persistently store user data, application configurations, and other relevant information.
  
- **Express.js:** A minimalist web framework for Node.js that simplifies the process of building robust web applications and APIs. In this project, Express.js is used to create the backend server, handle HTTP requests, and define the application's routing logic.
  
- **React.js:** A JavaScript library for building user interfaces, particularly single-page applications (SPAs). The frontend of this app is built using React.js to deliver an interactive and responsive user experience.
  
- **Node.js:** JavaScript runtime environment that allows developers to run JavaScript code on the server-side. In this project, Node.js is used to run the backend server, interact with the database, and handle business logic.

### API Dependencies

EdenFood leverages several third-party API services to enhance its functionality and provide a seamless user experience. These dependencies include:

- **Mailgun**: Mailgun is used for email services, primarily for sending order confirmations, delivery notifications, and other transactional emails to users, ensuring effective communication and reporting.
  
- **Cloudinary**: Cloudinary is a cloud-based image and video management platform that EdenFood utilizes for storing and optimizing product images, seller profile pictures, and other visual assets, ensuring fast and reliable delivery of media content.
  
- **PayPal**: EdenFood integrates with PayPal's payment gateway to facilitate secure online transactions, allowing users to conveniently purchase products from various sellers using their PayPal accounts or credit cards.
  
- **Google Maps Platform**: EdenFood leverages the Google Maps Platform to display pickup locations for sellers, enabling users to easily locate and navigate to their preferred pickup points for self-collection orders.

## Installation
1. Ensure that you have [Node.js](https://nodejs.org/en) installed, and that you have a [MongoDB Atlas](https://www.mongodb.com/atlas/database), [Cloudinary](https://cloudinary.com/), [Google Console](console.cloud.google.com/), [Mailgun](https://www.mailgun.com/), and [Paypal Developer](https://developer.paypal.com/home) accounts set up.
2.	Clone the repository to your local machine.
```bash
git clone https://github.com/tristantanjh/EdenFood.git
```
3.	Create a `.env` file in both the frontend and backend folders.
  - In the backend `.env` file, specify your port for hosting the backend server and your mongoDB Atlas database url like this:
```bash
PORT=<YOUR_PORT>
MONGO_URI=<YOUR_DATABASE_URI>
ENCRYPTION_KEY=<YOUR_ENCRYPTION_KEY> 
MAILGUN_API_KEY=<YOUR_API_KEY>
MAILGUN_DOMAIN=<YOUR_DOMAIN>
```
  - In the frontend `.env` file, specify your Cloudinary cloud name and upload preset like this:
```bash
VITE_GOOGLE_MAPS_API_KEY=<YOUR_API_KEY>
VITE_CLOUDINARY_CLOUD_NAME=<YOUR_CLOUD_NAME>
VITE_CLOUDINARY_UPLOAD_PRESET=<YOUR_UPLOAD_PRESET>
VITE_PAYPAL_CLIENT_ID=<YOUR_CLIENT_ID>
```
<sup>You can also follow the example `.env` file given in both frontend and backend folders.</sup>

4.	`cd` into both frontend and backend folders and run `npm i` on both.
5.	After these steps, do `npm run dev` in both the frontend and backend folders to start the servers.
6.   Visit `http://localhost:5173` to explore the application! 

## Contributions
Contributions to EventHub are welcome and appreciated! Here's how you can contribute:

- **Bug Reports:** If you encounter any bugs or issues while using EventHub, please open a new issue on the GitHub repository. Be sure to provide detailed information about the problem you're experiencing, including steps to reproduce it.
  
- **Feature Requests:** Have an idea for a new feature or improvement? Feel free to suggest it by opening a new issue on GitHub. We value your feedback and are always looking for ways to enhance EventHub.
  
- **Code Contributions:** If you're interested in contributing code to EventHub, you can fork the repository, make your changes, and submit a pull request. Please ensure that your code follows the project's coding standards and guidelines.
  
- **Documentation:** Improving documentation is another valuable way to contribute. If you notice any errors or outdated information in the documentation, or if you'd like to add new sections or examples, please submit a pull request with your changes.
  
- **Testing:** Help us ensure the stability and reliability of EventHub by testing new features, bug fixes, and updates. You can report any issues you encounter during testing or provide feedback on the user experience.
  
- **Spread the Word:** Enjoy using EventHub? Spread the word to others who might benefit from it! Share your experiences on social media, forums, or with your colleagues and friends.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
