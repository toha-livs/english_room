$(function() {
    $('#hzhz').click(function() {
        $('#hzhz').add('#swich_name').animate({color: '#171414', backgroundColor: '#171414'}, 400)
        $('#repass').slideDown()
        setTimeout(function() {
            $('#swich_name').html('Регистрация')
            $('#swich_name').animate({color: '#efefef'}, 400)
            $('#hzhz').css('display', 'none')
            $('#hzhz1').css('display', 'block')
            $('#login_btn').css('display', 'none')
            $('#signup_btn').css('display', 'block')
            $('#hzhz1').animate({color: '#cdd239', backgroundColor: '#efefef'}, 400)
        }, 500)
    })
    $('#hzhz1').click(function() {
        $('#hzhz1').add('#swich_name').animate({color: '#171414', backgroundColor: '#171414'}, 400)
        $('#repass').slideUp()
        setTimeout(function() {
            $('#swich_name').html('Вход')
            $('#swich_name').animate({color: '#efefef'}, 400)
            $('#hzhz1').css('display', 'none')
            $('#hzhz').css('display', 'block')
            $('#signup_btn').css('display', 'none')
            $('#login_btn').css('display', 'block')
            $('#hzhz').animate({color: '#cdd239', backgroundColor: '#efefef'}, 400)
        }, 500)
    })
    $('#signup_btn').click(function() {
        if ($('#repassword').val() == $('#password').val()) {
            var data = {
                csrfmiddlewaretoken: $('#csrf').val(),
                login: $('#login').val(),
                password: $('#password').val()
            }
            $.post('/sign-up/', data).done(function(result) {
                alert('окей, вы успешно зарегистрировались')
                location.href = '/'
            }).fail(function() {
                alert('этот логин уже используется или вы забыли ввести пароль')
                $('#password').add('#repassword').removeClass('error')
                $('#login').addClass('error')
            })
        }else{
            $('#password').add('#repassword').addClass('error')
        }
    })
    $('#login_btn').click(function() {
        var data = {
            csrfmiddlewaretoken: $('#csrf').val(),
            login: $('#login').val(),
            password: $('#password').val()
        }
        $.post('/auth/', data).done(function(result) {
            location.href = '/'
        }).fail(function() {
             alert('неправильный логин или пароль!')
        })

    })
})