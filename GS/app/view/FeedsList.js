Ext.define('GS.view.FeedsList', {
  extend: 'Ext.dataview.DataView',
  xtype: 'feedslist',

  requires: [
    'GS.store.Feeds',
    'GS.view.FeedListItem'
  ],

  config: {
    useComponents: true,
    defaultType: 'feedlistitemview',
    store: 'Feeds',
    
    scrollable: true,
    styleHtmlContent: true

  }
})