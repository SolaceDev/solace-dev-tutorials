### Option 2: Start a PubSub+ Software

* Follow [these instructions](https://docs.solace.com/Solace-VMR-Set-Up/Setting-Up-VMRs.htm) to start the PubSub+ Software in leading Clouds, Container Platforms or Hypervisors. The tutorials outline where to download and how to install the PubSub+ Software.
* The messaging connectivity information are the following:
    * Host: <public_ip> (IP address assigned to the VMR in tutorial instructions)
    * Message VPN: default
    * Client Username: sampleUser (can be any value)
    * Client Password: samplePassword (can be any value)

    Note: By default, the PubSub+ Software "default" message VPN has authentication disabled.

### Option 3: Get access to a PubSub+ Appliance

* Contact your PubSub+ appliance administrators and obtain the following:
    * A PubSub+ Message-VPN where you can produce and consume direct and persistent messages
    * The host name or IP address of the Solace appliance hosting your Message-VPN
    * A username and password to access the Solace appliance
