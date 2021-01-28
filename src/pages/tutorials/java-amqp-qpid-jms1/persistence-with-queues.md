---
layout: tutorials
title: Persistence with Queues
summary: Demonstrates persistent messages for guaranteed delivery.
icon: I_dev_Persistent.svg
links:
    - label: QueueProducer.java
      link: /blob/master/src/main/java/com/solace/samples/QueueProducer.java
    - label: QueueConsumber.java
      link: /blob/master/src/main/java/com/solace/samples/QueueConsumer.java
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/java-amqp-qpid-jms1/persistence-with-queues.md

---

This tutorial builds on the basic concepts introduced in the [publish/subscribe tutorial](../publish-subscribe/), and will show you how to send and receive persistent messages from Solace messaging queue in a point to point fashion.

At the end, this tutorial walks through downloading and running the sample from source.

This tutorial focuses on using a non-Solace JMS API implementation. For using the Solace JMS API see [Solace Getting Started JMS Tutorials](../../solace-samples-jms/).

## Assumptions

This tutorial assumes the following:

* You are familiar with Solace [core concepts](https://docs.solace.com/PubSub-Basics/Core-Concepts.htm).
* You have access to Solace messaging with the following configuration details:
    * Connectivity information for a Solace message-VPN configured for guaranteed messaging support
    * Enabled client username and password
    * Client-profile enabled with guaranteed messaging permissions.

One simple way to get access to Solace messaging quickly is to create a messaging service in Solace Cloud [as outlined here](https://solace.com/cloud/). You can find other ways to get access to Solace messaging below.

## Goals

The goal of this tutorial is to demonstrate how to use Apache Qpid JMS 1.1 over AMQP using Solace messaging. This tutorial will show you:

1.  How to send a persistent message to a durable queue with Solace messaging
2.  How to bind to this queue and receive a persistent message

`markdown:solaceMessaging-part1.md`
![Screenshot: Messaging Connectivity Information](../../../images/screenshots/connectivity-info-amqp.png)
`markdown:solaceMessaging-part2.md`
`markdown:jmsApi.md`

## Java Messaging Service (JMS) Introduction

JMS is a standard API for sending and receiving messages. As such, in addition to information provided on the Solace developer portal, you may also look at some external sources for more details about JMS. The following are good places to start

1. [http://java.sun.com/products/jms/docs.html](http://java.sun.com/products/jms/docs.html)
2. [https://en.wikipedia.org/wiki/Java_Message_Service](https://en.wikipedia.org/wiki/Java_Message_Service)
3. [https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3](https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3)

The last (Oracle docs) link points you to the JEE official tutorials which provide a good introduction to JMS.

This tutorial focuses on using [JMS 1.1 (April 12, 2002)](https://download.oracle.com/otndocs/jcp/7195-jms-1.1-fr-spec-oth-JSpec/), for [JMS 2.0 (May 21, 2013)](https://download.oracle.com/otndocs/jcp/jms-2_0-fr-spec/) see [Solace Getting Started AMQP JMS 2.0 Tutorials](../../solace-samples-amqp-qpid-jms2/).


## Connecting to Solace Messaging

In order to send or receive messages, an application must start a JMS connection.

For establishing the JMS connection you need to know the Solace messaging host name with the AMQP service port number, the client username and optional password.

*QueueProducer.java/QueueConsumer.java*
```java

ConnectionFactory connectionFactory = new JmsConnectionFactory(solaceUsername, solacePassword, solaceHost);
Connection connection = connectionFactory.createConnection();
```

Created a non-transacted session. Use two different session acknowledge modes: one that automatically acknowledges a client's receipt of a message, and the other that requires the client acknowledge to call `message.acknowledge()` for that.

*QueueProducer.java*
```java
Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
```

*QueueConsumer.java*
```java
Session session = connection.createSession(false, Session.CLIENT_ACKNOWLEDGE);
```

At this point the application is connected to Solace messaging and ready to send and receive messages.

## Sending a persistent message to a queue

In order to send a message to a queue a JMS *MessageProducer* needs to be created.

![Diagram: Sending a Persistent Message to a Queue](../../../images/diagrams/persistence-with-queues-details-2.png)

There is no difference in the actual method calls to the JMS `MessageProducer` when sending a JMS `persistent` message as compared to a JMS `non-persistent` message shown in the [publish/subscribe tutorial](../publish-subscribe/). The difference in the JMS `persistent` message is that Solace messaging will acknowledge the message once it is successfully stored by Solace messaging and the `MessageProducer.send()` call will not return until it has successfully received this acknowledgement. This means that in JMS, all calls to the `MessageProducer.send()` are blocking calls and they wait for message confirmation from Solace messaging before proceeding. This is outlined in the JMS 1.1 specification and Solace JMS adheres to this requirement.

The queue for sending messages will be created on the Solace router as a `durable queue`.

See [Configuring Queues](https://docs.solace.com/Configuring-and-Managing/Configuring-Queues.htm) for details on how to configure durable queues on Solace Message Routers with Solace CLI.

See [Management Tools](https://docs.solace.com/#Management) for other tools for configure durable queues.

*QueueProducer.java*
```java
final String QUEUE_NAME = "Q/tutorial";

Queue queue = session.createQueue(QUEUE_NAME);
MessageProducer messageProducer = session.createProducer(null);
```

Now send the message:

*QueueProducer.java*
```java
TextMessage message = session.createTextMessage("Hello world Queues!");
messageProducer.send(queue, message, DeliveryMode.PERSISTENT, Message.DEFAULT_PRIORITY, Message.DEFAULT_TIME_TO_LIVE);
```

## Receiving a persistent message from a queue

In order to receive a persistent message from a queue a JMS *MessageConsumer* needs to be created.

![Diagram: Receiving a Persistent Message from a Queue](../../../images/diagrams/persistence-with-queues-details-1.png)

The name of the queue is the same as the one to which we send messages.

*QueueConsumer.java*
```java
final String QUEUE_NAME = "Q/tutorial";

Queue queue = session.createQueue(QUEUE_NAME);
MessageConsumer messageConsumer = session.createConsumer(queue);
```

As in the [publish/subscribe tutorial](../publish-subscribe/), we will be using the anonymous inner class for receiving messages asynchronously, with an addition of the `message.acknowledge()` call.

*QueueConsumer.java*
```java
messageConsumer.setMessageListener(new MessageListener() {
    @Override
    public void onMessage(Message message) {
        try {
            if (message instanceof TextMessage) {
                System.out.printf("TextMessage received: '%s'%n", ((TextMessage) message).getText());
            } else {
                System.out.println("Message received.");
            }

            message.acknowledge();

            System.out.printf("Message Content:%n%s%n", message.toString());
            latch.countDown(); // unblock the main thread
        } catch (Exception ex) {
            System.out.println("Error processing incoming message.");
            ex.printStackTrace();
        }
    }
});
connection.start();
latch.await();
```

## Summarizing

Combining the example source code shown above results in the following source code files:

* [QueueProducer.java](https://github.com/SolaceSamples/solace-samples-amqp-qpid-jms1/blob/master/src/main/java/com/solace/samples/QueueProducer.java)
* [QueueConsumber.java](https://github.com/SolaceSamples/solace-samples-amqp-qpid-jms1/blob/master/src/main/java/com/solace/samples/QueueConsumer.java)

### Getting the Source

Clone the GitHub repository containing the Solace samples.

```
git clone https://github.com/SolaceSamples/solace-samples-amqp-qpid-jms1
cd solace-samples-amqp-qpid-jms1
```

### Building

You can build and run both example files directly from Eclipse or with Gradle.

```shell-session
./gradlew assemble
```

The examples can be run as:

```shell-session
cd build/staged/bin
./queueConsumer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
./queueProducer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
```

### Sample Output

First start the `QueueConsumer` so that it is up and waiting for messages.

```shell-session
$ queueConsumer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
QueueConsumer is connecting to Solace messaging at amqp://<HOST:AMQP_PORT>...
Awaiting message...
```

Then you can start the `QueueProducer` to send the message.

```shell-session
$ queueProducer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
QueueProducer is connecting to Solace messaging at amqp://<HOST:AMQP_PORT>...
Connected with username 'clientUsername'.
Sending message 'Hello world Queues!' to queue 'Q/tutorial'...
Sent successfully. Exiting...
```

Notice how the message is received by the `QueueConsumer`.

```shell-session
Awaiting message...
TextMessage received: 'Hello world Queues!'
Message Content:
JmsTextMessage { org.apache.qpid.jms.provider.amqp.message.AmqpJmsTextMessageFacade@529bd520 }
```

Now you know how to use Apache Qpid JMS 1.1 over AMQP using Solace messaging to send and receive persistent messages from a queue.