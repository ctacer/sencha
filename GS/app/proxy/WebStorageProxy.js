
Ext.define('GS.proxy.WebStorageProxy', {
    override: 'Ext.data.WebStorageProxy',

    update: function(operation, callback, scope) {
        var records = operation.getRecords(),
            length  = records.length,
            ids     = this.getIds(),
            record, id, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);

            //we need to update the set of ids here because it's possible that a non-phantom record was added
            //to this proxy - in which case the record's id would never have been added via the normal 'create' call
            id = record.getId();
            //for comparing number with strings added `+ ""` line
            if (id !== undefined && Ext.Array.indexOf(ids, id + "") == -1) {
                ids.push(id);
            }
        }
        this.setIds(ids);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

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