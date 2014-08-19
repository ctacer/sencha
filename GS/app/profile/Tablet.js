Ext.define('GS.profile.Tablet', {
    extend: 'Ext.app.Profile',
    
    //define any additional classes your Profile needs here
    config: {
        views: ['Main', 'FeedsList', 'LeftContainer', 'RightContainer'],
        controllers: ['NavigationRoute', 'Components', 'FeedsList']
    },
    
    //this profile will be activated if we detect we're running on a Tablet
    isActive: function(app) {
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('GS.view.tablet.Main'));
    }
});
