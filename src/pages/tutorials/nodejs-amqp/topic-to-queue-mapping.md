---
layout: tutorials
title: Topic to Queue Mapping
summary: Learn how to map existing topics to Solace queues.
icon: I_dev_topic2q.svg
links:
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/nodejs-amqp/topic-to-queue-mapping.md
---

This tutorial builds on the basic concepts introduced in [Persistence with Queues](../spersistence-with-queues/) tutorial and will show you how to make use of one of Solace’s advanced queueing features called “Topic to Queue Mapping.”

## Overview

In addition to persistent messages published directly to a durable queue, it is possible to add one or more topic subscriptions to the queue so that messages published to those topics are also delivered to and persisted by the queue. This is a powerful feature that enables queues to participate equally in point-to-point and publish/subscribe messaging models. More details about the [“Topic to Queue Mapping” feature here](https://docs.solace.com/PubSub-Basics/Core-Concepts.htm).

The following diagram illustrates this feature.

![Diagram: AMQP-NodeJS Queue Mapping](../../../images/diagrams/topic-to-queue-mapping-details.png)

If you have a durable queue named “Q”, it will receive messages published directly to the queue destination named “Q”. However, it is also possible to add subscriptions to this queue in the form of topics. This example adds topics “A” and “B”. Once these subscriptions are added, the queue will start receiving messages published to the topic destinations “A” and “B”. When you combine this with the wildcard support provided by Solace topics this opens up a number of interesting use cases.

## Topic to Queue Mapping and Node.js AMQP Clients

AMQP is a standard protocol with a design goal of being messaging middleware agnostic. As such, it does not provide a way for applications to directly take advantage of the Solace Topic to Queue Mapping feature.

However Node.js applications wishing to take advantage of this Solace feature can use a management interface to administratively configure the topic to queue mapping, by adding topic subscriptions to the queue. This can either be done through the CLI or PubSub+ Manager application; or the SEMP programmatic management API. The SEMP API enables applications to fully configure Solace messaging.

Applications can use this API by logging into Solace messaging using a Message-VPN admin account. This concept is introduced in the [Technology – Messaging Platform Features](https://solace.com/products/tech/) and further details are available in the [Solace Message Router Product Documentation](https://docs.solace.com/SEMP/Using-SEMP.htm).

## Summary

Node.js applications wishing to take advantage of this feature have the option of [using one of the Solace management interfaces and directly configure the topic subscriptions on the queue](https://docs.solace.com/PubSub-Basics/Core-Concepts.htm).