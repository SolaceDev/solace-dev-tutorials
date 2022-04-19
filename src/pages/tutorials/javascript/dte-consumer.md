---
layout: features
title: DTE Consumer
summary: Demonstrates receiving persistent messages from a Durable Topic Endpoint.
links:
    - label: DTEConsumer
      link: /blob/master/src/features/DTEConsumer
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/javascript/dte-consumer.md
---

This sample shows how to consume messages from a Durable Topic Endpoint (DTE). The sample will bind to a DTE and subscribe with the topic "tutorial/topic".

The example code builds on the Consumer in the [QueueConsumer](../persistence-with-queues/) tutorial.

## Feature Overview

A topic endpoint attracts messages published to a topic for which the topic endpoint has a matching topic subscription. The topic subscription for the topic endpoint is specified in the client request to bind a Flow to that topic endpoint.

Durable queues and topic endpoints are provisioned objects on the message broker that have a life span independent of a particular client session. They also survive a message broker restart and are preserved as part of the message broker configuration for backup and restoration purposes. Administrators can provision durable queues and topic endpoints through the Solace CLI, SEMP, or PubSub+ Manager; client applications can dynamically provision durable endpoints through the Solace messaging APIs.

## Prerequisite

This sample requires that the the DTE with the name "tutorial/dte" has been provisioned on the message router message-vpn.  Ensure the DTE is enabled for both Incoming and Outgoing messages and set the Permission to at least 'Consume'.

## Code

The following code shows how to bind to a Durable Topic Endpoint. The key is to specify the desired topic in the `topicEndpointSubscription` field and properly set the `queueDescriptor` with the name of the DTE and the type `solace.QueueType.TOPIC_ENDPOINT`. The rest of the message consumption is the same as shown in the [QueueConsumer](../persistence-with-queues/) sample.

~~~javascript
// Create a message consumer
consumer.messageConsumer = consumer.session.createMessageConsumer({
    topicEndpointSubscription: consumer.topicName,
    queueDescriptor: { name: consumer.topicEndpointName, type: solace.QueueType.TOPIC_ENDPOINT },
...
});
                    
~~~

When running the full sample, first start this DTEConsumer sample and then run the [TopicPublisher](../publish-subscribe/) sample to send messages on this topic.

## Learn More

* Related Source Code: [DTEConsumer](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/src/features/DTEConsumer)
* [Solace Feature Documentation](https://docs.solace.com/PubSub-Basics/Endpoints.htm)
