
!function () {

  var destroyButton = function (button) {
    var buttonObj = Ext.ComponentQuery.query('phone-mainpanel button[name="' + button.name + '"]')[0];
    buttonObj && buttonObj.destroy();
  };

  var addButton = {
    xtype: 'button',
    text: 'Add',
    name: 'add-button',
    align: 'right'
  };

  var refreshFeedsButton = {
    xtype: 'button',
    text: 'Refresh all feeds',
    name: 'refresh-feeds',
    align: 'right'
  };

  Ext.define('GS.view.phone.FeedsList', {
    extend: 'GS.view.FeedsList',
    xtype: 'phone-feedslist',

    requires: [
      'GS.store.Feeds'
    ],

    config: {
      title: 'Feeds', 
      listeners: { 
        activate: function(self) { 
          var navBar = Ext.ComponentQuery.query('phone-mainpanel')[0].getNavigationBar();
          destroyButton(addButton);
          destroyButton(refreshFeedsButton);
          navBar.add(refreshFeedsButton);
          navBar.add(addButton);
        },
        deactivate: function (self) {
          destroyButton(addButton);
          destroyButton(refreshFeedsButton);
        }
      }
    }
    
  });

} ();