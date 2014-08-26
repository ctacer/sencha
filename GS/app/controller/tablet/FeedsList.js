
Ext.define('GS.controller.tablet.FeedsList', {
    extend: 'GS.controller.FeedsList',
    
    config: {
        refs: { 
            main: 'mainpanel',
            mask: 'tablet-right-container'
        },

        control: {
            'tablet-feedslist': {
                itemtap: 'tapFeed',
                itemtaphold: 'tapHoldFeed'
            }
        }
    }

});