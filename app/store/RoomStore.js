Ext.define('Nestly.store.RoomStore', {
    extend: 'Ext.data.Store',
    alias: 'store.roomstore',

    model: 'Nestly.model.Room',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:5231/api/Room', // o el endpoint real que uses
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },

    autoLoad: true
});
