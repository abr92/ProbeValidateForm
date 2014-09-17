function Validate(requires, settings){
    console.log("Validating...");
    // vars
    numOfItems = 0;
    numOfRequires = 0;
    //messages function
    function message(data, dataColor){
        $(settings.divMessage).css('background', dataColor);
        $(settings.divMessage).html(data);
        $(settings.divMessage).slideDown(500, function(){
           setTimeout(function(){
                $(settings.divMessage).slideUp();
           }, 2000);
        });
    }
    //validate requires
    for(item in requires){
        numOfItems ++;
        if ($(requires[item]).val() != ''){
            numOfRequires ++;
        }
    }
    //validate email
    if( numOfItems != numOfRequires ){
        //print error required
        message(settings.requiredFaild, 'red');
        return;
    }else{
        //vars
        var mail = $(requires.mail).val()
        var countArroba = 0;
        var validMail = false;
        var validPhone = false
        //search @ and . in mail var
        for(letter in mail){    
            if ( mail.charAt(letter) == '@'){
                countArroba ++;
            }
            if ( mail.charAt(letter) == '.'){
                validMail = true;
            }
        }
        if(validMail == false){
           message(settings.mailError, 'red');
           return; 
        }
        //validate phone
        if( requires.phone && isNaN($(requires.phone).val()) ){
            console.log("Phone no numeric");
            message(settings.phoneError, 'red');
            return;
        }else if(!isNaN($(requires.phone).val())){
            validPhone = true;
        }else{
            console.log("phone no exists");
        }
        // validate global vars
        if( countArroba > 0 && countArroba < 2 && validMail == true && validPhone == true ){
            //show loader in send
            $(settings.loader).fadeIn();
            armorJson = {};
            //armor data json
            for (item in requires){
                //push json data
                armorJson[item] = $(requires[item]).val();
            }
            //send post data 
            $.ajax({
                type : 'POST', //method post
                url : settings.url, //url post
                data : armorJson, //data form
                success : function(data){
                    if (data == 'Ok'){
                        //print message
                        message(settings.mailSuccess, 'green');
                        //clear form
                        for (item in requires){
                            $(requires[item]).val('')
                        }
                        //hide loader
                        setTimeout(function(){
                            $(settings.loader).fadeOut();
                        },1000);
                    }else{
                        //print error
                        message('Error durante el envio', 'red');
                        //hide loader
                        setTimeout(function(){
                            $(settings.loader).fadeOut();
                        },2000);
                    }
                    //console data
                    //console.log(data);
                }
            });
            //valid
            //console.log("mail send!");
        }else{
            //print error
            message('Error desconosido', 'red');
            return;
        }
    }
}
