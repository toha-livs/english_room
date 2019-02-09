new Vue({
    el: '#app',
    delimiters: ['${','}'],
    data: {
       user: {name: 'unknown'},
       search_word: '',
       search_words: [],
       test: '',
       category_select_db: '',
       word_db: '',
       trans_db: '',
       confirm: {word: false, trl: false},
      },
    mounted: function() {
        this.getInfo();
          },
    methods: {
        getInfo: function() {
            this.$http.get('get-info/')
                .then((response) => {
                console.log(response.data.info)
                this.user = response.data.info.user
        })
        },
        searchWords: function() {
            console.log(this.search_words)
            var data = {
                csrfmiddlewaretoken: $('#csrf').val(),
                data:  JSON.stringify({
                    word: this.search_word
                })
            }
            var vues = this
            $.post('search-word/', data).done(function(result) {
                console.log(vues.s_word2)
                vues.search_words = result.info
//                this.s_word1 = result.info.s_w1
//                this.s_word2 = result.info.s_w2
//                this.s_word3 = result.info.s_w3
//                this.s_word4 = result.info.s_w4
//                this.s_word5 = result.info.s_w5
//                this.s_word6 = result.info.s_w6
            }).fail(function() {
                alert('bad')
            })
        },
        addDataBase: function() {
            $('#search').BorderColorAnimate('#e4d98d', 300)
            this.search_words = []
            $('#icon_search').add('#searcher').animate({color: '#e4d98d'})
            $('#database').animate({color: '#e4d98d'})
            setTimeout(function() {
                $('#my').animate({color: '#73671b'})
                $('#search').css('display', 'none')
                $('#add_database').css('display', 'block')
                $('.inp_db').animate({backgroundColor: '#f3ebba'})
                setTimeout(function() {

                    $('.label_db').animate({color: '#6d610f'})
                    setTimeout(function() {
                        $('#and_db').slideDown()
                    }, 300)
                }, 500)
            }, 400)
        },
        testWord:function() {
            var word_conf = /^[A-Za-z]+$/i;
            if(!word_conf.test(this.word_db)){
                $('#word_db').animate({backgroundColor: '#cc5050'})
                this.confirm.word = false
             }else{
                if (this.word_db.length >= 20) {
                     $('#word_db').animate({backgroundColor: '#cc5050'})
                     this.confirm.word = false
                }else{
                    $('#word_db').animate({backgroundColor: '#f3ebba'})
                    this.confirm.word = true
                }
             }
        },
        testTrl: function() {
            var trans_conf = /^[А-Яа-яё ,-]+$/i;
            if(!trans_conf.test(this.trans_db)){
                $('#translate_db').animate({backgroundColor: '#cc5050'})
                this.confirm.trl = false
            }else{
                if (this.trans_db.length >= 50) {
                    $('#translate_db').animate({backgroundColor: '#cc5050'})
                    this.confirm.trl = false
                }else{
                    $('#translate_db').animate({backgroundColor: '#f3ebba'})
                    this.confirm.trl = true
                }

            }
        },
        addDB:function() {
            if (this.confirm.word && this.confirm.trl) {
                data = {
                    csrfmiddlewaretoken: $('#csrf').val(),
                    word: this.word_db,
                    trl: this.trans_db,
                    descr: $('#descr_db').val(),
                    category: this.category_select_db
                }
                $.post('add-to-my/add_to_db/', data).done(function(result) {
                    alert('слово добавлено в общую базу')
                }).fail(function() {
                    alert('это слово уже существует "' + data.word + '"')
                })
            }else{
                alert('заполните подсвеченные формы')
            }
        },
        addToMyList: function(event) {
            var div = $(event.target)
            if (div.attr('data-id') == null ) {
                div = div.parent()
            }
            var vues = this
            $.get('add-to-my/' + div.attr('data-id') + '/').done(function(result) {
                alert('слово добавлено в ваш словарь')
            }).fail(function() {
                alert('это слово уже есть в вашем словаре')
            })
        },
        addMyList: function() {
            $('#and_db').slideUp()
            $('#my').animate({color: '#e4d98d'})
            setTimeout(function() {
                $('.label_db').animate({color: '#6d610f'})
                $('.inp_db').animate({backgroundColor: '#e4d98d'})
                $('#database').animate({color: '#73671b'})
                setTimeout(function() {
                    $('#add_database').css('display', 'none')
                    $('#search').css('display', 'block')
                    $('#icon_search').add('#searcher').animate({color: '#a0933f'})
                }, 400)

            }, 400)




        },
    },
})