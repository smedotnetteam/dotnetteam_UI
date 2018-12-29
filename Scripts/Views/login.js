$("#btnLogin").click(function(){
    //alert("OK");
    var email = $('#txtEmail').val();
    var password = $('#txtPassword').val();
    
    var myData = new Object();
    myData ={
        Email : email,
        Password : password
    };
    //console.log(JSON.stringify(myData));

    $.ajax({
        url: "https://localhost:5001/api/account/login",
        // beforeSend: function (xhrObj) {
        //     xhrObj.setRequestHeader("Content-Type", "application/json");
        //     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "81873e87d2964e958be7dd07465b0f30");
        // },
        method: "POST",
        //dataType: "json",
        data: JSON.stringify(myData),
        contentType: "application/json;charset=utf-8",
        success: function (data, textStatus, xhr) {
            //do when sc
            //alert("Login success");
            window.location= "./index.html";
        },
        error: function (xhr, textStatus, errorThrown) {
            //do when er
            alert("Login failed");
        }
    });

});