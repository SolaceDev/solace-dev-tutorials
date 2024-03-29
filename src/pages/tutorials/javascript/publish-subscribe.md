---
layout: tutorials
title: Publish/Subscribe
summary: Learn how to set up pub/sub messaging on a Solace VMR.
icon: I_dev_P+S.svg
links:
    - label: TopicPublisher.html
      link: /blob/master/src/basic-samples/TopicPublisher/TopicPublisher.html
    - label: TopicPublisher.js
      link: /blob/master/src/basic-samples/TopicPublisher/TopicPublisher.js
    - label: TopicSubscriber.html
      link: /blob/master/src/basic-samples/TopicSubscriber/TopicSubscriber.html
    - label: TopicSubscriber.js
      link: /blob/master/src/basic-samples/TopicSubscriber/TopicSubscriber.js
    - label: feedback
      link: https://github.com/SolaceDev/solace-dev-tutorials/blob/master/src/pages/tutorials/javascript/publish-subscribe.md
---

This tutorial will introduce you to the fundamentals of the Solace Web Messaging API for JavaScript version 10 or later by connecting a client, adding a topic subscription and sending a message matching this topic subscription. This forms the basis for any publish / subscribe message exchange.  

`markdown:assumption.md`

## Goals

The goal of this tutorial is to demonstrate the most basic messaging interaction using Solace messaging. This tutorial will show you:

1.  How to build and send a message on a topic
2.  How to subscribe to a topic and receive a message

`markdown:solaceMessaging-part1.md`
![Screenshot: Messaging Connectivity Information](../../../images/screenshots/connectivity-info.png)
`markdown:solaceMessaging-part2.md`
`markdown:solaceApi.md`
`markdown:loadAndInitSolaceApi.md`

## Connecting to the Solace message router

In order to send or receive messages, an application must connect a Solace session. The Solace session is the basis for all client communication with the Solace message router.

The `solace.SolclientFactory` is used to create a Solace `Session` from `SessionProperties`. In the example below, `SessionProperties` is created using object initializers.

Then listeners are defined for Session Events of interest and for receiving direct messages, which are explained in the next sections.

The created session connects to the Solace message router with the `session.connect()` call.

This tutorial’s sample code comes as two separate applications: one (with the "publisher" object) publishes messages to a specific topic, and the other (with the "subscriber" object) subscribes to messages on that topic and receives the messages.

The following is an example of a session creating and connecting to the Solace message router for the subscriber. The publisher's code will be the same except for that it doesn't require a message event listener.

```javascript
// create session
subscriber.session = solace.SolclientFactory.createSession({
    // solace.SessionProperties
    url:      hosturl,
    vpnName:  vpn,
    userName: username,
    password: pass,
});
// define session event listeners
    /*...see section Session Events...*/
// define message event listener
    /*...see section Receiving a message...*/
// connect the session
try {
    subscriber.session.connect();
} catch (error) {
    subscriber.log(error.toString());
}
```
At this point your browser is connected as a client to the Solace message router. You can use PubSub+ Manager to view this client connection and related details.

## Session Events

The Solace Web Messaging API for JavaScript communicates changes in status and results of connect and subscription calls through emitting session events with certain event names.

It is necessary to wire your application logic to events through listeners to take appropriate action. The most important events are:

*   `SessionEventCode.UP_NOTICE`: success connecting session to the Solace message router
*   `SessionEventCode.CONNECT_FAILED_ERROR`: unable to connect to the Solace message router
*   `SessionEventCode.DISCONNECTED`: session was disconnected from the Solace message router
*   `SessionEventCode.SUBSCRIPTION_OK`: subscription to a topic was successfully created on the Solace message router

This is how event listeners can be defined in the sample publisher:

```javascript
// define session event listeners
publisher.session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
    publisher.log('=== Successfully connected and ready to publish messages. ===');
    publisher.publish();
    publisher.exit();
});
publisher.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, function (sessionEvent) {
    publisher.log('Connection failed to the message router: ' + sessionEvent.infoStr +
        ' - check correct parameter values and connectivity!');
});
publisher.session.on(solace.SessionEventCode.DISCONNECTED, function (sessionEvent) {
    publisher.log('Disconnected.');
    if (publisher.session !== null) {
        publisher.session.dispose();
        publisher.session = null;
    }
});
```
Note that the application logic can be triggered only after receiving the `solace.SessionEventCode.UP_NOTICE` event:

