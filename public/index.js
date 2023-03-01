import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";

const importTemplate = async function (template) {
  const fetchTemplate = await fetch("/app.html");
  return await fetchTemplate.text();
};

const loadGames = async function () {
  const fetchGames = await fetch("/games");
  return await fetchGames.json();
};

const games = await loadGames();
const template = await importTemplate("app.html");
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
