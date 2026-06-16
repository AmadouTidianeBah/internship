
# Internship Backend (NestJS)

This backend application provides an API for managing internships, user profiles, applications, reviews, and companies. It is built with NestJS and uses PostgreSQL for database management. This document provides an overview of the application, focusing on the user, company, internship, application, and review modules.

## Features

- **User Authentication**: Register and login using JWT.
- **Profile Management**: Manage student and company representative profiles.
- **Company Management**: Post and manage company profiles.
- **Internship Management**: Post and manage internship listings.
- **Application Management**: Students can apply to internships; companies can manage applicants.
- **Review System**: Students can leave reviews for completed internships.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [User](#user)
  - [Company](#company)
  - [Internship](#internship)
  - [Application](#application)
  - [Review](#review)

## Technologies Used

- **Node.js**
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript.
- **PostgreSQL**: A relational database.
- **JWT**: For authentication.

## Database Schema

### Users Table
Stores basic user information.

| Column     | Type                | Description                     |
|------------|---------------------|---------------------------------|
| id         | UUID (Primary Key)   | Unique identifier for the user. |
| email      | VARCHAR(255)         | User's email (unique).          |
| password   | VARCHAR(255)         | Hashed password.                |
| role       | ENUM('student', 'company') | Defines if user is a student or company. |
| created_at | TIMESTAMP            | Timestamp of user creation.     |
| updated_at | TIMESTAMP            | Timestamp of last update.       |

### Profiles Table
Holds additional user profile details.

| Column        | Type                | Description                     |
|---------------|---------------------|---------------------------------|
| id            | UUID (Primary Key)   | Unique identifier for the profile. |
| user_id       | UUID (Foreign Key)   | References `users.id`.          |
| first_name    | VARCHAR(255)         | First name.                     |
| last_name     | VARCHAR(255)         | Last name.                      |
| phone         | VARCHAR(15)          | Contact phone number.           |
| bio           | TEXT                 | Bio or description.             |
| linkedin_url  | VARCHAR(255)         | LinkedIn profile link.          |
| github_url    | VARCHAR(255)         | GitHub profile link.            |
| created_at    | TIMESTAMP            | Timestamp of profile creation.  |
| updated_at    | TIMESTAMP            | Timestamp of last update.       |

### Companies Table
Stores details about registered companies.

| Column        | Type                | Description                     |
|---------------|---------------------|---------------------------------|
| id            | UUID (Primary Key)   | Unique identifier for the company. |
| user_id       | UUID (Foreign Key)   | References `users.id`.          |
| name          | VARCHAR(255)         | Company name.                   |
| description   | TEXT                 | Company description.            |
| website       | VARCHAR(255)         | Company website link.           |
| location      | VARCHAR(255)         | Company location.               |
| created_at    | TIMESTAMP            | Timestamp of company creation.  |
| updated_at    | TIMESTAMP            | Timestamp of last update.       |

### Internships Table
Stores information about internships posted by companies.

| Column        | Type                | Description                     |
|---------------|---------------------|---------------------------------|
| id            | UUID (Primary Key)   | Unique identifier for the internship. |
| company_id    | UUID (Foreign Key)   | References `companies.id`.      |
| title         | VARCHAR(255)         | Internship title.               |
| description   | TEXT                 | Detailed description of the internship. |
| requirements  | TEXT                 | Requirements for the internship. |
| location      | VARCHAR(255)         | Location of the internship.     |
| duration      | VARCHAR(100)         | Duration (e.g., "3 months").    |
| created_at    | TIMESTAMP            | Timestamp of internship creation. |
| updated_at    | TIMESTAMP            | Timestamp of last update.       |

### Applications Table
Tracks student applications for internships.

| Column        | Type                | Description                     |
|---------------|---------------------|---------------------------------|
| id            | UUID (Primary Key)   | Unique identifier for the application. |
| user_id       | UUID (Foreign Key)   | References `users.id`.          |
| internship_id | UUID (Foreign Key)   | References `internships.id`.    |
| status        | ENUM('pending', 'accepted', 'rejected') | Status of the application. |
| resume        | VARCHAR(255)         | URL to resume file.             |
| cover_letter  | TEXT (Optional)      | Cover letter text.              |
| applied_at    | TIMESTAMP            | Timestamp of application.       |

### Reviews Table
Stores reviews from students about completed internships.

| Column        | Type                | Description                     |
|---------------|---------------------|---------------------------------|
| id            | UUID (Primary Key)   | Unique identifier for the review. |
| user_id       | UUID (Foreign Key)   | References `users.id`.          |
| internship_id | UUID (Foreign Key)   | References `internships.id`.    |
| rating        | INTEGER              | Rating (e.g., 1-5).             |
| comment       | TEXT                 | Review comment.                 |
| created_at    | TIMESTAMP            | Timestamp of review submission. |

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AmadouTidianeBah/intership_backend.git
   cd internship-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL and configure environment variables (see [Environment Variables](#environment-variables)).

4. Run database migrations:
   ```bash
   npm run typeorm:migration:run
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

To start the application:

```bash
npm run start
```

To start the application in development mode with hot reloading:

```bash
npm run start:dev
```

## API Endpoints

### Auth

- `POST /auth/register`: Register a new user (student or company).
- `POST /auth/login`: Log in and receive a JWT token.

### User

- `GET /user/profile`: Get the authenticated user’s profile.
- `PUT /user/profile`: Update the authenticated user’s profile.

### Company

- `GET /company/profile`: Get the authenticated company’s profile.
- `PUT /company/profile`: Update the authenticated company’s profile.
- `GET /company`: List all registered companies.

### Internship

- `POST /internship`: Post a new internship (company only).
- `GET /internship`: List all internships.
- `GET /internship/:id`: Get details of a specific internship.
- `PUT /internship/:id`: Update an internship (company only).
- `DELETE /internship/:id`: Delete an internship (company only).

### Application

- `POST /application`: Apply to an internship (student only).
- `GET /application/user`: Get all applications made by the authenticated user.
- `GET /application/internship/:id`: Get all applications for a specific internship (company only).
- `PUT /application/:id/status`: Update the status of an application (company only).

### Review

- `POST /review`: Submit a review for an internship (student only).
- `GET /review/internship/:id`: Get all reviews for a specific internship.

This documentation provides an overview of the application and its core functionalities. The admin features and notification module are excluded from this scope.
