Ext.define('Nestly.model.Offer', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', mapping: 'Id' },
        { name: 'title', mapping: 'Title' },
        { name: 'description', mapping: 'Description' },
        { name: 'discountPercentage', mapping: 'DiscountPercentage' },
        { name: 'startDate', mapping: 'StartDate' },
        { name: 'endDate', mapping: 'EndDate' },
        { name: 'roomId', mapping: 'RoomId' }
    ]
});