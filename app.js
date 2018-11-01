console.log("JS loaded.");

var JSKeyMapper = {
    register: function(elementId) {
        console.log(`Registered on element ${elementId}.`);
        var e = document.getElementById(elementId);

        e.innerText = "Hello, world";

    },

};

$(document).ready(() => {
    $("#key-menu").text("Hello, World!!!");

    $(document).keydown((ev) => {
        console.log("Key down: " + ev.key);

    });

});

//JSKeyMapper.register("key-menu");
/*
document.addEventListener("keydown", function(event) {
    console.log("Key press: " + event.key);
    event.preventDefault();
});
*/


