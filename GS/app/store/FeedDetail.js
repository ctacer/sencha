Ext.define('GS.store.FeedDetail', {
  extend: 'Ext.data.Store',

  config: {
    model: 'GS.model.FeedDetail',
    /*sorters: [{  
      property: 'publishedDate',
      direction: 'DESC'
    }],*/

    data: []
  }
  
});