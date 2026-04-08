async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

async function init() {
  const navbarSource = await loadTemplate('/handlebar/navbar.hbs');
  const mainSource = await loadTemplate('/handlebar/main.hbs');

  const navbarTemplate = Handlebars.compile(navbarSource);
  const mainTemplate = Handlebars.compile(mainSource);

  const navbarHTML = navbarTemplate({
    links: [
      { name: "Home", url: "/" },
      { name: "about", url: "#" },
      { name: "Leaderboards", url: "#" },
      { name: "Login/out(fill later)", url: "#" }
    ]
  });

  const finalHTML = mainTemplate({
    navbar: navbarHTML
  });

  document.getElementById('index').innerHTML = finalHTML;
}

init();