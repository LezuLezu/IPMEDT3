AFRAME.registerComponent("planten", {
    init: function() {
        // only works for a-images with pokemon attribute/component
        const planeten = document.querySelectorAll("[planeet]");
        const BASE_URL = "https://swapi.dev/api/planets/";
        const KEY = '?token=a7c8-yYT-Rzc6uh9a1riX4yjfhHNr4coHSIhvetef3s';
        this.newPlaneet = function() {
            for(let i=0; i < planeten.length; i++) {
                let randomNum = Math.floor(Math.random() * 59) + 1;
                fetch(BASE_URL + randomNum)
                    .then(response => response.json())
                    .then(data => planeten[i].setAttribute("value", ("Planet name: " + data.name + "\n Climate: " + data.climate + "\n Terrain: " + data.terrain)));
            }
        }

        this.el.addEventListener("mouseenter", this.newPlaneet);
    },
    update: function() {
        this.newPlaneet();
    },
    tick: function() {},
    remove: function() {},
    pause: function() {},
    play: function() {}
});