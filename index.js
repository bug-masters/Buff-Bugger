async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

async function init() {
  const basePath = window.location.pathname.includes('/map-wip/') ? '../' : '/';
  const navbarSource = await loadTemplate(basePath + 'handlebar/navbar.hbs');
  const mainSource = await loadTemplate(basePath + 'handlebar/main.hbs');

  const navbarTemplate = Handlebars.compile(navbarSource);
  const mainTemplate = Handlebars.compile(mainSource);

  const navbarHTML = navbarTemplate({
    links: [
      { name: "Home", url: "/" },
      { name: "about", url: "#" },
      { name: "Leaderboards", url: "#" },
      { name: "Login/out(fill later)", url: "#" },
      { name: "map WIP", url: "/map-wip/mapWip.html" }
    ]
  });

  const finalHTML = mainTemplate({
    navbar: navbarHTML
  });

  document.getElementById('navhtml').innerHTML = finalHTML;
}

init();