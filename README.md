# **Clothes by Freeman - eCommerce Website**

## **GitHub Repositories**

- **Code**: [GitHub Repository](https://github.com/baofreeman/FINAL-CLOTHES-SHOP-ECOMMERCER)

## **Live Demo**

- [Visit the Live Site](https://clothes-freeman.store)

## **Project Overview**

"Clothes by Freeman" is a comprehensive eCommerce platform designed specifically for fashion retail. This personal project aims to provide a full suite of functionalities expected from a modern online store.

## **Swagger Documentation**

This project uses Swagger to provide API documentation. You can access the API documentation to better understand the available endpoints and how to interact with the API.

- **API Documentation (Live)**: [Swagger UI](https://clothes-freeman.store/api-docs)

To view Swagger documentation locally, run the application and go to:

- **API Documentation (Local)**: [Swagger UI Local](http://localhost:8000/api-docs)

## **Figma Design**

The user interface design for this project is done on Figma. You can view the full design and detailed screens by following the link below:

- **Figma Design Link**: [Figma Project](https://www.figma.com/design/cV2YXePQ9UFJtCs0iFRA6i/clothes?node-id=0-1&node-type=CANVAS&t=TeXmGAiHsoMv7fIi-0)

## **Team Size**

- **1 Developer** (Personal Project)

## **Technologies Used**

### **Frontend**

- **Languages & Frameworks**: HTML, CSS, JavaScript, React JS, React Router, Redux Toolkit
- **Design**: Figma
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form

### **Backend**

- **Framework**: Express.js
- **Authentication**: JSON Web Token (JWT)
- **File Handling**: Multer for file uploads
- **Image Storage**: Cloudinary
- **API Documentation**: Swagger

### **Database**

- **Service**: MongoDB Atlas with Mongoose ODM

### **Docker**

- **Containerization**: Docker, Docker Compose

### **Deployment**: Docker, Nginx, EC2, Certbot for SSL

## **Key Features**

### **Frontend**

- **User Authentication**: Secure user sessions with features such as login, logout, email verification, password reset, and password change.
- **API Integration**: Seamless communication with backend APIs for data retrieval and manipulation.
- **Admin Panel**: A robust admin dashboard to manage products, users, and orders (Add, Edit, Delete, Update).
- **Shopping Cart**: Allows users to add products to their cart and proceed with the checkout process.
- **Order Management**: Users can place orders and review their order history.
- **Product Search and Filtering**: Search functionality with filters for product variants such as size and color.
- **Responsive Design**: Optimized for both mobile and desktop devices to provide a consistent user experience across all platforms.

### **Backend**

- **Secure Authentication**: Implements access tokens and refresh tokens for enhanced security.
- **RESTful APIs**: Provides robust APIs for managing products, users, and orders.
- **Image Upload**: Supports efficient image uploads with Multer, utilizing Cloudinary for storage.
- **Advanced Search and Filtering**: Comprehensive search and filter options through APIs to improve product discovery.
- **Geolocation Data**: Integrates with third-party APIs to fetch detailed geographical data (provinces and districts in Vietnam).

## **Deployment and Containerization**

This project leverages Docker and Gitflow to streamline the development and deployment processes for both the frontend and backend.

### **Docker Containerization**

- **Consistent Environments**: Both the frontend and backend of the project are containerized using Docker, ensuring that the application runs consistently across different environments, from development to production.
- **Docker Compose**: Docker Compose is used to manage multiple containers efficiently. It orchestrates the containers for the client (`frontend`) and server (`backend`) directories, simplifying the process of building, running, and managing the application as a whole.

### **Gitflow Deployment Workflow**

- **Structured Development**: The project follows the Gitflow branching model to organize and streamline the development process. This approach facilitates better collaboration and continuous integration/delivery (CI/CD) practices by using feature branches, release branches, and pull requests.
- **Automated Deployment to EC2**: The deployment to EC2 is automated using the CI/CD pipeline, which integrates with GitHub Actions. This ensures that every change that gets merged into the main branch is automatically tested, built, and deployed to the EC2 instance without manual intervention.

## **How to Run the Project Locally**

### **Frontend Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/baofreeman/FINAL-CLOTHES-SHOP-ECOMMERCER.git

   ```

2. Navigate to the project directory:

   ```bash
   cd clothes

   ```

3. Install the dependencies:

   ```bash
   npm install

   ```

4. Start the development server:

   ```bash
   npm start

   ```

### **Backend Setup**

2. Navigate to the backend directory:

   ```bash
   cd clothes/backend

   ```

3. Install the dependencies:

   ```bash
   npm install

   ```

4. Set up environment variables (e.g., MongoDB URI, JWT secret, Cloudinary credentials).

5. Start the backend server:

   ```bash
   npm run dev
   ```

Running with Docker
To make development and deployment easier, you can use Docker to containerize the application.

1. Ensure Docker and Docker Compose are installed on your machine.

2. Clone the repository:

   ```bash
   git clone https://github.com/baofreeman/FINAL-CLOTHES-SHOP-ECOMMERCER.git

   ```

3. Navigate to the project directory:

   ```bash
   cd clothes

   ```

4. Build and start the Docker containers:

   ```bash
   docker compose up --build

   ```

5. Access the application:

   - **Frontend**: Open http://localhost:3000 in your web browser.
   - **Backend**: The backend server will be running on http://localhost:8000.

6. Stop the Docker containers:

   ```bash
   docker compose down
   ```

## **Contribution**

This is a personal project, but feel free to fork the repository and contribute.

---

**Thank you for visiting!**
