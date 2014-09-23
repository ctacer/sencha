
!function () {

  var destroyButton = function (button) {
    var buttonObj = Ext.ComponentQuery.query('phone-mainpanel button[name="' + button.name + '"]')[0];
    buttonObj && buttonObj.destroy();
  };

  var backToHomeScreenButton = {
    xtype: 'button',
    text: 'Back to home screen',
    name: 'back-to-home-button',
    align: 'left'
  };

  Ext.define('GS.view.phone.NewsDetails', {
    extend: 'GS.view.NewsDetails',
    xtype: 'phone-newsdetails',

    config: {
      listeners: { 
        activate: function(self) { 
          var navBar = Ext.ComponentQuery.query('phone-mainpanel')[0].getNavigationBar();
          navBar.add(backToHomeScreenButton);
        },
        deactivate: function (self) {
          destroyButton(backToHomeScreenButton);
        }
      }
    }
    
  });

} ();