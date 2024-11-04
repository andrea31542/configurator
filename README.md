# Konfigurator servisa - README

This project is a fully completed service configurator designed for a job assignment. In this project, we aimed to develop a simple, responsive web application based on designs created in Figma and provided specifications.

## Introduction

This guide walks you through setting up and running the Konfigrator servisa app on your machine. You can run it directly in your local environment or use Docker for a containerized setup.

## Technologies Used

- **Next.js:** Framework for React-based applications, enabling server-side rendering and static site generation.
- **TypeScript:** Typed superset of JavaScript, providing static typing and enhanced code quality.
- **Zustand:** A small, fast, and scalable state management solution for React applications.
- **Axios:** For API calls, providing a promise-based HTTP client for making requests (or you can use the native fetch API).

## Requirements

Before you begin, make sure the following are installed on your system:

- Git for version control
- Node.js and npm (for running locally)
- Docker and Docker Compose (if using Docker)

These keys should be provided as environment variables when running the app, either through a .env file or directly in your Docker configuration. For development purposes, a default key has been set and saved in the environment. Refer to the
**[Running the Application with Docker](#running-the-application-with-docker)** section for more details on how to set up these variables.

## Installation and running

### Step 1: Clone the Repository

To set up the Konfigurator servisa application on your local machine, follow these steps:

1. **Open your terminal** and navigate to the directory where you want to clone the application.

   - You can use the `cd` command to change directories, for example:
     ```bash
     cd path/to/your/directory
     ```

2. **Run the following command to clone the repository:**

   ```bash
   git clone https://github.com/andrea31542/configurator
   ```

### Step 2: Navigate to the Project Directory

After cloning the repository, change to the cloned repository directory by running the following command:

```bash
cd configurator

```

### Step 3: Install the Necessary Dependencies

Once you are in the project directory, install the required dependencies by running the following command:

```bash
npm install
```

### Step 4: Run the Application

After the dependencies have been successfully installed, you can start the application by running the following command:

```bash
npm run dev
```

### Step 5: Open the Application

After the dependencies have been successfully installed, you can open the application by running the following command:

```bash
npm run dev
```

### Step 6: Terminate the Application

To stop the application, press `Ctrl + C` in the terminal where the application is currently running.

## Running the Application with Docker

### Docker Requirements

- Create Dockerfile

| Command                 | Description                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `FROM node:18-alpine`   | Specifies the base image for the container, using Node.js version 18 on Alpine Linux. |
| `WORKDIR /app`          | Sets the working directory inside the container to `/app`.                            |
| `COPY package*.json ./` | Copies the `package.json` and `package-lock.json` files into the container.           |
| `RUN npm install`       | Installs the dependencies listed in the `package.json` file.                          |
| `COPY . .`              | Copies the rest of the application code into the `/app` directory.                    |
| `RUN npm run build`     | Builds the Next.js application for production.                                        |
| `EXPOSE 3000`           | Exposes port 3000, which is used by the application.                                  |
| `CMD ["npm", "start"]`  | Specifies the command to start the application when the container runs.               |

### Usage Notes

- **WORKDIR**: This directive sets the working directory where all subsequent commands will run, ensuring that file paths are correctly referenced.
- **COPY**: This command is used multiple times to transfer files from the host machine into the container. The `package*.json` pattern ensures that both the `package.json` and `package-lock.json` are copied.
- **RUN**: Each `RUN` command executes a command inside the container. The first `RUN` installs dependencies, and the second `RUN` builds the application.
- **EXPOSE**: This is a documentation feature that informs users which port the application will use, though it doesn’t actually publish the port itself.
- **CMD**: The command specified here will run when the container starts, launching the application in production mode.

## Docker Compose File Configuration

To run your application with Docker Compose, create a `docker-compose.yml` file in the root directory of your project with the following content:

```yaml
version: '3.8'

services:
  configurato:
    image: configurator
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=${NODE_ENV}
      - NEXT_PUBLIC_APP_AUTHENTICATION_HEADER=${NEXT_PUBLIC_APP_AUTHENTICATION_HEADER}
```

### Step 1: Clone and Navigate to the Project

If you haven't already done so, please refer to **[Step 1: Clone the Repository](#step-1-clone-the-repository)** and **[Step 2: Navigate to the Project Directory](#step-2-navigate-to-the-project-directory)** to clone the repository and navigate to the project directory.
Once you've completed those steps, continue with the following

### Step 3: Build the Docker Image

Build the Docker image by running:

```bash
docker build -t your-custom-image-name .
```

### Step 4: Deploy the Application

Deploy the application using Docker Compose:

```bash
docker compose up -d
```

### Step 5: Access the Application

Open your web browser and go to:

```bash
http://localhost:3000
```

### Step 6: Stop the Container

To stop the Docker container, run:

```bash
docker compose stop
```

# Konfigurator servisa Application

This application provides a step-by-step interface for users to configure and submit a service request.

## Usage

The application guides users through a multi-step service configuration process, designed to be simple and user-friendly.

### 1. Welcome Screen

The application opens with a welcome screen. To begin configuring a service, click the **"Pokreni konfigurator"** button.

### 2. Details Entry

In the second step, you will be prompted to fill in personal and service-related details.

- **Required Fields**: All fields are mandatory except for "Kupon" (Promo Code) and "Napomena" (Note).
- **Promo Code**: The promo code is optional and can be applied by clicking the check button next to the input field.
- **Note**: An additional note can be provided, but it is also optional.

Once all required information is entered, click **Dalje** to proceed.

### 3. Review Service Details

In this third step, a summary of the service details is displayed, including any discounts applied if a promo code was entered.

- **Editing Data**: You can go back clicking **"Nazad"** to make any changes to the previously entered data before finalizing.

### 4. Finalizing the Service Configuration

After verifying the details, complete the configuration by clicking **"Posalji"**. This submits the configuration.

### 5. New Appointment Option

Once the process is complete, you can start a new service appointment by clicking **"Zapocni novi"** on the final screen.
