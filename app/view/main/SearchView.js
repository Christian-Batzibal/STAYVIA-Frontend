Ext.define('Nestly.view.main.SearchView', {
    extend: 'Ext.Panel',
    xtype: 'searchview',

    fullscreen: true,
    scrollable: 'y',

    bodyStyle: {
        backgroundImage: "url('resources/images/FondoSearch.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    },

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'start'
    },

    items: [
        {
            xtype: 'component',
            html: '<h2>Habitaciones disponibles</h2>',
            margin: '20 0 10 0'
        },
        {
            xtype: 'container',
            reference: 'roomsResults',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            width: '90%',
            defaults: {
                xtype: 'container',
                margin: '10 0',
                padding: 10,
                style: {
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
            },
            items: []
        },
        {
            xtype: 'button',
            text: 'Volver al inicio',
            margin: 20,
            handler: function () {
                const mainView = Ext.ComponentQuery.query('mainview')[0];
                mainView.setActiveItem('index');
            }
        }
    ],

    setSearchParams: function (params) {
        const me = this;
        const container = me.down('container[reference=roomsResults]');
        container.removeAll();

        Ext.Ajax.request({
            url: 'http://localhost:5231/api/Room/available',
            method: 'GET',
            params: {
                branchId: params.branchId,
                startDate: params.startDate,
                endDate: params.endDate,
                guests: params.guests
            },
            success: function (response) {
                const rooms = Ext.decode(response.responseText);

                if (!rooms || rooms.length === 0) {
                    container.add({
                        xtype: 'component',
                        html: '<h3 style="color: red;">No hay habitaciones disponibles.</h3>',
                        margin: '20 0'
                    });
                    return;
                }

                rooms.forEach(room => {
                    const roomNumber = parseInt(room.Number) % 100;

                    container.add({
                        xtype: 'container',
                        layout: 'hbox',
                        style: {
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            borderRadius: '10px',
                            marginBottom: '12px',
                            padding: '12px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                        },
                        items: [
                            {
                                xtype: 'image',
                                src: `resources/images/rooms/${room.BranchId}Room${roomNumber}/1.jpg`,
                                width: 100,
                                height: 100,
                                style: {
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                    marginRight: '15px'
                                }
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'vbox',
                                defaults: {
                                    xtype: 'component',
                                    margin: '2 0'
                                },
                                items: [
                                    { html: `<strong>${room.Name || 'Habitación sin nombre'}</strong>` },
                                    { html: `Precio: Q${room.Price || '---'} por noche` },
                                    { html: `${room.Description || ''}` },
                                    {
                                        xtype: 'button',
                                        text: 'Reservar',
                                        style: {
                                            marginTop: '8px',
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            borderRadius: '15px',
                                            padding: '4px 12px',
                                            fontSize: '12px'
                                        },
                                        handler: function () {
                                            const main = Ext.ComponentQuery.query('mainview')[0];
                                            const reservationView = main.down('reservationview');

                                            if (reservationView) {
                                                reservationView.setSelectedRoom({
                                                    id: room.Id,
                                                    price: room.Price,
                                                    name: room.Name,
                                                    number: roomNumber,
                                                    branchId: room.BranchId,
                                                    imagePath: `resources/images/rooms/${room.BranchId}Room${roomNumber}/1.jpg`
                                                });

                                                reservationView.setReturnTo('search');

                                                Ext.defer(() => {
                                                    main.setActiveItem('reservation');
                                                }, 50);
                                            } else {
                                                Ext.Msg.alert('Error', 'No se encontró la vista de reserva.');
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                });
            },
            failure: function () {
                container.add({
                    xtype: 'component',
                    html: '<h3 style="color: red;">Error al cargar habitaciones.</h3>',
                    margin: '20 0'
                });
            }
        });
    }
});
