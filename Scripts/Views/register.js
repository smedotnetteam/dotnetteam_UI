$(document).ready(function () {
    $('#btnRegister').on('click', loginJS.btnRegister_onClick);
})

/**
 * Object JS phục vụ cho trang Login
 */
var loginJS = Object.create({
    /*
     * Hàm xử lý khi nhấn Button Đăng ký
     * Created by: NVMANH (28/12/2018) 
     * */
    btnRegister_onClick: function () {
        // thực hiện validate:
        var data = {
            "PhoneNumber":$("#txtContactMobile").val(),
            "Email":$("#txtContactEmail").val(),
            "Password":$("#txtPassword").val(),
            "ConfirmPassword":$("#txtRePassword").val()
        };
        $.ajax({
            method:"POST",
            url:'http://0.0.0.0:8000/api/account/register',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                alert('thanhcong');
            },
            error: function(){
                alert('xit');
            }
        });
    },
    doRegister: function () {

    }
})
