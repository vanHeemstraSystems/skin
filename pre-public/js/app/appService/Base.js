/*
 * AppServiceBase
 */
define(function () {
    console.log('SKIN: appServiceBase called');
    function appServiceBase(id) {
        this.id = id;
        this.myProperty = {};               
    };
    appServiceBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: appServiceBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
            // The appService instance has a property called "myProperty"
            // created from the serviceBus's "yourProperty".
            this.myProperty = this.serviceBus.yourProperty;			
		},
        setSubscriptions: function (subscriptions){
            console.log('SKIN: appServiceBase setSubscriptions(subscriptions) called');
            this.subscriptions = subscriptions;
        },           	
		subscribe: function () {
			console.log('SKIN: appServiceBase subscribe() called');	
			// Subscribe to the serviceBus with channels and topics from subscriptions
            var subscriptionArray = new Array;
            this.subscriptions.forEach( function (subscription) {
                var topicArray = new Array();
                for (key in subscription) {
                    // One subscription has one channel
                    if(key == 'channel') {
                        var channel = subscription[key];
                        console.log('SKIN: appServiceBase channel:');
                        console.log(channel);
                    }
                    // One channel has one or more topics
                    if(key == 'topic') {
                        var topic = subscription[key];
                        console.log('SKIN: appServiceBase topic:');
                        console.log(topic);
                        topicArray.push(topic);
                    }
                }
                console.log('SKIN: appServiceBase topicArray:');
                console.log(topicArray);
                // Now we should have one channel and one or more topics
                for(topic in topicArray) {
                    var topic = topicArray[topic];
                    var callback = function(data, envelope){
                        // empty for now
                        console.log('SKIN: appServiceBase data received:');
                        console.log(data);
                        console.log('SKIN: appServiceBase envelope received:');
                        console.log(envelope);
                    };
                    // Subscribe to the channel+topic for each topic, 
                    // with callback for processing of received data            
                    var options = { channel: channel, topic: topic, callback: callback};
                    console.log('SKIN: appServiceBase options:');
                    console.log(options);
                    var subscription = this.serviceBus.subscribe(options);
                    console.log('SKIN: appServiceBase subscription:');
                    console.log(subscription);                
                    // NOTE: to unsubscribe
                    // subscription.unsubscribe();

                    // Add active subscriptions to subscription array
                    subscriptionArray.push(subscription);
                }
            }, this); // provide 'this' as a second argument to have access to it
		}
    };
    return appServiceBase;
});
