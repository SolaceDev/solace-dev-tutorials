
## Obtaining the Solace API

This tutorial depends on you having the Solace Messaging API for Java Real-Time Optimized (JavaRTO). The JavaRTO API library can be [downloaded here]({{ site.links-downloads }}){:target="_top"}. The JavaRTO API is distributed as a tar file containing the required jars and libs, API documentation, and examples. The instructions in the [Building](#building) section assume you're using Gradle and using the JavaRTO API for Linux x86_64 platform. If your environment or target runtime platform differs, then download the appropriate JavaRTO API and adjust the build instructions appropriately.

**NOTE**: The Solace JavaRTO API (a.k.a solclientj) is a low-latency Java Native Interface (JNI) wrapper for the Solace C Messaging API (SolClient). Therefore, during compile time the JNI wrapper jar `solclient.jar` must be added a dependency and C API library packaged with the JavaRTO API must be included in your runtime library path.

### Compile Dependency: Using Gradle

```groovy
repositories {
    flatDir(dir: "<PATH_TO_EXTRACTED_API>/solclientj/lib", name: 'Java RTO API lib directory')
}

dependencies {
    // Solace Messaging API for JavaRTO Dependencies
    compile("com.solacesystems:solclientj:")
}
```

### Compile Dependency: Using Maven

```xml
<repositories>
  <repository>
    <id>localrepository</id>
    <url>file://<PATH_TO_EXTRACTED_API>/solclientj/lib/</url>
  </repository>
</repositories>

[...]

<dependency>
  <groupId>com.solacesystems</groupId>
  <artifactId>solclientj</artifactId>
  <version>+</version>
</dependency>
```

