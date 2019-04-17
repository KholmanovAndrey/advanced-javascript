Vue.component('error', {
    data(){
        return {
            text: ''
        }
    },
    methods: {
        render(text){
            this.text = text;
        }
    },
    template: `<p class="error" v-if="text">{{ text }}</p>`
});