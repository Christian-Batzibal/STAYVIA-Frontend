Ext.application({
    name: 'Nestly',
    extend: 'Nestly.Application',

    requires: [
        'Nestly.view.main.MainView'
    ],

    mainView: 'Nestly.view.main.MainView'
});

function navegarA(xtypeName) {
    const mainView = Ext.ComponentQuery.query('mainview')[0];
    if (mainView) {
        const vista = mainView.down(xtypeName);
        if (vista) {
            mainView.setActiveItem(vista);
        } else {
            Ext.Msg.alert('Vista no registrada', 'La vista "' + xtypeName + '" no está en MainView.');
        }
    } else {
        console.warn('⚠ No se encontró mainview');
    }
}
