---
layout: tutorials
title: Publish/Subscribe
summary: Demonstrates the publish/subscribe message exchange pattern
icon: I_dev_P+S.svg
links:
    - label: TopicPublisher.java
      link: /blob/master/src/main/java/com/solace/samples/TopicPublisher.java
    - label: TopicSubscriber.java
      link: //blob/master/src/main/java/com/solace/samples/TopicSubscriber.java
---

This tutorial will show you to how to connect a Apache Qpid JMS 2.0 API client to Solace Messaging using AMQP, add a topic subscription and publish a message matching this topic subscription. This is the publish/subscribe message exchange pattern as illustrated here:

At the end, this tutorial walks through downloading and running the sample from source.

This tutorial focuses on using a non-Solace JMS API implementation. For using the Solace JMS API see [Solace Getting Started JMS Tutorials]({% if jekyll.environment == 'solaceCloud' %}
  {{ site.links-get-started-jms-cloud }}
{% else %}
    {{ site.links-get-started-jms-dev }}
{% endif %}){:target="_blank"}.

## Assumptions

This tutorial assumes the following:

*   You are familiar with Solace [core concepts]({{ site.docs-core-concepts }}){:target="_top"}.
*   You have access to Solace messaging with the following configuration details:
    *   Connectivity information for a Solace message-VPN
    *   Enabled client username and password

One simple way to get access to Solace messaging quickly is to create a messaging service in Solace Cloud [as outlined here]({{ site.links-solaceCloud-setup}}){:target="_top"}. You can find other ways to get access to Solace messaging below.

## Goals

The goal of this tutorial is to demonstrate how to use Apache Qpid JMS 2.0 API over AMQP using Solace messaging. This tutorial will show you:

1. How to build and send a message on a topic
2. How to subscribe to a topic and receive a message

{% include_relative assets/solaceMessaging.md %}
{% include_relative assets/jmsApi.md %}

## Java Messaging Service (JMS) Introduction

JMS is a standard API for sending and receiving messages. As such, in addition to information provided on the Solace developer portal, you may also look at some external sources for more details about JMS. The following are good places to start

1. [http://java.sun.com/products/jms/docs.html](http://java.sun.com/products/jms/docs.html){:target="_blank"}.
2. [https://en.wikipedia.org/wiki/Java_Message_Service](https://en.wikipedia.org/wiki/Java_Message_Service){:target="_blank"}
3. [https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3](https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3){:target="_blank"}

The last (Oracle docs) link points you to the JEE official tutorials which provide a good introduction to JMS.

This tutorial focuses on using [JMS 2.0 (May 21, 2013)]({{ site.links-jms2-specification }}){:target="_blank"}, for [JMS 1.1 (April 12, 2002)]({{ site.links-jms1-specification }}){:target="_blank"} see [Solace Getting Started AMQP JMS 1.1 Tutorials]({% if jekyll.environment == 'solaceCloud' %}
  {{ site.links-get-started-amqp-jms1-cloud }}
{% else %}
    {{ site.links-get-started-amqp-jms1-dev }}
{% endif %}){:target="_blank"}.

## Connecting to the Solace Messaging

In order to send or receive messages, an application must start a JMS connection and a session.

There are three parameters for establishing the JMS connection: the Solace messaging host name with the AMQP service port number, the client username and the optional password.

*TopicPublisher.java/TopicSubscriber.java*
```java
String solaceHost = args[0];
ConnectionFactory connectionFactory = new JmsConnectionFactory(solaceUsername, solacePassword, solaceHost);
```

Notice how Apache Qpid JMS 2.0 API combines `Connection` and `Session` objects into the `JMSContext` object.

*TopicPublisher.java/TopicSubscriber.java*
```java
JMSContext context = connectionFactory.createContext()
```

The session created by the `JMSContext` object by default is non-transacted and uses the acknowledge mode that automatically acknowledges a client's receipt of a message.

At this point the application is connected to Solace messaging and ready to publish messages.

## Publishing messages

A JMS *Producer* needs to be created in order to publish a message to a topic.

![]({{ site.baseurl }}/assets/images/publish-subscribe-details-2.png)

The JMS 2.0 API allows the use of *method chaining* to create the producer, set the delivery mode and publish the message. We assign its delivery mode to `non-persistent` for better performance.

*TopicPublisher.java*
```java
final String TOPIC_NAME = "T/GettingStarted/pubsub";

Topic topic = context.createTopic(TOPIC_NAME);
TextMessage message = context.createTextMessage("Hello world!");
context.createProducer().setDeliveryMode(DeliveryMode.NON_PERSISTENT).send(topic, message);
```

If you execute the `TopicPublisher.java` program, it will successfully publish a message, but another application is required to receive the message.

## Receiving messages

To receive a message from a topic a JMS *Consumer* needs to be created.

![]({{ site.baseurl }}/assets/images/publish-subscribe-details-1.png)

The JMS 2.0 API allows the use of *method chaining* to create the consumer, and receive messages published to the subscribed topic.

*TopicSubscriber.java*
```java
final String TOPIC_NAME = "T/GettingStarted/pubsub";

Topic topic = context.createTopic(TOPIC_NAME);
String message = context.createConsumer(topic).receiveBody(String.class);
```

If you execute the `TopicSubscriber.java` program, it will block at the `receiveBody(String.class)` call until a message is received. Now, if you execute the `TopicPublisher.java` that publishes a message, the `TopicSubscriber.java` program will resume and print out the received message.

## Summarizing

Combining the example source code shown above results in the following source code files:

<ul>
{% for item in page.links %}
<li><a href="{{ site.repository }}{{ item.link }}" target="_blank">{{ item.label }}</a></li>
{% endfor %}
</ul>

### Getting the Source

Clone the GitHub repository containing the Solace samples.

```
git clone {{ site.repository }}
cd {{ site.repository | split: '/' | last }}
```

### Building

You can build and run both example files directly from Eclipse or with Gradle.

```sh
./gradlew assemble
```

The examples can be run as:

```sh
cd build/staged/bin
./topicSubscriber amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
./topicPublisher amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
```

### Sample Output

First, start `TopicSubscriber` so that it is up and waiting for published messages. You can start multiple instances of this application, and all of them will receive published messages.

```sh
$ topicSubscriber amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
TopicSubscriber is connecting to Solace router amqp://<HOST:AMQP_PORT>...
Connected to the Solace router with client username 'clientUsername'.
Awaiting message...
```

Then you can start `TopicPublisher` to publish a message.
```sh
$ topicPublisher amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
TopicPublisher is connecting to Solace router amqp://<HOST:AMQP_PORT>…
Sending message 'Hello world!' to topic 'T/GettingStarted/pubsub'...
Sent successfully. Exiting...
```

Notice how the published message is received by the the `TopicSubscriber`.

```sh
Awaiting message...
Message received: 'Hello world!'
```

You now know how to use Apache Qpid JMS 2.0 API over AMQP using Solace messaging to implement the publish/subscribe message exchange pattern.

If you have any issues publishing and receiving a message, check the [Solace community]({{ site.links-community }}){:target="_top"} for answers to common issues seen.
