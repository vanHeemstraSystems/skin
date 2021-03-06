/*
 * AppControllerBase
 */
define(function () {
    console.log('SKIN: appControllerBase called');
    function appControllerBase(id) {
        this.id = id;
        this.appArray = {};
    };
    function cloneObject(oldObject) {
    	function F() {}
    	F.prototype = oldObject;
    	return new F();
    };    
    appControllerBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('SKIN: appControllerBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
		},
		setStoreName: function (storeName) {
			console.log('SKIN: appControllerBase setStoreName(storeName) called');
			this.storeName = storeName;
		},
		setApp: function (app) {
			console.log('SKIN: appControllerBase setApp(app) called');		
			this.app = app;
			// app is a template, ready to be made specific based on the apps in the config
			var store_not_found = true; // default to true
			// lookup store in store_list
			var configs = this.config.getConfigs();
			var store_list = configs.store_list;
			for (key in store_list) {
				if(key == this.storeName) {
					console.log('SKIN: appControllerBase storeName ' + this.storeName + ' found in store_list');
					store_not_found = false;
					var store_configs = store_list[key];
					console.log('SKIN: appControllerBase store_configs')
					console.log(store_configs);
					// continue for apps ....
					if(typeof store_configs.apps === 'undefined') {
						console.log('SKIN: appControllerBase no apps found for storeName ' + this.storeName);
						var apps = {};
					}
					else {
						console.log('SKIN: appControllerBase apps found for storeName ' + this.storeName);
						console.log(store_configs.apps);
						var apps = store_configs.apps;
					}
					var i = 0;
					for (key in apps) {
						console.log('SKIN: appControllerBase app ' + key + ' found in apps');
						var app_keyValuePairs = apps[key];
						console.log('SKIN: appControllerBase app ' + key + ' key value pairs:');
						console.log(app_keyValuePairs);
						// appService is a template, ready to be made specific based on the new app's keyValuePairs
						// Create a new appService
						var newAppService = cloneObject(this.appService);
						newAppService.setServiceBus(this.serviceBus);
						// Set subscriptions to newAppService
						for(key in app_keyValuePairs) {
							if(key == 'subscriptions') {
								var subscriptions = app_keyValuePairs[key];
								console.log('SKIN: appControllerBase subscriptions in key value pairs:');
								console.log(subscriptions);
								newAppService.setSubscriptions(subscriptions);
							}
						}
						// Create a new app for these keyValuePairs
						var newApp = cloneObject(this.app);
						newApp.setKeyValuePairs(app_keyValuePairs);
						// Set new app service on the new app
						newApp.setAppService(newAppService);
						// Add new app to view array
						this.appArray[i] = newApp;
						console.log('SKIN: appControllerBase appArray [' + i + ']');
						console.log(this.appArray[i]);
						// Increase i by 1
						i++;
					}
					console.log('SKIN: appControllerBase appArray');
					console.log(this.appArray);			
				}
			}// eof for
			if(store_not_found) {
				console.log('SKIN: appControllerBase storeName ' + this.storeName + 'not found in store_list');
			}
		},	
		setAppService: function (appService) {
			console.log('SKIN: appControllerBase setAppService(appService) called');		
			this.appService = appService;
		},
		setAppEvent: function (appEvent) {
			console.log('SKIN: appControllerBase setAppEvent(appEvent) called');			
			this.appEvent = appEvent;
		},
		setConfig: function(config) {
			console.log('SKIN: appControllerBase setConfig(config) called');		
			this.config = config;
		},
    	loadApp: function (id) {
			console.log('SKIN: appControllerBase loadApp(id) called');    		
	        // Get the appService from the app array
	    // OLD    var appService = this.appService.find(id);
	        // Get a new app
	    // OLD    var app = new this.app(appService);
	        // run the app's render function
	    //    app.render();
	    },
	    subscribeAppService: function() {
			console.log('SKIN: appControllerBase subscribeAppService() called'); 
	        // Get the appService from the app in the appArray
	        for (key in this.appArray) {
	        	console.log('SKIN: appControllerBase app ' + key + ' in appArray');
	        	var app = this.appArray[key];
	        	console.log(app);
	        	for (key in app) {
	        		if (key == 'appService') {
	        			var appService = app[key];
	        			appService.subscribe();
	        		}
	        	}
	        }
	    },	    
        renderView: function (bodyDom) {
			console.log('SKIN: appControllerBase renderView(bodyDom) called');    	
        // OLD    bodyDom.prepend('<h2>AppController ' + this.id + ' says "' +
        // OLD              this.app.getTitle() + '"</h2>');
        }
    };
    return appControllerBase;
});