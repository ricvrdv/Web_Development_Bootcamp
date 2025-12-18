$(document).ready(function() {
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
    
    let lastColorIndex = -1;
    
    
    $("#click-button").on("click", function() {
        let newColorIndex = Math.floor(Math.random() * colorsArray.length);
        
        if (newColorIndex === lastColorIndex && colorsArray.length > 1) {
            newColorIndex = (newColorIndex + 1) % colorsArray.length;
        }
        lastColorIndex = newColorIndex;
        $('.body-background').css();
        bodyBackground.style.backgroundColor = colorsArray[newColorIndex];
});
});