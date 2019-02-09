new Vue({
    el: '#app',
    delimiters: ['${','}'],
    data: {
       words: [],
       user: {},
       loading: false,
       currentWord: {},
       message: null,
       newWord: { 'word': null, 'user': null , 'progress': null},
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
                }
            },

    })