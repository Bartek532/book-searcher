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
const Auth = () => import("../views/auth/Home.vue");
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
    path: "/wyniki",
    component: SearchResults,
  },
  {
    path: "/wyniki/:slug",
    component: Result,
    props: true,
  },
  {
    path: "/pokoje",
    component: Rooms,
    children: [
      { path: "", component: RoomsHome },
      { path: ":room", component: Places, props: true },
    ],
  },
  {
    path: "/szukaj",
    component: Search,
  },
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "logowanie", component: Login },
      { path: "rejestracja", component: Register },
      { path: "aktywacja/:token", component: Activate, props: true },
    ],
  },
  {
    path: "/panel",
    component: Dashboard,
    children: [
      { path: "start", component: DashboardHome },
      { path: "dodaj", component: CreateBook },
      { path: "biblioteka", component: Library },
      { path: "library/:slug", component: Result, props: true },
      { path: "przenies", component: MoveBook },
      { path: "konto", component: User },
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
