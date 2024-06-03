document.addEventListener("DOMContentLoaded", function() {
    const modal_container = document.getElementById("modal_container");
    
    document.getElementById("open").addEventListener("click", () => {
      modal_container.classList.add("show");
    });
  
    document.getElementById("close").addEventListener("click", () => {
      modal_container.classList.remove("show");
    });
  });
  