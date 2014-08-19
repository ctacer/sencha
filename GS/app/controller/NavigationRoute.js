Ext.define('GS.controller.NavigationRoute', {
    extend: 'GS.controller.Route',
    
    config: {
        refs: {
        },

        routes: {            
        },

        control: {
        }
    },

    showHomePage: function () {
        
        // Ext.getStore('FeedDetail').removeAll();
        // Ext.getStore('FeedDetail').setData([]);

        this.saveHistory('');
    },

    showFeedById: function (id, success) {
        success = success || function () {};

        var store = Ext.getStore('Feeds');
        var record = store.getById(id);
        if (record) {
            success.call(this, record);

            this.saveHistory('feed/' + id);
        }
        else {
            this.redirect('');
        }
    },

    showNewsDetailsById: function (id, entryId, success) {
        success = success || function () {};

        var detailStore = Ext.getStore('FeedDetail');
        var detailRecord = detailStore.getById(entryId);

        var feedStore = Ext.getStore('Feeds');
        var feedRecord = feedStore.getById(id);


        if (detailRecord && detailRecord.data.referenceId == id) {
            success.call(this, detailRecord, feedRecord);

            this.saveHistory('feed/' + id + '/entry/' + entryId);
        }
        else {
            this.redirect('feed/' + id);
        }
    }


});