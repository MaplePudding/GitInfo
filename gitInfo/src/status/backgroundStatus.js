let modeObj = {
    mode: "light",

    changeMode: function(){
        this.mode === "light" ? this.mode = "dark" : this.mode = "light"
    },

    getMode: function(){
        return this.mode;
    }
}

export default modeObj