```javascript
publisher.session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
    publisher.log('=== Successfully connected and ready to publish messages. ===');
    publisher.publish();
    publisher.exit();
});
```

On the subscriber side we also might want to implement reaction to subscription error and to subscription added or removed:

```javascript
// define session event listeners
/*...SNIP...*/
subscriber.session.on(solace.SessionEventCode.SUBSCRIPTION_ERROR, function (sessionEvent) {
    subscriber.log('Cannot subscribe to topic: ' + sessionEvent.correlationKey);
});
subscriber.session.on(solace.SessionEventCode.SUBSCRIPTION_OK, function (sessionEvent) {
    if (subscriber.subscribed) {
        subscriber.subscribed = false;
        subscriber.log('Successfully unsubscribed from topic: ' + sessionEvent.correlationKey);
    } else {
        subscriber.subscribed = true;
        subscriber.log('Successfully subscribed to topic: ' + sessionEvent.correlationKey);
        subscriber.log('=== Ready to receive messages. ===');
    }
});
```

The subscriber application logic is also triggered only after receiving the `solace.SessionEventCode.UP_NOTICE` event:

```javascript
subscriber.session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
    subscriber.log('=== Successfully connected and ready to subscribe. ===');
    subscriber.subscribe();
});
```

See `solace.SessionEventCode` in the [Web Messaging API Reference](https://docs.solace.com/API-Developer-Online-Ref-Documentation/js/index.html) for the full list of session event codes.

## Receiving a message

This tutorial uses “Direct” messages which are at most once delivery messages. So first, let’s create a listener and express interest in the messages by subscribing to a Solace topic. Then you can look at publishing a matching message and see it received.

![Diagram: Receiving a Message](../../../images/diagrams/pub-sub-receiving-message-300x134.png)

With a subscriber session created in the previous step, we declare a message event listener.

```javascript
// define session event listeners
    /*...see section Session Events...*/
// define message event listener
subscriber.session.on(solace.SessionEventCode.MESSAGE, function (message) {
    subscriber.log('Received message: "' + message.getBinaryAttachment() + '", details:\n' + message.dump());
});
// connect the session
```

When a message is received, this listener is called with the message as parameter.

You must subscribe to a topic in order to express interest in receiving messages. This tutorial uses the topic _“tutorial/topic”_.

```javascript
subscriber.subscribe = function () {
/*...SNIP...*/
    try {
        subscriber.session.subscribe(
            solace.SolclientFactory.createTopic("tutorial/topic"),
            true,
            "tutorial/topic",
            10000
        );
    } catch (error) {
        subscriber.log(error.toString());
    }
/*...SNIP...*/
}
```

Notice parameters to the session `subscribe` function.

*   __The first parameter__ is the subscription topic.
*   __The second (boolean) parameter__ specifies whether a corresponding event will be generated when the subscription is added successfully.
*   __The third parameter__ is the correlation key. This parameters value will be returned to the `SUBSCRIPTION_OK` session event listener for as the `correlationKey` property of the event: `event.correlationKey`.
*   __The fourth parameter__ is the function call timeout. The timeout sets the limit in milliseconds the `subscribe` function is allowed to block the execution thread. If this limit is reached and the subscription is still not added, then an exception is thrown.

After the subscription is successfully added the subscriber is ready to receive messages and nothing happens until a message is received.

## Sending a message

Now it is time to send a message to the waiting consumer.

![Diagram: Sending a Message](../../../images/diagrams/pub-sub-sending-message-300x134.png)

### Creating and sending the message

To send a message to a topic, you must create a message and a topic type destination. Both of these are created from the `solace.SolclientFactory`.

This tutorial uses “Direct” messages which are at most once delivery messages and will send a message with Text contents “Sample Message”.

This is how it is done in the sample publisher code:

```javascript
var messageText = 'Sample Message';
var message = solace.SolclientFactory.createMessage();
message.setDestination(solace.SolclientFactory.createTopicDestination(publisher.topicName));
message.setBinaryAttachment(messageText);
message.setDeliveryMode(solace.MessageDeliveryModeType.DIRECT);
if (publisher.session !== null) {
    try {
        publisher.session.send(message);
        publisher.log('Message published.');
    } catch (error) {
        publisher.log(error.toString());
    }
} else {
    publisher.log('Cannot publish because not connected to Solace message router.');
}
```

At this point a message to the Solace message router has been sent and your waiting consumer will have received the message and printed its contents to the web page and JavaScript debug console.

## Integrating the code into a web application

The samples consist of two separate publisher and subscriber browser applications, each comes as a pair: one HTML file and one JavaScript file that is loaded by the HTML file.

JavaScript functions get connected to HTML buttons when the browser window loads (`window.onload`) as follows.

In the publisher (`TopicPublisher.html`):

```
document.getElementById("connect").addEventListener("click", publisher.connect);
document.getElementById("disconnect").addEventListener("click", publisher.disconnect);
document.getElementById("publish").addEventListener("click", publisher.publish);
```

In the subscriber (`TopicSubscriber.html`):

```
document.getElementById("connect").addEventListener("click", subscriber.connect);
document.getElementById("disconnect").addEventListener("click", subscriber.disconnect);
document.getElementById("subscribe").addEventListener("click", subscriber.subscribe);
document.getElementById("unsubscribe").addEventListener("click", subscriber.unsubscribe);
```

## Summarizing

Combining the example source code shown above results in the following source code files:

* [TopicPublisher.html](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/src/basic-samples/TopicPublisher/TopicPublisher.html)
* [TopicPublisher.js](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/src/basic-samples/TopicPublisher/TopicPublisher.js)
* [TopicSubscriber.html](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/src/basic-samples/TopicSubscriber/TopicSubscriber.html)
* [TopicSubscriber.js](https://github.com/SolaceSamples/solace-samples-javascript/blob/master/src/basic-samples/TopicSubscriber/TopicSubscriber.js)

### Getting the Source

Clone the GitHub repository containing the Solace samples.

```
git clone https://github.com/SolaceSamples/solace-samples-javascript
cd solace-samples-javascript
```

Note: the code in the `master` branch of this repository depends on Solace JavaScript API version 10 or later. If you want to work with an older version clone the branch that corresponds your version.

### Installing the Web Messaging API for JavaScript

It is assumed that the `lib` directory containing the API libraries will be installed at the root of the cloned `solace-samples-javascript` repository:

```bash
cp -R <path_to_unzipped_API_distribution_package>/lib/ .
```

### Running the Samples

The samples consist of two separate requestor and replier browser applications, each comes as a pair: one HTML file and one JavaScript file that is loaded by the HTML file.

**Sample Output**

First open `src/basic-samples/TopicSubscriber/TopicSubscriber.html` page in the browser and connect to a Solace router by specifying the message router properties and clicking “Connect” button.

Then subscribe to the subscription topic by clicking the “Subscribe” button.

The following is a screenshot of the tutorial’s `TopicSubscriber.html` web page with the JavaScript debug console open in the Firefox browser. It captures the page after it was loaded and the “Connect” button was clicked and then the “Subscribe” button was clicked.

![Screenshot: Topic Subscriber](../../../images/screenshots/pubsub-javascript_img-1.png)

Now, open `src/basic-samples/TopicPublisher/TopicPublisher.html` page in the browser and connect to the same Solace router by specifying the message router properties and clicking “Connect” button.

Publish messages by clicking the “Publish Message” button on the _TopicPublisher/TopicPublisher.html_ page.

The following screenshots of the tutorial’s `TopicPublisher.html` and `TopicSubscriber.html` web pages with the JavaScript debug console open in the Firefox browser. It captures the pages after a message was published and received.

This is the publisher is publishing a message (`TopicPublisher.html)`:

![Screenshot: Topic Publisher](../../../images/screenshots/pubsub-javascript_img-2.png)

This is the subscriber receiving a message (`TopicSubscriber.html)`:

![Screenshot: Topic Subscriber](../../../images/screenshots/pubsub-javascript_img-3.png)

With that you now know how to successfully implement publish-subscribe message exchange pattern using Direct messages.
