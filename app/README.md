# SpringBoot3-Opentelemetry

This project demonstrates how to integrate OpenTelemetry for tracing, metrics, and logging in a Spring Boot application with a React.js frontend. All traces and metrics from the Spring Boot application are forwarded to OpenTelemetry, which exports them to Jaeger and Prometheus for visualization and monitoring.

### Key Components
- **Spring Boot Application (java-app)**: The backend service exposed via a REST API.
- **React Application (react-app)**: The frontend service that communicates with the Spring Boot application.
- **Jaeger**: Distributed tracing system for visualizing application traces.
- **Prometheus**: Open-source system monitoring and alerting toolkit.

## Prerequisites

Before starting, make sure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To run this project, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/ysoni-redhat/SpringBoot3-Opentelemetry.git
cd SpringBoot3-Opentelemetry/
```

### 2. Build the Spring Boot application
The target folder is created after building the Spring Boot application.
```bash
mvn clean package
```

### 3. Start the Docker containers
Now, use Docker Compose to build and start the containers for the Spring Boot app, React app, Jaeger, and Prometheus:
```bash
sudo docker-compose up --build -d
```
The docker-compose.yml file defines four services:
* **java-app**: The backend Spring Boot application along with Opentelemetry service.
* **jaeger**: The Jaeger instance for tracing.
* **react-app**: The frontend React application.
* **prometheus**: The Prometheus instance for monitoring

### 4. Verify the containers are running
Check the status of the containers:
```bash
sudo docker-compose ps
```

You should see output similar to this:
```bash
Name                 Command               State                        Ports
-----------------------------------------------------------------------------------------------------
jaeger      /go/bin/all-in-one-linux         Up      14250/tcp, 14268/tcp,                           
                                                     0.0.0.0:16686->16686/tcp,:::16686->16686/tcp,   
                                                     4317/tcp,                                       
                                                     0.0.0.0:4318->4318/tcp,:::4318->4318/tcp,       
                                                     9411/tcp                                        
java-app    java -Dotel.exporter.otlp. ...   Up      0.0.0.0:7093->7093/tcp,:::7093->7093/tcp        
react-app   docker-entrypoint.sh npm start   Up      0.0.0.0:3000->3000/tcp,:::3000->3000/tcp      
```

### 5. Access the services
Once the containers are up and running, you can access the following services:
- Spring Boot Application (Backend): http://localhost:7093
- React Application (Frontend): http://localhost:3000
- Jaeger (Distributed Tracing): http://localhost:16686
- Prometheus (Monitoring): http://localhost:9090

