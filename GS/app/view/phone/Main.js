Ext.define("GS.view.phone.Main", {
    extend: 'Ext.navigation.View',
    xtype: 'phone-mainpanel',

    requires: [
        'GS.view.phone.FeedsList',
        'GS.view.FeedDetail'
    ],

    config: {
        items: [            
            { xtype: 'phone-feedslist' }
        ]
    }
});
