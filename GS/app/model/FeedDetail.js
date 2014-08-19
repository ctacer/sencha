Ext.define('GS.model.FeedDetail', {
  extend: 'Ext.data.Model',

  config: {
    fields: ['id', 'title', 'feedUrl', 'link', 'description', 'author', 'type'],
    hasMany: {
      model: 'GS.model.Entry',
      name: 'entries',
      primaryKey: 'referenceId',
      foreignKey: 'id',
      associationKey: 'entries',
      autoLoad: true,
      store: {
        autoLoad: true,
        model: 'GS.model.Entry',
        storeId: 'EntryStore',
        proxy: {
          type: 'localstorage',
          sourceStore: 'GS.proxy.WebStorageProxy',
          id: 'entries'
        }
      }
    },

    idProperty: 'id',

    proxy: {
      type: 'localstorage',
      sourceStore: 'GS.proxy.WebStorageProxy',
      id: 'feed-details'
    }
  },

  saveFeed: function () {
    this.entries().sync();
    this.save();
  },

  getEntries: function () {
    debugger;
    var referenceId = this.get('id');
    debugger;

    var entries = this.entries().getData().items;

    return Array.prototype.slice.call(entries, 0)
      .filter(function (record) {
        return record.get('referenceId') == referenceId;
      })
      .map(function (record) {
        return record.data;
      });
  },

  setEntries: function (entries) {
    /*var arr = [];
    entries.forEach(function (entry) {
      arr.push(new GS.model.Entry(entry));
    });

    this.data.entries = arr;*/
  }

});