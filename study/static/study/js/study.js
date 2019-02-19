new Vue({
    el: '#app',
    delimiters: ['${','}'],
    data: {
       clickDiv: 0,
       words: [],
       user: {name: 'unknown'},
       loading: false,
       message: null,
      },
    mounted: function() {
        this.getWords();
          },
    methods: {
        getWords: function() {
            this.loading = true;
            this.$http.get('/study/get-relations/')
                .then((response) => {
                    this.words = response.data.info.words;
                    this.user = response.data.info.user
                    this.loading = false;
                    })
                    .catch((err) => {
                       this.loading = false;
                       console.log(err);
                      })
                },
        logg: function() {
            console.log('hi')
        },
        delWord: function(id) {
            var data = {
                csrfmiddlewaretoken: $('#csrf').val(),
                id: id
            }
            var conf = confirm('вы уверенны что хотите удалить это слово?')
            if (conf) {
                $('#word_id_' + id).slideUp()
                $.post('get-relations/', data).done(function(result) {
                    console.log('delete word')
                }).fail(function() {
                       console.log('bad request');
                      })
            }else {
                console.log('отмена удаления')
            }
        },
        startChange: function() {
            this.clickDiv += 1
            console.log(this.words.length)
            if (this.words.length == 0) {
                alert('на данный момент, у вас нет слов для изучения, вам надо их добавить, узнайте как это сделать на стартовой странице')
                return
            }else if (this.clickDiv >= 2) {
                console.log('no sense do it again')
                return
            }else {
                var clm = $('#click_me')
                clm.animate({color:'#82a4c1'})
                setTimeout(function() {
                    $('#unloads').css('display', 'none')
                    $('#loads').css('display', 'block')
                },400)
                var words = this.words
                var count = 0
                var sum_words = words.length
                var myArray = ['#c54451', '#588458', '#a25f93', '#ad8e45', '#236964', '#d6d6d6', '#6e6f77']
                setInterval( function() {
                    var colorR = myArray[Math.floor(Math.random()*myArray.length)];
                    clm.css('padding', '0')
                    $('#loads').css('display', 'none')
                    $('#unloads').css('display', 'block')
                    if (count == sum_words)  {
                        count = 0
                        }
                    clm.animate({color:'#82a4c1'})

                    setTimeout(function() {
                        clm.html(words[count]['word'] + '<br><br><p style="line-height: 40px; margin-bottom:0;white-space: pre-wrap;overflow: hidden;text-overflow: ellipsis;">' + words[count]['translate'] + '</p>')
                        clm.animate({color: colorR}, 300)
                        count ++
                        }, 500)
                    }, 7000)
                }
            }

            },

    })