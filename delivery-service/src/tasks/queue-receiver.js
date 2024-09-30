const amqp = require("amqplib");
const { createDelivery } = require("../controller/background-tasks/create-deliver");

async function receiveTask() {
    const queue = "create-order";

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

                createDelivery(task);

                console.log(" [x] Done");
                channel.ack(msg); // Acknowledge that the message has been processed
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
