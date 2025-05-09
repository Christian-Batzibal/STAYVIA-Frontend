Ext.define('Nestly.view.main.OffersView', {
    extend: 'Ext.Panel',
    xtype: 'offersview',
    scrollable: 'y',

    requires: ['Nestly.store.OfferStore'],

    layout: { type: 'vbox', align: 'center' },

    bodyStyle: {
        background: 'url(resources/images/FondoOffers.png) no-repeat center center fixed',
        backgroundSize: 'cover'
    },

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
                    iconCls: 'home',
                    text: 'Volver al Inicio',
                    handler: function (btn) {
                        btn.up('mainview').setActiveItem('index');
                    }
                }
            ]
        },
        {
            xtype: 'component',
            html: '<h2 style="color:white; text-shadow: 1px 1px 2px black;">Ofertas Disponibles</h2>',
            margin: '10 0 20 0'
        },
        {
            xtype: 'container',
            reference: 'offersContainer',
            width: '95%',
            layout: { type: 'vbox', align: 'stretch' }
        }
    ],

    listeners: {
        afterrender: function (view) {
            var container = view.down('container[reference=offersContainer]');
            var store = Ext.create('Nestly.store.OfferStore');

            store.load({
                callback: function (records) {
                    container.removeAll();

                    Ext.Array.forEach(records, function (record) {
                        var title = record.get('title');
                        var description = record.get('description');
                        var discount = record.get('discountPercentage');
                        var start = record.get('startDate') ? record.get('startDate').substring(0, 10) : 'N/A';
                        var end = record.get('endDate') ? record.get('endDate').substring(0, 10) : 'N/A';

                        container.add({
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            style: {
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '10px',
                                marginBottom: '12px',
                                padding: '12px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    src: 'resources/images/OfertaDefault.jpg',
                                    width: 90,
                                    height: 90,
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
                                        { html: '<div style="font-size: 15px; font-weight: bold;">' + title + '</div>' },
                                        { html: '<div style="color: #555;">' + description + '</div>' },
                                        { html: '<div style="color: green; font-weight: bold;">Descuento: ' + discount + '%</div>' },
                                        { html: '<div style="font-size: 12px; color: #888;">Válido del ' + start + ' al ' + end + '</div>' },
                                        {
                                            xtype: 'button',
                                            text: 'Reservar Ahora',
                                            style: {
                                                marginTop: '6px',
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                borderRadius: '15px',
                                                fontSize: '12px',
                                                padding: '4px 10px'
                                            },
                                            handler: function () {
                                                view.up('mainview').setActiveItem('reservation');
                                            }
                                        }
                                    ]
                                }
                            ]
                        });
                    });
                }
            });
        }
    }
});
