---
layout: tutorials
title: Request/Reply
summary: Demonstrates the request/reply message exchange pattern
icon: I_dev_R+R.svg
links:
    - label: BasicRequestor.java
      link: /blob/master/src/main/java/com/solace/samples/BasicRequestor.java
    - label: BasicReplier.java
      link: /blob/master/src/main/java/com/solace/samples/BasicReplier.java
---

This tutorial outlines both roles in the request-response message exchange pattern. It will show you how to act as the client by creating a request, sending it and waiting for the response. It will also show you how to act as the server by receiving incoming requests, creating a reply and sending it back to the client. It builds on the basic concepts introduced in [publish/subscribe tutorial]({{ site.baseurl }}/publish-subscribe).

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

The goal of this tutorial is to demonstrate how to use Apache Qpid JMS 1.1 over AMQP using Solace messaging. This tutorial will show you:

1. How to build and send a request message
2. How to receive a request message and respond to it

{% include_relative assets/solaceMessaging.md %}
{% include_relative assets/jmsApi.md %}

## Java Messaging Service (JMS) Introduction

JMS is a standard API for sending and receiving messages. As such, in addition to information provided on the Solace developer portal, you may also look at some external sources for more details about JMS. The following are good places to start

1. [http://java.sun.com/products/jms/docs.html](http://java.sun.com/products/jms/docs.html){:target="_blank"}.
2. [https://en.wikipedia.org/wiki/Java_Message_Service](https://en.wikipedia.org/wiki/Java_Message_Service){:target="_blank"}
3. [https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3](https://docs.oracle.com/javaee/7/tutorial/partmessaging.htm#GFIRP3){:target="_blank"}

The last (Oracle docs) link points you to the JEE official tutorials which provide a good introduction to JMS.

This tutorial focuses on using [JMS 1.1 (April 12, 2002)]({{ site.links-jms1-specification }}){:target="_blank"}, for [JMS 2.0 (May 21, 2013)]({{ site.links-jms2-specification }}){:target="_blank"} see [Solace Getting Started AMQP JMS 2.0 Tutorials]({% if jekyll.environment == 'solaceCloud' %}
  {{ site.links-get-started-amqp-jms2-cloud }}
{% else %}
    {{ site.links-get-started-amqp-jms2-dev }}
{% endif %}){:target="_blank"}.


## Connecting to Solace Messaging

As in the [publish/subscribe tutorial]({{ site.baseurl }}/publish-subscribe){:target="_blank"} tutorial, an application must start a JMS connection and a session.

*TopicPublisher.java/TopicSubscriber.java*
```java

ConnectionFactory connectionFactory = new JmsConnectionFactory(solaceUsername, solacePassword, solaceHost);
Connection connection = connectionFactory.createConnection();
Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
```

At this point the application is connected to Solace messaging and ready to send and receive request and reply messages.

## Sending a request

In order to send a request in the *Requestor* a JMS *MessageProducer* needs to be created.

![]({{ site.baseurl }}/assets/images/request-reply-details-2.png)

*BasicRequestor.java*
```java
final String REQUEST_TOPIC_NAME = "T/GettingStarted/requests";

Topic requestTopic = session.createTopic(REQUEST_TOPIC_NAME);
MessageProducer requestProducer = session.createProducer(null);
```

Also, it is necessary to allocate a temporary queue for receiving the reply and to create a JMS *MessageConsumer* for it.

*BasicRequestor.java*
```java
TemporaryQueue replyToQueue = session.createTemporaryQueue();
MessageConsumer replyConsumer = session.createConsumer(replyToQueue);
```

The request must have two properties assigned: `JMSReplyTo` and `JMSCorrelationID`.

The `JMSReplyTo` property needs to have the value of the temporary queue for receiving the reply that was already created.

The `JMSCorrelationID` property needs to have an unique value so the requestor to correlate the request with the subsequent reply.

The figure below outlines the exchange of messages and the role of both properties.


![]({{ site.baseurl }}/assets/images/request-reply-details-1.png)


*BasicRequestor.java*
```java
TextMessage request = session.createTextMessage("Sample Request");
String correlationId = UUID.randomUUID().toString();
request.setJMSCorrelationID(correlationId);
```

Now send the request:

*BasicRequestor.java*
```java
requestProducer.send(requestTopic, request, DeliveryMode.NON_PERSISTENT,
        Message.DEFAULT_PRIORITY,
        Message.DEFAULT_TIME_TO_LIVE);
```

## Receiving a request

In order to receive a request from a queue a JMS *MessageConsumer* needs to be created.

*BasicReplier.java*
```java
final String REQUEST_TOPIC_NAME = "T/GettingStarted/requests";

Topic requestTopic = session.createTopic(REQUEST_TOPIC_NAME);
MessageConsumer requestConsumer = session.createConsumer(requestTopic);
```

As in the [publish/subscribe tutorial]({{ site.baseurl }}/publish-subscribe){:target="_blank"}, we will be using the anonymous inner class for receiving messages asynchronously.

*BasicReplier.java*
```java
requestConsumer.setMessageListener(new MessageListener() {
    @Override
    public void onMessage(Message request) {
...
});
```

## Replying to a request

To reply to a received request a JMS *MessageProducer* needs to be created in the *Replier*.

![Request-Reply_diagram-3]({{ site.baseurl }}/assets/images/request-reply-details-3.png)

The JMS *MessageProducer* is created without its target queue as it will be assigned from the `JMSReplyTo` property value of the received request.

*BasicReplier.java*
```java
MessageProducer replyProducer = session.createProducer(null);
```

The reply message must have the `JMSCorrelationID` property value assigned from the received request.

*BasicReplier.java*
```java
TextMessage reply = session.createTextMessage();
String text = "Sample response";
reply.setText(text);

reply.setJMSCorrelationID(request.getJMSCorrelationID());
```

Now we can send the reply message.

We must send it to the temporary queue that was created by the requestor. We need to create an instance of the `org.apache.qpid.jms.JmsDestination` class for the reply destination and assign it a name from the request `JMSReplyTo` property because of the Apache Qpid JMS implementation.

*BasicReplier.java*
```java
Destination replyDestination = request.getJMSReplyTo();
String replyDestinationName = ((JmsDestination) replyDestination).getName();
replyDestination = new JmsTemporaryQueue(replyDestinationName);
replyProducer.send(replyDestination, reply, DeliveryMode.NON_PERSISTENT,
        Message.DEFAULT_PRIORITY,
        Message.DEFAULT_TIME_TO_LIVE);
```

The reply will be received by `BasicRequestor` in a main thread after the following call unblocks:

```java
final int REPLY_TIMEOUT_MS = 10000;
Message reply = replyConsumer.receive(REPLY_TIMEOUT_MS);
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
./basicReplier amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
./basicRequestor amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
```


### Sample Output

First start the `BasicReplier` so that it is up and waiting for requests.

```sh
$ basicReplier amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
BasicReplier is connecting to Solace messaging at amqp://<HOST:AMQP_PORT>...
Connected to the Solace messaging with client username 'clientUsername'.
Awaiting request...
```

Then you can start the `BasicRequestor` to send the request and receive the reply.
```sh
$ basicRequestor amqp://<HOST:AMQP_PORT> <USERNAME> <PASSWORD>
BasicRequestor is connecting to Solace messaging at amqp://<HOST:AMQP_PORT>...
Connected to the Solace messaging with client username 'clientUsername'.
Sending request 'Sample Request' to topic 'T/GettingStarted/requests'...
Sent successfully. Waiting for reply...
TextMessage response received: 'Sample response'
Message Content:
JmsTextMessage { org.apache.qpid.jms.provider.amqp.message.AmqpJmsTextMessageFacade@64bf3bbf }
```

Notice how the request is received by the `BasicReplier` and replied to.

```sh
Awaiting request...
Received request, responding...
Responded successfully. Exiting...
```

Now you know how to use Apache Qpid JMS 1.1 over AMQP using Solace messaging to implement the request/reply message exchange pattern.

If you have any issues sending and receiving request or reply, check the [Solace community]({{ site.links-community }}){:target="_top"} for answers to common issues seen.
