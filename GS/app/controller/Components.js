
Ext.define('GS.controller.Components', {
    extend: 'GS.controller.Route',

    requires: [
        'Ext.form.Panel',
        'Ext.ActionSheet'
    ],
    
    config: {
        refs: { 
        },

        control: {            
        }
    },

    addFeed: function (button, event, eOpts) {
        
        event.stopPropagation();

        Ext.Msg.prompt(
            'Add Feed',
            null,
            function (buttonId, value) {
                if (buttonId == "ok") {
                    Ext.getStore('Feeds').createFeed(value);
                }
            },
            null,
            false,
            null,
            { autoCapitalize : true, placeHolder : 'Valid Feed url please...' }
        );        
    },

    refreshFeeds: function (button, event, eOpts) {
        this.getMask().setMasked({ xtype: 'loadmask' });
        Ext.getStore('Feeds').refreshAll(function () {
            this.getMask().setMasked(false);
            console.log('done');
        }.bind(this));
    },

    refreshFeed: function (procceedMethod) {
        procceedMethod = procceedMethod || function () {};

        var record = {};
        var container = this.getContainer();
        if (!container) return;

        var data = container.getData();
        if (!data || !data.length) return;

        var referenceId = data[0].referenceId;
        var record = Ext.getStore('Feeds').getFeedById(referenceId);
        if (!record) return;

        this.getMask().setMasked({ xtype: 'loadmask' });
        Ext.getStore('Feeds').refreshFeed(record, function (refreshedRecord, entries) {            
            this.getMask().setMasked(false);
            procceedMethod(refreshedRecord, entries, container);
        }.bind(this));
    }

});