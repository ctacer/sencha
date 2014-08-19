Ext.define('GS.model.Entry', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.identifier.Uuid'
  ],

  config: {
    fields: [
      { name : 'entry_id', type: 'int' },
      { name : 'referenceId', type: 'int' },
      { name : 'title', type: 'string' },
      { name : 'link', type: 'string' },
      { name : 'publishedDate', type: 'string', sortType: 'asDate' },
      { name : 'author', type: 'string' },
      { name : 'content', type: 'string' } 
    ],
    belongsTo: 'FeedDetail',
    identifier: {
      type: 'uuid'
    },

    idProperty: 'entry_id',

    /*proxy: {
      type: 'localstorage',
      sourceStore: 'GS.proxy.WebStorageProxy',
      id: 'feed-entries'
    },*/

    unwrap: function () {
      return this.data;
    }
  }
});