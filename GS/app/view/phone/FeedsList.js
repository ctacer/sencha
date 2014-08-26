Ext.define('GS.view.phone.FeedsList', {
  extend: 'GS.view.FeedsList',
  xtype: 'phone-feedslist',

  requires: [
    'GS.store.Feeds',
    'GS.view.FeedListItem'
  ],

  config: {
    title: 'Feeds', 
    listeners: { 
      activate: function(self) { 
        var navBar = Ext.ComponentQuery.query('phone-mainpanel')[0].getNavigationBar();

        navBar.add({
            xtype: 'button',
            text: 'Refresh all feeds',
            name: 'refresh-feeds',
            align: 'right'
        });

        navBar.add({
            xtype: 'button',
            text: 'Add',
            name: 'add-button',
            align: 'right'
        });
      },
      deactivate: function (self) {
        var addButton = Ext.ComponentQuery.query('phone-mainpanel button[name="add-button"]')[0];
        var refreshButton = Ext.ComponentQuery.query('phone-mainpanel button[name="refresh-feeds"]')[0];
        addButton.destroy();
        refreshButton.destroy();
      }
    }

  }
})