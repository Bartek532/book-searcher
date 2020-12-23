import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

import Results from "../views/Results.vue";
import Result from "../views/Result.vue";

import Search from "../views/Search.vue";

//Rooms
import Rooms from "../views/rooms/Rooms.vue";
import roomsHome from "../views/rooms/RoomsHome.vue";
import Places from "../views/rooms/Places.vue";

//Auth

import Auth from "../views/auth/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Activate from "../views/auth/Activate.vue";

//Dashboard
import Dashboard from "../views/dashboard/Dashboard.vue";
import dashboardHome from "../views/dashboard/Home.vue";
import createBook from "../views/dashboard/CreateBook.vue";
import User from "../views/dashboard/User.vue";
import DeleteBook from "../views/dashboard/DeleteBook.vue";

//404 page
import notFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/results",
    component: Results
  },
  {
    path: "/results/:slug",
    component: Result,
    props: true
  },
  {
    path: "/rooms",
    component: Rooms,
    children: [
      { path: "", component: roomsHome },
      { path: ":room", component: Places, props: true }
    ]
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: Login },
      { path: "register", component: Register },
      { path: "activate/:token", component: Activate, props: true }
    ]
  },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "start", component: dashboardHome },
      { path: "add-book", component: createBook },
      { path: "library", component: Results },
      { path: "library/:slug", component: Result, props: true },
      { path: "account", component: User },
      { path: "delete-book", component: DeleteBook }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: notFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
