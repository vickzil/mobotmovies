import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import Search from "../views/Search.vue";
import Movie from "../views/Movie.vue";
import Series from "../views/Series.vue";
import ActorMovie from "../views/ActorMovie.vue";
import MenuCategory from "../views/MenuCategory.vue";
import FourZeroFour from "../views/FourZeroFour.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
  routes: [{
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Mobot Movies - Movie Trailers, Upcoming Movies",
      },
    },

    {
      path: "/search",
      name: "Search",
      component: Search,
      meta: {
        title: "Mobot Movies - Search",
      },
    },
    {
      path: "/category/:id",
      name: "Category",
      component: Category,
      props: true,
      meta: {
        title: "Mobot Movies - Category",
      },
    },
    {
      path: "/series/:id",
      name: "Series",
      component: Series,
      props: true,
      meta: {
        title: "Mobot Movies - Tv Series",
      },
    },
    {
      path: "/movie/:id",
      name: "Movie",
      component: Movie,
      props: true,
      meta: {
        title: "Mobot Movies - Movie",
      },
    },
    {
      path: "/actor/:id",
      name: "ActorMovie",
      component: ActorMovie,
      props: true,
      meta: {
        title: "Mobot Movies - Actor",
      },
    },
    {
      path: "/movies/category/:id",
      name: "MenuCategory",
      component: MenuCategory,
      props: true,
      meta: {
        title: "Mobot Movies - Category",
      },
    },

    {
      path: "*",
      name: "FourZeroFour",
      component: FourZeroFour,
      meta: {
        title: "Mobot Movies - 404 Page",
      },
    },
  ],
});


export default router;