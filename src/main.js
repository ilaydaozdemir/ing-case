import { Router } from "https://cdn.jsdelivr.net/npm/@vaadin/router/+esm";
import "./components/Header.js";
import "./pages/AddEmployeePage.js";
import "./pages/EditEmployeePage.js";
const routing = document.getElementById("routing");
const router = new Router(routing);
router.setRoutes([
  { path: "/", component: "home-list-page" },
  { path: "/add", component: "add-page" },
  { path: "/edit/:id", component: "edit-page" },
  //geçersiz URL'de ana sayfaya dön
  { path: "(.*)", redirect: "/" },
]);
