!function ($) {
    const $username = $("#username");
    const $password = $("#password");
    const $btn = $("[type=button]");
    let $usernameflag = true;
    let $passwordflag = true;
//1.用户名
    $username.on("blur", function () {
        if ($username.val().trim() !== '') {
            if ($usernameflag) {
                $username.next().children(0).html("√");
                $username.next().children(0).css({
                    color: "green",
                    display: "block"
                });
            }
            $usernameflag = true;
        } else {
            $username.next().children(0).html("用户名不得为空");
            $username.next().children(0).css({
                color: "red",
                display: "block"
            });
            $usernameflag = false;
        }
    })
//2.密码
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
//3.按钮点击
    $btn.on("click", function () {
        $.ajax({
            type: "post",
            url: 'http://localhost/JS-2002/yinping_project/php/login.php',
            data: {
                username: $username.val(),
                password: $password.val()
            },
            success: function (res) {
                if (!res) {
                    $password.val('');
                    alert('用户名或者密码错误');
                } else {
                    location.href = "http://localhost/JS-2002/yinping_project/src/index.html";
                    localStorage.setItem('username', $username.val());
                }
            }
        })
        if (!$usernameflag || !$passwordflag) {
            return false;
        }
    })
}(jQuery)