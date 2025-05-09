Ext.define('Nestly.store.LocationStore', {
    extend: 'Ext.data.Store',
    alias: 'store.locationstore',

    fields: ['name'],

    data: [
        { name: 'Antigua Guatemala' },
        { name: 'Monterrico' },
        { name: 'Panajachel' },
        { name: 'Semuc Champey' },
        { name: 'Tikal' }
    ]
});
