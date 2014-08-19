Ext.define('GS.store.Entries', {
  extend: 'Ext.data.Store',

  config: {
    model: 'GS.model.Entry',
    proxy: {
      type: 'localstorage',
      sourceStore: 'GS.proxy.WebStorageProxy',
      id: 'feed-entries'
    }
  }
  
});