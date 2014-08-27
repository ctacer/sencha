Ext.define('GS.controller.phone.NavigationRoute', {
    extend: 'GS.controller.NavigationRoute',
    
    config: {
        refs: {
            main: 'phone-mainpanel'
        },

        routes: {
            '': 'showHomePage',
            'feed/:id': 'showFeedById',
            'feed/:id/entry/:entryId': 'showNewsDetailsById'
        },

        control: {
            'phone-mainpanel' : {
                back: 'backHistory'
            }
        }
    },

    showHomePage: function () {        
        this.superclass.showHomePage.call(this);
    },

    showFeedById: function (id) {
        var args = Array.prototype.map.call(arguments, function (item) { return item; });
        args.push(this.showFeed);

        this.superclass.showFeedById.apply(this, args);
    },

    showNewsDetailsById: function (id, entryId) {
        var args = Array.prototype.map.call(arguments, function (item) { return item; });
        args.push(this.showNewsDetails);

        this.superclass.showNewsDetailsById.apply(this, args);
    },

    showNewsDetails: function (record) {
        this.getMain().push({
            xtype: 'newsdetails',
            title: record.data.title,
            data: record.data
        }); 
    },

    showFeed: function (record) {
        var data = record.getEntries();
        var container = {
            xtype: 'feeddetail',
            title: record.data.title
        };
        if (data) {
            container.data = data;
        }

        this.getMain().push(container);
    }

});