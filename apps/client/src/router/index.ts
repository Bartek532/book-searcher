import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("../views/Home.vue");
const SearchResults = () => import("../views/SearchResults.vue");
const Result = () => import("../views/Result.vue");
const Search = () => import("../views/Search.vue");

//Rooms
const Rooms = () => import("../views/rooms/Rooms.vue");
const RoomsHome = () => import("../views/rooms/RoomsHome.vue");
const Places = () => import("../views/rooms/Places.vue");

//Auth
const Login = () => import("../views/auth/Login.vue");
const Register = () => import("../views/auth/Register.vue");
const Activate = () => import("../views/auth/Activate.vue");

//Dashboard
const Dashboard = () => import("../views/dashboard/Dashboard.vue");
const DashboardHome = () => import("../views/dashboard/Home.vue");
const CreateBook = () => import("../views/dashboard/CreateBook.vue");
const MoveBook = () => import("../views/dashboard/MoveBook.vue");
const User = () => import("../views/dashboard/User.vue");
const Library = () => import("../views/dashboard/Library.vue");

//404 page
const PageNotFound = () => import("../views/PageNotFound.vue");

const routes: Array<RouteRecordRaw> = [
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
    component: Rooms,
    children: [
      { path: "", component: RoomsHome, meta: { title: "Pokoje" } },
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
      { path: "biblioteka", component: Library, meta: { title: "Biblioteka" } },
      {
        path: "library/:slug",
        component: Result,
        props: true,
        meta: { title: "Biblioteka" },
      },
      {
        path: "przenies",
        component: MoveBook,
        meta: { title: "Przenieś książkę " },
      },
      { path: "konto", component: User, meta: { title: "Ustawienia konta" } },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
