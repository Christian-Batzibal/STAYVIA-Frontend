Ext.define('Nestly.store.MyReservationStore', {
    extend: 'Ext.data.Store',
    alias: 'store.myreservationstore',

    model: 'Nestly.model.MyReservation',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'http://localhost:5231/api/Reservation',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    }
});
