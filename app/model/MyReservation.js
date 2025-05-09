Ext.define('Nestly.model.MyReservation', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', mapping: 'Id' },
        { name: 'startDate', mapping: 'StartDate', type: 'date' },
        { name: 'endDate', mapping: 'EndDate', type: 'date' },
        { name: 'status', mapping: 'Status' },
        { name: 'fullName', mapping: 'FullName' },
        { name: 'phone', mapping: 'Phone' },
        { name: 'imagePath', mapping: 'ImagePath' }
    ]
});
