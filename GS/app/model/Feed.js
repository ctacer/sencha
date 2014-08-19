
Ext.define('GS.model.Feed', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.proxy.LocalStorage',
    'GS.proxy.WebStorageProxy'
  ],

  config: {
    
    fields: [
     { name: 'id', type: 'int' },
     { name: 'title', type: 'string' },
     { name: 'link', type: 'string' },
     { name: 'ref', type: 'obj' }
    ],

    idProperty: 'id',

    proxy: {
      type: 'localstorage',
      sourceStore: 'GS.proxy.WebStorageProxy',
      id: 'feeds'
    }
  },

  bind: function () {
    this;
    debugger;
  },

  loadFeedDetails: function (callback) {

    var self = this;
    self.data.id = parseInt(self.data.id);

    var injectReference = function (obj) {

      obj.id = self.data.id;
      obj.entries = obj.entries.map(function (item, index) {
        item.id = index;
        item.referenceId = self.data.id;
        return item;
      });

      var ref = new GS.model.FeedDetail(obj);
      ref.setEntries(obj.entries);
      ref.save();
      ref.getEntries();
      self.data.ref = ref;
      debugger;
      return obj;
    };

    $.ajax({
      url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(this.data.link),
      dataType: 'json',
      success: function(data) {        
        callback(data && data.responseData && data.responseData.feed ? injectReference(data.responseData.feed) : []);
      }
    });

  },

  fromModels: function (modelsArr) {
    return modelsArr.map(function (model) { return model.unwrap(); });
  },

  getNewList: function () {
    debugger;
    return this.data.ref ? this.data.ref.getEntries() : null;    
  }

});