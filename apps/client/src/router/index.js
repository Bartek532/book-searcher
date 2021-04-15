"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const Home = () => Promise.resolve().then(() => __importStar(require("../views/Home.vue")));
const SearchResults = () => Promise.resolve().then(() => __importStar(require("../views/SearchResults.vue")));
const Result = () => Promise.resolve().then(() => __importStar(require("../views/Result.vue")));
const Search = () => Promise.resolve().then(() => __importStar(require("../views/Search.vue")));
//Rooms
const Location = () => Promise.resolve().then(() => __importStar(require("../views/rooms/Home.vue")));
const Rooms = () => Promise.resolve().then(() => __importStar(require("../views/rooms/Rooms.vue")));
const Places = () => Promise.resolve().then(() => __importStar(require("../views/rooms/Places.vue")));
//Auth
const Login = () => Promise.resolve().then(() => __importStar(require("../views/auth/Login.vue")));
const Register = () => Promise.resolve().then(() => __importStar(require("../views/auth/Register.vue")));
const Activate = () => Promise.resolve().then(() => __importStar(require("../views/auth/Activate.vue")));
const ForgotPassword = () => Promise.resolve().then(() => __importStar(require("../views/auth/ForgotPassword.vue")));
const ResetPassword = () => Promise.resolve().then(() => __importStar(require("../views/auth/ResetPassword.vue")));
//Dashboard
const Dashboard = () => Promise.resolve().then(() => __importStar(require("../views/dashboard/Dashboard.vue")));
const DashboardHome = () => Promise.resolve().then(() => __importStar(require("../views/dashboard/Home.vue")));
const CreateBook = () => Promise.resolve().then(() => __importStar(require("../views/dashboard/CreateBook.vue")));
const MoveBook = () => Promise.resolve().then(() => __importStar(require("../views/dashboard/MoveBook.vue")));
const User = () => Promise.resolve().then(() => __importStar(require("../views/dashboard/User.vue")));
const Library = () => Promise.resolve().then(() => __importStar(require("../views/dashboard/Library.vue")));
//404 page
const PageNotFound = () => Promise.resolve().then(() => __importStar(require("../views/PageNotFound.vue")));
const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/ksiazki",
        component: SearchResults,
        meta: {
            title: "Książki",
        },
    },
    {
        path: "/ksiazki/:slug",
        component: Result,
        props: true,
    },
    {
        path: "/pokoje",
        component: Location,
        children: [
            { path: "", component: Rooms, meta: { title: "Pokoje" } },
            {
                path: ":room",
                component: Places,
                props: true,
            },
        ],
    },
    {
        path: "/szukaj",
        component: Search,
        meta: { title: "Szukaj" },
    },
    { path: "/logowanie", component: Login, meta: { title: "Logowanie" } },
    {
        path: "/rejestracja",
        component: Register,
        meta: { title: "Rejestracja" },
    },
    {
        path: "/aktywacja/:token",
        component: Activate,
        props: true,
        meta: { title: "Aktywacja konta" },
    },
    {
        path: "/zapomnialem-hasla",
        component: ForgotPassword,
        meta: { title: "Zapomniałem hasła" },
    },
    {
        path: "/zapomnialem-hasla/:token",
        component: ResetPassword,
        meta: { title: "Resetuj hasło" },
        props: true,
    },
    {
        path: "/panel",
        component: Dashboard,
        children: [
            {
                path: "start",
                component: DashboardHome,
                meta: { title: "Panel użytkownika " },
            },
            {
                path: "dodaj",
                component: CreateBook,
                meta: { title: "Dodaj książkę " },
            },
            {
                path: "biblioteka",
                component: Library,
                meta: { title: "Biblioteka" },
            },
            {
                path: "przenies",
                component: MoveBook,
                meta: { title: "Przenieś książkę " },
            },
            {
                path: "konto",
                component: User,
                meta: { title: "Ustawienia konta" },
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        component: PageNotFound,
    },
];
const router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(process.env.BASE_URL),
    routes,
});
exports.default = router;
