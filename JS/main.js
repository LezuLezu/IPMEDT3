window.onload = () => {
  const testDoos = document.getElementById('js--doos');
  const display = document.getElementById('js--displayBox');
  const inhoud = ["Hallo welkom \n bij onze \n VR practicum", "Item2", "Item3"];
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


    responsiveVoice.speak(inhoud[index], "Dutch Male");

  }


  console.log("Hallo daar");

  console.log("JS connected");

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


}
