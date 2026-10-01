---
layout: tutorials
title: Confirmed Delivery
summary: Learn how to confirm that your messages are received by Solace Messaging.
icon: I_dev_confirm.svg
links:
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/jms/confirmed-delivery.md
---

This tutorial builds on the basic concepts introduced in [Persistence with Queues](../persistence-with-queues/) tutorial and will show you how to properly process publisher acknowledgements. Once an acknowledgement for a message has been received and processed, you have confirmed your persistent messages have been properly accepted by Solace messaging and therefore can be guaranteed of no message loss.  

## Persistent Publishing with Jakarta Messaging

In Jakarta Messaging (and its JMS predecessors), when sending PERSISTENT messages, the MessageProducer must not return from the blocking send() method until the message is fully acknowledged by Solace messaging. This behavior is mandated by the specification. Therefore applications sending persistent messages using Jakarta Messaging are guaranteed that the message is accepted by Solace messaging by the time the MessageProducer.send() returns. No extra publisher acknowledgement handling is required or possible using the Jakarta Messaging API.

This restriction of the specification does mean that PERSISTENT message producers are forced to block on each message until it is fully guaranteed by the messaging system. This can lead to performance bottlenecks on publish. Applications can work around this by using Jakarta Messaging Session based transactions and committing the transaction only after several messages are sent to the messaging system.

Refer to the [Jakarta Messaging 3.1 specification](https://jakarta.ee/specifications/messaging/3.1/) for further details on this subject.

## Summarizing

For Jakarta Messaging applications there is nothing further they must do to confirm message delivery with Solace messaging. This is handled by the API by making the send call blocking.