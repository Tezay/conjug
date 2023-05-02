function openNav() {
  document.getElementById("menu").classList.add("active");
};

function closeNav() {
  document.getElementById("menu").classList.remove("active");
};

function toggleNav() {
  var menu = document.getElementById("menu");
  if (menu.classList.contains("active")) {
    closeNav();
  } else {
    openNav();
  }
};