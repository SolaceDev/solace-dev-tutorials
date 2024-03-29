---
layout: features
title: Message Selectors
summary: Learn to use selectors to filter which messages are received.
links:
    - label: MessageSelectorsOnQueue.java
      link: /blob/master/src/main/java/com/solace/samples/features/MessageSelectorsOnQueue.java
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/jcsmp/message-selectors.md
---

This feature introduction shows how a client can bind to a queue and select which messages to receive based on custom properties of the messages.  This is useful when the logic to select which messages to receive is not possible with a simple topic subscription.

## Feature Overview

Selectors enable client applications to specify which messages they are interested in receiving, as determined by the messages’ header field and property values. A selector is a string up to a maximum of 1,023 bytes that uses a conditional expression syntax that is a subset of SQL92. For detailed information on message selector syntax, refer to the Java Message Service Specification – Version 1.1. Selectors are supported by all Solace messaging APIs.

When a selector is used, a client only receives a message if the selector evaluates to true when the message’s header field and property values are substituted for their corresponding identifiers in the selector. The message broker filters out messages that do not match.

## Prerequisite

The [Client Profile](https://docs.solace.com/Configuring-and-Managing/Configuring-Client-Profiles.htm) must be configured to [allow receiving guaranteed messages](https://docs.solace.com/Configuring-and-Managing/Configuring-Client-Profiles.htm#Allow-G-Msg-Receives).

NOTE:  This is the default configuration in PubSub+ Cloud messaging services.

## Code

Create and bind a Flow to a temporary Queue with a message selector on a user-defined property.  In this case, we want the consumer to receive messages with the custom property "pasta" set to "rotini" or "farfalle".

```java
Queue myqueue = session.createTemporaryQueue();
ConsumerFlowProperties flow_prop = new ConsumerFlowProperties();
flow_prop.setEndpoint(myqueue);
flow_prop.setSelector("pasta = 'rotini' OR pasta = 'farfalle'");
cons = session.createFlow(new MessageDumpListener(), flow_prop);                    
```

Publish a number of Guaranteed messages with the given user-defined property to the temporary Queue.  In this case, we send six messages that are each set to a different pasta type.

```java
for (String p : new String[] { "macaroni", "fettuccini", "farfalle", "fiori", "rotini", "penne" }) {
    SDTMap map = prod.createMap();
    map.putString("pasta", p);
    msg.setProperties(map);
    prod.send(msg, myqueue);
}
```

## Learn More

* Related Source Code: [MessageSelectorsOnQueue.java](https://github.com/SolaceSamples/solace-samples-java-jcsmp/blob/master/src/main/java/com/solace/samples/jcsmp/features/MessageSelectorsOnQueue.java)
* [Solace Feature Documentation](https://docs.solace.com/Solace-JMS-API/Selectors.htm?Highlight=selector)



 