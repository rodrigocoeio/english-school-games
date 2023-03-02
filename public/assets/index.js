import { createApp } from "./vue.prod.js";

const fetchText = async function (url) {
  const fetchTemplate = await fetch(url);
  return await fetchTemplate.text();
};

const fetchJson = async function (url) {
  const fetchGames = await fetch(url);
  return await fetchGames.json();
};

const games = await fetchJson("/games");
const template = await fetchText("/assets/app.template.html");

const App = createApp({
  data() {
    return {
      games,
    };
  },

  mounted() {
    console.log(this.games);
  },

  methods: {
    openGame(game) {
      if (game.running) window.location = game.href;
    },
  },

  template,
}).mount("#app");
