
## Obtaining the Solace Messaging API

The Solace Jakarta Messaging tutorials use the [Solace Jakarta JMS API](https://docs.solace.com/API/JMS-API/JMS-home.htm), which implements [Jakarta Messaging 3.1](https://jakarta.ee/specifications/messaging/3.1/) (the successor to JMS 2.0 using the `jakarta.jms.*` namespace).

The latest versions of all Solace APIs can be downloaded from the [Solace downloads page](https://www.solace.com/downloads/). Alternatively, the API can be added to your project directly through Maven Central. Note: always check for the latest API version.

### Get the API: Using Gradle

```
dependencies {
    implementation("com.solacesystems:sol-jms-jakarta:10.30.2")
}
```

### Get the API: Using Maven

```
<dependency>
    <groupId>com.solacesystems</groupId>
    <artifactId>sol-jms-jakarta</artifactId>
    <version>10.30.2</version>
</dependency>
```

The samples target Java 11 or later, as required by Jakarta Messaging 3.1.
