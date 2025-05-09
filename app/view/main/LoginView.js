Ext.define('Nestly.view.main.LoginView', {
    extend: 'Ext.window.Window',
    xtype: 'loginview',

    title: 'Iniciar Sesión',
    modal: true,
    closable: true,
    resizable: false,
    width: 400,
    height: 440,
    layout: 'fit',
    cls: 'login-window',

    items: [
        {
            xtype: 'form',
            cls: 'login-form',
            bodyStyle: 'background: transparent;',
            layout: {
                type: 'vbox',
                align: 'stretch' // 👈 Esto alinea los campos a la izquierda
            },
            padding: 30,
            items: [
                {
                    xtype: 'textfield',
                    name: 'username',
                    emptyText: 'Usuario o Correo',
                    margin: '0 0 15 0',
                    cls: 'clean-field'
                },
                {
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    emptyText: 'Contraseña',
                    margin: '0 0 15 0',
                    cls: 'clean-field'
                },
                {
                    xtype: 'button',
                    text: 'Iniciar Sesión',
                    cls: 'login-button',
                    height: 40,
                    margin: '0 0 15 0',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                },
                {
                    xtype: 'component',
                    html: '<div class="forgot-password">¿Olvidaste tu contraseña?</div>'
                }
            ]
        }
    ]
});
