
!function () {

    var destroyButton = function (button) {
        var buttonObj = Ext.ComponentQuery.query('phone-mainpanel button[name="' + button.name + '"]')[0];
        buttonObj && buttonObj.destroy();
    };

    var refreshButton = {
        xtype: 'button',
        text: 'Refresh feeds',
        name: 'refresh-feed',
        align: 'right'
    };

    Ext.define('GS.controller.phone.Components', {
        extend: 'GS.controller.Components',

        requires: [
            
        ],
        
        config: {
            refs: { 
                mask: 'phone-mainpanel',
                mainPanel: 'phone-mainpanel',
                container: 'phone-mainpanel feeddetail'
            },

            control: {
                'navigationview button[name="add-button"]': {
                    tap: 'addFeed'
                },
                'navigationview button[name="refresh-feeds"]': {
                    tap: 'refreshFeeds'
                },
                'feeddetail' : {
                    activate: 'activateFeedDetail',
                    deactivate: 'deactivateFeedDetail'
                },
                'navigationview button[name="refresh-feed"]': {
                    tap: 'refreshFeed'
                }
            }
        },

        activateFeedDetail: function(self) { 
            var navBar = Ext.ComponentQuery.query('phone-mainpanel')[0].getNavigationBar();
            destroyButton(refreshButton);
            navBar.add(refreshButton);
        },

        deactivateFeedDetail: function (self) {
            destroyButton(refreshButton);
        },

        refreshFeed: function () {
            var procceedMethod = function (record, entries, container) {
                this.redirect('feed/' + record.data.id);
            }.bind(this);

            this.superclass.refreshFeed.call(this, procceedMethod);

        }

    });

} ();