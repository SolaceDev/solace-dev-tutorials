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
---

This tutorial builds on the basic concepts introduced in the [publish/subscribe tutorial]({{ site.baseurl }}/publish-subscribe), and will show you how to send and receive persistent messages with Apache Qpid JMS 2.0 API client using AMQP and Solace messaging.

At the end, this tutorial walks through downloading and running the sample from source.

This tutorial focuses on using a non-Solace JMS API implementation. For using the Solace JMS API see [Solace Getting Started JMS Tutorials]({% if jekyll.environment == 'solaceCloud' %}
  {{ site.links-get-started-jms-cloud }}
{% else %}
    {{ site.links-get-started-jms-dev }}
{% endif %}){:target="_blank"}.

## Assumptions

This tutorial assumes the following:

* You are familiar with Solace [core concepts]({{ site.docs-core-concepts }}){:target="_top"}.
* You have access to Solace messaging with the following configuration details:
    * Connectivity information for a Solace message-VPN configured for guaranteed messaging support
    * Enabled client username and password
    * Client-profile enabled with guaranteed messaging permissions.

One simple way to get access to Solace messaging quickly is to create a messaging service in Solace Cloud [as outlined here]({{ site.links-solaceCloud-setup}}){:target="_top"}. You can find other ways to get access to Solace messaging below.

## Goals

The goal of this tutorial is to demonstrate how to use Apache Qpid JMS 2.0 API over AMQP using Solace messaging. This tutorial will show you:

1.  How to send a persistent message to a durable queue using Solace messaging
2.  How to bind to this queue and receive a persistent message

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

*QueueProducer.java/QueueConsumer.java*
```java
String solaceHost = args[0];
ConnectionFactory connectionFactory = new JmsConnectionFactory(solaceUsername, solacePassword, solaceHost);
```

Notice how Apache Qpid JMS 2.0 API combines `Connection` and `Session` objects into the `JMSContext` object.

*QueueProducer.java/QueueConsumer.java*
```java
JMSContext context = connectionFactory.createContext()
```

The session created by the `JMSContext` object by default is non-transacted and uses the acknowledge mode that automatically acknowledges a client's receipt of a message.

At this point the application is connected to Solace messaging and ready to send and receive messages.

## Sending a persistent message to a queue

In order to send a message to a queue a JMS *Producer* needs to be created.

![sending-message-to-queue]({{ site.baseurl }}/assets/images/persistence-with-queues-details-2.png)

There is no difference in the actual method calls to the JMS producer when sending a JMS `persistent` message as compared to a JMS `non-persistent` message shown in the [publish/subscribe tutorial]({{ site.baseurl }}/publish-subscribe){:target="_blank"}. The difference in the JMS `persistent` message is that Solace messaging will acknowledge the message once it is successfully stored by Solace messaging and the `Producer.send()` call will not return until it has successfully received this acknowledgement. This means that in JMS, all calls to the `Producer.send()` are blocking calls and they wait for message confirmation from Solace messaging before proceeding. This is outlined in the JMS specification and Solace JMS adheres to this requirement.

See [Configuring Queues]({{ site.docs-confugure-queues }}){:target="_blank"} for details on how to configure durable queues on Solace Message Routers with Solace CLI.

See [Management Tools]({{ site.docs-management-tools }}){:target="_top"} for other tools for configure durable queues.

The JMS 2.0 API allows the use of *method chaining* to create the producer, set the delivery mode and send the message.

*QueueProducer.java*
```java
final String QUEUE_NAME = "Q/tutorial";

Queue queue = context.createQueue(QUEUE_NAME);
TextMessage message = context.createTextMessage("Hello world Queues!");
context.createProducer().setDeliveryMode(DeliveryMode.PERSISTENT).send(queue, "Hello world Queues!");
```

## Receiving a persistent message from a queue

To receive a persistent message from a queue a JMS *Consumer* needs to be created.

![]({{ site.baseurl }}/assets/images/persistence-with-queues-details-1.png)

The JMS 2.0 API allows the use of *method chaining* to create the consumer and receive messages sent to the subscribed queue.

*QueueConsumer.java*
```java
final String QUEUE_NAME = "Q/tutorial";

Queue queue = context.createQueue(QUEUE_NAME);
Message message = context.createConsumer(queue).receive();
```

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
./queueConsumer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
./queueProducer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
```

### Sample Output

First start the `QueueConsumer` so that it is up and waiting for messages.

```sh
$ queueConsumer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
QueueConsumer is connecting to Solace router amqp://<HOST:AMQP_PORT>...
Connected with username 'clientUsername'.
Awaiting message...
```

Then you can start the `QueueProducer` to send the message.

```sh
$ queueProducer amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
QueueProducer is connecting to Solace router amqp://<HOST:AMQP_PORT>...
Connected with username 'clientUsername'.
Sending message 'Hello world Queues!' to queue 'Q/tutorial'...
Sent successfully. Exiting...
```

Notice how the message is received by the `QueueReceiver`.

```sh
Awaiting message...
TextMessage received: 'Hello world Queues!'
Message Content:
JmsTextMessage { org.apache.qpid.jms.provider.amqp.message.AmqpJmsTextMessageFacade@be64738 }
```

Now you know how to use Apache Qpid JMS 2.0 API over AMQP using Solace messaging to send and receive persistent messages from a queue.

If you have any issues sending and receiving message or reply, check the [Solace community]({{ site.links-community }}){:target="_top"} for answers to common issues seen.
