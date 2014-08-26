
!function () {

  var addButton = {
    xtype: 'button',
    text: 'Add',
    name: 'add-button',
    align: 'right',
    cls: 'visible'
  };

  var refreshAllButton = {
    xtype: 'button',
    text: 'Refresh all feeds',
    name: 'refresh-feeds',
    align: 'right',
    cls: 'visible'
  };

  var destroyButton = function (button) {
    var buttonObj = Ext.ComponentQuery.query('tablet-left-container button[name="' + button.name + '"]')[0];
    buttonObj && buttonObj.destroy();
  };

  Ext.define("GS.view.tablet.LeftContainer", {
    extend: 'Ext.navigation.View',
    xtype: 'tablet-left-container',

    requires: [
      'GS.view.tablet.FeedsList'
    ],

    config: {

      id: 'tablet-left-container',

      items: [
        { xtype: 'tablet-feedslist' }
      ],

      listeners: {
          activeitemchange: function (navView, value, oldValue, eOpts ) {
            var navBar = Ext.ComponentQuery.query('#tablet-left-container')[0].getNavigationBar();

            if (value.config.xtype == 'feeddetail') {
              destroyButton(refreshAllButton);
              destroyButton(addButton);
            }
            else {
              // -> add + refreshAll
              navBar.add(refreshAllButton);
              navBar.add(addButton);
            }
          },
          activate: function(self) {
            var navBar = Ext.ComponentQuery.query('tablet-left-container')[0].getNavigationBar();

            navBar.add(refreshAllButton);
            navBar.add(addButton);
          },
          deactivate: function (self) {
            destroyButton(refreshAllButton);
            destroyButton(addButton);
          }
        }
    }

  });

} ();