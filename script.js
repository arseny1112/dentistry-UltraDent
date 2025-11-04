document.addEventListener("DOMContentLoaded", () => {
  const reviews = document.querySelectorAll(".review");
  const prevBtn = document.querySelector(".pagination__arrow--prev");
  const nextBtn = document.querySelector(".pagination__arrow--next");
  const paginationContainer = document.querySelector(".pagination__pages");

  let currentPage = 1;
  let itemsPerPage;
  let pages;

  function getItemsPerPage() {
    if (window.innerWidth < 925) return 1;
    if (window.innerWidth < 1131) return 2;
    if (window.innerWidth < 1694) return 3;
    return 4;
  }

  function addPageButton(i) {
    const btn = document.createElement("button");
    btn.classList.add("pagination__page");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
    });
    paginationContainer.appendChild(btn);
  }

  function addDots() {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.classList.add("pagination__dots");
    paginationContainer.appendChild(dots);
  }

  function createPagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(reviews.length / getItemsPerPage());

    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) addPageButton(i);
    } else {
      addPageButton(1);

      if (currentPage > 4) addDots();

      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 4) {
        start = 2;
        end = 5;
      }

      if (currentPage >= totalPages - 3) {
        start = totalPages - 4;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) addPageButton(i);

      if (currentPage < totalPages - 3) addDots();

      addPageButton(totalPages);
    }

    pages = paginationContainer.querySelectorAll(".pagination__page");
  }

  function renderPage(page) {
    itemsPerPage = getItemsPerPage();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    reviews.forEach((review, i) => {
      review.style.display = i >= start && i < end ? "block" : "none";
    });

    createPagination();

    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    pages.forEach((btn) => {
      const pageNum = parseInt(btn.textContent);
      btn.classList.toggle("pagination__page--active", pageNum === page);
    });

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    const maxPage = Math.ceil(reviews.length / getItemsPerPage());
    if (currentPage < maxPage) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  window.addEventListener("resize", () => {
    renderPage(currentPage);
  });

  renderPage(currentPage);

  // --- Меню ---
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__burger-menu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      menu.classList.toggle('open');
    });
  }

    let days = 5;
  let hours = 2;
  let minutes = 29;
  let seconds = 46;

  // элементы на странице
  const daysEl = document.querySelector(".time-box:nth-child(1) span");
  const hoursEl = document.querySelector(".time-box:nth-child(3) span");
  const minutesEl = document.querySelector(".time-box:nth-child(5) span");
  const secondsEl = document.querySelector(".time-box:nth-child(7) span");

  function updateTimer() {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
      if (minutes < 0) {
        minutes = 59;
        hours--;
        if (hours < 0) {
          hours = 23;
          days--;
        }
      }
    }

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      clearInterval(timer);
    }
  }

  const timer = setInterval(updateTimer, 1000);
});