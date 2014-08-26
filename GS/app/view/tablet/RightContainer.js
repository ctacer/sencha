

!function () {

  var refreshFeedButton = {
    xtype: 'button',
    text: 'Refresh feeds',
    name: 'refresh-feed',
    align: 'right',
    cls: 'visible'
  };

  var destroyButton = function (button) {
    var buttonObj = Ext.ComponentQuery.query('tablet-right-container button[name="' + button.name + '"]')[0];
    buttonObj && buttonObj.destroy();
  };

  Ext.define("GS.view.tablet.RightContainer", {
    extend: 'Ext.navigation.View',
    xtype: 'tablet-right-container',

    config: {

      id: 'tablet-right-container',

      items: [ ],
      listeners: {
        activate: function () {
          var navBar = Ext.ComponentQuery.query('tablet-right-container')[0].getNavigationBar();

          var btns = navBar.query('button');
          btns[0].destroy();
        },
        activeitemchange: function (navView, value, oldValue, eOpts ) {
          var navBar = Ext.ComponentQuery.query('#tablet-right-container')[0].getNavigationBar();

          if (value.config.xtype == 'feeddetail') {
            destroyButton(refreshFeedButton);
            navBar.add(refreshFeedButton);
          }
          else if (value.config.xtype == 'newsdetails') {
            destroyButton(refreshFeedButton);
          }
          else {
            destroyButton(refreshFeedButton);
          }
        }
      }
    }

  });

} ();