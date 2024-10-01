# Delivery App: Exploring Microservices with Docker and Kubernetes

This project is my attempt to build a delivery app as a way to learn about microservices architecture and gain hands-on experience with technologies like Docker and Kubernetes. By breaking the app into smaller, independent services, I’m exploring how to make it scalable, resilient, and efficient with load balancing.

## Setup Guide

I’ll provide a complete setup guide when I have some time.

## Installation

To set up the project locally, follow these steps:

1. Ensure that Docker and Kubernetes are installed on your machine.
2. Clone the repository:
    ```
    git clone https://github.com/Singh-Govind/delivery-microservice.git
    cd delivery-microservice
    ```

- If you want to use Docker Compose to run all the containers, you’ll need to configure the environment variables in the Docker Compose file, which I’ll update when I have time.

3. Ensure Docker is running, then build all the images and push them to your Docker Hub account.
4. Update the `deployment.yaml` file to change the image username to your Docker Hub username:
    ```
    <your-username>/user-service:latest
    <your-username>/store-service:latest
    <your-username>/delivery-service:latest
    ```

5. Get Minikube's IP by running:
    ```
    minikube ip
    ```

6. Update the `deployment.yaml` file to replace instances of the IP like this:
    ```
    mongodb://<your-minikube-ip>:30004
    ```

7. Apply the changes using the following `kubectl` commands:
    ```
    kubectl apply -f persistent-volumes.yaml
    kubectl apply -f deployment.yaml
    kubectl apply -f services.yaml
    ```

8. To access the app, just forward a port for now:
    ```
    kubectl port-forward service/api-gateway 3000:3000
    ```

   Now, you can access the app at:
   ```
   http://localhost:3000
   ```