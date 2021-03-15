---
layout: features
title: Message Replay
summary: Learn how to make use of Message Replay via the Solace JavaScript client library.
links:
    - label: MessageReplay.html
      link: /blob/master/src/features/MessageReplay/MessageReplay.html
    - label: MessageReplay.js
      link: /blob/master/src/features/MessageReplay/MessageReplay.js
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/javascript/message-replay.md
---

In this introduction we show you how a client can initiate and process the replay of previously published messages, as well as deal with an externally initiated replay.

## Feature Overview

During normal publishing, guaranteed messages will be removed from the message broker's [queue or topic endpoint](https://docs.solace.com/PubSub-Basics/Endpoints.htm) once the consumer acknowledges their receipt or successful processing. When Message Replay is initiated for an endpoint, the message broker will re-publish a requested subset of previously published and logged messages, which enables the client to process these messages again.

Message Replay can be used if a client needs to catch up with missed messages as well as for several other [use cases](https://docs.solace.com/Overviews/Message-Replay-Overview.htm).

Message Replay for an endpoint can be initiated programmatically from an API client connected to an exclusive endpoint, or administratively from the message broker. After the replay is done, the connected client will keep getting live messages delivered.

It's important to note that when initiating replay, the message broker will disconnect all connected client flows, active or not. A new flow needs to be started for a client wishing to receive replayed and subsequent messages. The only exception is that in the client initiated case the flow initiating the replay will not be disconnected.

## Prerequisite

A replay log must be created on the message broker for the Message VPN using [Message Replay CLI configuration](https://docs.solace.com/Configuring-and-Managing/Msg-Replay-Config.htm) or using [Solace PubSub+ Manager](https://docs.solace.com/Solace-PubSub-Manager/PubSub-Manager-Overview.htm) administration console. Another option for configuration is to use the [SEMP API](https://docs.solace.com/SEMP/Using-SEMP.htm).

NOTE: Message Replay is supported on Solace PubSub+ 3530 and 3560 appliances running release 9.1 and greater, and on the Solace PubSub+ software message broker running release 9.1 and greater. Solace JavaScript API version 10.2.1 or later is required.

![Screenshot: Configuring Replay Log using Solace PubSub+ Manager](../../../images/screenshots/config-replay-log.png)

## Code

### Checking for Message Replay capability

Message Replay must be supported on the message broker, so this should be the first thing the code checks:

```javascript
if (!consumer.session.isCapable(solace.CapabilityType.MESSAGE_REPLAY)) {
    consumer.log('Message Replay is not supported on this message broker, disconnecting...');
    try {
        consumer.session.disconnect();
    } catch (error) {
        consumer.log(error.toString());
    }
}
```

### Initiating replay

First, a `replayStartLocation` object needs to be created to specify the desired subset of messages in the replay log.

There are two options:
* use `createReplayStartLocationBeginning()` to replay all logged messages
* use `createReplayStartLocationDate(Date date)` to replay all logged messages received starting from a specified `date`. Note the different possible formats in the example including how to specify the time zone.

Note: The `date` can’t be earlier than the date the replay log was created, otherwise replay will fail.

```javascript
consumer.replayStartLocation = solace.SolclientFactory.createReplayStartLocationBeginning();
/***************************************************************
 * Alternative replay start specifications to try instead of
 * createReplayStartLocationBeginning().
 */
/* Milliseconds after the Jan 1st of 1970 UTC+0: */
// consumer.replayStartLocation = solace.SolclientFactory.createReplayStartLocationDate(
//              new Date(1554331492));

/* RFC3339 UTC date with timezone offset 0: */
// consumer.replayStartLocation = solace.SolclientFactory.createReplayStartLocationDate(
//              new Date(Date.parse('2019-04-03T18:48:00Z')));

/* RFC3339 date with timezone: */
// consumer.replayStartLocation = solace.SolclientFactory.createReplayStartLocationDate(
//              new Date(Date.parse('2019-04-03T18:48:00-05:00')));
```

Indicate that replay is requested by setting a non-null `replayStartLocation` in `solace.MessageConsumerProperties`, which is then passed to `createMessageConsumer()` as a parameter.

The target endpoint (`queueDescriptor`) for replay is also set in `ConsumerFlowProperties` below, which is the normal way of setting an endpoint for a consumer flow.

```javascript
consumer.replayStartLocation = solace.SolclientFactory.createReplayStartLocationBeginning();
:
// Create a message consumer
consumer.messageConsumer = consumer.session.createMessageConsumer({
    // solace.MessageConsumerProperties
    queueDescriptor: { name: consumer.queueName, type: solace.QueueType.QUEUE },
    acknowledgeMode: solace.MessageConsumerAcknowledgeMode.CLIENT, // Enabling Client ack
    replayStartLocation: consumer.replayStartLocation,
});
:
consumer.messageConsumer.connect();
``` 

### Replay-related events

If a replay-related event occurs, the consumer flow is disconnected and a `solace.MessageConsumerEventName.DOWN_ERROR` event is generated with a specific Subcode, which can be processed in an event handler.

Some of the important Subcodes:
* REPLAY_STARTED - a replay has been administratively started from the message broker; the consumer flow is being disconnected.
* REPLAY_START_TIME_NOT_AVAILABLE - the requested replay start date is before when the replay log was created or in the future, which is not allowed
* REPLAY_FAILED - indicates that an unexpected error has happened during replay

For the definition of additional replay-related Subcodes refer to `solace.ErrorSubcode` in the [JavaScript API Reference](https://docs.solace.com/API-Developer-Online-Ref-Documentation/js/solace.ErrorSubcode.html) (search for REPLAY).

Here we will define the event handler to process events with some more example Subcodes.

```javascript
consumer.messageConsumer.on(solace.MessageConsumerEventName.DOWN_ERROR, function (details) {
    consumer.consuming = false;
    consumer.log('Received "DOWN_ERROR" event - details: ' + details);
    switch(details.subcode) {
        case solace.ErrorSubcode.REPLAY_STARTED:
            :
            break;
        case solace.ErrorSubcode.REPLAY_START_TIME_NOT_AVAILABLE:
            :
            break;
        // Additional events example, may add specific handler code under each:
        case solace.ErrorSubcode.REPLAY_FAILED:
        case solace.ErrorSubcode.REPLAY_CANCELLED:
        case solace.ErrorSubcode.REPLAY_LOG_MODIFIED:
        case solace.ErrorSubcode.REPLAY_MESSAGE_UNAVAILABLE:
        case solace.ErrorSubcode.REPLAY_MESSAGE_REJECTED:
            break;
        default:
            consumer.log('=== An error happened, the message consumer is down ===');
    }
```

In this example two specific Subcodes are handled:

* REPLAY_STARTED is handled by creating a new flow with no client-initiated message replay.
* REPLAY_START_TIME_NOT_AVAILABLE is handled by adjusting `replayStartLocation` to replay all logged messages. 

```
case solace.ErrorSubcode.REPLAY_STARTED:
    consumer.log('Router initiating replay, reconnecting flow to receive messages.');
    consumer.replayStartLocation = null;   // Client-initiated replay is not neeeded here
    consumer.createFlow();
    break;
case solace.ErrorSubcode.REPLAY_START_TIME_NOT_AVAILABLE:
    consumer.log('Replay log does not cover requested time period, reconnecting flow for full log instead.');
    consumer.replayStartLocation = solace.SolclientFactory.createReplayStartLocationBeginning();
    consumer.createFlow();
    break;
```

## Running the Sample

Follow the instructions to [check out and run the samples](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/README.md#checking-out).

Before running this sample, be sure that Message Replay is enabled in the Message VPN. Also, create an exclusive queue with the name "tutorial/queue" and messages must have been published to the replay log for this queue:

* Use the "QueueProducer" sample from `src/basic-samples/QueueProducer` in your cloned repo to create and publish one message to the queue. To start, simply load `QueueConsumer.html` into you browser.
* Use the "QueueConsumer" sample from `src/basic-samples/QueueConsumer` to drain the queue so that replay is performed on an empty queue and observed by this sample. Both samples are from the [Persistence with Queues](../persistence-with-queues/) tutorial and they are using "tutorial/queue" by default. Note: after draining, disconnect the "QueueConsumer" from the queue because there can be only one consumer flow active on an exclusive queue at any time and the replay sample will need to connect a new one.

At this point the replay log has one message.

You can now run this sample and observe the following, particularly the "messageId"s listed.

1. First, use "MessageReplay" from `src/features/MessageReplay` for a client initiated replay. All messages are requested and replayed from the replay log.
2. After replay the application is able to receive live messages. Try it by publishing a new message using the "QueueProducer" sample. Note that this message will also be added to the replay log.
3. Now start a replay from the message broker. The "MessageReplay" flow event handler monitors for a replay start event. When the message broker initiates a replay, the flow will see a DOWN_ERROR event with cause REPLAY_STARTED. This means an administrator has initiated a replay, and the application must destroy and re-create the flow to receive the replayed messages.
This will replay all logged messages including the live one published in step 2.

![Screenshot: Initiating Replay using Solace PubSub+ Manager](../../../images/screenshots/initiate-replay.png)

## Learn More

* Related Source Code: [MessageReplay.html](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/src/features/MessageReplay/MessageReplay.html)
* Related Source Code: [MessageReplay.js](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/src/features/MessageReplay/MessageReplay.js)
* [Solace Feature Documentation](https://docs.solace.com/Overviews/Message-Replay-Overview.htm)
