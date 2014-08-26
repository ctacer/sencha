Ext.define('GS.view.FeedsList', {
  extend: 'Ext.List',
  xtype: 'feedslist',

  requires: [
    'GS.store.Feeds'
  ],

  config: {
    itemTpl: "{title}",
    store: 'Feeds',
    
    scrollable: true,
    styleHtmlContent: true,
    onItemDisclosure: true,
    disableSelection: true

  }
})