//validate contactform
$('#contactform input[type="submit"]').click(function(e){
    e.preventDefault();
    //Call validate function
    Validate({
    //add alls inputs or divs id (mail required, phone optional)
        name : '#contactform input[name="name"]',
        mail : '#contactform input[name="mail"]',
        phone : '#contactform input[name="phone"]',
        message : '#contactform textarea[name="message"]'
    },
    // All Settings
    {
        loader : '#contactform #reloader',
        divMessage : '#contactform  #message',
        requiredFaild : 'Nombre, telefono, correo y mensaje son requeridos *',
        mailSuccess: 'Mensaje enviado exitosamente',
        mailError: 'Email no valido',
        phoneError : 'Teléfono no valido (No coloque guiones solo números)',
        url : 'mails/mail.php'
    });
});
