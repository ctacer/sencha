Ext.define('GS.controller.tablet.NavigationRoute', {
    extend: 'GS.controller.NavigationRoute',
    
    config: {
        refs: {
            main: 'tablet-mainpanel',
            feeddetail: 'feeddetail',
            newsdetails: 'newsdetails',
            leftContainer: 'tablet-left-container',
            rightContainer: 'tablet-right-container'
        },

        routes: {
            '': 'showHomePage',
            'feed/:id': 'showFeedById',
            'feed/:id/entry/:entryId': 'showNewsDetailsById'
        },

        control: {
            'tablet-left-container': {
                back: 'tabletBack'
            },
            leftContainer: {
                back: 'backHistory'
            }
        }
    },

    setTitle: function (target, source) {
        var container;
        if (target == 'left') {
            container = this.getLeftContainer();
        }
        else if (target == 'right') {
            container = this.getRightContainer();
        }
        else {
            return;
        }

        var title = '';
        if (source == 'left') {
            title = this.getLeftContainer().getNavigationBar().getTitle();
        }
        else if (source == 'right') {
            title = this.getRightContainer().getNavigationBar().getTitle();
        }
        else if (typeof source == 'string') {
            title = source;
        }
        else {
            return;
        }

        container.getNavigationBar().setTitle(title);
    },

    tabletBack: function () {
        var rightContainer = this.getRightContainer();
        rightContainer.removeAll();
        this.setTitle('right', 'Feed News');
    },

    showHomePage: function () {
        this.setTitle('right', 'Feed News');
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

    showNewsDetails: function (record, feedRecord) {
        
        var leftContainer = this.getLeftContainer();
        var rightContainer = this.getRightContainer();

        var items = leftContainer.getItems();
        var data = feedRecord.getEntries();
        
        if (items.length == 2) {
            leftContainer.push({
                xtype: 'feeddetail',
                data: data,
                title: feedRecord.data.title
            });
            var details = leftContainer.query('feeddetail')[0];
            /*debugger;
            details.setActiveItem(1);*/
        }        

        rightContainer.push({
            xtype: 'newsdetails',
            data: record.data,
            title: record.data.title
        });

    },

    showFeed: function (record) {
        var data = record.getEntries();

        var rightContainer = this.getRightContainer();
        var items = rightContainer.getItems();

        var feedView = {
            xtype: 'feeddetail',
            styleHtmlContent: true
        };
        if (data) {
            feedView.data = data;
        }

        if (items.length < 10) {
            rightContainer.push(feedView);
        }
        else {
            rightContainer.setItems([feedView]);
        }

        var leftContainer = this.getLeftContainer();
        items = leftContainer.getItems();

        if (items.length > 2) {
            leftContainer.pop();
            this.setTitle('left', 'Feeds');
        }

        this.setTitle('right', record.data.title);
    },

    backHistory: function () {
        this.superclass.backHistory.call(this);
    }

});