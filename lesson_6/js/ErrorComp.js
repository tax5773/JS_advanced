const error = {
    data() {
        return {
            text: ''
        }
    },
    method: {
        setError(error){
            this.text = error
        }
    },
    computed: {
        isShown(){
            return this.text !== ''
        }
    },
    template: `
    <div class = "error__warp" v-if="isShown">
        <p class="error-msg">
            <button class="close-btn" @click="setError('')">X</button>
            {{ text }}
        </p>
    </div>
    `
}