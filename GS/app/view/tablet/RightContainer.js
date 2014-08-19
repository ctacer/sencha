Ext.define("GS.view.tablet.RightContainer", {
  extend: 'Ext.navigation.View',
  xtype: 'tablet-right-container',

  config: {

    id: 'tablet-right-container',

    items: [ ],
    listeners: { 
      activate: function(self) { 
        var navBar = Ext.ComponentQuery.query('tablet-right-container')[0].getNavigationBar();

        var btns = navBar.query('button');
        btns[0].hide();
        btns[0].destroy();

        navBar.add({
            xtype: 'button',
            text: 'Add',
            name: 'add',
            align: 'right'
        });
      },
      deactivate: function (self) {
        var addButton = Ext.ComponentQuery.query('tablet-right-container button[name=add]')[0];
        addButton.destroy();
      }
    }
  }

});