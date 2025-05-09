Ext.define('Nestly.store.BranchStore', {
    extend: 'Ext.data.Store',
    alias: 'store.branchstore',

    fields: ['Id', 'Name', 'Location'], // ✅ deben coincidir con el JSON

    proxy: {
        type: 'ajax',
        url: 'http://localhost:5231/api/Branch',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },

    autoLoad: true
});
