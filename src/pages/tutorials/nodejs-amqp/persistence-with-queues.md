---
layout: tutorials
title: Persistence with Queues
summary: Demonstrates persistent messages for guaranteed delivery.
icon: I_dev_Persistent.svg
links:
    - label: QueueProducer.js
      link: /blob/master/src/QueueProducer.js
    - label: QueueConsumer.js
      link: /blob/master/src/QueueConsumer.js
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-samples/blob/master/src/pages/tutorials/nodejs-amqp/persistence-with-queues.md
---

This tutorial will show you how to send and receive persistent messages with Node.js using the [**amqp10** AMQP 1.0 compliant client](https://github.com/noodlefrenzy/node-amqp10)  and Solace messaging

At the end, this tutorial walks through downloading and running the sample from source.

## Assumptions

This tutorial assumes the following:

* You are familiar with Solace [core concepts](https://docs.solace.com/PubSub-Basics/Core-Concepts.htm).
* You have access to Solace messaging with the following configuration details:
    * Connectivity information for a Solace message-VPN configured for guaranteed messaging support
    * Enabled client username and password
    * Client-profile enabled with guaranteed messaging permissions.

One simple way to get access to Solace messaging quickly is to create a messaging service in Solace Cloud [as outlined here](https://solace.com/cloud/). You can find other ways to get access to Solace messaging below.

## Goals

The goal of this tutorial is to demonstrate how to use the [**amqp10** AMQP 1.0 compliant client](https://github.com/noodlefrenzy/node-amqp10) with Solace messaging. This tutorial will show you:

1.  How to send a persistent message to a durable queue with Solace messaging
2.  How to bind to this queue and receive a persistent message

`markdown:solaceMessaging-part1.md`
![Screenshot: Messaging Connectivity Information](../../../images/screenshots/connectivity-info-amqp.png)
`markdown:solaceMessaging-part2.md`
`markdown:amqpApi.md`

## Connecting to the Solace Messaging

The *amqp10* client uses *Promise* from the [*Bluebird* library](http://bluebirdjs.com) that is a superset of the ES6 *Promise* specification, but our tutorial examples will follow only the ES6 *Promise* specification.

In order to send or receive messages, an application that uses the *amqp10* client must start a connection to the Solace messaging AMQP service URL. The URL consists of the Solace username, password, and host name with the AMQP service port number in the form `amqp://<username>:<password>@<host:port>`

Assigning `defaultSubjects` to `false` allows the use of a slash-separated hierarchy in the queue name.

*QueueProducer.js/QueueRecevier.js*
```javascript
var AMQP = require('amqp10');

self.host = function(hostname) {
    self.hostname = hostname;
    return self;
};

var amqpClient = new AMQP.Client(AMQP.Policy.merge({
    defaultSubjects : false
}));

...
    amqpClient.connect(self.hostname).then(() => {
...
```

At this point the application is connected to Solace messaging and ready to send and receive messages.

## Sending a persistent message to a queue

In order to send a message to a queue a *Sender* needs to be created.

![Diagram: Sending Message to Queue](../../../images/diagrams/persistence-with-queues-details-2.png)

The name of the queue for sending messages is given to *Sender* when it is being created.

*QueueProducer.js*
```javascript
amqpClient.connect(self.hostname).then(()
    return amqpClient.createSender(self.queueName);
}).then((amqpSender) => {
    return amqpSender.send(message).then(() => {
```

## Receiving a persistent message from a queue

To receive a persistent message from a queue a *Receiver* needs to be created.

![Diagram: Persistence with Queues Details](../../../images/diagrams/persistence-with-queues-details-1.png)

The name of the queue for sending messages is given to *Receiver* when it is being created and it is the same as the one we send messages to.

The created *Receiver* emits events, and listener functions for at least `message` and `errorReceived` events need to be declared. A `message` event is emitted for every message recevied by the *Recevier*.

*QueueConsumer.java*
```javascript
amqpClient.connect(self.hostname).then(() => {
    return amqpClient.createReceiver(self.queueName);
}).then((amqpReceiver) => {
    amqpReceiver.on('message', (message) => {
        ...
    });
    amqpReceiver.on('errorReceived', (error) => {
        ...
    });
```


## Summary

Combining the example source code shown above results in the following source code files:

* [QueueProducer.js](https://github.com/SolaceSamples/solace-samples-amqp-nodejs/blob/master/src/QueueProducer.js)
* [QueueConsumer.js](https://github.com/SolaceSamples/solace-samples-amqp-nodejs/blob/master/src/QueueConsumer.js)

### Getting the Source

Clone the GitHub repository containing the Solace samples.

```
git clone https://github.com/SolaceSamples/solace-samples-amqp-nodejs
cd solace-samples-amqp-nodejs
```

### Running

The examples can be executed as:

```sh
node src/QueueConsumer.js amqp://<username>:<password>@<host:port>
node src.QueueProducer.js amqp://<username>:<password>@<host:port>
```

### Sample Output

Start the `QueueConsumer` so that it is up and waiting for messages.

```sh
$ node src/QueueConsumer.js amqp://<username>:<password>@<host:port>
[17:13:14] Connecting to amqp://<username>:<password>@<host:port>
[17:13:14] Waiting for messages...
```

Then run the `QueueProducer` to send the message.

```sh
$ node src/QueueProducer.js
[17:13:53] Connecting to amqp://<username>:<password>@<host:port>
[17:13:53] Sending message 'Hello world Queues!'...
[17:13:53] Message sent successfully.
[17:13:55] Finished.
```

Notice how the message is received by the `QueueConsumer`.

```sh
...
[17:13:14] Waiting for messages...
[17:13:53] Received message: 'Hello world Queues!'.
[17:13:55] Finished.
```

Now you know how to use the **amqp10** AMQP 1.0 compliant Node.js client with Solace messaging to send and receive persistent messages from a queue.