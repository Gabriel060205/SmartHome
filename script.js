document.addEventListener("DOMContentLoaded", () => {
  const typedTextElement = document.querySelector(".typed-text");
  const phrases = ["Solusi Rumah Pintar Terbaik", "Kenyamanan Modern", "Keamanan Terjamin", "Efisiensi Energi", "Hidup Lebih Mudah"];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typedTextElement) {
        return; 
    }
    const currentPhrase = phrases[currentPhraseIndex];
    const displayText = currentPhrase.substring(0, currentCharIndex);
    typedTextElement.textContent = displayText;

    let typingSpeed = 100;
    let deletingSpeed = 50;
    let delayBeforeNext = 1500;

    if (!isDeleting && currentCharIndex < currentPhrase.length) {
      currentCharIndex++;
      setTimeout(typeEffect, typingSpeed);
    } else if (isDeleting && currentCharIndex > 0) {
      currentCharIndex--;
      setTimeout(typeEffect, deletingSpeed);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      }
      setTimeout(typeEffect, delayBeforeNext);
    }
  }

  typeEffect();

  const stats = [
    { id: "homesConnected", finalValue: 3392, suffix: "+" },
    { id: "projectsDone", finalValue: 3025, suffix: "+" },
    { id: "successRate", finalValue: 99.9, suffix: "%", decimalPlaces: 1 }
  ];

  const animateCounters = () => {
    stats.forEach(stat => {
      const el = document.getElementById(stat.id);
      if (!el) return;

      const duration = 2500;
      const startTime = performance.now();

      function animateCount(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        let valueToShow;
        if (stat.id === "successRate") {
          valueToShow = (stat.finalValue * progress).toFixed(stat.decimalPlaces);
        } else {
          valueToShow = Math.floor(stat.finalValue * progress);
        }

        el.textContent = valueToShow + (stat.suffix || "");

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          el.textContent = stat.finalValue + (stat.suffix || "");
        }
      }
      requestAnimationFrame(animateCount);
    });
  };

  const statsSection = document.querySelector(".hero .stats");
  if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  } else {
    animateCounters(); 
  }

  document.querySelectorAll(".more-btn").forEach(button => {
    button.addEventListener("click", () => {
      const moreContent = button.nextElementSibling;
      moreContent.classList.toggle("hidden");
      if (moreContent.classList.contains("hidden")) {
        button.textContent = "Lebih Lanjut";
      } else {
        button.textContent = "Sembunyikan";
        moreContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  const testimonials = [
    {
      text: "Sistem Smart Home ini mengubah cara saya hidup. Sekarang semua serba otomatis dan aman. Sangat merekomendasikan ELSmart untuk siapa saja!",
      author: "Andi, Jakarta",
      stars: 5,
      image: "Gambar/T1.jpg",
    },
    {
      text: "Sangat mudah diatur dan hemat energi. Saya sudah melihat penurunan signifikan pada tagihan listrik saya. Terima kasih ELSmart!",
      author: "Sinta, Bandung",
      stars: 5,
      image: "Gambar/T2.jpg",
    },
    {
      text: "Rumah jadi lebih pintar dan nyaman. Layanan purna jualnya juga top! Tim teknisi sangat responsif dan membantu.",
      author: "Putry, Surabaya",
      stars: 4,
      image: "Gambar/T3.jpg",
    },
    {
      text: "Saya merasa lebih aman meninggalkan rumah dengan sistem keamanan ELSmart. Notifikasi real-time memberi saya ketenangan pikiran.",
      author: "Dewi, Yogyakarta",
      stars: 5,
      image: "Gambar/T4.jpg",
    },
    {
      text: "Instalasi cepat dan mudah, timnya profesional dan sangat informatif. Sangat direkomendasikan untuk solusi rumah pintar!",
      author: "Putri, Malang",
      stars: 5,
      image: "Gambar/T5.jpg"
    },
    {
      text: "Solusi cerdas untuk rumah modern. Semua perangkat terintegrasi dengan mulus. Hemat listrik juga, bonus yang luar biasa!",
      author: "Rizky, Medan",
      stars: 4,
      image: "Gambar/T6.jpg"
    }
  ];

  const testimonialWrapper = document.getElementById("testimonial-wrapper");
  if (testimonialWrapper) {
    testimonials.forEach(t => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      
      let starHtml = '';
      for (let i = 0; i < 5; i++) {
        if (i < t.stars) {
          starHtml += '<i class="fas fa-star filled" data-rating="' + (i + 1) + '"></i>';
        } else {
          starHtml += '<i class="fas fa-star" data-rating="' + (i + 1) + '"></i>';
        }
      }

      slide.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-avatar">
            <img src="${t.image}" class="testimonial-photo" alt="Foto ${t.author}">
          </div>
          <div class="testimonial-text">"${t.text}"</div>
          <div class="testimonial-author">— ${t.author}</div>
          <div class="stars" data-rating-value="${t.stars}">${starHtml}</div>
        </div>
      `;
      testimonialWrapper.appendChild(slide);
    });

    new Swiper(".mySwiper", {
      pagination: { el: ".swiper-pagination", clickable: true },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      on: {
        slideChangeTransitionEnd: function () {
          document.querySelectorAll('.testimonial-card .stars i').forEach(star => {
            star.addEventListener('mouseenter', function() {
            });
            star.addEventListener('mouseleave', function() {
            });
          });
        }
      }
    });
  }

  document.querySelectorAll('a.cta-button[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      heroSection.style.backgroundPositionY = -scrollPosition * 0.3 + 'px'; 
    });
  }

  const timelineItems = document.querySelectorAll('.timeline-item');
  const teamMemberCards = document.querySelectorAll('.team-member-card');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  teamMemberCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('flipped'));
    card.addEventListener('mouseleave', () => card.classList.remove('flipped'));
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm && document.body.classList.contains('contact-page')) {
    contactForm.addEventListener('submit', function(e) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;

      if (nameInput.value.trim() === '') {
        alert('Nama tidak boleh kosong.');
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(nameInput.value.trim())) {
        alert('Nama hanya boleh mengandung huruf dan spasi.');
        isValid = false;
      }

      if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        alert('Format email tidak valid!');
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        alert('Pesan terlalu pendek, minimal 10 karakter.');
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
      } else {
        alert('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
        contactForm.reset();
      }
    });

    const openChatButton = document.getElementById('open-chat-button');
    const closeChatButton = document.getElementById('close-chat-button');
    const chatBox = document.querySelector('.chat-box');

    if (openChatButton && chatBox) {
      openChatButton.addEventListener('click', () => {
        chatBox.classList.toggle('hidden');
        openChatButton.style.display = chatBox.classList.contains('hidden') ? 'block' : 'none';
      });
    }

    if (closeChatButton && chatBox) {
      closeChatButton.addEventListener('click', () => {
        chatBox.classList.add('hidden');
        openChatButton.style.display = 'block';
      });
    }
  }

  const portfolioFilterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const projectModal = document.getElementById('projectModal');
  const closeButton = document.querySelector('.modal .close-button');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCategory = document.getElementById('modalCategory');

  const filterPortfolioItems = (filter) => {
    portfolioItems.forEach(item => {
      const category = item.dataset.category;
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  if (document.body.classList.contains('portfolio-page')) {
    portfolioFilterButtons.forEach(button => {
      button.addEventListener('click', function() {
        portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterPortfolioItems(this.dataset.filter);
      });
    });

    portfolioItems.forEach(item => {
      item.addEventListener('click', function() {
        modalImage.src = this.dataset.image;
        modalTitle.textContent = this.dataset.title;
        modalDescription.textContent = this.dataset.description;
        modalCategory.textContent = 'Kategori: ' + this.dataset.category.charAt(0).toUpperCase() + this.dataset.category.slice(1);
        projectModal.style.display = 'block';
      });
    });

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        projectModal.style.display = 'none';
      });
    }

    window.addEventListener('click', (event) => {
      if (event.target === projectModal) {
        projectModal.style.display = 'none';
      }
    });

    filterPortfolioItems('all');
  }

  if (document.body.classList.contains('services-page')) {
    const serviceFilterButtons = document.querySelectorAll('.services-filters .filter-service-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    const moreDetailsButtons = document.querySelectorAll('.service-item .more-details-btn');

    const servicePrices = {
        'keamanan': 2500000,
        'pencahayaan': 500000,
        'energi': 1500000,
        'otomatisasi': 1000000
    };

    const filterServices = (filter) => {
      serviceItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    };

    serviceFilterButtons.forEach(button => {
      button.addEventListener('click', function() {
        serviceFilterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterServices(this.dataset.filter);
      });
    });

    moreDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.previousElementSibling;
            details.classList.toggle('hidden');
            if (details.classList.contains('hidden')) {
                this.textContent = 'Lihat Detail';
            } else {
                this.textContent = 'Sembunyikan Detail';
                details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    const serviceTypeSelect = document.getElementById('serviceType');
    const numDevicesInput = document.getElementById('numDevices');
    const calculatePriceBtn = document.getElementById('calculatePriceBtn');
    const estimatedPriceSpan = document.getElementById('estimatedPrice');

    if (calculatePriceBtn) {
        calculatePriceBtn.addEventListener('click', () => {
            const selectedService = serviceTypeSelect.value;
            const numberOfDevices = parseInt(numDevicesInput.value);

            if (isNaN(numberOfDevices) || numberOfDevices <= 0) {
                alert('Jumlah perangkat harus angka positif.');
                return;
            }

            const basePricePerDevice = servicePrices[selectedService] || 0;
            const totalPrice = basePricePerDevice * numberOfDevices;

            estimatedPriceSpan.textContent = 'Rp ' + totalPrice.toLocaleString('id-ID');
        });
    }

    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        const targetButton = document.getElementById(targetId);
        if (targetButton && targetButton.classList.contains('filter-service-btn')) {
            targetButton.click();
            document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        filterServices('all');
    }
  }
});
