---
layout: tutorials
title: Topic to Queue Mapping
summary: Learn how to map existing topics to Solace queues.
icon: I_dev_topic2q.svg
---

This tutorial builds on the basic concepts introduced in [Persistence with Queues]({{ site.baseurl }}/persistence-with-queues) tutorial and will show you how to make use of one of Solace’s advanced queueing features called `Topic to Queue Mapping` with Apache Qpid JMS 2.0 client using AMQP and Solace messaging.

This tutorial focuses on using a non-Solace JMS API implementation. For using the Solace JMS API see [Solace Getting Started JMS Tutorials]({% if jekyll.environment == 'solaceCloud' %}
  {{ site.links-get-started-jms-cloud }}
{% else %}
    {{ site.links-get-started-jms-dev }}
{% endif %}){:target="_blank"}.

## Overview

In addition to persistent messages published directly to a durable queue, it is possible to add one or more topic subscriptions to the queue so that messages published to those topics are also delivered to and persisted by the queue. This is a powerful feature that enables queues to participate equally in point-to-point and publish/subscribe JMS messaging models. More details about the [“Topic to Queue Mapping” feature here]({{ site.docs-topic-mapping }}){:target="_top"}.

The following diagram illustrates this feature.

<img src="{{ site.baseurl }}/assets/images/topic-to-queue-mapping-details.png" width="500" height="206" />

If you have a durable queue named “Q”, it will receive messages published directly to the queue destination named “Q”. However, it is also possible to add subscriptions to this queue in the form of topics. This example adds topics “A” and “B”. Once these subscriptions are added, the queue will start receiving messages published to the topic destinations “A” and “B”. When you combine this with the wildcard support provided by Solace topics this opens up a number of interesting use cases.

## Topic to Queue Mapping and JMS

JMS is a standard programmatic interface with a design goal of being messaging middleware agnostic. As such, the JMS interface does not provide a way for applications to directly take advantage of the Solace Topic to Queue Mapping feature. However JMS applications wishing to take advantage of this Solace feature have a few options.

One option is to use a management interface to administratively configure the topic to queue mapping, by adding topic subscriptions to the queue. This can either be done through the CLI or SolAdmin management applications; or the SEMP programmatic management API. The SEMP API enables applications to fully configure Solace messaging. Applications can use this API by logging into Solace messaging using a Message-VPN admin account. This concept is introduced in the [Technology – Messaging Platform Features]({{ site.links-tech-other }}){:target="_top"} and further details are available in the [Solace Message Router Product Documentation]({{ site.docs-semp }}){:target="_top"}.

## Summary

Apache Qpid JMS 2.0 JMS applications using AMQP and wishing to take advantage of this Solace messaging feature have only one option:

*   [Use one of the Solace management interfaces and directly configure the topic subscriptions on the queue]({{ site.docs-topic-mapping }}){:target="_top"}.

If you have any issues or questions check the [Solace community]({{ site.links-community }}){:target="_top"} for answers and discussions.
