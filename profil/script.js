function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-level");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level");
          entry.target.style.width = level + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}


class TestimonialSlider {
  constructor() {
    this.slides = document.querySelectorAll(".testimonial-card");
    this.dotsContainer = document.querySelector(".slider-dots");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;

    this.init();
  }

  init() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });


    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.startAutoSlide();
  }

  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove("active");
    this.updateDot(this.currentSlide, false);

    this.currentSlide = index;

    this.slides[this.currentSlide].classList.add("active");
    this.updateDot(this.currentSlide, true);
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(next);
  }

  prevSlide() {
    const prev =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prev);
  }

  updateDot(index, isActive) {
    const dots = document.querySelectorAll(".dot");
    dots[index].classList.toggle("active", isActive);
  }

  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  animateSkillBars();
  new TestimonialSlider();
});


function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#ff4444";
      isValid = false;
    } else {
      input.style.borderColor = "";
    }
  });

  return isValid;
}
