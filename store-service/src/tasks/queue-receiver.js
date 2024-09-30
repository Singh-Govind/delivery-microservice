const amqp = require("amqplib");
const { updateOrderStatus } = require("../controller/background-tasks/delivery-fulfillment");

async function receiveTask() {
    const queue = "order-status-update";

    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, {
            durable: true,
        });

        channel.consume(
            queue,
            (msg) => {
                const task = JSON.parse(msg.content.toString());
                console.log(" [x] Received %s", task);

                updateOrderStatus(task);
                
                channel.ack(msg);
                console.log(" [x] Done");
            },
            {
                noAck: false, // Ensure that messages are acknowledged
            }
        );

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    } catch (error) {
        console.error("Error receiving task:", error);
    }
}

receiveTask();
