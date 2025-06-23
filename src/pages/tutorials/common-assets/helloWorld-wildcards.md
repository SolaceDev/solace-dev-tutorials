Notice a few things:
 - The topic subscription is hierarchical: there are "`/`" characters between levels
 - The use of "`*`" and "`>`" wildcard characters in the subscription
 - Direct subscription (not using Guaranteed delivery yet)

These wildcards are called single-level and multi-level wildcards respectively.  The "`*`" will match anything up to the next `/`, including the empty-string; for the multi-level, as long as the message's first part of the topic matches the subscription to that point, the "`>`" wildcard will match any remaining (one-or-more) levels.  See here for more details on [topics](https://docs.solace.com/Get-Started/what-are-topics.htm) and on [wildcards](https://docs.solace.com/Messaging/Wildcard-Charaters-Topic-Subs.htm).

So, our Hello World app is adding a subscription: `solace/samples/*/hello/>`

After adding the only one subscription (you can add as many as you'd like, within the limits of the broker), start the Consumer object which tells the broker the API is ready to start to receive messages.