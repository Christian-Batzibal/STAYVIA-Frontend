Ext.define('Nestly.view.main.IndexView', {
    extend: 'Ext.panel.Panel',
    xtype: 'indexview',
    cls: 'index-view',
    layout: 'vbox',
    flex: 1,

    items: [
        // Encabezado
       // ENCABEZADO (solo esta parte cambia)
       {
        xtype: 'container',
        width: '100%',
        height: 90,
        layout: {
            type: 'hbox',
            align: 'middle'
        },
        style: {
            backgroundColor: '#fff',
            padding: '0 30px',
            borderBottom: '1px solid #ccc',
            position: 'relative',
            zIndex: 0
        },
        items: [
            // LOGO flotante (fuera del flow normal)
            {
                xtype: 'image',
                src: 'resources/images/Logo.png',
                width: 190,
                height: 88,
                alt: 'Logo Stayvia',
                style: {
                    position: 'absolute',
                    top: '-10px', // o incluso '15px' si querés más aire
                    left: '30px',
                    zIndex: 9999
                }
                
            },
            { xtype: 'component', flex: 1 }, // Empuja los textos a la derecha
            {
                xtype: 'component',
                html: '<span style="margin-right: 25px; cursor: pointer;">Atención al Cliente</span>',
                style: {
                    fontSize: '14px',
                    color: '#333'
                },
                listeners: {
                    afterrender: function (cmp) {
                        cmp.getEl().on('click', function () {
                            Ext.Msg.alert('Atención', 'Aquí iría atención al cliente');
                        });
                    }
                }
            },
            {
                xtype: 'component',
                html: '<span style="cursor: pointer;" id="loginClick">Iniciar sesión</span>',
                style: {
                    fontSize: '14px',
                    color: '#007bff'
                },
                listeners: {
                    afterrender: function () {
                        Ext.get('loginClick')?.on('click', function () {
                            Ext.create('Nestly.view.main.LoginView').show();
                        });
                    }
                }
            }
        ]
    },

        // Contenido principal
        {
            xtype: 'container',
            flex: 1,
            width: '100%',
            cls: 'index-body',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'start'
            },
            items: [
                // Botones superiores
                {
                    xtype: 'container',
                    layout: { type: 'hbox', pack: 'end' },
                    width: '100%',
                    height: 50,
                    padding: '20px 30px 0 30px',
                    defaults: {
                        xtype: 'button',
                        margin: '0 8px',
                        cls: 'index-button'
                    },
                    items: [
                        {
                            text: 'Mis Reservas',
                            handler: function () {
                                Ext.ComponentQuery.query('mainview')[0].setActiveItem('myreservations');
                            }
                        },
                        {
                            text: 'Ofertas',
                            handler: function (btn) {
                                btn.up('mainview').setActiveItem('offers');
                            }
                        },
                        {
                            text: 'Habitaciones disponibles',
                            handler: function () {
                                const viewport = Ext.ComponentQuery.query('viewport')[0];
                                const roomsView = viewport.down('roomsview');
                                viewport.setActiveItem(roomsView);
                            }
                        }
                    ]
                },

                // Búsqueda principal
                {
                    xtype: 'container',
                    layout: { type: 'vbox', align: 'center', pack: 'center' },
                    flex: 1,
                    items: [
                        {
                            xtype: 'component',
                            cls: 'index-title',
                            html: '¡Encontrá tu habitación ideal!',
                            margin: '0 0 20 0'
                        },
                        {
                            xtype: 'container',
                            layout: { type: 'hbox', align: 'middle', pack: 'center' },
                            style: {
                                backgroundColor: '#fff',
                                padding: '15px 20px',
                                borderRadius: '10px',
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                minWidth: '750px',
                                marginBottom: '30px'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 10 0 0',
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: 'resources/icons/location.png',
                                            width: 20,
                                            height: 20,
                                            margin: '0 8 0 0',
                                            style: {
                                                marginTop: '8px'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'branchCombo',
                                            emptyText: 'Selecciona un destino',
                                            store: { type: 'branchstore' },
                                            queryMode: 'local',
                                            displayField: 'Name',
                                            valueField: 'Id',
                                            width: 230,
                                            height: 35,
                                            listeners: {
                                                afterrender: function (combo) {
                                                    combo.getStore().load();
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'dateRangeField',
                                    emptyText: 'Fechas',
                                    readOnly: true,
                                    width: 170,
                                    height: 35,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        render: function (field) {
                                            field.getEl().on('click', function () {
                                                Ext.create('Ext.window.Window', {
                                                    title: 'Seleccionar fechas',
                                                    modal: true,
                                                    layout: 'vbox',
                                                    bodyPadding: 10,
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Fecha inicio',
                                                            format: 'd/m/Y',
                                                            itemId: 'startDate'
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Fecha fin',
                                                            format: 'd/m/Y',
                                                            itemId: 'endDate'
                                                        }
                                                    ],
                                                    buttons: [
                                                        {
                                                            text: 'Aceptar',
                                                            handler: function (btn) {
                                                                const win = btn.up('window');
                                                                const start = win.down('#startDate').getValue();
                                                                const end = win.down('#endDate').getValue();
                                                                if (start && end) {
                                                                    const formatted = Ext.Date.format(start, 'd M') + ' - ' + Ext.Date.format(end, 'd M');
                                                                    field.setValue(formatted);
                                                                    field.startDate = start;
                                                                    field.endDate = end;
                                                                    win.close();
                                                                } else {
                                                                    Ext.Msg.alert('Error', 'Por favor seleccioná ambas fechas');
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }).show();
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'guestsField',
                                    emptyText: 'Huéspedes',
                                    readOnly: true,
                                    width: 200,
                                    height: 35,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        render: function (field) {
                                            field.getEl().on('click', function () {
                                                let adultos = 2, ninos = 0;
                                                const actualizarTexto = () => {
                                                    field.setValue(`${adultos} adulto${adultos > 1 ? 's' : ''}, ${ninos} niño${ninos !== 1 ? 's' : ''}`);
                                                    field.guestCount = adultos + ninos;
                                                };
                                                Ext.create('Ext.window.Window', {
                                                    title: 'Seleccionar huéspedes',
                                                    modal: true,
                                                    layout: 'vbox',
                                                    bodyPadding: 10,
                                                    items: [
                                                        crearContador('Adultos', adultos, val => adultos = val),
                                                        crearContador('Niños', ninos, val => ninos = val)
                                                    ],
                                                    buttons: [
                                                        {
                                                            text: 'Confirmar',
                                                            handler: function (btn) {
                                                                actualizarTexto();
                                                                btn.up('window').close();
                                                            }
                                                        }
                                                    ]
                                                }).show();
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Buscar',
                                    height: 35,
                                    style: {
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        borderRadius: '5px'
                                    },
                                    handler: function () {
                                        const main = Ext.ComponentQuery.query('mainview')[0];
                                        const searchView = main.down('searchview');
                                        const locationCombo = Ext.ComponentQuery.query('#branchCombo')[0];
                                        const dateField = Ext.ComponentQuery.query('#dateRangeField')[0];
                                        const guestsField = Ext.ComponentQuery.query('#guestsField')[0];
                                        const selected = locationCombo.getSelection();
                                        const branchId = selected ? selected.get('Id') : null;
                                        const start = dateField.startDate;
                                        const end = dateField.endDate;
                                        const guests = guestsField.guestCount || 1;

                                        if (!branchId || !start || !end) {
                                            Ext.Msg.alert('Error', 'Por favor completá todos los campos.');
                                            return;
                                        }

                                        searchView.setSearchParams({
                                            branchId,
                                            startDate: Ext.Date.format(start, 'Y-m-d'),
                                            endDate: Ext.Date.format(end, 'Y-m-d'),
                                            guests
                                        });

                                        main.setActiveItem(searchView);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // Footer
        {
            xtype: 'component',
            cls: 'index-footer',
            html: 'Contactos: info@hotel.gt.com | +502 12345678',
            width: '100%'
        }
    ]
});

// Utilidad para contador de huéspedes
function crearContador(label, valorInicial, callback) {
    let valor = valorInicial, display;
    return {
        xtype: 'container',
        layout: 'hbox',
        margin: '5 0',
        items: [
            { xtype: 'displayfield', value: label, width: 100 },
            {
                xtype: 'button',
                text: '-',
                handler: function () {
                    if (valor > 0) {
                        valor--;
                        display.setValue(valor);
                        callback(valor);
                    }
                }
            },
            {
                xtype: 'displayfield',
                value: valor,
                width: 30,
                margin: '0 10',
                listeners: {
                    afterrender: function (cmp) {
                        display = cmp;
                    }
                }
            },
            {
                xtype: 'button',
                text: '+',
                handler: function () {
                    valor++;
                    display.setValue(valor);
                    callback(valor);
                }
            }
        ]
    };
}
