
## Obtaining the Solace JCSMP Java API

JCSMP is Solace's "classic" Java API that has been used in production deployments for more than a decade.
You may also want to investigate the newer PubSub+ Java API, one of the "next-gen" APIs Solace has made more recently.
Note that these APIs are very different.

This tutorial assumes you have downloaded the [Solace JCSMP Java API](https://solace.com/downloads). 

Alternatively, you can also fetch the API through Gradle or Maven.

### Get the API: Using Gradle

```groovy
dependencies {
    compile("com.solacesystems:sol-jcsmp:10.+")
}
```

### Get the API: Using Maven

```xml
<dependency>
    <groupId>com.solacesystems</groupId>
    <artifactId>sol-jcsmp</artifactId>
    <version>RELEASE</version>
</dependency>
```
