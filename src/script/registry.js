!function ($) {
    const $username = $("#username");
    const $password = $("#password");
    const $repassword = $("#repassword");
    const $email = $("#email");
    const $btn = $("button");
    let $usernameflag = true;

    $username.on("blur", function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost/JS-2002/yinping_project/php/registry.php',
            data: {
                username: $username.val()
            },
            success: function (res) {
                if (!res) {
                    $username.next().children(0).html("√");
                    $username.next().children(0).css({
                        color: "green",
                        display: "block"
                    });
                    $usernameflag = true;
                } else {
                    $username.next().children(0).html("用户名已存在");
                    $username.next().children(0).css({
                        color: "red",
                        display: "block"
                    });
                    $usernameflag = false;
                }
                if ($username.val().trim().length < 2 || $username.val().trim().length > 6) {
                    $username.next().children(0).html("请输入2~6位的用户名！");
                    $username.next().children(0).css({
                        color: "red",
                        display: "block"
                    });
                }
            }

        })
    })

    $btn.on("click", function () {
        if ($username.val().trim() === '') {
            $username.next().children(0).html("用户名不得为空！");
            $usernameflag = false;
        }
        if (!$usernameflag) {
            return false;
        }
        
        $.ajax({
            type: "post",
            url: "http://localhost/JS-2002/yinping_project/php/registry.php",
            data: {
                username: $username.val(),
                password: $password.val(),
                email: $email.val()
            },
        })
        $(location).attr("href",'http://localhost/JS-2002/yinping_project/src/login.html');
        return false;
    })
    $password.on("blur", function () {
        if ($password.val().trim() === '') {
            $password.next().children(0).html("密码不得为空！");
            $password.next().children(0).css({
                color: "red",
                display: "block"
            });
            return false;

        } else if ($password.val().trim().length < 6 || $password.val().trim().length > 12) {
            $password.next().children(0).html("请输入6~12位的密码！");
            $password.next().children(0).css({
                color: "red",
                display: "block"
            });
            return false;

        } else if ($password.val().trim() != '') {
            $password.next().children(0).css("display", "none");
        }
    })
    $repassword.on("blur", function () {
        if ($repassword.val().trim() === '') {
            $repassword.next().children(0).html("确认密码不得为空！");
            $repassword.next().children(0).css({
                color: "red",
                display: "block"
            });
            return false;

        } else if ($repassword.val() != $password.val()) {
            $repassword.next().children(0).html("两次密码不一致！");
            $repassword.next().children(0).css({
                color: "red",
                display: "block"
            });
            return false;

        } else if ($repassword.val().trim() != '') {
            $repassword.next().children(0).css("display", "none");
        }
    })
    $email.on("blur", function () {
        var emailReg = /^\w{5,12}@(qq|163|126)\.(com|cn)$/;
        if ($email.val().trim() === '') {
            $email.next().children(0).html("邮箱不得为空");
            $email.next().children(0).css({
                color: "red",
                display: "block"
            });
            return false;

        } else if (!emailReg.test($email.val().trim())) {
            $email.next().children(0).html("请输入正确的邮箱！");
            $email.next().children(0).css({
                color: "red",
                display: "block"
            });
            return false;

        } else if ($email.val().trim() != '') {
            $email.next().children(0).css("display", "none");
        }
    })
}(jQuery)