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
        Ext.ComponentQuery.query('phone-mainpanel')[0].getNavigationBar().add({
            xtype: 'button',
            text: 'Add',
            name: 'add',
            align: 'right'
        });
      },
      deactivate: function (self) {
        var addButton = Ext.ComponentQuery.query('phone-mainpanel button[name=add]')[0];
        addButton.destroy();
      }
    }

  }
})