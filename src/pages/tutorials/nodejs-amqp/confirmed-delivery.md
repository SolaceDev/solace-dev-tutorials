---
layout: tutorials
title: Confirmed Delivery
summary: Learn how to confirm that your messages are received by Solace Messaging.
icon: ../../../images/icons/I_dev_confirm.svg
links:
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-samples/blob/master/src/pages/tutorials/nodejs-amqp/confirmed-delivery.md
---

This tutorial builds on the basic concepts introduced in [Persistence with Queues](../persistence-with-queues/) tutorial and will show you how to properly process publisher acknowledgements. Once an acknowledgement for a message has been received and processed, you have confirmed your persistent messages have been properly accepted by Solace messaging and therefore can be guaranteed of no message loss.  

## Persistent Publishing

When sending persistent messages, the *Producer* will not return from the blocking `send()` method until the message is fully acknowledged by the message broker.

This behavior means that applications sending persistent messages using Solace messaging are guaranteed that the messages are accepted by the time the `send()` call returns. No extra publisher acknowledgement handling is required or possible.

This behavior also means that persistent message producers are forced to block on sending each message. This can lead to performance bottlenecks on publish.

## Summary

For Node.js applications there is nothing further they must do to confirm message delivery with Solace messaging. This is handled by the underlying client by making the `send()` call blocking.