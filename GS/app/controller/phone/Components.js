
Ext.define('GS.controller.phone.Components', {
    extend: 'GS.controller.Components',

    requires: [
        
    ],
    
    config: {
        refs: { 
        },

        control: {
            'navigationview button[name=add]': {
                tap: 'addFeed'
            },
        }
    }

});