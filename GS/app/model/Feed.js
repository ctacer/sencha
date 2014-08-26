Ext.define('GS.model.Feed', {
  extend: 'Ext.data.Model',

  requires: [
    'GS.proxy.WebStorageProxy'
  ],

  config: {
    fields: ['id', 'title', 'feedUrl', 'link', 'description', 'author', 'type', 'originalLink'],
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
      id: 'feeds'
    }
  },

  /**
   * function returns id of feed model
   */
  getIdValue: function () {
    return this.get('id');
  },

  /**
   * function saves a feed an also save relative entries
   */
  saveFeed: function () {
    this.entries().sync();
    this.save();
  },

  /**
   * function removes all entries related to current feed, and feed itself
   */
  removeFeed: function () {
    var entries = this.getNativeEntries();
    var store = this.entries();

    this.erase();

    Array.prototype.slice.call(entries, 0)
      .forEach(function (entry) {
        store.remove(entry);
      });

    store.sync();

    this.destroy();
  },

  /**
   * function returns all entries related to current feed as array of sencha models
   */
  getNativeEntries: function () {
    var referenceId = this.get('id');
    var entries = this.entries().getData().items;

    return Array.prototype.slice.call(entries, 0)
      .filter(function (record) {
        return record.get('referenceId') == referenceId;
      });
  },

  /**
   * function returns entry by its id
   */
  getEntryById: function (id) {
    var entries = this.getNativeEntries();

    return Array.prototype.slice.call(entries, 0)
      .reduce(function (result, record) {
        if (record.getIdValue() == id) return record;
        return result;
      }, null);
  },

  /**
   * function returns entries array (in data format, not sencha's model format)
   */
  getEntries: function () {
    var entries = this.getNativeEntries();

    return Array.prototype.slice.call(entries, 0)
      .map(function (record, index) {
        record.data.id = index;
        return record.data;
      });
  }

});