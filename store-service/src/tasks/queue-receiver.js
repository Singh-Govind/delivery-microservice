const amqp = require("amqplib");

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
                const task = msg.content.toString();
                console.log(" [x] Received %s", task);

                // Simulate task processing
                setTimeout(() => {
                    console.log(" [x] Done");
                    channel.ack(msg); // Acknowledge that the message has been processed
                }, 1000);
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
