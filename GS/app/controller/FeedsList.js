
Ext.define('GS.controller.FeedsList', {
    extend: 'GS.controller.Route',
    
    config: {
        refs: { 
            main: 'mainpanel'
        },

        control: {
        }
    },

    tapFeed: function (list, index, element, record, event) {       
        if (!list.lastTapHold || (list.lastTapHold - Date.now() < -1500)) {
            this.redirect('feed/' + record.data.id);
        }        
        event.stopPropagation();
    },

    tapHoldFeed: function (list, index, element, record, event) {
        list.lastTapHold = Date.now();

        var actionSheet = Ext.create('Ext.ActionSheet', {
            hideOnMaskTap: true,
            items: [
                {
                    text: 'Delete item',
                    ui  : 'decline',
                    handler: function () {
                        console.log('delete');
                        var store = Ext.getStore('Feeds');
                        store.delete(record);
                        actionSheet.hide();
                    }
                },
                {
                    text: 'Refresh draft',
                    handler: function () {
                        
                        record.loadFeedDetails(function (data) {
                            // var store = Ext.getStore('FeedDetail');
                            // store.setData(data.entries);
                            console.log(data);
                            
                            actionSheet.hide();
                        });
                    }
                },
                {
                    text: 'Cancel',
                    ui  : 'confirm',
                    handler: function () {
                        actionSheet.hide();
                    }
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();

        event.stopPropagation();
    }

});