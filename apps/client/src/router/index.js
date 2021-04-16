"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var Home = function () { return Promise.resolve().then(function () { return require("../views/Home.vue"); }); };
var SearchResults = function () { return Promise.resolve().then(function () { return require("../views/SearchResults.vue"); }); };
var Result = function () { return Promise.resolve().then(function () { return require("../views/Result.vue"); }); };
var Search = function () { return Promise.resolve().then(function () { return require("../views/Search.vue"); }); };
//Rooms
var Location = function () { return Promise.resolve().then(function () { return require("../views/rooms/Home.vue"); }); };
var Rooms = function () { return Promise.resolve().then(function () { return require("../views/rooms/Rooms.vue"); }); };
var Places = function () { return Promise.resolve().then(function () { return require("../views/rooms/Places.vue"); }); };
//Auth
var Login = function () { return Promise.resolve().then(function () { return require("../views/auth/Login.vue"); }); };
var Register = function () { return Promise.resolve().then(function () { return require("../views/auth/Register.vue"); }); };
var Activate = function () { return Promise.resolve().then(function () { return require("../views/auth/Activate.vue"); }); };
var ForgotPassword = function () { return Promise.resolve().then(function () { return require("../views/auth/ForgotPassword.vue"); }); };
var ResetPassword = function () { return Promise.resolve().then(function () { return require("../views/auth/ResetPassword.vue"); }); };
//Dashboard
var Dashboard = function () { return Promise.resolve().then(function () { return require("../views/dashboard/Dashboard.vue"); }); };
var DashboardHome = function () { return Promise.resolve().then(function () { return require("../views/dashboard/Home.vue"); }); };
var CreateBook = function () { return Promise.resolve().then(function () { return require("../views/dashboard/CreateBook.vue"); }); };
var MoveBook = function () { return Promise.resolve().then(function () { return require("../views/dashboard/MoveBook.vue"); }); };
var User = function () { return Promise.resolve().then(function () { return require("../views/dashboard/User.vue"); }); };
var Library = function () { return Promise.resolve().then(function () { return require("../views/dashboard/Library.vue"); }); };
//404 page
var PageNotFound = function () { return Promise.resolve().then(function () { return require("../views/PageNotFound.vue"); }); };
var routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/ksiazki",
        component: SearchResults,
        meta: {
            title: "Książki"
        }
    },
    {
        path: "/ksiazki/:slug",
        component: Result,
        props: true
    },
    {
        path: "/pokoje",
        component: Location,
        children: [
            { path: "", component: Rooms, meta: { title: "Pokoje" } },
            {
                path: ":room",
                component: Places,
                props: true
            },
        ]
    },
    {
        path: "/szukaj",
        component: Search,
        meta: { title: "Szukaj" }
    },
    { path: "/logowanie", component: Login, meta: { title: "Logowanie" } },
    {
        path: "/rejestracja",
        component: Register,
        meta: { title: "Rejestracja" }
    },
    {
        path: "/aktywacja/:token",
        component: Activate,
        props: true,
        meta: { title: "Aktywacja konta" }
    },
    {
        path: "/zapomnialem-hasla",
        component: ForgotPassword,
        meta: { title: "Zapomniałem hasła" }
    },
    {
        path: "/zapomnialem-hasla/:token",
        component: ResetPassword,
        meta: { title: "Resetuj hasło" },
        props: true
    },
    {
        path: "/panel",
        component: Dashboard,
        children: [
            {
                path: "start",
                component: DashboardHome,
                meta: { title: "Panel użytkownika " }
            },
            {
                path: "dodaj",
                component: CreateBook,
                meta: { title: "Dodaj książkę " }
            },
            {
                path: "biblioteka",
                component: Library,
                meta: { title: "Biblioteka" }
            },
            {
                path: "przenies",
                component: MoveBook,
                meta: { title: "Przenieś książkę " }
            },
            {
                path: "konto",
                component: User,
                meta: { title: "Ustawienia konta" }
            },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        component: PageNotFound
    },
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(process.env.BASE_URL),
    routes: routes
});
exports["default"] = router;
