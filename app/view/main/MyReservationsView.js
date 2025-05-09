Ext.define('Nestly.view.main.MyReservationsView', {
    extend: 'Ext.Panel',
    xtype: 'myreservationsview',
    fullscreen: true,
    scrollable: true,

    requires: ['Nestly.store.MyReservationStore'],

    bodyStyle: {
        backgroundImage: 'url(resources/images/FondoMyReservations.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'start'
    },

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            padding: 10,
            items: [
                { xtype: 'component', flex: 1 },
                {
                    xtype: 'button',
                    text: 'Volver al Inicio',
                    iconCls: 'home',
                    handler: function () {
                        Ext.ComponentQuery.query('mainview')[0].setActiveItem('index');
                    }
                }
            ]
        },
        {
            xtype: 'component',
            html: '<h2 style="text-align:center;">Mis Reservas</h2>',
            margin: '5 0'
        },
        {
            xtype: 'container',
            reference: 'reservationsList',
            width: '95%',
            layout: {
                type: 'vbox',
                align: 'center'
            }
        }
    ],

    listeners: {
        activate: function (view) {
            const container = view.down('container[reference=reservationsList]');
            container.removeAll();

            const store = Ext.create('Nestly.store.MyReservationStore');
            store.load({
                callback: function (records) {
                    records.forEach(record => {
                        const imagePath = record.get('imagePath');

                        if (!imagePath) {
                            console.warn('Reserva inválida, sin ruta de imagen:', record.data);
                            return;
                        }

                        const card = Ext.create('Ext.Container', {
                            cls: 'reservation-card',
                            width: 320,
                            style: {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                borderRadius: '8px',
                                marginBottom: '12px',
                                padding: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            },
                            items: [
                                {
                                    xtype: 'component',
                                    html: `
                                        <div style="font-size:13px;">
                                            <strong>Reserva #${record.get('id')}</strong><br>
                                            ${Ext.Date.format(record.get('startDate'), 'd/m/Y')} - ${Ext.Date.format(record.get('endDate'), 'd/m/Y')}<br>
                                            <b>${record.get('fullName')}</b><br>
                                            ${record.get('phone')}<br>
                                            Estado: ${record.get('status')}
                                        </div>
                                        <img src="http://localhost:5231${imagePath}" width="100%" height="120" style="margin-top:6px; border-radius:6px;" />
                                    `
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '6 0 0 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Detalles',
                                            flex: 1,
                                            margin: '0 4 0 0',
                                            style: {
                                                backgroundColor: '#00bcd4',
                                                color: 'white',
                                                borderRadius: '4px'
                                            },
                                            handler: function () {
                                                Ext.create('Ext.Window', {
                                                    title: 'Detalles',
                                                    modal: true,
                                                    width: 360,
                                                    bodyPadding: 15,
                                                    items: [
                                                        {
                                                            xtype: 'component',
                                                            html: `
                                                                <strong>Nombre:</strong> ${record.get('fullName')}<br>
                                                                <strong>Email:</strong> ${record.get('email')}<br>
                                                                <strong>Teléfono:</strong> ${record.get('phone')}<br>
                                                                <strong>Fechas:</strong> ${Ext.Date.format(record.get('startDate'), 'd/m/Y')} - ${Ext.Date.format(record.get('endDate'), 'd/m/Y')}<br>
                                                                <strong>Comentario:</strong> ${record.get('comment') || 'Sin comentario'}<br>
                                                                <strong>Estado:</strong> ${record.get('status')}<br><br>
                                                                <img src="http://localhost:5231${imagePath}" width="100%" style="border-radius:6px;" />
                                                            `
                                                        }
                                                    ],
                                                    buttons: [
                                                        {
                                                            text: 'Cerrar',
                                                            handler: function (btn) {
                                                                btn.up('window').close();
                                                            }
                                                        }
                                                    ]
                                                }).show();
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Cancelar',
                                            flex: 1,
                                            style: {
                                                backgroundColor: '#f44336',
                                                color: 'white',
                                                borderRadius: '4px'
                                            },
                                            handler: function () {
                                                Ext.Msg.confirm('Confirmar', '¿Cancelar esta reserva?', function (choice) {
                                                    if (choice === 'yes') {
                                                        Ext.Ajax.request({
                                                            url: `http://localhost:5231/api/Reservation/${record.get('id')}`,
                                                            method: 'DELETE',
                                                            success: function () {
                                                                Ext.Msg.alert('Éxito', 'Reserva cancelada.');
                                                                card.destroy();
                                                            },
                                                            failure: function () {
                                                                Ext.Msg.alert('Error', 'No se pudo cancelar la reserva.');
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                }
                            ]
                        });

                        container.add(card);
                    });
                }
            });
        }
    }
});
