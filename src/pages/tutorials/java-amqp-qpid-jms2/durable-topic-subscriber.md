---
layout: features
title: Durable JMS Subscription
summary: Demonstrates Durable JMS Subscription published to a topic.
links:
    - label: DurableTopicSubscriber.java
      link: /blob/master/src/main/java/com/solace/samples/features/DurableTopicSubscriber.java
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/java-amqp-qpid-jms2/durable-topic-subscriber.md
---

This feature introduction shows how to create a Durable JMS Subscription using Apache Qpid JMS 2.0 API over AMQP 1.0.  Solace messaging is used as the message broker. In Solace messaging, durable JMS subscriptions are implemented using Durable Topic Endpoints (DTEs).

The example code illustrates the Subscriber in the [publish/subscribe](../publish-subscribe/) messaging pattern.

## Feature Overview

A durable subscription is used by an application that needs to receive all the messages published on a topic, including the ones published when there is
no consumer associated with it.

## Code

To create a durable subscription, you must first create a JMS connection as with all JMS samples. See the [publish/subscribe tutorial](../publish-subscribe/) for more details if you need.

A durable subscription requires that you create a durable consumer given a subscription name and topic. The subscription name will be the name used for the Durable Topic Endpoint in the Solace PubSub+ messaging service and the topic name is what will attract the messages you wish to receive.

One aspect that is unusual with Qpid JMS is that a client ID is required to create a durable consumer. Therefore, you must set this on the context. Keep in mind that client IDs must be unique within the Solace PubSub+ messaging service.

The following code snippet outlines this. 

~~~java
ConnectionFactory connectionFactory = new JmsConnectionFactory(SOLACE_USERNAME, SOLACE_PASSWORD, SOLACE_HOST);
JMSContext context = connectionFactory.createContext()
context.setClientID(CLIENT_ID);
Topic topic = context.createTopic(TOPIC_NAME);
String message = context.createDurableConsumer(topic, SUBSCRIPTION_NAME).receiveBody(String.class);
~~~

## Learn More

* Related Source Code: [DurableTopicSubscriber.java](https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/java-amqp-qpid-jms2/durable-topic-subscriber.md)
* [Solace Feature Documentation](https://docs.solace.com/Solace-JMS-API/Creating-Durable-Topic-S.htm)