
Ext.define('GS.controller.tablet.FeedsList', {
    extend: 'GS.controller.FeedsList',
    
    config: {
        refs: { 
            main: 'mainpanel'
        },

        control: {
            'tablet-feedslist': {
                itemtap: 'tapFeed',
                itemtaphold: 'tapHoldFeed'
            }
        }
    }

});