
Ext.define('GS.controller.phone.Components', {
    extend: 'GS.controller.Components',

    requires: [
        
    ],
    
    config: {
        refs: { 
            mask: 'phone-mainpanel',
            container: 'phone-mainpanel feeddetail'
        },

        control: {
            'navigationview button[name="add-button"]': {
                tap: 'addFeed'
            },
            'navigationview button[name="refresh-feeds"]': {
                tap: 'refreshFeeds'
            },
            'feeddetail' : {
                activate: 'activateFeedDetail',
                deactivate: 'deactivateFeedDetail'
            },
            'navigationview button[name="refresh-feed"]': {
                tap: 'refreshFeed'
            }
        }
    },

    activateFeedDetail: function(self) { 
        var navBar = Ext.ComponentQuery.query('phone-mainpanel')[0].getNavigationBar();

        navBar.add({
            xtype: 'button',
            text: 'Refresh feeds',
            name: 'refresh-feed',
            align: 'right'
        });
    },

    deactivateFeedDetail: function (self) {
        var refreshButton = Ext.ComponentQuery.query('phone-mainpanel button[name="refresh-feed"]')[0];
        refreshButton.destroy();
    }

});