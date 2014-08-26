

!function () {

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

            var successRefresh = function () {
                this.redirect('feed/' + record.data.id);
            }.bind(this);

            var addLoadingMask = function () {
                this.getMask().setMasked({ xtype: 'loadmask' });
            }.bind(this);

            var destroyLoadingMask = function () {
                this.getMask().setMasked(false);
            }.bind(this);

            var actionSheet = Ext.create('Ext.ActionSheet', {
                hideOnMaskTap: true,
                items: [
                    {
                        text: 'Delete item',
                        ui  : 'decline',
                        handler: function () {
                            Ext.getStore('Feeds').deleteFeed(record);
                            actionSheet.hide();
                        }
                    },
                    {
                        text: 'Refresh feed',
                        handler: function () {
                            addLoadingMask();
                            Ext.getStore('Feeds').refreshFeed(record, function () {
                                actionSheet.hide();
                                successRefresh();
                                destroyLoadingMask();
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

 } ();