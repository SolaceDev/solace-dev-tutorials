---
layout: tutorials
title: Publish/Subscribe
summary: Demonstrates the publish/subscribe message exchange pattern
icon: ../../../images/icons/I_dev_P+S.png
links:
    - label: TopicPublisher.java
      link: /blob/master/src/main/java/com/solace/samples/TopicPublisher.java
    - label: TopicSubscriber.java
      link: //blob/master/src/main/java/com/solace/samples/TopicSubscriber.java
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-samples/blob/master/src/pages/tutorials/java-amqp-qpid-1/publish-subscribe.md
---

This tutorial will show you to how to connect a Apache Qpid JMS 1.1 client to a Solace Message Router using AMQP, add a topic subscription and publish a message matching this topic subscription. This is the publish/subscribe message exchange pattern as illustrated here:

At the end, this tutorial walks through downloading and running the sample from source.

This tutorial focuses on using a non-Solace JMS API implementation. For using the Solace JMS API see [Solace Getting Started JMS Tutorials](../../solace-samples-jms/).

## Assumptions

This tutorial assumes the following:

*   You are familiar with Solace [core concepts](https://docs.solace.com/PubSub-Basics/Core-Concepts.htm).
*   You have access to Solace messaging with the following configuration details:
    *   Connectivity information for a Solace message-VPN
    *   Enabled client username and password

One simple way to get access to Solace messaging quickly is to create a messaging service in Solace Cloud [as outlined here](https://solace.com/cloud/). You can find other ways to get access to Solace messaging below.

## Goals

The goal of this tutorial is to demonstrate how to use a Apache Qpid JMS 1.1 over AMQP using Solace messaging. This tutorial will show you:

1. How to build and send a message on a topic
2. How to subscribe to a topic and receive a message

`markdown:solaceMessaging-part1.md`
![Screenshot: Messaging Connectivity Information](../../../images/screenshots/connectivity-info.png)
`markdown:solaceMessaging-part2.md`
`markdown:jmsApi.md`

## Java Messaging Service (JMS) Introduction

JMS is a standard API for sending and receiving messages. As such, in addition to information provided on the Solace developer portal, you may also look at some external sources for more details about JMS. The following are good places to start:

1. [http://java.sun.com/products/jms/docs.html](http://java.sun.com/products/jms/docs.html)
2. [https://en.wikipedia.org/wiki/Java_Message_Service](https://en.wikipedia.org/wiki/Java_Message_Service)
3. [https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3](https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3)

The last (Oracle docs) link points you to the JEE official tutorials which provide a good introduction to JMS.

This tutorial focuses on using [JMS 1.1 (April 12, 2002)](https://download.oracle.com/otndocs/jcp/7195-jms-1.1-fr-spec-oth-JSpec/), for [JMS 2.0 (May 21, 2013)](https://download.oracle.com/otndocs/jcp/jms-2_0-fr-spec/) see [Solace Getting Started AMQP JMS 2.0 Tutorials](../../solace-samples-amqp-qpid-jms2/).


## Connecting to Solace Messaging

In order to send or receive messages, an application must start a JMS connection.

There are three parameters for establishing the JMS connection: the Solace messaging host name with the AMQP service port number, the client username and the optional password.

*TopicPublisher.java/TopicSubscriber.java*
```java
ConnectionFactory connectionFactory = new JmsConnectionFactory(solaceUsername, solacePassword, solaceHost);
Connection connection = connectionFactory.createConnection();
```

Next, a session needs to be created. The session will be non-transacted using the acknowledge mode that automatically acknowledges a client's receipt of a message.

*TopicPublisher.java/TopicSubscriber.java*
```java
Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
```

At this point the application is connected to Solace messaging and ready to publish messages.

## Publishing messages

In order to publish a message to a topic a JMS message *MessageProducer* needs to be created.

![Diagram: Sending a Persistent Message to a Queue](../../../images/diagrams/persistence-with-queues-details-2.png)

*TopicPublisher.java*
```java
final String TOPIC_NAME = "T/GettingStarted/pubsub";
Topic topic = session.createTopic(TOPIC_NAME);
MessageProducer messageProducer = session.createProducer(null);
```

Now we can publish the message.

*TopicPublisher.java*
```java
TextMessage message = session.createTextMessage("Hello world!");
messageProducer.send(topic, message,
        DeliveryMode.NON_PERSISTENT,
        Message.DEFAULT_PRIORITY, Message.DEFAULT_TIME_TO_LIVE);
```

Now if you execute the `TopicPublisher.java` program it will successfully publish a message, but another application is required to receive it.

## Receiving messages

In order to receive a message from a topic a JMS *MessageConsumer* needs to be created.

![Diagram: Receiving a Persistent Message from a Queue](../../../images/diagrams/persistence-with-queues-details-1.png)

*TopicSubscriber.java*
```java
final String TOPIC_NAME = "T/GettingStarted/pubsub";
Topic topic = session.createTopic(TOPIC_NAME);
MessageConsumer messageConsumer = session.createConsumer(topic);
```

We will be using the anonymous inner class for receiving messages asynchronously.

*TopicSubscriber.java*
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

If you execute the `TopicSubscriber.java` program, it will block at the `latch.await()` call until a message is received. Now if you execute the `TopicPublisher.java` program that publishes a message, the `TopicSubscriber.java` program will resume and print out the received message.

## Summary

Combining the example source code shown above results in the following source code files:

* [TopicPublisher.java](https://github.com/SolaceSamples/solace-samples-amqp-qpid-jms1/blob/master/src/main/java/com/solace/samples/TopicPublisher.java)
* [TopicSubscriber.java](https://github.com/SolaceSamples/solace-samples-amqp-qpid-jms1//blob/master/src/main/java/com/solace/samples/TopicSubscriber.java)

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
./topicSubscriber amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
./topicPublisher amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
```

### Sample Output

First start the `TopicSubscriber` so that it is up and waiting for published messages. You can start multiple instances of this application, and all of them will receive published messages.

```shell-session
$ topicSubscriber amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
TopicSubscriber is connecting to Solace messaging at amqp://<HOST:AMQP_PORT>...
Connected to the Solace messaging.
Awaiting message...
```

Then you can start the `TopicPublisher` to publish a message.
```shell-session
$ topicPublisher amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
TopicPublisher is connecting to Solace messaging amqp://<HOST:AMQP_PORT>...
Connected to the Solace messaging.
Sending message 'Hello world!' to topic 'T/GettingStarted/pubsub'...
Sent successfully. Exiting...
```

Notice how the published message is received by the `TopicSubscriber`.

```shell-session
Awaiting message...
TextMessage received: 'Hello world!'
Message Content:
JmsTextMessage { org.apache.qpid.jms.provider.amqp.message.AmqpJmsTextMessageFacade@18c1752a }
```

With that you now know how to use the Apache Qpid JMS 1.1 over AMQP using Solace messaging to implement the publish/subscribe message exchange pattern.