Ext.define('Nestly.view.main.ReservationView', {
    extend: 'Ext.Panel',
    xtype: 'reservationview',
    fullscreen: true,

    config: {
        selectedRoom: null,
        returnTo: null
    },

    bodyStyle: {
        backgroundImage: 'url(resources/images/FondoReserva.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            reference: 'reservationForm',
            flex: 0.6,
            bodyPadding: 20,
            style: {
                background: 'rgba(240,240,240,0.7)',
                borderRadius: '10px',
                padding: '20px'
            },
            items: [
                {
                    xtype: 'component',
                    html: '<h2 style="color:black;">Confirmar Reserva</h2>',
                    style: 'text-align:center; margin-bottom:20px;'
                },
                createField('Nombre completo:', 'fullName', 'textfield'),
                createField('Teléfono:', 'phone', 'textfield'),
                createField('Email:', 'email', 'textfield'),
                createField('Fecha Inicio:', 'startDate', 'datefield'),
                createField('Fecha Salida:', 'endDate', 'datefield'),
                createField('Comentarios o Indicaciones:', 'comment', 'textareafield', 80),
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    items: [
                        {
                            xtype: 'component',
                            html: '<span style="color:black;">TOTAL:</span>',
                            width: 100,
                            style: 'text-align:right; padding-right:10px; font-weight:bold;'
                        },
                        {
                            xtype: 'textfield',
                            reference: 'totalField',
                            readOnly: true,
                            flex: 1,
                            fieldStyle: {
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: '2px solid rgba(0,0,0,0.5)',
                                color: 'black',
                                fontWeight: 'bold'
                            }
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: `<div style="margin-top:15px; font-weight: bold; color:black;">2 noches, 1 habitación<br>2 adultos, 2 niños</div>`
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '15 0 0 0',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Reservar',
                            flex: 1,
                            style: {
                                backgroundColor: 'rgba(0,204,136,0.8)',
                                color: 'white',
                                borderRadius: '20px',
                                marginRight: '5px',
                                fontSize: '14px',
                                padding: '8px 20px',
                                border: 'none'
                            },
                            handler: function (btn) {
                                const view = btn.up('reservationview');
                                const form = view.down('form');
                                const formValues = form.getValues();
                                const room = view.getSelectedRoom();

                                if (!room) {
                                    Ext.Msg.alert('Error', 'No se ha seleccionado ninguna habitación.');
                                    return;
                                }

                                const startDate = new Date(formValues.startDate);
                                const endDate = new Date(formValues.endDate);

                                if (isNaN(startDate) || isNaN(endDate)) {
                                    Ext.Msg.alert('Error', 'Fechas inválidas. Asegurate de completar los campos correctamente.');
                                    return;
                                }

                                const reservation = {
                                    clientId: 1,
                                    roomId: room.id,
                                    startDate: startDate.toISOString(),
                                    endDate: endDate.toISOString(),
                                    status: 'Activa',
                                    fullName: formValues.fullName,
                                    email: formValues.email,
                                    phone: formValues.phone,
                                    comment: formValues.comment,
                                    imagePath: room.imagePath || ''
                                };

                                // ✅ Corregido: eliminar imagePath antes de enviar
                                delete reservation.imagePath;

                                Ext.Ajax.request({
                                    url: 'http://localhost:5231/api/Reservation',
                                    method: 'POST',
                                    jsonData: reservation,
                                    success: function () {
                                        Ext.Msg.alert('Éxito', 'Reserva guardada en base de datos.');
                                        Ext.ComponentQuery.query('mainview')[0].setActiveItem('index');
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert('Error', `No se pudo guardar la reserva. ${response.statusText}`);
                                    }
                                });
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Cancelar Reserva',
                            flex: 1,
                            style: {
                                backgroundColor: 'rgba(255,51,51,0.8)',
                                color: 'white',
                                borderRadius: '20px',
                                marginLeft: '5px',
                                fontSize: '14px',
                                padding: '8px 20px',
                                border: 'none'
                            },
                            handler: function () {
                                Ext.Msg.alert('Cancelado', 'Reserva cancelada.');
                            }
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: '<div style="margin-top:10px; color:red;">*Tarifa NO REEMBOLSABLE*</div>'
                }
            ]
        },
        {
            xtype: 'container',
            reference: 'roomImages',
            flex: 1.4,
            padding: 20,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            scrollable: 'vertical',
            items: []
        }
    ],

    listeners: {
        activate: function (view) {
            const room = view.getSelectedRoom();
            if (!room) return;

            const totalField = view.down('textfield[reference=totalField]');
            totalField.setValue(`Q${room.price}`);

            const images = view.down('container[reference=roomImages]');
            images.removeAll();

            images.add({
                xtype: 'component',
                html: '<h2 style="color:white;">Información de la habitación</h2>',
                style: 'text-align:center; margin-bottom:20px;'
            });

            const branch = room.branchId;
            const roomNumber = parseInt(room.number.toString().slice(-1));
            const imgPath = `resources/images/rooms/${branch}Room${roomNumber}/`;

            images.add({
                xtype: 'container',
                layout: 'hbox',
                scrollable: 'horizontal',
                items: Array.from({ length: 6 }, (_, i) => ({
                    xtype: 'image',
                    src: `${imgPath}${i + 1}.jpg`,
                    width: 180,
                    height: 180,
                    margin: '0 8 8 0',
                    style: {
                        borderRadius: '8px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }
                }))
            });

            images.add({
                xtype: 'component',
                html: `
                    <div style="background: rgba(255,255,255,0.5); padding: 10px; border-radius:8px;">
                        <ul style="margin-top:10px; text-align:left; color: black; font-weight: bold;">
                            <li>Alberca Disponible</li>
                            <li>Estacionamiento Amplio y Gratis</li>
                            <li>Vista al Mar</li>
                            <li>Aire Acondicionado</li>
                            <li>Restaurantes Cercanos</li>
                            <li>Wifi Gratis</li>
                        </ul>
                    </div>
                `
            });

            images.add({
                xtype: 'button',
                text: 'Volver al menú principal',
                margin: '20 0 0 0',
                style: {
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontSize: '14px',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    border: 'none'
                },
                handler: function () {
                    const mainView = Ext.ComponentQuery.query('mainview')[0];
                    const reservationView = mainView.down('reservationview');
                    const origin = reservationView.getReturnTo();
                    const targetView = origin === 'search' ? 'search' : 'rooms';
                    reservationView.down('form').reset();
                    mainView.setActiveItem(targetView);
                }
            });
        }
    }
});

function createField(labelText, name, xtype, height) {
    return {
        xtype: 'container',
        layout: 'hbox',
        margin: '5 0',
        items: [
            {
                xtype: 'component',
                html: `<span style="color:black;">${labelText}</span>`,
                width: 100,
                style: 'text-align:right; padding-right:10px; font-weight:bold;'
            },
            {
                xtype: xtype,
                name: name,
                flex: 1,
                height: height || null,
                required: true,
                fieldStyle: {
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '2px solid rgba(0,0,0,0.5)',
                    color: 'black',
                    fontWeight: 'bold'
                }
            }
        ]
    };
}
