Ext.define('Nestly.store.ReservationStore', {
    extend: 'Ext.data.Store',
    alias: 'store.reservationstore',

    model: 'Nestly.model.Reservation',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:5231/api/Reservation', // 🔁 Ajustalo si tu endpoint cambia
        reader: {
            type: 'json',
            rootProperty: '' // si tu API devuelve un array directo
        },
        writer: {
            type: 'json'
        }
    },

    autoLoad: true
});
