/**
 * Esta vista es un ejemplo genérico de una lista. Ya no usa el store Personnel.
 */
Ext.define('Nestly.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    title: 'Lista de ejemplo',

    store: {
        fields: ['name', 'email', 'phone'],
        data: [
            { name: 'Ejemplo 1', email: 'ejemplo1@correo.com', phone: '12345678' },
            { name: 'Ejemplo 2', email: 'ejemplo2@correo.com', phone: '87654321' }
        ]
    },

    columns: [
        { text: 'Nombre', dataIndex: 'name' },
        { text: 'Correo', dataIndex: 'email', flex: 1 },
        { text: 'Teléfono', dataIndex: 'phone', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
