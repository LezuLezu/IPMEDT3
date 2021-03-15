AFRAME.registerComponent("dieren", {
    init: function() {
        // only works for a-images with pokemon attribute/component
        const dieren = document.querySelectorAll("[dier]");
        const BASE_URL = "https://dog.ceo/api/breeds/image/random";
        // const BASE_URL_END = ".jpg"
        this.newDier = function() {
            for(let i=0; i < dieren.length; i++) {
                // let randomNum = Math.floor(Math.random() * 122) + 1;
                fetch(BASE_URL)
                    .then(response => response.json())
                    .then(data => dieren[i].setAttribute("src", data.message));
            }
        }
    },
    update: function() {
        this.newDier();
    },
    tick: function() {},
    remove: function() {},
    pause: function() {},
    play: function() {}
});