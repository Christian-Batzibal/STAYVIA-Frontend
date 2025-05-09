Ext.define('Nestly.model.Reservation', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', mapping: 'Id' },
        { name: 'clientId', mapping: 'ClientId' },
        { name: 'roomId', mapping: 'RoomId' },
        { name: 'startDate', mapping: 'StartDate', type: 'date' },
        { name: 'endDate', mapping: 'EndDate', type: 'date' },
        { name: 'status', mapping: 'Status' },
        { name: 'fullName', mapping: 'FullName' },
        { name: 'email', mapping: 'Email' },
        { name: 'phone', mapping: 'Phone' },
        { name: 'comment', mapping: 'Comment' },
        { name: 'imagePath', mapping: 'ImagePath' }
    ]
});
