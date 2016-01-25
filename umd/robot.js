(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Robot = factory();
    }
}(this, function () {
    'use strict';

    var self;
    var wrapper;
    var defaults = {
        colour: 'red'
    };

    var Robot = function (selector, config) {
        wrapper = document.querySelector(selector);
        this.config = extend({}, defaults, config);
        this.name = 'Mr Robot';
    };

    Robot.prototype.speak = function () {
        console.log("Hello, I'm " + this.name);
    };

    Robot.prototype.sum = function (first, second) {
        console.log(first + second);
    };

    Robot.prototype.build = function () {
        var element = document.createElement('div');
        element.style.height = "100px";
        element.style.width = "100px";
        element.style.background = this.config.colour;
        element.style.cursor = 'pointer';

        wrapper.appendChild(element);

        bindEvents(element);
    };

    function bindEvents(element) {
        element.addEventListener('click', function clickHandler(e) {
            this.style.background = 'blue';

            console.log("Changing " + self.name + " once");
            e.target.removeEventListener(e.type, clickHandler);
        });
    }

    function extend(output) {
        output = output || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    output[key] = arguments[i][key];
            }
        }

        return output;
    }

    return Robot;
}));