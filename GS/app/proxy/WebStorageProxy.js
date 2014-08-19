
Ext.define('GS.proxy.WebStorageProxy', {
    override: 'Ext.data.WebStorageProxy',

    destroy: function(operation, callback, scope) {

        var records = operation.getRecords(),
            length  = records.length,
            ids     = this.getIds(),


            newIds  = [].concat(ids),
            i;

        for (i = 0; i < length; i++) {
            //for comparing number with strings added `+ ""` line
            Ext.Array.remove(newIds, records[i].getId() + "");
            this.removeRecord(records[i], false);
        }

        this.setIds(newIds);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    }

  });