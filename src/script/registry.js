!function ($) {
    const $username = $("#username");
    const $password = $("#password");
    const $repassword = $("#repassword");
    const $email = $("#email");
    const $btn = $("button");
    let $usernameflag = true;
    let $passwordflag = true;
    let $repasswordflag = true;
    let $emailflag = true;
    let $ajaxflag = true;
//1.用户名
    $username.on("focus", function () {
        $username.next().children(0).html("最长14个英文或7个汉字!");
        $username.next().children(0).css({
            color: "#999",
            display: "block"
        });
    })
    $username.on("blur", function () {
        if ($(this).val() !== "") {
            let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length;
            if (len < 14) {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/JS-2002/yinping_project/php/registry.php',
                    data: {
                        username: $username.val()
                    }
                }).done(function (res) {
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
                })
            } else {
                $username.next().children(0).html("用户名长度不正确");
                $username.next().children(0).css({
                    color: "red",
                    display: "block"
                });
                $usernameflag = false;
            }
        } else {
            $username.next().children(0).html("用户名不得为空！");
            $username.next().children(0).css({
                color: "red",
                display: "block"
            });
            $usernameflag = false;
        }
    })
//2.密码
    $password.on("focus", function () {
        $password.next().children(0).html("长度为6~14个字符,至少包含2种字符");
        $password.next().children(0).css({
            color: "#999",
            display: "block"
        });
    })
    $password.on("blur", function () {
        if ($password.val().trim() !== '') {
            if ($passwordflag) {
                $password.next().children(0).html("√");
                $password.next().children(0).css({
                    color: "green",
                    display: "block"
                });
            }
            $passwordflag = true;
        } else {
            $password.next().children(0).html("密码不得为空");
            $password.next().children(0).css({
                color: "red",
                display: "block"
            });
            $passwordflag = false;
        }
    })
    $password.on('input', function () {
        let $pass = $(this).val();
        if ($pass.length >= 6 && $pass.length <= 14) {
            let regnum = /\d+/;
            let regupper = /[A-Z]+/;
            let reglower = /[a-z]+/;
            let regother = /[\W\_]+/;

            let $number = 0;

            if (regnum.test($pass)) {
                $number++;
            }

            if (regupper.test($pass)) {
                $number++;
            }

            if (reglower.test($pass)) {
                $number++;
            }

            if (regother.test($pass)) {
                $number++;
            }

            switch ($number) {
                case 1:
                    $password.next().children(0).html("弱");
                    $password.next().children(0).css({
                        color: "red",
                        display: "block"
                    });
                    $passwordflag = false;
                    break;

                case 2:
                case 3:
                    $password.next().children(0).html("中");
                    $password.next().children(0).css({
                        color: "#ff6600",
                        display: "block"
                    });
                    $passwordflag = true;
                    break;
                case 4:
                    $password.next().children(0).html("强");
                    $password.next().children(0).css({
                        color: "green",
                        display: "block"
                    });
                    $passwordflag = true;
                    break;
            }

        } else {
            $password.next().children(0).html("密码长度错误");
            $password.next().children(0).css({
                color: "red",
                display: "block"
            });
            $passwordflag = false;
        }
    })
//3.确认密码
    $repassword.on("blur", function () {
        if ($repassword.val().trim() !== '') {
            if ($repasswordflag) {
                $repassword.next().children(0).html("√");
                $repassword.next().children(0).css({
                    color: "green",
                    display: "block"
                });
            }
            $repasswordflag = true;
        } else {
            $repassword.next().children(0).html("密码不得为空");
            $repassword.next().children(0).css({
                color: "red",
                display: "block"
            });
            $passwordflag = false;
        }
        if ($repassword.val() != $password.val()) {
            $repassword.next().children(0).html("两次密码不一致！");
            $repassword.next().children(0).css({
                color: "red",
                display: "block"
            });
            $repasswordflag = false;
        }
    })
//4.邮箱
    $email.on("blur", function () {
        if ($email.val().trim() !== '') {
            if ($emailflag) {
                $email.next().children(0).html("√");
                $email.next().children(0).css({
                    color: "green",
                    display: "block"
                });
            }
            $emailflag = true;
        } else {
            $email.next().children(0).html("邮箱不得为空");
            $email.next().children(0).css({
                color: "red",
                display: "block"
            });
            $emailflag = false;
        }
        let email = /^(\w+[\+\-\.]*\w+)\@(\w+[\-\.]*\w+)\.(\w+[\-\.]*\w+)$/;
        if (email.test($email.val())) {
            $email.next().children(0).html("√");
            $email.next().children(0).css({
                color: "green",
                display: "block"
            });
            $emailflag = true;
        } else {
            $email.next().children(0).html("邮箱格式不正确");
            $email.next().children(0).css({
                color: "red",
                display: "block"
            });
            $emailflag = false;
        }
    })

//5.按钮点击
    $btn.on("click", function () {
        if ($username.val().trim() === '') {
            $username.next().children(0).html("用户名不得为空！");
            $username.next().children(0).css({
                color: "red",
                display: "block"
            });
            $usernameflag = false;
        }
        if ($password.val().trim() === '') {
            $password.next().children(0).html("密码不得为空！");
            $password.next().children(0).css({
                color: "red",
                display: "block"
            });
            $passwordflag = false;
        }
        if ($repassword.val().trim() === '') {
            $repassword.next().children(0).html("确认密码不得为空！");
            $repassword.next().children(0).css({
                color: "red",
                display: "block"
            });
            $repasswordflag = false;
        }
        if ($email.val().trim() === '') {
            $email.next().children(0).html("邮箱不得为空！");
            $email.next().children(0).css({
                color: "red",
                display: "block"
            });
            $emailflag = false;
        }

        if (!$usernameflag || !$passwordflag || !$repasswordflag || !$emailflag || !$ajaxflag) {
            return false;
        }

        if ($ajaxflag) {
            $.ajax({
                type: "post",
                url: "http://localhost/JS-2002/yinping_project/php/registry.php",
                data: {
                    username: $username.val(),
                    password: $password.val(),
                    email: $email.val()
                }
            }).done(function(){
                location.href = "http://localhost/JS-2002/yinping_project/src/login.html"
            })
            $ajaxflag = true;
        }
        return false;
    })
}(jQuery)