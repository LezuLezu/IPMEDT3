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
}
