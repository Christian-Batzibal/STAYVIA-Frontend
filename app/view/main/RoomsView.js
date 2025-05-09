Ext.define('Nestly.view.main.RoomsView', {
    extend: 'Ext.panel.Panel',
    xtype: 'roomsview',

    requires: ['Nestly.store.RoomStore'],

    scrollable: true,

    bodyStyle: {
        backgroundImage: "url('resources/images/FondoRooms.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '100vh',
        overflowX: 'hidden'
    },

    layout: 'vbox',

    items: [
        {
            xtype: 'container',
            width: '100%',
            layout: 'hbox',
            padding: 10,
            items: [
                { xtype: 'component', flex: 1 },
                {
                    xtype: 'button',
                    text: 'Volver al Inicio',
                    cls: 'volver-btn',
                    handler: function () {
                        const viewport = Ext.ComponentQuery.query('viewport')[0];
                        const indexView = viewport.down('indexview');
                        viewport.setActiveItem(indexView);
                    }
                }
            ]
        },
        {
            xtype: 'component',
            html: '<h1 class="title-hab">HABITACIONES DISPONIBLES</h1>',
            margin: '10 0 20 0',
            style: {
                textAlign: 'center',
                width: '100%'
            }
        },
        {
            xtype: 'container',
            reference: 'roomsContainer',
            cls: 'room-section',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'start'
            },
            scrollable: false,
            width: '100%',
            padding: 10
        }
    ],

    listeners: {
        afterrender: function (view) {
            const container = view.down('container[reference=roomsContainer]');
            const store = Ext.create('Nestly.store.RoomStore');

            store.load({
                callback: function (records) {
                    container.removeAll();

                    let fila = null;
                    records.forEach((record, index) => {
                        if (index % 6 === 0) {
                            // Nueva fila cada 6 tarjetas
                            fila = Ext.create('Ext.container.Container', {
                                layout: {
                                    type: 'hbox',
                                    align: 'start'
                                },
                                margin: '0 0 15 0'
                            });
                            container.add(fila);
                        }

                        const roomNumber = (record.get('number') + '').trim();
                        const branchId = record.get('branchId');
                        const realRoomNumber = parseInt(roomNumber.toString().slice(-1));
                        const imageFolder = `resources/images/rooms/${branchId}Room${realRoomNumber}/`;

                        fila.add({
                            xtype: 'container',
                            cls: 'room-card-compact',
                            width: 220,
                            margin: '0 8 8 0',
                            style: {
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                overflow: 'hidden'
                            },
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'image',
                                    src: `${imageFolder}2.jpg`,
                                    width: '100%',
                                    height: 120,
                                    style: {
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '8px',
                                        borderTopRightRadius: '8px'
                                    },
                                    listeners: {
                                        error: function (img) {
                                            img.setSrc('resources/images/RoomDefault.jpg');
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    padding: 10,
                                    html: `
                                        <div class="room-name"><b>Habitación ${roomNumber}</b></div>
                                        <div class="room-location">Capacidad: ${record.get('capacity')} personas</div>
                                        <div class="room-rating"><span class="rating-score">8.5</span> Muy buena – 20 opiniones</div>
                                        <div class="room-prices">
                                            <span class="old-price">Q${record.get('price') + 50}</span>
                                            <span class="new-price">Q${record.get('price')}</span><br/>
                                            <span class="total-price">Impuestos incluidos</span>
                                        </div>
                                    `
                                },
                                {
                                    xtype: 'button',
                                    text: 'Reservar',
                                    margin: '10 10 10 10',
                                    style: {
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        borderRadius: '4px'
                                    },
                                    handler: function () {
                                        const mainView = Ext.ComponentQuery.query('mainview')[0];
                                        const reservationView = mainView.down('reservationview');

                                        reservationView.setSelectedRoom(record.getData());
                                        reservationView.setReturnTo('rooms');

                                        Ext.defer(() => {
                                            mainView.setActiveItem('reservation');
                                        }, 50);
                                    }
                                }
                            ]
                        });
                    });
                }
            });
        }
    }
});
