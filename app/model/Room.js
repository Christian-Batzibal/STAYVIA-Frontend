Ext.define('Nestly.model.Room', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', mapping: 'Id' },
        { name: 'number', mapping: 'Number' },
        { name: 'capacity', mapping: 'Capacity' },
        { name: 'price', mapping: 'Price' },
        { name: 'branchId', mapping: 'BranchId' }
    ]
});
