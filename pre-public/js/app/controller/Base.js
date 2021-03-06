/*
 * ControllerBase
 */
define(function () {
    console.log('SKIN: controllerBase called');
    function controllerBase(id) {
        this.id = id;
    };
    controllerBase.prototype = {
    	setStoreName: function (storeName) {
			console.log('SKIN: controllerBase setStoreName(storeName) called');
			this.storeName = storeName;
		},
		setAppController: function (appController) {
			console.log('SKIN: controllerBase setAppController(appController) called');
			this.appController = appController;
			this.appController.setStoreName(this.storeName);
			this.appController.setConfig(this.config);
            this.appController.setServiceBus(this.serviceBus);		
		},
		setAppEvent: function (appEvent) {
			console.log('SKIN: controllerBase setAppEvent(appEvent) called');
			this.appEvent = appEvent;
			this.appController.setAppEvent(appEvent);
		},
		setAppService: function (appService) {
			console.log('SKIN: controllerBase setAppService(appService) called');			
			this.appService = appService;
			this.appController.setAppService(appService);			
		},
        setApp: function (app) {
        	console.log('SKIN: controllerBase setApp(app) called');
            this.app = app;
            this.appController.setApp(app);	
        },
		loadApp: function (id) {
			console.log('SKIN: controllerBase loadApp(id) called');			
			this.appController.loadApp(id);
		},   
        subscribeAppService: function() {
        	console.log('SKIN: controllerBase subscribeAppService() called');
        	this.appController.subscribeAppService(); 
        },
        setConfig: function (config) {
        	console.log('SKIN: controllerBase setConfig(config) called');
            this.config = config;
        },	
		setServiceBus: function (serviceBus) {
			console.log('SKIN: controllerBase setServiceBus(serviceBus) called');
			this.serviceBus = serviceBus;			
		},
		setViewController: function (viewController) {
			console.log('SKIN: controllerBase setViewController(viewController) called');	
			this.viewController = viewController;
			this.viewController.setStoreName(this.storeName);			
			this.viewController.setConfig(this.config);
			this.viewController.setServiceBus(this.serviceBus);
		},
		setViewEvent: function (viewEvent) {
			console.log('SKIN: controllerBase setViewEvent(viewEvent) called');
			this.viewEvent = viewEvent;
			this.viewController.setViewEvent(viewEvent);
		},		
		setViewService: function (viewService) {
			console.log('SKIN: controllerBase setViewService(viewService) called');			
			this.viewService = viewService;
			this.viewController.setViewService(viewService);		
		},
		setView: function (view) {
			console.log('SKIN: controllerBase setView(view) called');			
			this.view = view;
			this.viewController.setView(view);
		},
		loadView: function (id) {
			console.log('SKIN: controllerBase loadView(id) called');			
			this.viewController.loadView(id);
		},
        renderView: function (elementId) {
        	console.log('SKIN: controllerBase renderView(elementId) called');     	
			this.viewController.renderView(elementId);
        },
        subscribeViewService: function() {
        	console.log('SKIN: controllerBase subscribeViewService() called');
        	this.viewController.subscribeViewService(); 
        }
    };
    return controllerBase;
});
