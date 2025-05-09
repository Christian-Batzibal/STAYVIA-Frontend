Ext.define('Nestly.store.OfferStore', {
    extend: 'Ext.data.Store',
    alias: 'store.offerstore',

    model: 'Nestly.model.Offer', // 👈 ESTA línea es la clave

    proxy: {
        type: 'ajax',
        url: 'http://localhost:5231/api/Offer',
        reader: {
            type: 'json',
            rootProperty: '' // está bien si la respuesta es un array
        }
    },

    autoLoad: true
});
