Ext.define("GS.view.tablet.Main", {
    extend: 'Ext.Container',
    xtype: 'tablet-mainpanel',

    requires: [
        'GS.view.tablet.FeedsList',
        'GS.view.tablet.LeftContainer',
        'GS.view.tablet.RightContainer',
        'GS.view.FeedDetail'
    ],

    config: {
        fullscreen: true,

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },
        items: [
            {                
                xtype: 'container',                
                docked: 'left',
                width : 350,
                layout: 'card',
                cls: 'tablet-feed-list',

                items: [
                    { xtype: 'tablet-left-container' }
                ]
            },
            { xtype: 'tablet-right-container' }
        ]
    }
});
