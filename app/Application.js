Ext.define('Nestly.Application', {
    extend: 'Ext.app.Application',

    name: 'Nestly',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        'Nestly.store.RoomStore',
        'Nestly.store.BranchStore',
        'Nestly.store.OfferStore'
    ],

    launch: function () {
        console.log('🚀 Aplicación iniciada correctamente');
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Actualización', 'Hay una nueva versión de la app. ¿Deseás recargarla?', function (choice) {
            if (choice === 'yes') {
                window.location.reload();
            }
        });
    }
});
