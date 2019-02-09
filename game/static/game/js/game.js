new Vue({
    el: '#app',
    delimiters: ['${','}'],
    data: {
        game_but: '1',
        max_words: 0,
        game: {
            id: '',
            words: [],
            col_rounds: 0,
            round_now: 0,
            word_now: {},
            vars_1: {},
            vars_2: {},
            vars_3: {},
        },
       user: {name: 'unknown'},
       loading: false,
      },
    mounted: function() {
        this.getWords();
          },
    methods: {
        getWords: function() {
            this.loading = true;
            this.$http.get('/game/get-info/')
                .then((response) => {
                    console.log(response.data.info.sum_words)
                    this.user = response.data.info.user;
                    this.max_words = response.data.info.sum_words
                    this.loading = false;
                    if (this.max_words <= 2) {
                        $('#my_words_choice').prop('disabled', true)
                    }
                    })
                    .catch((err) => {
                       this.loading = false;
                       console.log(err);
                      })
                },
        getMore: function(a) {
            var handle = $("#custom-handle .value-output");
            $("#slider").slider({
                min: 3,
                max: a,
                step: 1,
                create: function() {
                  handle.text($(this).slider("value"));
                },
                slide: function(event, ui) {
                  handle.text(ui.value);
                }
            })
            $('.choice_div').slideUp(100)
            setTimeout(function(){
            $('#slider').add('#div_get_game').slideDown(100)}, 300)
        },
        getSlider1: function() {
            this.game_but = '1'
            this.getMore(20)
        },
        getSlider2: function() {
            this.game_but = '2'
            this.getMore(this.max_words)

        },
        getGame: function() {
            col_rounds = $('.value-output').text()
            this.game.col_rounds = col_rounds
            this.$http.get('/game/get-game/' + this.game_but + '/' + col_rounds + '/')
            .then((response) => {
                    console.log(this.game.word_now)
                    this.game.word_now = response.data.info.word
                    this.game.vars_1 = response.data.info.vars[0]
                    this.game.vars_2 = response.data.info.vars[1]
                    this.game.vars_3 = response.data.info.vars[2]
//                    this.game.word_now.name = response.data.info.word.name
//                    this.
                    console.log(this.game.word_now)
                    this.game.words = response.data.info.game.game_list_words_id
                    this.game.id = response.data.info.game.id
                    this.game.round_now = 1
//                    console.log('my_data_col_rounds', this.game.col_rounds)
                    console.log('my__id', this.game.id)
//                    this.loading = false;
                    })
                .catch((err) => {
                   this.loading = false;
                   console.log(err);
                  })
//            alert(this.game.word_now.name)
            $('#zh').slideUp()
//            var word_now_my = this.game.word_now
            setTimeout(function() {
                $('#game_vars').css('display', 'block')
//                alert(word_now_my.name)
//                $('#word_game').html(word_now_my.name)
//                $('#word_game').attr('data-id', word_now_my.id)
                $('#word_game').slideDown()
                setTimeout(function() {
                    $('#div_of_vars').slideDown()
                },400)
            },600)
        },
        clickVars: function(event) {
          var r_result = {
            game_id: this.game.id,
            word_old: this.game.word_now.id,
            word_new: this.game.words[this.game.round_now],
            round: this.game.round_now,
            game_type: this.game_but
          }
          console.log(r_result)
          this.game.round_now += 1
          $('#vars_1').add('#vars_2').add('#vars_3').animate({backgroundColor: '#e6d0d0', color: '#e6d0d0'}, 300)
          $('#vars_1').add('#vars_2').add('#vars_3').BorderColorAnimate('#e6d0d0', 300)
          var choice_div = event.target
          var vues = this
          setTimeout(function() {
                if ($(choice_div).attr('data-result') == 'True') {
                    $(choice_div).animate({color: '#239623', backgroundColor: '#93bd79'})
                  r_result.result = true
                    }else {
                        r_result.result = false
                        $(choice_div).animate({color: '#960909', backgroundColor: '#cc3b3b'})
                        setTimeout(function() {
                            $('*[data-result="True"]').animate({color: '#239623', backgroundColor: '#93bd79'})}, 1100)
                    }
                setTimeout(function() {
                        $('#vars_1').add('#vars_2').add('#vars_3').add('#word_game').animate({backgroundColor: '#e6d0d0', color: '#e6d0d0'}, 300)
                    }, 1800)
                var data = {
                        csrfmiddlewaretoken: $('#csrf').val(),
                        info: JSON.stringify(r_result)
                    }
//                var vues = this
                setTimeout(function() {
                    $.post('/game/get-game/33/31/', data).done(function(result) {
                                    if (result.info.complete == true) {
                                        $('#game_vars').css('display', 'none')
                                        $('#complete_div').slideDown()
                                        setTimeout(function() {
                                            location.href = '/study/'
                                        }, 2000)
                                    }else{
                                        console.log(result.info)
                                        console.log(vues.game.id)
                                        vues.game.word_now = result.info.word
                                        vues.game.vars_1 = result.info.vars[0]
                                        vues.game.vars_2 = result.info.vars[1]
                                        vues.game.vars_3 = result.info.vars[2]
                                        $('#word_game').animate({color: '#ab8080'})
                                        setTimeout(function() {
                                            $('#vars_1').add('#vars_2').add('#vars_3').animate({backgroundColor: '#c3c3c3', color: '#867f7f'}, 600)
                                        }, 700)}
                                    }).fail(function() {
                                        alert('bad')
                                    })
                    }, 2800)
                }, 1300)
        },
            },

    })