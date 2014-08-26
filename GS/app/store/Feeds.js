  
!function () {

  "use strict";

  // var defaultStore = { 'id' : 0, 'title' : 'BBC europe', 'link' : 'http://feeds.bbci.co.uk/news/world/europe/rss.xml' };

  Ext.define('GS.store.Feeds', {
    extend: 'Ext.data.Store',

    config: {
      autoLoad: true,
      /*autoSync: true,*/
      
      model: 'GS.model.Feed',
      sorters: 'title'
      
    },

    /**
     * function builds link to rss feed parser
     */
    buildGoogleFeedParserLink: function (link) {
      return document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(link);
    },

    /**
     * function saves all feed records
     */
    save: function () {
      this.each(function (record) {
        record.saveFeed();
      });
      this.sync();
    },

    /**
     * function creates new id for new store instance
     */
    createId: function () {
      var data = this.getData();

      var lastId = data.items.reduce(function (result, item) {
        return result > item.data.id ? result : item.data.id;
      }, -1);
      lastId = Math.max(-1, lastId);

      return ++lastId;
    },

    /**
     * function checks if given id is valid
     */
    idIsValid: function (id) {
      return !isNaN(parseFloat(id)) && isFinite(id);
    },

    /**
     * function removes feed from storage
     */
    deleteFeed: function (feed) {
      feed.removeFeed();
      this.sync();
    },

    /**
     * function returns feed from storage by its idd
     */
    getFeedById: function (id) {
      var arrs = [];
      this.each(function (item) { arrs.push(item); });

      return arrs
        .reduce(function (result, record) {
          if (record.getIdValue() == id) return record;
          return result;
        }, null);
    },

    /**
     * function creates new feed by link adress
     */
    createFeed: function (link, callback) {
      callback = callback || function () {};

      var id = this.createId();
      var self = this;      

      var dataLoaded = function (obj) {
        if (!obj) {
          return callback();          
        }

        obj.originalLink = link;
        var model = self.getNewModel(obj);
        self.add(model);
        self.save();
        callback();
      };

      this.loadFeedData(link, dataLoaded);
    },

    /**
     * function creates new feed model using obj
     * @return {} - new feed model
     */
    getNewModel: function (obj, externalId) {
      var id = this.idIsValid(externalId) ? externalId : this.createId();

      obj.id = id;
      obj.entries = obj.entries.map(function (item, index) {
        item.referenceId = id;
        return item;
      });
      var model = new GS.model.Feed(obj);      
      return model;
    },

    /**
     * function loads feed data as json object by link using google's rss parser
     */
    loadFeedData: function (link, callback) {
      callback = callback || function () {};

      $.ajax({
        url: this.buildGoogleFeedParserLink(link),
        dataType: 'json',
        success: function(data) {
          if(data && data.responseData && data.responseData.feed) {
            callback(data.responseData.feed);
          }
          else {
            callback();
          }
        },
        fail: function () {
          callback();
        }
      });
    },

    /**
     * function refreshes given feed
     */
    refreshFeed: function (feed, callback) {
      callback = callback || function () {};

      var self = this;

      var dataLoaded = function (obj) {
        if (!obj) {
          return;
        }

        var id = parseInt(feed.get('id'));
        obj.originalLink = feed.get('originalLink');

        self.deleteFeed(feed);
        var model = self.getNewModel(obj, id);
        self.add(model);
        self.save();
        callback();
      };
      
      this.loadFeedData(feed.data.originalLink, dataLoaded);
    },

    refreshAll: function (callback) {
      callback = callback || function () {};      
      var data = [];
      this.each(function (model) {
        data.push(model);
      });

      async.each(data, this.refreshFeed.bind(this), function (error, result) {
        if (error) {
          console.error(error);
          return;
        }
        callback && callback();
      });
    }

  });

} ();