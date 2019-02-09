$(function(){
    $('#btn_add_all').click(function(){
        infa = {
            word: $('#word_all').val(),
            trl: $('#translate').val(),
            ctgr: $('#categor').val()
        }
        data = {
            csrfmiddlewaretoken: $('#csrf').val(),
            info: JSON.stringify(infa)
            }
//        console.log(info)
        $.post('add-all/', data).done(function(result) {
            alert('словл добавлено в базу')
        }).fail(function(result){
            alert('Это слово уже есть в базе!')
        })
    });

    $('#btn_for_user').click(function(){
        infa = {
            word: $('#word_for_user').val(),
        }
        $.get('add-user-word/' + $('#word_for_user').val() + '/').done(function(result) {
            for (var g in result.words) {
                $('#word_' + g).html('<div class="container-fluid"><div class="row"><div class="col-8"><div id="title_">' +  result.words[g]['word']+ ' ' +  result.words[g]['translate'] + '</div><div id="footer_">'+ result.words[g]['desc']+'</div></div><div class="col-4"><img class="hz" style="float: right;" src="https://img.icons8.com/ios-glyphs/48/b0c5da/plus-math.png"></div></div></div></div>')
                $('#word_' + g).attr('data-id', result.words[g]['id'])
                $('#word_' + g).show()
                console.log(result.words[g]['word'])
            }
        }).fail(function(result){
            alert('Этого слова нет в базе!')
        })
    })

    $('.sloi').click(function(){
        var data = {
            word_id: $(this).attr('data-id'),
            csrfmiddlewaretoken: $('#csrf').val()
        }
        console.log('нажал')
        $.post('add-user-word/post/', data).done(function(result){
            alert('слово сохранилось в "изучение"')
        }).fail(function(result){
            alert('слово уже добавлено в "изучение"')
        })
    })
    $('.hz').click(function(){
        alert('good')
    })

})