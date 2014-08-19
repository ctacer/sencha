
Ext.define('GS.controller.Main', {
    extend: 'GS.controller.Route',
    
    config: {
        refs: { },

        control: {
            'feeddetail': {
                disclose: 'showNewsDetails',
                itemtap: 'tapNewsDetails'
            }
        }
    },

    showNewsDetails: function (list, record, element, index, event) {
        this.redirect('feed/' + record.data.referenceId + '/entry/' + record.data.id);
        event.stopPropagation();
    },

    tapNewsDetails: function (list, index, element, record, event) {
        this.redirect('feed/' + record.data.referenceId + '/entry/' + record.data.id);
        event.stopPropagation();
    }

});