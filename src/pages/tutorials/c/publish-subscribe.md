---
layout: tutorials
title: Publish/Subscribe
summary: Learn how to publish and subscribe to messages.
icon: I_dev_P+S.svg
links:
    - label: TopicPublisher.c
      link: /blob/master/src/intro/TopicPublisher.c
    - label: TopicSubscriber.c
      link: /blob/master/src/intro/TopicSubscriber.c
    - label: os.h
      link: /blob/master/src/intro/os.h
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/c/publish-subscribe.md
---

This tutorial will introduce you to the fundamentals of the Solace Messaging API by connecting a client, adding a topic subscription and sending a message matching this topic subscription. This forms the basis for any publish / subscribe message exchange.

## Assumptions

This tutorial assumes the following:

*   You are familiar with Solace PubSub+ [core concepts](https://docs.solace.com/PubSub-Basics/Core-Concepts.htm).
*   You have access to Solace messaging with the following configuration details:
    *   Connectivity information for a Solace message-VPN
    *   Enabled client username and password

One simple way to get access to Solace messaging quickly is to create a messaging service in Solace Cloud [as outlined here](https://solace.com/products/event-broker/cloud/). You can find other ways to get access to Solace messaging below.


## Goals

The goal of this tutorial is to demonstrate the most basic messaging interaction using Solace PubSub+. This tutorial will show you:

1.  How to build and send a message on a topic
2.  How to subscribe to a topic and receive a message


`markdown:solaceMessaging-part1.md`
![Screenshot: Messaging Connectivity Information](../../../images/screenshots/connectivity-info.png)
`markdown:solaceMessaging-part2.md`
`markdown:solaceApi.md`
`markdown:initC.md`

## Receiving a message

This tutorial is uses "Direct" messages which are at most once delivery messages. So first, let's express interest in the messages by subscribing to a PubSub+ topic. Then you can look at publishing a matching message and see it received.  

![Diagram: Receiving a Message](../../../images/diagrams/pub-sub-receiving-message-300x134.png)

With a session connected in the previous step, then you must subscribe to a topic in order to express interest in receiving messages. This tutorial uses the topics "topic/topic1".

```cpp
solClient_session_topicSubscribeExt ( session_p,
                                    SOLCLIENT_SUBSCRIBE_FLAGS_WAITFORCONFIRM,
                                      "topic/topic1");
```

Then after the subscription is added, the consumer is started. At this point the consumer is ready to receive messages. So wait in a loop for the expected message to arrive.

```cpp
printf ( "Waiting for message......\n" );
fflush ( stdout );
while ( msgCount < 1 ) {
    sleepInSec ( 1 );
}
```

## Sending a message

Now it is time to send a message to the waiting consumer.  

![Diagram: Sending a Message](../../../images/diagrams/pub-sub-sending-message-300x134.png)

To send a message, you must create a message and a topic destination. This tutorial will send a PubSub+ binary message with contents "Hello world!". Then you must send the message to the Solace Event Broker.

```cpp
/* Message */
solClient_opaqueMsg_pt msg_p = NULL;ss
solClient_destination_t destination;
const char *text_p = "Hello world!";

/* Allocate memory for the message that is to be sent. */
solClient_msg_alloc ( &msg_p );

/* Set the message delivery mode. */
solClient_msg_setDeliveryMode ( msg_p, SOLCLIENT_DELIVERY_MODE_DIRECT );

/* Set the destination. */
destination.destType = SOLCLIENT_TOPIC_DESTINATION;
destination.dest = "tutorial/topic";
solClient_msg_setDestination ( msg_p, &destination, sizeof ( destination ) );

/* Add some content to the message. */
solClient_msg_setBinaryAttachment ( msg_p, text_p, ( solClient_uint32_t ) strlen ( (char *)text_p ) );

/* Send the message. */
printf ( "About to send message '%s' to topic '%s'...\n", (char *)text_p, argv[4] );
solClient_session_sendMsg ( session_p, msg_p );

printf ( "Message sent. Exiting.\n" );
solClient_msg_free ( &msg_p );
```

In the SolClient API, messages are allocated and freed from an internal API message pool for greatest performance and efficiency. Therefore as shown, messages must be acquired by calls to solClient_msg_alloc and then later freed back to the pool by calls to solClient_msg_free.

The minimum properties required to create a SolClient message that can be sent is to set the delivery mode, queue or topic destination, and message contents as shown in the above code. Once the message is created it is sent to the Solace Event Broker with a call to solClient_session_sendMsg.

At this point the producer has sent a message to the Solace Event Broker and your waiting consumer will have received the message and printed its contents to the screen.

## Summarizing

The full source code for this example is available in [GitHub](https://github.com/SolaceSamples/solace-samples-c). If you combine the example source code shown above results in the following source:


* [TopicPublisher.c](https://github.com/SolaceSamples/solace-samples-c/blob/master/src/intro/TopicPublisher.c)
* [TopicSubscriber.c](https://github.com/SolaceSamples/solace-samples-c/blob/master/src/intro/TopicSubscriber.c)
* [os.h](https://github.com/SolaceSamples/solace-samples-c/blob/master/src/intro/os.h)

The OS source code simply provides platform abstraction. The subscriber sample makes use of this for the sleep in the main loop.

## Building

`markdown:building.md`

### Running the Samples

If you start the `TopicSubscriber` with the required arguments of your Solace messaging, it will connect and wait for a message.

```sh
bin$ . ./setenv.sh 
bin$ ./TopicSubscriber <msg_backbone_ip:port> <message-vpn> <client-username> <password> <topic>
TopicSubscriber initializing...
Connected. 
Waiting for message......
```

Then you can send a message using the `TopicPublisher` with the same arguments. If successful, the output for the producer will look like the following:

```sh
bin$ ./TopicPublisher <msg_backbone_ip:port> <message-vpn> <client-username> <password> <topic>
TopicSubscriber initializing...
Connected. 
About to send message 'Hello world!' to topic 'topic/topic1'...
Message sent. Exiting.
```

With the message delivered the subscriber output will look like the following:

```sh
Received message:
Destination:         Topic 'topic/topic1'
Class Of Service:    COS_1
DeliveryMode:        DIRECT
Binary Attachment:   len=12
48 65 6c 6c 6f 20 77 6f 72 6c 64 21           Hello wo  rld!
Exiting.
```

The received message is printed to the screen. The message contents was "Hello world!" as expected and shown in the contents of the message dump along with additional information about the PubSub+ message that was received.

You have now successfully connected a client, subscribed to a topic and exchanged messages using this topic.
