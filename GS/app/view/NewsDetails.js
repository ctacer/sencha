Ext.define('GS.view.NewsDetails', {
  extend: 'Ext.Panel',
  xtype: 'newsdetails',

  requires: [
  ],

  config: {
    tpl: [
      '<div>{content}</div>',
      '<div>published: {publishedDate}</div>',
      '<div><a target="_blank" href="{link}">Go to source</a></div>'
    ].join(" "),
    
    scrollable: true,
    styleHtmlContent: true

  }
})