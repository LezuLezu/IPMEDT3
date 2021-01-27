window.onload = () => {
  console.log("JS connected");


//   whiteboard code
//     fetch needed elements
  const volgende = document.getElementById('js--volgendeSlide');
  const vorige = document.getElementById('js--vorigeSlide')
  const display = document.getElementById('js--displayBox');
  const inhoud = ["Hallo welkom bij onze VR experience. Deze VR room gaat je helpen beter leren om te gaan met verschillende veiligheidsvoorschriften van het chemie lab op de Hogeschool Leiden",
                  "Loop door het lab met behulp van de grijze vlakken. Houd je cursor op het vlak tot je begint te bewegen.",
                  "Je kunt de voorwerpen op de tafel oppakken door je cursor erop te houden totdat je het voorwerp in je hand hebt.",
                  "Zoek vervolgens de juiste afvalbak voor het voorwerp en plaats het voorwerp in de bak op dezelfde manier.",
                  "Pak nu een voorwerp om te beginnen!"];
  const afvalBak = document.getElementById('js--afvalBak');

  let index = 0;

  function laatTextZien(getal) {
    console.log(getal);
    display.setAttribute("value", inhoud[getal]);
  }


  volgende.onclick = (event) => {
    console.log(index);
    if(index < inhoud.length) {
      setTimeout(() => {
        laatTextZien(index), index++, afvalBak.setAttribute("opacity", 1);
      }, 2000);

      responsiveVoice.speak(inhoud[index], "Dutch Female");
    }
    else {
      console.log("lijst is leeg");
    }

  }

  // vorige.onclick = (event) => {
  //   console.log(index);
  //   if(index == 0) {
  //     console.log("Kan niet terug")
  //   }
  //   else {
  //     setTimeout(() => {
  //       laatTextZien(index), index--, afvalBak.setAttribute("opacity", 1);
  //     }, 2000);

  //     responsiveVoice.speak(inhoud[index], "Dutch Female");
  //   }

  // }
// end whiteboard code

function spreek(object){
  responsiveVoice.speak("Je hebt nu " + object + " opgepakt. Weet je waar die naar toe moet?" , "Dutch Female");
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

  // Display
  let displayInfo = document.getElementsByClassName("js--info");

  // Pickup items
  let pickups = document.getElementsByClassName('js--pickup');
  let hold = null;
  let source = null;
  let scaleX  = null;
  let scaleY = null;
  let scaleZ = null;
  let huidigObject = null;
  const petriS = document.getElementById('js--petriSchaal');
  const petriInhoud = document.getElementById('js--petriSchaal_Inhoud');
  const reageerBuis = document.getElementById('js--reageerBuis');
  const maatCylinder = document.getElementById('js--maatCylinder');
  const bekerGlas = document.getElementById('js--bekerGlas');
  const placeholders = document.getElementsByClassName('js--placeholder');

  function addListeners() {
    for (let i = 0; i < pickups.length; i++) {
      pickups[i].addEventListener('click', function(evt){
        if (hold == null) {
          let camera_position = camera.getAttribute('position');
          let box_position = this.getAttribute('position');
          let posZ = -0.4;
          source = pickups[i].getAttribute('src');
          scaleX= pickups[i].getAttribute('scale').x;
          scaleY = pickups[i].getAttribute('scale').y;
          scaleZ = pickups[i].getAttribute('scale').z;
          console.log("X"+scaleX);
          console.log("Y"+scaleY);
          console.log("Z"+scaleZ);

          console.log(pickups[i]);
          if (pythagoras(box_position.x, box_position.z, camera_position.x, camera_position.z) < 5) {
            switch(pickups[i].getAttribute("id")){
              case "js--petriSchaal":
                console.log("petriS");
                spreek("bacterieplaat");
                displayInfo[0].setAttribute("value", "Object: Bacterieplaat");
                displayInfo[1].setAttribute("value", "Materiaal: Glas");
                displayInfo[2].setAttribute("value", "Inhoud: Geen");
                break;
              case "js--reageerBuis":
                console.log("reageerBuis");
                spreek("reageerbuis");
                displayInfo[0].setAttribute("value", "Object: Reageerbuis");
                displayInfo[1].setAttribute("value", "Materiaal: Glas");
                displayInfo[2].setAttribute("value", "Inhoud: Geen");
                posZ = posZ - 0.4
                break;
              case "js--petriSchaal_Inhoud":
                console.log("petriInhoud");
                spreek("bacterieplaat met inhoud");
                displayInfo[0].setAttribute("value", "Object: Bacterieplaat");
                displayInfo[1].setAttribute("value", "Materiaal: Glas");
                displayInfo[2].setAttribute("value", "Inhoud: E. Coli");
                break;
              case "js--maatCylinder":
                console.log("maatcylinder");
                spreek("maatcilinder");
                displayInfo[0].setAttribute("value", "Object: Maatcilinder");
                displayInfo[1].setAttribute("value", "Materiaal: Glas");
                displayInfo[2].setAttribute("value", "Inhoud: Geen");
                break;
              case "js--bekerGlas":
                console.log("bekerglas");
                spreek("bekerglas");
                displayInfo[0].setAttribute("value", "Object: Bekerglas");
                displayInfo[1].setAttribute("value", "Materiaal: Plastic");
                displayInfo[2].setAttribute("value", "Inhoud: Geen");
                break;
              case "js--pipet":
                console.log("pipet");
                spreek("pipet");
                displayInfo[0].setAttribute("value", "Object: Pipet");
                displayInfo[1].setAttribute("value", "Materiaal: Plastic");
                displayInfo[2].setAttribute("value", "Inhoud: Geen");
                break;
            }
             camera.innerHTML += '<a-gltf-model id="js--hold" class="js--pickup js--interact" src="' +
              source + '" scale="'+ scaleX + " " + scaleY + " " + scaleZ + '" position="0.5 ' + posZ + ' -0.5"></a-gltf-model>';
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
        scene.appendChild(item);
        document.getElementById("js--hold").remove();
        addListeners();
        hold = null;
        source = null;
        displayInfo[0].setAttribute("value", "Object: Niets opgepakt");
        displayInfo[1].setAttribute("value", "Materiaal: N.v.t.");
        displayInfo[2].setAttribute("value", "Inhoud: N.v.t.");
      }
    });
  }


}
