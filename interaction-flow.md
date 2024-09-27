# Interaction Flow

## User Places an Order:

1. **Client**: The user interacts with the front-end application (web or mobile) to place an order.
2. **API Gateway**: The request is sent to the API Gateway.

### API Gateway to User Service:

- **Call**: The API Gateway forwards the request to the User Service to authenticate the user and retrieve user information (e.g., user ID).

### User Service to API Gateway:

- **Response**: The User Service returns the user information back to the API Gateway.

## Order Creation:

1. **API Gateway to Order Service**: The API Gateway then forwards the order creation request to the Order Service, including the user information and order details (e.g., items, quantity).
2. **Order Service to Store Service**:

   - **Call**: The Order Service checks with the Store Service to confirm product availability and retrieve store details.

### Store Service to Order Service:

- **Response**: The Store Service responds with the availability status and any necessary details (e.g., estimated preparation time).

## Order Confirmation:

1. **Order Service to Message Broker**: If the order is confirmed, the Order Service sends a message to the Message Broker indicating that a new order has been placed.

## Delivery Boy Notification:

1. **Delivery Service Subscribes**: The Delivery Service subscribes to the Message Broker and receives the new order message.
2. **Call**: The Delivery Service then queries the available delivery personnel.

## Delivery Personnel Accepts Order:

1. **Delivery Service to Delivery Personnel**: The Delivery Service notifies available delivery personnel (e.g., via a mobile app or web notification) about the new order.
2. The delivery person accepts the order.

### Delivery Service to Store Service:

- **Call**: The Delivery Service requests the Store Service to prepare the order for pickup.

### Store Service to Delivery Service:

- **Response**: The Store Service confirms the order is ready for pickup and sends a notification through the Message Broker.

## Pickup Confirmation:

1. **Delivery Service to Message Broker**: The Delivery Service updates the order status to indicate that the delivery person has picked up the order, sending this update via the Message Broker.

## Delivery to User:

1. **Delivery Service to User**: The delivery personnel then deliver the order to the user. The Delivery Service updates the order status accordingly.
2. **Message Broker to Notification Service**: The Delivery Service sends a notification to the Notification Service, which sends an update to the user about the delivery status (e.g., order out for delivery, delivered).

## Payment Processing:

1. **API Gateway to Payment Service**: After order confirmation, the Order Service may trigger a call to the Payment Service to process payment.
2. **Payment Service to API Gateway**: The Payment Service processes the payment and sends the confirmation back to the API Gateway, which may notify the user via the Notification Service.

## Feedback Loop:

1. **User to Delivery Service**: After the order is delivered, the user can provide feedback through the front-end application, which sends this information back to the API Gateway, then to the Delivery Service for processing.

# Summary of Interactions

- **API Gateway**: Acts as the central point of communication for all client requests, routing them to the appropriate services.
- **User Service**: Handles user authentication and profile management.
- **Order Service**: Manages order creation and updates, interacts with the Store Service for order availability.
- **Store Service**: Responsible for inventory and order preparation.
- **Delivery Service**: Manages the logistics of delivering orders and communicates with delivery personnel.
- **Message Broker**: Facilitates asynchronous communication between services, allowing them to publish and subscribe to events without being tightly coupled.
- **Notification Service**: Sends notifications to users based on events occurring in the system (e.g., order status updates).
- **Payment Service**: Handles payment processing and confirmation.
