const navLinks = document.querySelector(".nav-links");
function onToggleMenu(e) {
    e.name = e.name === "menu-outline" ? "close-outline" : "menu-outline";
    navLinks.classList.toggle("translate-y-full");
}