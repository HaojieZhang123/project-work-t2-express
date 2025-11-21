# E-commerce Backend API

## Introduction

This project serves as the **Backend API** for a full-stack E-commerce application. It is built using **Node.js** and **Express**, providing a robust and scalable foundation for managing products, orders, and customer interactions. The API is designed to work seamlessly with a frontend application, handling data persistence via **MySQL** and transactional emails using **Nodemailer**.

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (using `mysql2` driver)
- **Email Service**: Nodemailer
- **Utilities**: `dotenv` for environment management, `cors` for cross-origin resource sharing.

## Features

- **Product Management**: Retrieve product lists, search by name, view details by slug, and access special collections like "Best Sellers" and "Latest Products".
- **Order Processing**: comprehensive order creation flow that handles customer details, shipping costs, and promo codes.
- **Email Notifications**: Automated order confirmation emails sent to both the customer and the vendor using SMTP.
- **Promo Code System**: Validate and apply promotional codes to orders.
- **Categorization**: Filter and organize products by Brands and Categories.
- **Related Products**: Intelligent suggestion of related products based on brand and category.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **MySQL Server**

## Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone https://github.com/HaojieZhang123/project-work-t2-express.git
    cd project-work-t2-express
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and configure the following variables:

    ```env
    SERVER_PORT=3000
    FE_APP=http://localhost:5173  # URL of the frontend application

    # Database Configuration
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=your_database_name

    # Email Configuration (Gmail Example)
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    ```

4.  **Database Setup**
    Ensure your MySQL server is running and the database schema is imported. If a SQL dump is provided in the `data` folder, import it:

    ```bash
    mysql -u root -p your_database_name < data/schema.sql
    ```

5.  **Run the Server**
    Start the server in development mode with hot-reloading (Node.js 18+):
    ```bash
    npm run watch
    ```
    Or start it normally:
    ```bash
    npm start
    ```

## API Endpoints

### Products (`/api/products`)

| Method | Endpoint                   | Description              | Parameters / Body | Technique                                                              |
| :----- | :------------------------- | :----------------------- | :---------------- | :--------------------------------------------------------------------- |
| `GET`  | `/`                        | List all products        | -                 | SQL `JOIN`s to fetch brand and category names.                         |
| `GET`  | `/search`                  | Search products          | `?name=query`     | Uses SQL `LIKE` operator for partial matching.                         |
| `GET`  | `/:slug`                   | Get product details      | -                 | Retrieval by unique slug for SEO-friendly URLs.                        |
| `GET`  | `/:slug/related`           | Get related products     | -                 | Logic to find products with same Brand or Category, excluding current. |
| `GET`  | `/special/best-sellers`    | Get top selling products | -                 | Orders by `sold` count descending.                                     |
| `GET`  | `/special/latest-products` | Get newest products      | -                 | Orders by `added_date` descending.                                     |

### Orders (`/api/orders`)

| Method | Endpoint        | Description        | Parameters / Body                                                                                                    | Technique                                                                                              |
| :----- | :-------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `POST` | `/withproducts` | Create a new order | JSON Body: `{ name, surname, email, phone, address, promoCodeId, shippingCost, products: [{product_id, quantity}] }` | Transactional logic: Inserts Order first, retrieves `insertId`, then inserts related `order_products`. |

### Email (`/api/send`)

| Method | Endpoint | Description             | Parameters / Body                                    | Technique                                                                                      |
| :----- | :------- | :---------------------- | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `POST` | `/`      | Send order confirmation | JSON Body: `{ name, surname, email, products, ... }` | **Nodemailer**: Generates HTML email with order summary and sends to both Customer and Vendor. |

### Promo Codes (`/api/promo_codes`)

| Method | Endpoint | Description           | Parameters / Body | Technique                                                    |
| :----- | :------- | :-------------------- | :---------------- | :----------------------------------------------------------- |
| `GET`  | `/`      | List all promo codes  | -                 | -                                                            |
| `GET`  | `/:code` | Validate a promo code | -                 | Returns code details if valid, used for frontend validation. |

### Brands & Categories

| Method | Endpoint          | Description         | Parameters / Body | Technique |
| :----- | :---------------- | :------------------ | :---------------- | :-------- |
| `GET`  | `/api/brands`     | List all brands     | -                 | -         |
| `GET`  | `/api/categories` | List all categories | -                 | -         |

## Project Structure

The project follows the **MVC (Model-View-Controller)** architectural pattern:

- **`app.js`**: Entry point, configures middlewares and routes.
- **`routers/`**: Defines API endpoints and maps them to controllers.
- **`controllers/`**: Contains the business logic for handling requests and interacting with the database.
- **`data/`**: Database connection configuration.
- **`middlewares/`**: Custom error handling and 404 middlewares.
