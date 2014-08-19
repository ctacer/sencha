
Ext.define('GS.controller.Components', {
    extend: 'Ext.app.Controller',

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

        var popup = Ext.create('Ext.Panel', {
            modal : true,
            xtype: 'addrsspanel',
            centered : true,
            width : '80%',
            height : 400,
            layout : 'fit',
            hideOnMaskTap: true,

            items : [{
                docked : 'top',
                xtype : 'toolbar',
                title : 'Add RSS Item'
            }, {
                xtype : 'formpanel',
                items : [{
                    xtype : 'textfield',
                    name : 'title',
                    label : 'rss title'
                },{
                    xtype : 'textfield',
                    name : 'link',
                    label : 'rss source(url)'
                },{
                    xtype : 'button',
                    text : 'Submit',
                    style: "margin-top: 20px;",
                    handler: function () {
                      var data = this.up('formpanel').getValues();
                      var store = Ext.getStore('Feeds');
                      // data.id = store.createId();
                      store.createFeed(data);
                      // store.add(data);
                      // store.save();
                      popup.hide();
                    }
                }]
            }],
            scrollable : false
        });
        Ext.Viewport.add(popup);

        popup.show();
    }

});