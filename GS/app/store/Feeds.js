  
!function () {

  "use strict";

  // var defaultStore = { 'id' : 0, 'title' : 'BBC europe', 'link' : 'http://feeds.bbci.co.uk/news/world/europe/rss.xml' };

  Ext.define('GS.store.Feeds', {
    extend: 'Ext.data.Store',

    config: {
      autoLoad: true,
      /*autoSync: true,*/
      
      model: 'GS.model.FeedDetail',
      sorters: 'title'
      
    },

    save: function () {
      this.each(function (record) {
        record.saveFeed();
      });
    },

    delete: function (recordToDelete) {
      this.remove(recordToDelete);
      this.sync();
    },

    createId: function () {
      var data = this.getData();

      var lastId = data.items.reduce(function (result, item) {
        return result > item.data.id ? result : item.data.id;
      }, -1);
      lastId = Math.max(-1, lastId);

      return ++lastId;
    },

    createFeed: function (data, callback) {
      callback = callback || function () {};

      var id = this.createId();
      var self = this;

      var done = function (obj) {
        obj.id = id;
        obj.entries = obj.entries.map(function (item, index) {
          item.id = index;
          item.referenceId = id;
          return item;
        });
        debugger;
        var model = new GS.model.FeedDetail(obj);
        self.add(model);
        self.save();
        debugger;
        callback();
      };

      $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(data.link),
        dataType: 'json',
        success: function(data) {
          if(data && data.responseData && data.responseData.feed) {
            done(data.responseData.feed);
          }
          else {
            callback();
          }
        },
        fail: function () {
          callback();
        }
      });
    }

  });

} ();