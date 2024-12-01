# FINAL-PROJECT-ECO-MONIE-
Project Description: A waste to wealth application.
Project Title: : ECOMONIE APPLICATION.
Overview: ECOMONIE is an environmental sustainability application, designed to connect waste generators to waste collectors for efficient waste management.
The application aims to incentivize environmental friendly habits in waste management, tying it to an Ecomonie coin, which can be utilized for social products in education, healthcare, transportation
and access to capital. Ecomonie app allows users to register, connect with waste collectors, schedule a plan, accumulate ECOMONIE coins and track their environmental integrity actions.
Built using HTML, CSS, and JavaScript for the frontend, with a Node.js and MySQL backend, Ecomonie offers a seamless user experience while ensuring wealth generation, environmental sustainability,
through efficient waste management system.

Key Features:
User Authentication and Plan Management:
Registration and Login: Secure user registration and login system, with plan-based access control for users and collectors. Profile Management: Users can manage their profiles, update personal information, earn or spend their accumulated coin, and track their environmental integrity score. 

Waste Collection and Management:
Waste Collection: Users can schedule waste collection with their preferred collectors, and track the collection status.
Waste Management: Collectors can manage their waste collection routes, track their earnings, and update their
profile information.

Users plan:
Available collectors: Users can view collectors' availability and book their plan directly through the application.
Plan Management: Users can schedule emergency pickup, change their plan, or cancel existing plans, and receive notifications about their preferences.
Ratings: Users can rate collectors effectiveness.

Collectors Management:
Specialization and Availability: Collectors can manage their availability, specializations, and plan schedulling, ensuring users have up-to-date information when choosing their plan. Collectors can rate users environmental actions. 
Consultation Services: The application allows for virtual consultations through a secure communication channel.

Admin management:
Admin can update users coin, manage coin exchanges, give ratings, stop a plan, manage users, collectors and pickup schedules. 

User-Friendly Interface:
Responsive Design: The application features a clean, responsive design that ensures a seamless experience across all devices. 
Intuitive Navigation: Easy-to-use interface with clear navigation paths for all users, whether they are buying a plan or managing their collector profile.

Security and Compliance:
Data Security: Implementation of HTTPS, JWT-based authentication, and data encryption to protect user information. 
Compliance: Adherence to healthcare standards and regulations, ensuring that user data is handled with the utmost confidentiality.

Project Title: Hands-on Project: ECOMONIE APPLICATION
Objective:
The objective of this PROJECT is to practicalize PLP learning with practical experience in integrating the frontend and the backend of a web application using Node.js and Express. 
Project team will build the backend of the telemedicine application that includes Users management, Plan scheduling, collector pickup, and user authentication for clients. 
This project will help students understand how to create a rest api, perform CRUD operations, manage user authentication, and handle data securely and efficiently.

Project Overview:
In this Project, TEAM will design and develop the backend ECOMONIE application. The application will allow USERS to create accounts, log in, schedule plan, and manage their profiles. 
Collectors will manage their schedules, and administrators will oversee the system. 
TEAM will create the necessary database tables, set up an Express.js server, implement user authentication, and integrate core functionalities.

Project Requirements:
Node.js and Express Setup:

Express Application:
Set up an Express.js project structure.
Implement routing for different parts of the application (e.g., /Users, /Collectors, /plans, /Rewards, /admin).
User Management and Authentication:

Users Registration and Login:

Registration: Allow Users to create an account by providing their personal details and setting a password. Store passwords securely using hashing (e.g., bcrypt).
Login: Implement a login system that authenticates Users using their email and password. Upon successful login, start a plan for the user.
Profile Management: Allow logged-in Users to view and update their profile information (excluding their email and password).
plan Management:

Use session cookies to manage users sessions.
Implement session-based authentication to protect routes that require login (e.g., booking a plan, viewing collection history).
Provide a logout functionality that ends the users plan.
Core Features Implementation:

User Management:

Create: Users can register and create an account.
Read: Display a list of Users (admin only), with search and filter options.
Update: Users can update their profile information.
Delete: Implement a feature for Admin to delete users accounts.

Collector Management:

Create: Admin can add new Collectors, including their plans.
Read: Display a list of Collectors with their services and availability.
Update: Allow Collectors or admin to update plans or profile information.
Delete: Implement a feature to deactivate or delete Collector's profiles.
Choosing plan:

Create: Users can choose a plan by selecting a collector, date, and time.
Read: Display a list of scheduled pickups for users and collectors.
Update: Allow Users to reschedule or cancel pickups.
Delete: Allow User to cancel pickup, updating the status to "canceled."
Interactivity and User Experience:

Provide real-time feedback for form submissions (e.g., success messages, error handling).