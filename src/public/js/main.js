document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function () {
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("abajo", window.scrollY > 0);
      }
    });
  });

  const progressBar = document.querySelector(".progress-bar")
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

  window.addEventListener("scroll", ()=>{
    const scrollTop = document.documentElement.scrollTop
    const scrolled = (scrollTop / height) * 100

    progressBar.style.width = `${scrolled}%`
  })

