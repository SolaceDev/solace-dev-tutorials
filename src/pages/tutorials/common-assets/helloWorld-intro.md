## Your first Solace app

Hello and welcome to your first Solace app tutorial.  Appropriately, we'll be looking at the sample called "HelloWorld".  At first glance, this application might seem longer than the first Java/Python/etc. program you might have ever written.  E.g.:

```java
public static void main(String... args) {
    System.out.println("Hello world!");
}
```

However, as you can tell from this [Wikipedia article](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program), there are many different types of "Hello World" programs.  Rather than trying to do the bare minimum to produce some visual output, this Solace Hello World will demonstrate some very fundamental and basic features of Solace APIs and pub/sub messaging, and teach some best practices:

 - **Publish _and_ Subscribe:** most Solace applications do both
 - **Dynamic topics:** topics are hierarchical and descriptive, not static
 - **Wildcard subscriptions:** attract multiple topics via a single subscription
 - **Asynchronous messaging:** use of callback handlers
 - **Connection lifecycle management:** connect once, and stay online for the lifetime of the app

This Hello World sample application will connect to a Solace PubSub+ Event Broker, and publish/subscribe in a loop.  Let's begin!