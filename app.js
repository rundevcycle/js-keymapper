var JSKeyMapper = {
    _actionList: {},

    register: function(keyAction) {
        if (keyAction instanceof KeyAction) {
            console.log(`Registering action '${keyAction.name}' with key '${keyAction.key}'.`);
            this._actionList[keyAction.key] = keyAction;
        } else {
            console.warn("Must pass a KeyAction object to be registered.");
        }
    },

    unregister: function(key) {
        if (key in this._actionList) {
            delete this._actionList[key];
        }
    },
    draw: function() {
        var menu = $("#key-menu");
        menu.empty();
        for (var key in this._actionList) {
             menu.append(this._actionList[key].draw());
        }
    },
    
    monitorKeys: function() {
        $(document).keydown((ev) => {
            console.log("Key down: " + ev.key);
            if (ev.key in this._actionList) {
                this._actionList[ev.key].func();
                ev.preventDefault();
            }
        });
    },

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




$(document).ready(() => {
    JSKeyMapper.register(new KeyAction("F1", "Red", "button",
        function() {
            $("#centerSquare").css("background-color", "red");
        })
    );
    JSKeyMapper.register(new KeyAction("F2", "Orange", "button",
        function() {
            $("#centerSquare").css("background-color", "orange");
        })
    );
    JSKeyMapper.register(new KeyAction("F3", "Yellow", "button",
        function() {
            $("#centerSquare").css("background-color", "yellow");
        })
    );
    JSKeyMapper.register(new KeyAction("F4", "Green", "button",
        function() {
            $("#centerSquare").css("background-color", "green");
        })
    );
    JSKeyMapper.register(new KeyAction("F5", "Blue", "button",
        function() {
            $("#centerSquare").css("background-color", "blue");
        })
    );
    JSKeyMapper.register(new KeyAction("F6", "Violet", "button",
        function() {
            $("#centerSquare").css("background-color", "purple");
        })
    );
    JSKeyMapper.register(new KeyAction("F7", "Move Left", "button",
        function() {
            var el = $("#centerSquare");
            el.css("left", `${el.position().left - 5}px`);
        })
    );
    JSKeyMapper.register(new KeyAction("F8", "Move Right", "button",
        function() {
            var el = $("#centerSquare");
            el.css("left", `${el.position().left + 5}px`);
        })
    );
    JSKeyMapper.register(new KeyAction("F9", "Move Up", "button",
        function() {
            var el = $("#centerSquare");
            el.css("top", `${el.position().top - 5}px`);
        })
    );
    JSKeyMapper.register(new KeyAction("F10", "Move Down", "button",
        function() {
            var el = $("#centerSquare");
            el.css("top", `${el.position().top + 5}px`);
        })
    );
    JSKeyMapper.register(new KeyAction("F11", "Bigger", "button",
        function() {
            var el = $("#centerSquare");
            el.css("width", `${el.width() + 5}px`);
            el.css("height", `${el.height() + 5}px`);
        })
    );
    JSKeyMapper.register(new KeyAction("F12", "Smaller", "button",
        function() {
            var el = $("#centerSquare");
            el.css("width", `${el.width() - 5}px`);
            el.css("height", `${el.height() - 5}px`);
        })
    );
    JSKeyMapper.draw();
    JSKeyMapper.monitorKeys();
});


