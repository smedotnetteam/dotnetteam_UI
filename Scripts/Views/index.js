$(document).ready(function () {
    //// Kiểm tra Họ và tên người đăng ký
    //$("#name").blur(function () {
    //    if ($(this).val()) {
    //        $("#error-name-register").text("");
    //    }
    //    else {
    //        $("#error-name-register").text("Họ và tên không được bỏ trống!");
    //        $("#name").focus;
    //        return false;
    //    }
    //});

    //// Kiểm tra Email người đăng ký
    //$("#email").blur(function () {
    //    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //    if (!filter.test($("#email").val())) {
    //        $("#error-email-register").text("Email nhập không đúng định dạng!");
    //        $("#email").focus;
    //        return false;
    //    }
    //    else {
    //        $("#error-email-register").text("");
    //    }
    //});

    //// Kiểm tra Password
    //$("#password").blur(function () {
    //    if ($(this).val()) {
    //        $("#error-password-register").text("");
    //    }
    //    else {
    //        $("#error-password-register").text("Mật khẩu không được bỏ trống!");
    //        $("#password").focus;
    //        return false;
    //    }
    //});

    //// Kiểm tra Password và Re-Passwork có giống nhau hay không
    //$("#re-password").blur(function () {
    //    if ($("#password").val() !== $("#re-password").val()) {
    //        $("#error-re-password-register").text("Mật khẩu không trùng khớp!");
    //        $("#re-password").focus;
    //        return false;
    //    }
    //    else {
    //        $("#error-re-password-register").text("");
    //    }
    //});

    //// Kiểm tra tên Công ty đồng thời điền Domain
    //$("#comapanyName").blur(function () {
    //    if ($(this).val()) {
    //        $("#domain").val($("#comapanyName").val().toLowerCase());
    //        $("#error-company-name-register").text("");
    //        $("#error-domain-register").text("");
    //        $("#domain").removeClass("border-red");
    //    }
    //    else {
    //        $("#error-company-name-register").text("Tên công ty không được bỏ trống!");
    //        $("#comapanyName").focus;
    //        return false;
    //    }
    //});

    //// Kiểm tra Domain
    //var domain = $("#domain").blur(function () {
    //    if ($(this).val()) {
    //        $("#error-domain-register").text("");
    //    }
    //    else {
    //        $("#error-domain-register").text("Domain không được bỏ trống!");
    //        $("#domain").focus;
    //        return false;
    //    }
    //});

    //// Kiểm tra số điện thoại
    //$("#phone").blur(function () {
    //    if ($(this).val()) {
    //        $("#error-phone-register").text("");
    //    }
    //    else {
    //        $("#error-phone-register").text("Số điện thoại không được bỏ trống!");
    //        $("#phone").focus;
    //        return false;
    //    }
    //});

    //// Kiểm tra các trường
    //$('.checkRequired').blur(function () {
    //    var isValid = true;
    //    if ($(this)) {
    //         $.each($(this), function (index, item) {
    //            if (item) {
    //                var value = $(item).val().trim();
    //                if (value.length === 0) {
    //                    isValid = false;
    //                    $(item).addClass('border-red');
    //                } else {
    //                    $(item).removeClass('border-red');
    //                }
    //            }
    //        });
    //    }
    //    return isValid;
    //});

    // Ẩn hiện giao diện xác nhận Email
    $("#submit-confirm-emai").click(function () {
        $(".confirmEmail").addClass("hidden");
        $(".confirmCode").removeClass("hidden");
        window.open("http://gmail.com", '_blank');
    });

    // Kiểm tra code xác nhận
    $('[abc="code"]').keyup(function () {
        $(this).next(function () {
            $(this).focus();
        });
    });

    $($('[abc="code"]')).keyup(function (event) {
        if ($(this).next().length !== 0) {
            if ($(this).next()[0].value === "") {
                $(this).next().focus();
            }
        }
    });
});

// Sự kiện nhập code xác nhận
$('#submit-active').click(function () {
    $(".loader").show();
    $('.loading-icon').show();
    var code = $('#code1').val() + $('#code2').val() + $('#code3').val() + $('#code4').val();
    $.ajax({
        url: "/api/Employee/empCode",
        method: "GET",
        dataType: "html",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data) {
                if (data === code) {
                    $.ajax({
                        url: "/api/Employee/getRegister",
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data) {
                                var name = data.FullName;
                                var email = data.Email;
                                var password = data.Password;
                                var phone = data.Phone;
                                var emp = new Object();
                                emp.Email = email;
                                emp.Password = password;
                                emp.FullName = name;
                                emp.Phone = phone;
                                var company = new Object();
                                company.Name = data.Company.Name;
                                company.Domain = data.Company.Domain;
                                emp.Company = company;

                                $.ajax({
                                    url: "/api/employee/register",
                                    method: "POST",
                                    dataType: "json",
                                    data: JSON.stringify(emp),
                                    contentType: "application/json;charset=utf-8",
                                    success: function (data, textStatus, xhr) {
                                        if (data) {
                                            window.location = "./login.html";
                                            $(".loader").hide();
                                            $('.loading-icon').hide();
                                        }
                                        else {
                                            location.reload();
                                        }

                                    },
                                    error: function (xhr, textStatus, errorThrown) {
                                        console.log('Error in Operation');
                                        $(".loader").hide();
                                        $('.loading-icon').hide();
                                    }
                                });
                            }
                        }
                    });
                }
                else {
                    $("#error-active-text").text("Mã đăng nhập không chính xác!");
                    $(".loader").hide();
                    $('.loading-icon').hide();
                }
            }
        }
    });
});

