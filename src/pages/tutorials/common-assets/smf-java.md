
## Obtaining the Solace PubSub+ Messaging API for Java

Solace PubSub+ Messaging API for Java is one of the newer "next-gen" APIs Solace has made more recently.
You may also be interested in JCSMP, Solace's "classic" Java API that has been used in production deployments for more than a decade.
Note that these APIs are very different.

This tutorial assumes you have downloaded the [Solace PubSub+ Messaging API for Java](https://solace.com/downloads). 

Alternatively, you can also fetch the API through Gradle or Maven.

### Get the API: Using Gradle

```groovy
dependencies {
    compile("com.solace:solace-messaging-client:1.+")
}
```

### Get the API: Using Maven

```xml
<dependency>
    <groupId>com.solace</groupId>
    <artifactId>solace-messaging-client</artifactId>
    <version>RELEASE</version>
</dependency>
```
