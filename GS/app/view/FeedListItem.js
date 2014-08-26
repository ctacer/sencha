Ext.define('GS.view.FeedListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'feedlistitemview',

    requires: [
        'Ext.Button',
        'Ext.Component'
    ],
 
    config: {

        cls: 'feed-list-item',

        dataMap: {            
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