// Sự kiện đăng ký
$('#register-submit').click(function () {
    //$(".loader").show();
    //$('.loading-icon').show();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var phone = $('#phone').val();

    var emp = new Object();
    FullName = name;
    Email = email;
    Phone = phone;
    Password = password;

    $.ajax({
        url: "/api/accounts/create",
        method: "POST",
        dataType: "json",
        data: JSON.stringify(emp),
        contentType: "application/json;charset=utf-8",
        success: function (data, textStatus, xhr) {
            $(".loader").hide();
            $('.loading-icon').hide();
            window.location = "./confirmAccount.html";
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            $(".loader").hide();
            $('.loading-icon').hide();
        }
    });

    //$(".loader").show();
    //$('.loading-icon').show();
    //var name = $('#name').val();
    //var email = $('#email').val();
    //var password = $('#password').val();
    //var phone = $('#phone').val();
    //var emp = new Object();
    //emp.Email = email;
    //emp.Password = password;
    //emp.FullName = name;
    //emp.Phone = phone;
    //var company = new Object();
    //company.Name = $('#comapanyName').val();
    //company.Domain = $('#domain').val() +".sme.net";
    //emp.Company = company; 
    //var index1 = 0;
    //if (email.trim().length !== 0 && password.trim().length !== 0) {
    //    $.ajax({
    //        url: "/api/Employee",
    //        method: "GET",
    //        dataType: "json",
    //        data: JSON.stringify(),
    //        contentType: "application/json;charset=utf-8",
    //        success: function (data, textStatus, xhr) {
    //            $.each(data, function (index, item) {
    //                if (email === item.Email) {                                                
    //                    index1++;
    //                    $('#email').addClass('border-red');
    //                    $("#error-email-register").text("Email đã được đăng ký!");
    //                    $(".loader").hide();
    //                    $('.loading-icon').hide();
    //                }                                   
    //            });
    //            if (index1 === 0) {
    //                $.ajax({
    //                    url: "/api/accounts/create",
    //                    method: "POST",
    //                    dataType: "json",
    //                    data: JSON.stringify(emp),
    //                    contentType: "application/json;charset=utf-8",
    //                    success: function (data, textStatus, xhr) {
    //                        $(".loader").hide();
    //                        $('.loading-icon').hide();
    //                        window.location = "./confirmAccount.html";
    //                    },
    //                    error: function (xhr, textStatus, errorThrown) {
    //                        console.log('Error in Operation');
    //                        $(".loader").hide();
    //                        $('.loading-icon').hide();
    //                    }
    //                });

    //            }
    //        },
    //        error: function (xhr, textStatus, errorThrown) {
    //            console.log('Error in Operation');
    //            $(".loader").hide();
    //            $('.loading-icon').hide();
    //        }
    //    });
    //}
    //else {
    //    $(".error-register").text("Các trường không được để trống!");
    //    $(".loader").hide();
    //    $('.loading-icon').hide();
    //}
});

// Sự kiện đăng nhập
$('#login-submit').click(function () {
    var email = $('#email-login').val();
    var password = $('#password-login').val();
    var emp = new Object();
    emp.Email = email;
    emp.Password = password;
    if (email.trim().length !== 0 && password.trim().length !== 0) {
        $.ajax({
            url: "/api/employee/login",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(emp),
            contentType: "application/json;charset=utf-8",
            success: function (data, textStatus, xhr) {
                if (data) {
                    window.location = "./update-information-company.html";
                    alert("ahihi");
                }
                else {
                    $('#error-login').text('Email hoặc password không đúng!');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
    }
    else {
        alert("Input is not empty");
    }
});

// Sự kiện cập nhật thông tin công ty
$('#update-information-company-submit').click(function () {
    $(".loader").show();
    $('.loading-icon').show();
    var companyCode = $('#company-code').val();
    var taxCode = $('#tax-code').val();
    var tel = $('#tel').val();
    var email = $('#company-email').val();
    var bankAccount = $('#bank-account').val();
    var address = $('#company-adrress').val();

    var com = new Object();
    com.CompanyCode = companyCode;
    com.TaxCode = taxCode;
    com.Tel = tel;
    com.Email = email;
    com.BankAccount = bankAccount;
    com.Address = address;
    $.ajax({
        url: "/api/employee/getCompanyID",
        method: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data, textStatus, xhr) {
            if (data) {
                com.CompanyID = data;
                $.ajax({
                    url: "/api/company/update",
                    method: "POST",
                    dataType: "json",
                    data: JSON.stringify(com),
                    contentType: "application/json;charset=utf-8",
                    success: function (data, textStatus, xhr) {
                        window.location = "./login.html";
                        alert("Cập nhật thành công!");
                        $(".loader").hide();
                        $('.loading-icon').hide();
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log('Error in Operation');
                        $(".loader").hide();
                        $('.loading-icon').hide();
                    }
                });
            }
            else {
                alert("Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            $('.loading-icon').hide();

        }
    });
});