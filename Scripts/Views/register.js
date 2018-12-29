$("#btnRegister").click(function(){
    //alert("OK");
    
    var email = $('#txtContactEmail').val();
    var password = $('#txtPassword').val();
    var phone = $('#txtContactMobile').val();
    var confirmPass = $('#txtRePassword').val();
    var fullname = $('txtFullName').val();
    var user_input = new Object();
    user_input ={
        FullName : fullname,
        Email : email,
        Phone : phone,
        Password : password,
        ConfirmPassword : confirmPass
    }
    console.log(JSON.stringify(user_input));
    $.ajax({
        url: "/api/accounts/create",
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "81873e87d2964e958be7dd07465b0f30");
        },
        method: "POST",
        dataType: "json",
        data: JSON.stringify(user_input),
        contentType: "application/json;charset=utf-8",
        success: function (data, textStatus, xhr) {
            $(".loader").hide();
            $('.loading-icon').hide();
            window.location = "./login.html";
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            $(".loader").hide();
            $('.loading-icon').hide();
        }
    });

})