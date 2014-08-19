Ext.define('GS.controller.Route', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: { },
        routes: { },
        control: { }
    },

    saveHistory: function (url) {
        this.getApplication().getHistory().add(new Ext.app.Action({ url: url }), true);
    },

    redirect: function (url) {
        this.redirectTo(url);
        this.getApplication().getHistory().getActions().pop();
    },

    backHistory: function () {

        var setNewAction = function (actions, record) {
            var newUrl = record._url;
            actions.pop();
            this.saveHistory(newUrl);
        }

        var actions = this.getApplication().getHistory().getActions();
        actions.pop();

        var last = actions[actions.length - 1];
        if (last) {
            setNewAction.call(this, actions, last);
        }
        else {
            this.redirect('');
        }
    }

});