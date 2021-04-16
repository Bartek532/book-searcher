"use strict";
exports.__esModule = true;
exports.mailOptions = void 0;
var address = process.env.NODE_ENV === "production"
    ? "https://book-searcher.vercel.app"
    : "http://localhost:8080";
exports.mailOptions = {
    activate: {
        subject: "Aktywacja konta",
        html: function (name, token) { return "<h1>Cze\u015B\u0107, " + name + "!</h1><span>Wygl\u0105da na to, \u017Ce jeszcze nie aktywowa\u0142e\u015B swojego konta. Kliknij w poni\u017Cszy link, by to zrobi\u0107: </span> <br/>" + (address + "/aktywacja/" + token) + "<br/> <h4>To \n    takie proste!</h4><span>Je\u015Bli nie zak\u0142ada\u0142e\u015B konta w naszej aplikacji zignoruj t\u0105 wiadomo\u015B\u0107.</span>"; }
    },
    resetPassword: {
        subject: "Zmiana hasła",
        html: function (name, token) {
            return "<h1>Cze\u015B\u0107, " + name + "!</h1><span>Oto tw\u00F3j link do przywracania has\u0142a: </span> <br/>" + (address + "/zapomnialem-hasla/" + token);
        }
    }
};
