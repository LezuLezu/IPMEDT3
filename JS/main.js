window.onload = () => {
  console.log("JS connected");


//   whiteboard code
//     fetch needed elements
  const testDoos = document.getElementById('js--doos');
  const display = document.getElementById('js--displayBox');
  const inhoud = ["Hallo welkom bij onze VR \n experience. Deze VR room \n gaat je helpen beter leren om te gaan \n met verschillende veiligheidsregels \n van het chemie lab op de Hogeschool \n Leiden", "Item2", "Item3"];
  const afvalBak = document.getElementById('js--afvalBak');

  let index = 0;

  function laatTextZien(getal) {
    console.log(getal);
    display.setAttribute("value", inhoud[getal]);
  }


  testDoos.onclick = (event) => {
    console.log(index);
    setTimeout(() => {
      laatTextZien(index), index++, afvalBak.setAttribute("opacity", 1);
    }, 2000);


    responsiveVoice.speak(inhoud[index], "Dutch Female");

  }
// end whiteboard code

function spreek(object){
  responsiveVoice.speak("Je hebt nu " + object + " opgepakt. Weet je waar die naar toe moet?" , "Dutch Female");
}

function foutObject(){
  responsiveVoice.speak("Dit is niet de juiste plek om dit te deponeren, weet je waar die wel moet?", "Dutch Female");
}



  // fetching elements
  const cursor = document.getElementById("js--cursor");
  const places = document.getElementsByClassName("js--place");
  let scene = document.getElementById("js--scene");
  const position = document.getElementsByClassName("js--position");
  const camera = document.getElementById("js--camera");

  // bewegen
  function pythagoras(x1, z1, x2, z2) {
    return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2) )
  }
  for (let i = 0; i < places.length; i++) {
    places[i].addEventListener('click', function(evt){
      let att = document.createAttribute("animation");
      let camera_position = camera.getAttribute('position');
      let box_position = this.getAttribute('position');
      let duration = pythagoras(box_position.x, box_position.z, camera_position.x, camera_position.z) * 333;
      att.value = "property: position; easing: linear; dur: " + duration + "; to: " + this.getAttribute('position').x + " 1.6 " + this.getAttribute('position').z;
      camera.setAttribute('animation', att.value);
    });
  }
  // Pickup items
  let pickups = document.getElementsByClassName('js--pickup');
  let hold = null;
  let source = null;
  let scaleX  = null;
  let scaleY = null;
  let scaleZ = null;

  let huidigObject = null;
  let huidigNeerzet = null;

  const petriSchaal = document.getElementById('js--petriSchaal').getAttribute("id");
  const petriInhoud = document.getElementById('js--petriSchaal_Inhoud').getAttribute("id");
  const reageerBuis = document.getElementById('js--reageerBuis').getAttribute("id");
  const placeholders = document.getElementsByClassName('js--placeholder');
  const emmerZak = document.getElementById('js--emmerZak').getAttribute("id"); //besmette bactierplaat gaat hier in, petris met stip
  const emmer = document.getElementById('js--emmer'); //besmet glaswerk
  const plasticBak = document.getElementById('js--plasticBak'); //gebruikt niet besmet glas

  function addListeners() {
      for (let i = 0; i < pickups.length; i++) {
        pickups[i].addEventListener('click', function(evt){
          if (hold == null) {
            let camera_position = camera.getAttribute('position');
            let box_position = this.getAttribute('position');
            source = pickups[i].getAttribute('src');
            scaleX= pickups[i].getAttribute('scale').x;
            scaleY = pickups[i].getAttribute('scale').y;
            scaleZ = pickups[i].getAttribute('scale').z;
            console.log("X"+scaleX);
            console.log("Y"+scaleY);
            console.log("Z"+scaleZ);
            huidigObject = pickups[i].getAttribute("id");
            console.log(huidigObject);
            switch(pickups[i].getAttribute("id")){
              case petriSchaal:
                spreek("petrischaal");
                break;
              case reageerBuis:
                spreek("reageerbuis");
                break;
              case petriInhoud:
                spreek("petriSchaal met inhoud");
                break;
            }
            // console.log("Je hebt het volgende object gepakt: " + huidigObject);
            if (pythagoras(box_position.x, box_position.z, camera_position.x, camera_position.z) < 5) {
              camera.innerHTML += '<a-gltf-model id="js--hold" class="js--pickup js--interact" src="' +
                source + '" scale="'+ scaleX + " " + scaleY + " " + scaleZ + '" position="1 -1 -1.5"></a-gltf-model>';
              hold = "hold";
              this.remove();

            }
          }
        });
      }
    }

    addListeners();

    for (let i = 0; i < placeholders.length; i++) {
      placeholders[i].addEventListener('click', function(evt){
        console.log(source);

        if (hold == "hold"){
          let item = document.createElement('a-gltf-model');
          item.setAttribute("src", source);
          item.setAttribute("class", "js--pickup js--interact");
          item.setAttribute("scale", {x: scaleX, y: scaleY, z: scaleZ});
          item.setAttribute("position", {x: placeholders[i].getAttribute('position').x, y:"-1", z: placeholders[i].getAttribute('position').z});
          // scene.appendChild(item);
          huidigNeerzet = placeholders[i].getAttribute("id");
          console.log("Je hebt nu de volgende locatie gekozen: " + huidigNeerzet);
          console.log("Je huidige object is: " + huidigObject);
          console.log(emmerZak, petriSchaal, petriInhoud);
          switch(huidigNeerzet)
          {
            case emmerZak:
              if(huidigObject != petriInhoud)
              {
                foutObject();

              }
              else if(huidigObject == petriInhoud)
              {
                document.getElementById("js--hold").remove();
                addListeners();
                hold = null;
                source = null;
                console.log("Correcte plek!");
                scene.appendChild(item);
              }
              break;
            case petriSchaal:
            case petriInhoud:

          petriInhoud
          reageerBuis
          }
          // document.getElementById("js--hold").remove();
          // addListeners();
          // hold = null;
          // source = null;

        }
      });
    }


}
