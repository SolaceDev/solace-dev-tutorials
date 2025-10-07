### Option 2: Start a Solace Event Broker Software

* Follow [these instructions](https://docs.solace.com/Basics/Getting-Started-Try-Broker.htm) to start the Solace Event Broker Software in leading Clouds, Container Platforms or Hypervisors. The tutorials outline where to download and how to install the Solace Event Broker Software.
* The messaging connectivity information are the following:
    * Host: <public_ip> (IP address assigned to the VMR in tutorial instructions)
    * Message VPN: default
    * Client Username: sampleUser (can be any value)
    * Client Password: samplePassword (can be any value)

    Note: By default, the Solace Event Broker Software "default" message VPN has authentication disabled.

### Option 3: Get access to a Solace Event Broker Appliance

* Contact your Solace Event Broker Appliance administrators and obtain the following:
    * A Solace Message-VPN where you can produce and consume direct and persistent messages
    * The host name or IP address of the Solace appliance hosting your Message-VPN
    * A username and password to access the Solace appliance
