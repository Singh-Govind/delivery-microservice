const amqp = require('amqplib');

async function sendTask(msg) {
  const queue = 'create-order';

  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    await channel.assertQueue(queue, {
      durable: true 
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
      persistent: true 
    });

    console.log(" [x] Sent %s", msg);
    
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error sending task:", error);
  }
}

module.exports = sendTask;
