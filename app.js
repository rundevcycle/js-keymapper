// Make JSKeyMapper a module.
var JSKeyMapper = function(menuDiv) {
    var _actionList = {};
    var _menuDiv = menuDiv;

    function register(keyAction) {
        if (keyAction instanceof KeyAction) {
            console.log(`Registering action '${keyAction.name}' with key '${keyAction.key}'.`);
            _actionList[keyAction.key] = keyAction;
        } else {
            console.warn("Must pass a KeyAction object to be registered.");
        }
    };

    function unregister(key) {
        if (key in _actionList) {
            delete _actionList[key];
        }
    };

    function unregisterAll() {
        for (var key in _actionList) {
            delete _actionList[key];
        }
    };

    function draw() {
        var menu = $(menuDiv);
        menu.empty();
        for (var key in _actionList) {
             menu.append(_actionList[key].draw());
        }
    };
    
    function monitorKeystrokes() {
        $(document).keydown((ev) => {
            console.log("Key down: " + ev.key);
            if (ev.key in _actionList) {
                _actionList[ev.key].func();
                ev.preventDefault();
            }
        });
    };

    return {
        register: register,
        unregister: unregister,
        unregisterAll: unregisterAll,
        draw: draw,
        monitorKeystrokes: monitorKeystrokes
    };
};



class KeyAction {
    constructor(key, name, cssClass, func) {
        this.key = key;
        this.name = name; 
        this.cssClass = cssClass;
        this.func = func;
    }

    draw() {
        var button = $("<button/>", 
        {
            text: `${this.name} (${this.key})`,
            cssClass: this.cssClass,
            click: this.func
        });
        return button;
    }
};



// Here's an example of overridding the Function keys to change colours 
// and move the box around.
$(document).ready(() => {
    var mapMenu = new JSKeyMapper('#key-menu');

    mapMenu.register(new KeyAction("F1", "Red", "button",
        function() {
            $("#centerSquare").css("background-color", "red");
        })
    );
    mapMenu.register(new KeyAction("F2", "Orange", "button",
        function() {
            $("#centerSquare").css("background-color", "orange");
        })
    );
    mapMenu.register(new KeyAction("F3", "Yellow", "button",
        function() {
            $("#centerSquare").css("background-color", "yellow");
        })
    );
    mapMenu.register(new KeyAction("F4", "Green", "button",
        function() {
            $("#centerSquare").css("background-color", "green");
        })
    );
    mapMenu.register(new KeyAction("F5", "Blue", "button",
        function() {
            $("#centerSquare").css("background-color", "blue");
        })
    );
    mapMenu.register(new KeyAction("F6", "Violet", "button",
        function() {
            $("#centerSquare").css("background-color", "purple");
        })
    );
    mapMenu.register(new KeyAction("F7", "Move Left", "button",
        function() {
            var el = $("#centerSquare");
            el.css("left", `${el.position().left - 5}px`);
        })
    );
    mapMenu.register(new KeyAction("F8", "Move Right", "button",
        function() {
            var el = $("#centerSquare");
            el.css("left", `${el.position().left + 5}px`);
        })
    );
    mapMenu.register(new KeyAction("F9", "Move Up", "button",
        function() {
            var el = $("#centerSquare");
            el.css("top", `${el.position().top - 5}px`);
        })
    );
    mapMenu.register(new KeyAction("F10", "Move Down", "button",
        function() {
            var el = $("#centerSquare");
            el.css("top", `${el.position().top + 5}px`);
        })
    );
    mapMenu.register(new KeyAction("F11", "Bigger", "button",
        function() {
            var el = $("#centerSquare");
            el.width(el.width() + 10);
            el.height(el.height() + 10);
        })
    );
    mapMenu.register(new KeyAction("F12", "Smaller", "button",
        function() {
            var el = $("#centerSquare");
            el.width(el.width() - 10);
            el.height(el.height() - 10);
        })
    );
    mapMenu.register(new KeyAction("b", "Random Background", "button",
        function() {
            var red = Math.random() * 255;
            var green = Math.random() * 255;
            var blue = Math.random() * 255;
            $("body").css("background-color", `rgb(${red}, ${green}, ${blue})`);
        }));

    mapMenu.draw();
    mapMenu.monitorKeystrokes();
});


