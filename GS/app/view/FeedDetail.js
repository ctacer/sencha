Ext.define('GS.view.FeedDetail', {
  extend: 'Ext.List',
  xtype: 'feeddetail',

  requires: [
    'Ext.plugin.ListPaging'
  ],

  config: {
    styleHtmlContent: true,

    scrollable: true,
    onItemDisclosure: true,
    plugins: [
      {
        xclass: 'Ext.plugin.ListPaging',
        autoPaging: true
      }
    ],
    disableSelection: true,
    itemTpl: '{title}'

  }

});