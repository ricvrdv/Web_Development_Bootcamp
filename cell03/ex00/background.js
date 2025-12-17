const colorsArray = [
    "#00ffff",
    "#fbff00ff",
    "#e100ffff",
    "#ff0000ff",
    "#0026ffff",
    "#1aff00",
    "#ff7b00ff",
    "#7700ffff"
];

const clickButton = document.getElementById("click-button");
const bodyBackground = document.getElementsByClassName("body-background")[0];

let lastColorIndex = -1;

clickButton.addEventListener("click", function() {
    let newColorIndex;
    newColorIndex = Math.floor(Math.random() * colorsArray.length);

    if (newColorIndex === lastColorIndex && colorsArray.length > 1) {
        newColorIndex = (newColorIndex + 1) % colorsArray.length;
    }
    lastColorIndex = newColorIndex;
    bodyBackground.style.backgroundColor = colorsArray[newColorIndex];
});