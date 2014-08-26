
Ext.define('GS.controller.tablet.Components', {
    extend: 'GS.controller.Components',

    requires: [
        
    ],
    
    config: {
        refs: {
            mask: '#tablet-right-container',
            container: '#tablet-right-container feeddetail'
        },

        control: {
            '#tablet-left-container button[name="add-button"]': {
                tap: 'addFeed'
            },
            '#tablet-left-container button[name="refresh-feeds"]': {
                tap: 'refreshFeeds'
            },
            '#tablet-right-container button[name="refresh-feed"]': {
                tap: 'refreshFeed'
            }
        }
    }

});