
Ext.define('GS.controller.phone.FeedsList', {
    extend: 'GS.controller.FeedsList',
    
    config: {
        refs: { 
            main: 'phone-mainpanel',
            mask: 'phone-mainpanel'
        },

        control: {
            'phone-feedslist': {
                itemtap: 'tapFeed',
                itemtaphold: 'tapHoldFeed'
            }
        }
    }

});