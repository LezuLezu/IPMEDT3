window.onload = () => {
  console.log("JS connected");


  //   whiteboard code
  //     fetch needed elements
  let aantalFouten = 0;
  const volgende = document.getElementById('js--volgendeSlide');
  const vorige = document.getElementById('js--vorigeSlide')
  const display = document.getElementById('js--displayBox');
  const finish = document.getElementById('js--score');
  const inhoud = ["Hallo welkom bij onze VR experience. Deze VR room gaat je helpen beter leren om te gaan met verschillende veiligheidsvoorschriften van het chemie lab op de Hogeschool Leiden",
    "Loop door het lab met behulp van de grijze vlakken. Houd je cursor op het vlak tot je begint te bewegen.",
    "Je kunt de voorwerpen op de tafel oppakken door je cursor erop te houden totdat je het voorwerp in je hand hebt.",
    "Zoek vervolgens de juiste afvalbak voor het voorwerp en plaats het voorwerp in de bak op dezelfde manier.",
    "Pak nu een voorwerp om te beginnen!",
    "Als je klaar bent met alles mag je op de knop onder het bord klikken"
  ];



  function laatFoutZien(getal){
    const fouten = ["Goedzo! Je hebt goed gescoord, ga zo door! Je heb in totaal: " + aantalFouten + " fouten gemaakt.",
    "Goed gedaan, het lijkt dat je wat moeite hebt met het correct gebruik maken van de afvalbakken, doe de oefening nog opnieuw. Je hebt in totaal: " + aantalFouten + " fouten gemaakt.",
    "Oei! Dat ging wat stroef, doe de oefening opnieuw en blijf het herhalen totdat je 2 of minder fouten hebt. Je hebt nu in totaal: " + aantalFouten + " fouten gemaakt"
    ];
  display.setAttribute("value", fouten[getal]);
  return fouten;
}

  index = 0;

  function laatTextZien(getal) {
    console.log(getal);
    display.setAttribute("value", inhoud[getal]);
  }

  function laatEindeZien()
  {
    console.log(aantalFouten);
    if(aantalFouten <= 2)
    {
      laatFoutZien(0);
      responsiveVoice.speak(laatFoutZien(0)[0], "Dutch Female");
    }
    else if(aantalFouten <= 6)
    {
      laatFoutZien(1);
      responsiveVoice.speak(laatFoutZien(1)[1], "Dutch Female");
    }
    else if(aantalFouten > 6)
    {
      laatFoutZien(2);
      responsiveVoice.speak(laatFoutZien(2)[2], "Dutch Female");
    }
  }

  function checkFinish()
  {
    finish.setAttribute("position", "4 -6.3 0.1");
  }

  finish.onclick = (event) =>
  {
    laatEindeZien()
  }




  volgende.onclick = (event) =>
  {
    console.log(index);
    if (index < inhoud.length)
    {
      setTimeout(() =>
      {
        laatTextZien(index), index++;
      }, 2000);

      responsiveVoice.speak(inhoud[index], "Dutch Female");
      if(index == 1)
      {
        checkFinish();
      }
    }
    else
    {
      console.log("lijst is leeg");
    }
  }




  function spreekObject(object) {
    responsiveVoice.speak("Je hebt nu " + object + " opgepakt. Weet je waar die naar toe moet?", "Dutch Female");
  }

  function foutObject() {
    responsiveVoice.speak("Dit is niet de juiste plek om dit te deponeren, weet je waar die wel moet?", "Dutch Female");
    aantalFouten++;
    console.log("Tot nu toe zijn er : " + aantalFouten + " fouten");
  }



  // fetching elements
  const cursor = document.getElementById("js--cursor");
  const places = document.getElementsByClassName("js--place");
  let scene = document.getElementById("js--scene");
  const position = document.getElementsByClassName("js--position");
  const camera = document.getElementById("js--camera");

  // bewegen
  function pythagoras(x1, z1, x2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2))
  }
  for (let i = 0; i < places.length; i++) {
    places[i].addEventListener('click', function(evt) {
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
  let scaleX = null;
  let scaleY = null;
  let scaleZ = null;


  let huidigObject = null;
  let huidigNeerzet = null;

  const petriSchaal = document.getElementById('js--petriSchaal').getAttribute("id"); //plastic bak
  const petriInhoud = document.getElementById('js--petriSchaal_Inhoud').getAttribute("id"); //emmer met zak
  const reageerBuis = document.getElementById('js--reageerBuis').getAttribute("id"); //reageerbuismand
  const maatCylinder = document.getElementById('js--maatCylinder').getAttribute("id"); //emmer zonder zak
  const bekerGlas = document.getElementById('js--bekerGlas').getAttribute("id"); //plastic bak
  const pipet = document.getElementById('js--pipet').getAttribute("id"); // onbekend

  const placeholders = document.getElementsByClassName('js--placeholder');
  const emmerZak = document.getElementById('js--emmerZak').getAttribute("id"); //besmette bactierplaat gaat hier in, petris met stip
  const emmer = document.getElementById('js--emmer').getAttribute("id"); //besmet glaswerk
  const plasticBak = document.getElementById('js--plasticBak').getAttribute("id"); //gebruikt niet besmet glas
  const reageerMand = document.getElementById('js--reageerBuisMand').getAttribute("id"); //reageerbuis

  function addListeners() {
    for (let i = 0; i < pickups.length; i++) {
      pickups[i].addEventListener('click', function(evt) {
        if (hold == null) {
          let camera_position = camera.getAttribute('position');
          let box_position = this.getAttribute('position');
          let posZ = -0.4;
          source = this.getAttribute('src');
          scaleX = this.getAttribute('scale').x;
          scaleY = this.getAttribute('scale').y;
          scaleZ = this.getAttribute('scale').z;
          console.log("X" + scaleX);
          console.log("Y" + scaleY);
          console.log("Z" + scaleZ);
          let rotation = "0 0 0";
          huidigObject = this.getAttribute("id");
          console.log(huidigObject);

          function toonInformatie(object, materiaal, inhoud) {

            displayInfo[0].setAttribute("Value", "Object: " + object);
            displayInfo[1].setAttribute("Value", "Materiaal: " + materiaal);
            displayInfo[2].setAttribute("Value", "Inhoud: " + inhoud);
          }

          // console.log("Je hebt het volgende object gepakt: " + huidigObject);
          if (pythagoras(box_position.x, box_position.z, camera_position.x, camera_position.z) < 5) {
            switch (this.getAttribute("id")) {
              case petriSchaal:
                console.log("petriS");
                spreekObject("bacterieplaat");
                toonInformatie("Bacterieplaat", "Glas", "Geen");
                break;
              case reageerBuis:
                console.log("reageerBuis");
                spreekObject("reageerbuis");
                toonInformatie("Reageerbuis", "Glas", "Geen");
                posZ = posZ - 0.4
                break;
              case petriInhoud:
                console.log("petriInhoud");
                spreekObject("bacterieplaat met inhoud");
                toonInformatie("Bacterieplaat", "Glas", "E. Coli");
                break;
              case maatCylinder:
                console.log("maatcylinder");
                spreekObject("maatcilinder");
                toonInformatie("Maatcilinder", "Glas", "Geen");
                posZ = posZ - 0.4
                break;
              case bekerGlas:
                console.log("bekerglas");
                spreekObject("bekerglas");
                toonInformatie("Bekerglas", "Plastic", "Geen");
                break;
              case pipet:
                console.log("pipet");
                spreekObject("pipet");
                toonInformatie("Pipet", "Plastic", "Geen");
                posZ = posZ + 0.2
                rotation = "90 0 0";
                break;
            }
            camera.innerHTML += '<a-gltf-model id="js--hold" class="js--pickup js--interact" src="' + source + '" scale="' + scaleX + " " + scaleY + " " + scaleZ + '" position="0.5 ' + posZ + ' -0.5" rotation="' + rotation + '"></a-gltf-model>';
            hold = "hold";
            this.remove();

          } else {
            responsiveVoice.speak("Je staat niet dichtbij genoeg", "Dutch Male")
          }
        }
      });
    }
  }

  addListeners();

  for (let i = 0; i < placeholders.length; i++) {
    placeholders[i].addEventListener('click', function(evt) {


      if (hold == "hold") {
        let item = document.createElement('a-gltf-model');
        item.setAttribute("src", source);
        item.setAttribute("class", "js--pickup js--interact");
        item.setAttribute("scale", {
          x: scaleX,
          y: scaleY,
          z: scaleZ
        });
        // item.setAttribute("position", {
        //   x: this.getAttribute('position').x,
        //   y: "-1",
        //   z: this.getAttribute('position').z
        // });

        huidigNeerzet = this.getAttribute("id");
        console.log("Je hebt nu de volgende locatie gekozen: " + huidigNeerzet);
        console.log("Je huidige object is: " + huidigObject);
        let box_position = this.getAttribute('position');
        let camera_position = camera.getAttribute('position');

        function plaatsObject() {
          document.getElementById("js--hold").remove();
          addListeners();
          hold = null;
          source = null;
          console.log("Correcte plek!");
          scene.appendChild(item);
        }



        if (pythagoras(box_position.x, box_position.z, camera_position.x, camera_position.z) < 5) {
          switch (huidigNeerzet) {
            case emmerZak:
              if(huidigObject != petriInhoud) {
                foutObject();
                break;
              }
              else if(huidigObject == petriInhoud) {
                item.setAttribute("position", {x: -14, y: -4.8, z: -7});
                plaatsObject();
                resetInfo();
                break;
              }

            case emmer:
              if(huidigObject != maatCylinder) {
                foutObject();
                break;
              }
              else if(huidigObject == maatCylinder) {
                item.setAttribute("position", {x: -14, y: -4.8, z: -10});
                plaatsObject();
                resetInfo();
                break;
              }

            case plasticBak:
              if(huidigObject == bekerGlas) {
                item.setAttribute("position", {x: 13.7, y: -3.8, z: -8});
                plaatsObject();
                resetInfo();
                break;
              }
              else if(huidigObject == petriSchaal) {
                item.setAttribute("position", {x: 14.3, y: -3.8, z: -7});
                plaatsObject();
                resetInfo();
                break;
              }
              else {
                foutObject();
                break;
              }

            case reageerMand:
              if(huidigObject != reageerBuis) {
                foutObject();
              }
              else if(huidigObject == reageerBuis) {
                item.setAttribute("position", {x: -4, y: 0.05, z: -15.2});
                item.setAttribute("rotation", "0 0 0");
                plaatsObject();
                resetInfo();
              }
              break;

            case driepoot:
              if(huidigObject == pipet) {
                item.setAttribute("position", {x: -5, y: 1.2, z: -13.7});
                item.setAttribute("rotation", "80 0 0");
                plaatsObject();
                resetInfo();
                break;
              }
              else {
                foutObject();
                break;
              }

            case kokerGroot:
              foutObject();
              break;

            case kokerKlein:
              foutObject();
              break;
          }
        } else {
          responsiveVoice.speak("Je staat niet dichtbij genoeg.", "Dutch Female")
        }
      }
    });
  }

  function resetInfo() {
    displayInfo[0].setAttribute("value", "Object: Niets opgepakt");
    displayInfo[1].setAttribute("value", "Materiaal: N.v.t.");
    displayInfo[2].setAttribute("value", "Inhoud: N.v.t.");
  }

}
