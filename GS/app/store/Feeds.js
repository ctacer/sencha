  
!function () {

  "use strict";

  // var defaultStore = { 'id' : 0, 'title' : 'BBC europe', 'link' : 'http://feeds.bbci.co.uk/news/world/europe/rss.xml' };

  Ext.define('GS.store.Feeds', {
    extend: 'Ext.data.Store',

    requires: [
      'Ext.data.JsonP'
    ],

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
      return document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load';
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

    feedExists: function (link) {
      var exist = false;
      this.each(function (model) {
        if (model.data.originalLink == link) {
          exist = true;
        }
      });

      return exist;
    },

    /**
     * function creates new feed by link adress
     */
    createFeed: function (link, callback) {     
      callback = callback || function () {};

      if (this.feedExists(link)) {
        return callback();
      }

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

      Ext.data.JsonP.request({
        url: this.buildGoogleFeedParserLink(link),
        params: {
          v: '1.0',
          num: 10,
          q: (link)
        },
        success: function (data) {
          if(data && data.responseData && data.responseData.feed) {
            callback(data.responseData.feed);
          }
          else {
            callback();
          }
        },
        failure: function () {
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
        callback(model, model.getEntries());
      };
      
      this.loadFeedData(feed.data.originalLink, dataLoaded);
    },

    refreshAll: function (callback) {
      callback = callback || function () {};      
      var data = [];
      this.each(function (model) {
        data.push(model);
      });

      async.each(data, 
        function (feed, cb) {
          this.refreshFeed(feed, function () { cb(); });
        }.bind(this), 

        function (error, result) {
          if (error) {
            console.error(error);
            return;
          }
          callback && callback();
        }
      );
    }

  });

} ();