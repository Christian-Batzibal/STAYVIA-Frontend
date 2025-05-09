Ext.define('Nestly.view.main.MainView', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainview',

    requires: [
        'Nestly.view.main.IndexView',
        'Nestly.view.main.RoomsView',
        'Nestly.view.main.ReservationView',
        'Nestly.view.main.OffersView',
        'Nestly.view.main.MyReservationsView',
        'Nestly.view.main.LoginView',
        'Nestly.view.main.SearchView'
    ],

    layout: 'card',

    items: [
        { xtype: 'indexview', itemId: 'index' },
        { xtype: 'roomsview', itemId: 'rooms' },
        { xtype: 'reservationview', itemId: 'reservation' },
        { xtype: 'offersview', itemId: 'offers' },
        { xtype: 'myreservationsview', itemId: 'myreservations' },
        { xtype: 'loginview', itemId: 'login' },
        { xtype: 'searchview', itemId: 'search' }
    ],

   
});
