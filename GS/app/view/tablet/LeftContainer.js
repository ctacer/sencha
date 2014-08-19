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
    ]
  }

});