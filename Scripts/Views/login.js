$(document).ready(function () {
    $('#btnLogin').on('click', loginJS.btnLogin_onClick);
})

/**
 * Object JS phục vụ cho trang Login
 */
var loginJS = Object.create({
    /*
     * Hàm xử lý khi nhấn Button Đăng ký
     * Created by: NVMANH (28/12/2018) 
     * */
    btnLogin_onClick: function () {
        // thực hiện validate:

        var data = {
            "Email":$("#txtUserName").val(),
            "Password":$("#txtPassword").val(),
        };
        $.ajax({
            method:"POST",
            url:'http://0.0.0.0:8000/api/account/login',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                console.log(data.data.token);
                localStorage.setItem("access_token", data.data.token);
                window.location.href = "/Home/Index";
            },
            error: function(){
                alert('xit');
            }
        });


    },
    doLogin: function () {

    }
})
