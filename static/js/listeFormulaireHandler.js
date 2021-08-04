const t = [...document.getElementsByClassName("page")];

t[0].style.display = "block";
t[1].style.display = "none";
t[2].style.display = "none";
const UIcontroller = (index) => {
  for (let i = 0; i < t.length; i++) {
    t[i].style.display = i === index ? "block" : "none";
  }
};
