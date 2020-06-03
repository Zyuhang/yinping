!function ($) {
    const $username = $("#username");
    const $password = $("#password");
    const $btn = $("button");
    $username.on("blur", function () {
        $.ajax({
            type: 'get',
            url: 'http://localhost/JS-2002/project/php/login.php',
            data: {
                username: $username.val()
            },
            success: function (res) {
                if (!res) {
                    $username.next().children(0).html("用户名错误");
                    $username.next().children(0).css({
                        color: "red",
                        display: "block"
                    });
                } else {
                    $username.next().children(0).html("√");
                    $username.next().children(0).css({
                        color: "green",
                        display: "block"
                    });
                }
            }
        })
    })

    $password.on("blur", function () {
        $.ajax({
            type: 'get',
            url: 'http://localhost/JS-2002/project/php/login.php',
            data: {
                password: $password.val()
            },
            success: function (result) {
                if (!result) {
                    $password.next().children(0).html("密码错误");
                    $password.next().children(0).css({
                        color: "red",
                        display: "block"
                    });
                } else {
                    $password.next().children(0).html("√");
                    $password.next().children(0).css({
                        color: "green",
                        display: "block"
                    });
                }
            }
        })
    })

    $btn.on("click", function () {
        if ($username.next().children(0).html() == $password.next().children(0).html()) {
            $(location).attr("href", 'http://localhost/JS-2002/project/src/index.html');
            return false;
        }

    })
}(jQuery)