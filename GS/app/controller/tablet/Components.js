
Ext.define('GS.controller.tablet.Components', {
    extend: 'GS.controller.Components',

    requires: [
        
    ],
    
    config: {
        refs: { 
        },

        control: {
            '#tablet-right-container button[text=Add]': {
                tap: 'addFeed'
            }
        }
    }

});