<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">BitDeposit Backend Application</h1>

<p align="center">
  A backend application built with the <a href="http://nestjs.com/" target="_blank">NestJS</a> framework for managing deposits, transactions, and user accounts efficiently.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

---

## 📖 Overview

The **BitDeposit Backend Application** is a scalable and modular backend system designed to handle deposits, transactions, and user account management. Built with [NestJS](https://nestjs.com/), it leverages modern development practices to ensure performance, security, and maintainability.

---

## 🚀 Features

- **Modular Architecture**: Clean and scalable structure for easy feature addition.
- **Database Integration**: Uses Prisma ORM for database management.
- **Authentication**: Secure user authentication with JWT.
- **RESTful APIs**: Well-documented APIs using Swagger.
- **File Management**: Integration with AWS S3 for file uploads.
- **Admin Panel**: AdminJS for managing backend operations.
- **Docker Support**: Containerized deployment for consistent environments.

---

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: AWS S3
- **Containerization**: Docker
- **Logging**: Winston Logger

---

## 🛠 Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bitdeposit-backend-app.git
   cd bitdeposit-backend-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the required variables (e.g., database URL, JWT secret, AWS credentials).

---

## 🚀 Usage

Run the application in different modes:

```bash
# Development mode
npm run start

# Watch mode (auto-restart on changes)
npm run start:dev

# Production mode
npm run start:prod
```

---

## ⚙️ Configuration

The application requires the following environment variables:

- `NODE_ENV`: Application environment (e.g., development, production).
- `PORT`: Port number for the server.
- `DATABASE_URL`: Connection string for the database.
- `JWT_SECRET`: Secret key for JWT authentication.
- `AWS_ACCESS_KEY_ID`: AWS access key for S3.
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for S3.
- `AWS_BUCKET_NAME`: AWS S3 bucket name.

---

## 📚 API Endpoints

The API documentation is available via Swagger. Once the app is running, visit:

```
http://localhost:<PORT>/api
```

---

## 🧪 Testing

Run tests to ensure the application works as expected:

```bash
# Unit tests
npm run test

# End-to-end (e2e) tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🚀 Deployment

To deploy the application using Docker:

1. Build the Docker image:
   ```bash
   docker build -t bitdeposit-backend-app .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 bitdeposit-backend-app
   ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Acknowledgements

Special thanks to the [NestJS](https://nestjs.com/) team for their amazing framework and community support.