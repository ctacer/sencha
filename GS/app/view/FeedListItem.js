Ext.define('GS.view.FeedListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'feedlistitemview',

    requires: [
        'Ext.Button',
        'Ext.Component'
    ],
 
    config: {
        button: {            
            iconCls: 'refresh',
            iconMask: true,
            cls: 'visible'
        },

        cls: 'feed-list-item',

        dataMap: {
            getButton: {
                
            },
            
            getTitle: {
                setHtml: 'title'
            }
        },
 
        title: {
            cls: 'x-name',
            flex: 1
        },
 
        layout: {
            type: 'hbox',
            align: 'center'
        }

    },

    applyButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getButton());
    },

    updateButton: function(newButton, oldButton) {
        if (newButton) {
            this.add(newButton);
        }

        if (oldButton) {
            this.remove(oldButton);
        }
    },

    applyTitle: function (config) {
        return Ext.factory(config, Ext.Component, this.getTitle());
    },

    updateTitle: function (newTitle, oldTitle) {
        if (newTitle) {
            this.add(newTitle);
        }

        if (oldTitle) {
            this.remove(oldTitle);
        }
    }

});