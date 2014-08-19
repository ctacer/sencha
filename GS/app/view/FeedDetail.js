Ext.define('GS.view.FeedDetail', {
  extend: 'Ext.List',
  xtype: 'feeddetail',

  requires: [
    'GS.store.FeedDetail',
    'Ext.plugin.ListPaging'
  ],

  config: {
    styleHtmlContent: true,

      // store: 'FeedDetail',
      scrollable: true,
      onItemDisclosure: true,
      plugins: [
        {
          xclass: 'Ext.plugin.ListPaging',
          autoPaging: true
        }
      ],
      itemTpl: '{title}'

  }

});