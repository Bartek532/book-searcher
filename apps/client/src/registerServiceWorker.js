"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/*
import { Workbox } from "workbox-window";
let wb;
if ("serviceWorker" in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`);
  wb.addEventListener("controlling", () => {
    window.location.reload();
  });
  wb.register();
} else {
  wb = null;
}
export default wb;
*/
const register_service_worker_1 = require("register-service-worker");
if (process.env.NODE_ENV === "production") {
    register_service_worker_1.register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log("App is being served from cache by a service worker.\n" +
                "For more details, visit https://goo.gl/AFskqB");
        },
        registered() {
            console.log("Service worker has been registered.");
        },
        cached() {
            console.log("Content has been cached for offline use.");
        },
        updatefound() {
            console.log("New content is downloading.");
        },
        updated() {
            console.log("New content is available; please refresh.");
        },
        offline() {
            console.log("No internet connection found. App is running in offline mode.");
        },
        error(error) {
            console.error("Error during service worker registration:", error);
        },
    });
}
