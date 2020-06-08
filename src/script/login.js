!function ($) {
    const $username = $("#username");
    const $password = $("#password");
    const $btn = $("[type=button]");

    $btn.on("click", function () {
        $.ajax({
            type: "post",
            url: 'http://localhost/JS-2002/yinping_project/php/login.php',
            data: {
                username: $username.val(),
                password: $password.val()
            },
            success: function (data) {
                if (!data) {
                    $password.val('');
                    alert('用户名或者密码错误');
                } else {
                    location.href = "index.html";
                    localStorage.setItem('username', $username.val());
                }
            }
        })
    })
}(jQuery)