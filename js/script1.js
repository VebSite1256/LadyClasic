// LadyClassic - основний JavaScript код
console.log('LadyClassic - JavaScript завантажено успішно!');

// Чекаємо повного завантаження DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM повністю завантажений');
    
    // Ініціалізація слайдера
    initSlider();
    
    // Ініціалізація таймера акції
    initSaleTimer();
    
    // Ініціалізація навігації
    initNavigation();
    
    // Ініціалізація мобільного меню
    initMobileMenu();
});

// Функція для ініціалізації слайдера
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    // Перевіряємо, чи існує слайдер на поточній сторінці
    if (slides.length === 0) {
        console.log('Слайдер не знайдено на цій сторінці');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    // Функція для показу слайду
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Функція для наступного слайду
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Функція для попереднього слайду
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Обробники подій для кнопок
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Обробники подій для точок
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автоматична зміна слайдів кожні 5 секунд
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Зупиняємо автоматичну зміну при наведенні на слайдер
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
    }
    
    startSlider();
    console.log('Слайдер ініціалізовано, знайдено слайдів:', slides.length);
}

// Функція для ініціалізації таймера акції
function initSaleTimer() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Перевіряємо, чи існує таймер на поточній сторінці
    if (!daysElement) {
        console.log('Таймер акції не знайдено на цій сторінці');
        return;
    }
    
    // Встановлюємо дату закінчення акції (7 днів від поточної дати)
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 7);
    saleEndDate.setHours(23, 59, 59, 999); // Кінець дня
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = saleEndDate - now;
        
        if (distance < 0) {
            // Акція закінчилася
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Можна додати повідомлення про закінчення акції
            const timerContent = document.querySelector('.timer-content h2');
            if (timerContent) {
                timerContent.textContent = 'Акція завершена!';
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Оновлюємо таймер кожну секунду
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    console.log('Таймер акції ініціалізовано');
}

// Функція для ініціалізації навігації
function initNavigation() {
    // Додаємо плавну прокрутку для всіх посилань з якорями
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Обробник для кнопок
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Кнопка натиснута:', this.textContent);
            
            // Логіка для різних кнопок
            const text = this.textContent.toLowerCase();
            if (text.includes('колекцію') || text.includes('асортимент')) {
                window.location.href = 'index2.html';
            } else if (text.includes('акції') || text.includes('пропозиції')) {
                window.location.href = 'index2.html';
            } else if (text.includes('більше') || text.includes('дізнатися')) {
                window.location.href = 'index3.html';
            }
        });
    });
    
    console.log('Навігація ініціалізована');
}

// Функція для мобільного меню (якщо потрібно)
function initMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Створюємо кнопку для мобільного меню
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Додаємо кнопку в header
    if (header && nav) {
        header.querySelector('.header-content').appendChild(mobileMenuBtn);
        
        // Обробник кліку для мобільного меню
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            this.innerHTML = nav.classList.contains('mobile-open') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закриваємо меню при кліку на посилання
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Додаємо обробник помилок для зображень
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Помилка завантаження зображення:', this.src);
            this.alt = 'Зображення не завантажено';
            // Можна встановити placeholder зображення
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7Ql9Cw0LrQsNC30Ysg0LTQvtC80L7RgdGC0Lg8L3RleHQ+PC9zdmc+';
        });
    });
});

// Додаємо CSS для мобільного меню
const mobileMenuCSS = `
@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #333;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    nav ul {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    nav.mobile-open ul {
        display: flex;
    }
    
    nav ul li {
        margin: 0.5rem 0;
    }
}

@media (min-width: 769px) {
    .mobile-menu-btn {
        display: none;
    }
}
`;

// Додаємо стилі для мобільного меню
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Додаткові корисні функції
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Плавне зникнення/поява кнопки "наверх"
window.addEventListener('scroll', debounce(function() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }
}, 100));

console.log('LadyClassic - всі функції ініціалізовано!');
document.addEventListener('DOMContentLoaded', function() {
    // Функціонал лайків
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        // Завантажуємо збережені лайки з localStorage
        const reviewId = button.getAttribute('data-review');
        const savedLikes = localStorage.getItem(`likes_${reviewId}`);
        const likeCount = button.querySelector('.like-count');
        
        if (savedLikes) {
            likeCount.textContent = savedLikes;
            if (parseInt(savedLikes) > 0) {
                button.classList.add('liked');
                button.querySelector('.fa-heart').classList.replace('far', 'fas');
            }
        }

        button.addEventListener('click', function() {
            const reviewId = this.getAttribute('data-review');
            const likeCount = this.querySelector('.like-count');
            let currentLikes = parseInt(likeCount.textContent);
            const heartIcon = this.querySelector('.fa-heart');

            if (this.classList.contains('liked')) {
                // Видаляємо лайк
                currentLikes--;
                this.classList.remove('liked');
                heartIcon.classList.replace('fas', 'far');
            } else {
                // Додаємо лайк
                currentLikes++;
                this.classList.add('liked');
                heartIcon.classList.replace('far', 'fas');
            }

            likeCount.textContent = currentLikes;
            
            // Зберігаємо в localStorage
            localStorage.setItem(`likes_${reviewId}`, currentLikes.toString());
        });
    });

    // Функціонал відповідей
    const replyButtons = document.querySelectorAll('.reply-btn');
    
    replyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewCard = this.closest('.review-card');
            let replyForm = reviewCard.querySelector('.reply-form');
            
            // Якщо форма ще не існує, створюємо її
            if (!replyForm) {
                replyForm = document.createElement('div');
                replyForm.className = 'reply-form';
                replyForm.innerHTML = `
                    <input type="text" class="reply-name" placeholder="Ваше ім'я" required>
                    <textarea class="reply-text" placeholder="Ваша відповідь..." rows="3" required></textarea>
                    <button type="button" class="submit-reply">Надіслати відповідь</button>
                `;
                
                // Додаємо форму після кнопок дій
                this.closest('.review-actions').parentNode.insertBefore(replyForm, this.closest('.review-actions').nextSibling);
                
                // Додаємо обробник для кнопки надсилання
                const submitBtn = replyForm.querySelector('.submit-reply');
                submitBtn.addEventListener('click', function() {
                    const nameInput = replyForm.querySelector('.reply-name');
                    const textInput = replyForm.querySelector('.reply-text');
                    
                    if (nameInput.value.trim() && textInput.value.trim()) {
                        addReply(reviewCard, nameInput.value, textInput.value);
                        replyForm.classList.remove('active');
                        nameInput.value = '';
                        textInput.value = '';
                    } else {
                        alert('Будь ласка, заповніть всі поля');
                    }
                });
            }
            
            // Перемикаємо видимість форми
            replyForm.classList.toggle('active');
        });
    });

    // Функція для додавання відповіді
    function addReply(reviewCard, name, text) {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'reply';
        replyDiv.innerHTML = `
            <div class="reply-author">${name}</div>
            <div class="reply-text">${text}</div>
        `;
        
        // Знаходимо або створюємо контейнер для відповідей
        let repliesContainer = reviewCard.querySelector('.replies-container');
        if (!repliesContainer) {
            repliesContainer = document.createElement('div');
            repliesContainer.className = 'replies-container';
            reviewCard.appendChild(repliesContainer);
        }
        
        repliesContainer.appendChild(replyDiv);
        
        // Зберігаємо відповідь в localStorage
        const reviewId = reviewCard.querySelector('.like-btn').getAttribute('data-review');
        saveReplyToLocalStorage(reviewId, name, text);
    }

    // Функція для збереження відповіді в localStorage
    function saveReplyToLocalStorage(reviewId, name, text) {
        const replies = JSON.parse(localStorage.getItem(`replies_${reviewId}`)) || [];
        replies.push({ name, text, timestamp: new Date().toISOString() });
        localStorage.setItem(`replies_${reviewId}`, JSON.stringify(replies));
    }

    // Функція для завантаження збережених відповідей
    function loadSavedReplies() {
        const reviewCards = document.querySelectorAll('.review-card');
        
        reviewCards.forEach(card => {
            const reviewId = card.querySelector('.like-btn').getAttribute('data-review');
            const replies = JSON.parse(localStorage.getItem(`replies_${reviewId}`)) || [];
            
            if (replies.length > 0) {
                let repliesContainer = card.querySelector('.replies-container');
                if (!repliesContainer) {
                    repliesContainer = document.createElement('div');
                    repliesContainer.className = 'replies-container';
                    card.appendChild(repliesContainer);
                }
                
                replies.forEach(reply => {
                    const replyDiv = document.createElement('div');
                    replyDiv.className = 'reply';
                    replyDiv.innerHTML = `
                        <div class="reply-author">${reply.name}</div>
                        <div class="reply-text">${reply.text}</div>
                    `;
                    repliesContainer.appendChild(replyDiv);
                });
            }
        });
    }

    // Завантажуємо збережені відповіді при завантаженні сторінки
    loadSavedReplies();
});

// Функціонал контактної форми
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Запобігаємо перезавантаженню сторінки
            
            // Отримуємо значення полів форми
            const formData = {
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Валідація форми
            if (!validateForm(formData)) {
                return;
            }
            
            // Імітація відправки форми
            simulateFormSubmission(formData);
        });
    }
    
    // Функція валідації форми
    function validateForm(data) {
        if (!data.email || !data.email.includes('@')) {
            showError('Будь ласка, введіть коректний email');
            return false;
        }
        
        if (!data.message || data.message.trim().length < 2) {
            showError('Будь ласка, введіть повідомлення');
            return false;
        }
        
        return true;
    }
    
    // Функція імітації відправки форми
function simulateFormSubmission(formData) {
    // Блокуємо кнопку на час "відправки"
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Відправка...';
    submitBtn.disabled = true;
    
    // Імітуємо затримку мережі
    setTimeout(() => {
        // Показуємо сповіщення про успіх
        showNotification();
        
        // Очищаємо форму
        contactForm.reset();
        
        // Відновлюємо кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Виводимо дані в консоль (для тестування)
        console.log('Форма відправлена:', formData);
        
    }, 1500);
}
    
    // Функція показу сповіщення
    function showNotification() {
        notification.classList.remove('hidden');
        
        // Ховаємо сповіщення через 5 секунд
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 5000);
    }
    
    // Функція показу помилки
    function showError(message) {
        alert(message); // Можна замінити на красиве сповіщення
    }
    
    // Додатково: обробка Enter в формі
    contactForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});
// Функція валідації форми
function validateForm(data) {
    if (!data.email || !data.email.includes('@')) {
        showError('Будь ласка, введіть коректний email');
        return false;
    }
    
    if (!data.subject) {
        showError('Будь ласка, оберіть тему повідомлення');
        return false;
    }
    
    if (!data.message || data.message.trim().length < 2) {
        showError('Будь ласка, введіть повідомлення');
        return false;
    }
    
    return true;
}

// Функціонал FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Закриваємо всі інші відкриті питання
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Перемикаємо поточне питання
            item.classList.toggle('active');
        });
    });
    
    // Відкриваємо перше питання за замовчуванням
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// Функціонал модального вікна для галереї
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems);
    
    // Відкриття модального вікна
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openModal();
        });
    });
    
    function openModal() {
        const img = images[currentIndex].querySelector('.gallery-image');
        const caption = images[currentIndex].querySelector('.gallery-caption');
        
        modalImage.src = img.src;
        modalCaption.textContent = caption.textContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Закриття модального вікна
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Навігація
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openModal();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        openModal();
    });
    
    // Клавіатура
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        }
    });
});

// Функціонал перемикання категорій
document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            
            // Видаляємо активний клас з усіх вкладок
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Ховаємо весь контент
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Додаємо активний клас поточній вкладці
            this.classList.add('active');
            // Показуємо відповідний контент
            document.getElementById(categoryId).classList.add('active');
        });
    });
});

// Дані кошика
let cart = [];

// Розміри
const sizes = ["XS", "S", "M", "L", "XL"];

// Ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    setupEventListeners();
    setupAddToCartButtons();
});

// Налаштування кнопок "Додати в кошик" на сторінці
function setupAddToCartButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const button = e.target;
            const productId = parseInt(button.dataset.id);
            const productName = button.dataset.name;
            const productPrice = parseInt(button.dataset.price);
            const productImage = button.dataset.image;
            
            // Перевіряємо, чи всі дані присутні
            if (productId && productName && productPrice) {
                addToCart(productId, productName, productPrice, productImage);
                
                // Анімація кнопки
                button.classList.add('added');
                const originalText = button.textContent;
                button.textContent = 'Додано!';
                setTimeout(() => {
                    button.classList.remove('added');
                    button.textContent = originalText;
                }, 2000);
            }
        }
    });
}

// Додавання товару в кошик
function addToCart(id, name, price, image) {
    // Перевіряємо, чи товар вже є в кошику
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
            size: "M",
            image: image || 'https://via.placeholder.com/100'
        });
    }
    
    renderCart();
}

// Рендер кошика
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Кошик порожній</p>
            </div>
        `;
        totalPrice.textContent = '0 грн';
        document.getElementById('checkoutBtn').disabled = true;
        return;
    }
    
    document.getElementById('checkoutBtn').disabled = false;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name || 'Назва товару'}</div>
                <div class="cart-item-price">${(item.price * item.quantity) || 0} грн</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                </div>
                <div class="size-controls">
                    ${sizes.map(size => `
                        <button class="size-btn ${item.size === size ? 'active' : ''}" 
                                data-id="${item.id}" data-size="${size}">
                            ${size}
                        </button>
                    `).join('')}
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    updateTotalPrice();
    setupCartItemEvents();
}

// Налаштування подій для елементів кошика
function setupCartItemEvents() {
    // Кнопки кількості
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemId = parseInt(this.dataset.id);
            const change = this.classList.contains('plus-btn') ? 1 : -1;
            changeQuantity(itemId, change);
        });
    });
    
    // Кнопки розміру
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemId = parseInt(this.dataset.id);
            const newSize = this.dataset.size;
            changeSize(itemId, newSize);
        });
    });
    
    // Кнопки видалення
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemId = parseInt(this.dataset.id);
            removeItem(itemId);
        });
    });
}

// Оновлення загальної ціни
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => {
        const itemTotal = (item.price || 0) * (item.quantity || 0);
        return sum + itemTotal;
    }, 0);
    document.getElementById('totalPrice').textContent = `${total} грн`;
}

// Зміна кількості
function changeQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = (item.quantity || 1) + change;
        if (item.quantity < 1) item.quantity = 1;
        if (item.quantity > 99) item.quantity = 99;
        renderCart();
    }
}

// Зміна розміру
function changeSize(itemId, newSize) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.size = newSize;
        renderCart();
    }
}

// Видалення товару
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
}

// Очищення кошика
function setupEventListeners() {
    document.getElementById('clearCartBtn').addEventListener('click', function() {
        if (cart.length > 0 && confirm('Ви впевнені, що хочете очистити кошик?')) {
            cart = [];
            renderCart();
        }
    });
    
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length > 0) {
            showOrderNotification();
            cart = [];
            renderCart();
        }
    });
}

// Показати сповіщення про оформлення замовлення
function showOrderNotification() {
    const notification = document.createElement('div');
    notification.className = 'order-notification';
    notification.innerHTML = `
        <div class="order-notification-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <h4>Ваше замовлення оформлено!</h4>
                <p>Очікуйте дзвінок для підтвердження</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}


// Таймер для футера
function updateFooterTimer() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Встановлюємо дату завершення акції (наприклад, через 7 днів)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 17);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            // Акція закінчилася
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Оновлюємо таймер кожну секунду
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Обробник кнопки акції
function initFooterButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Перехід на сторінку акційних товарів
            window.location.href = 'index2.html#sale';
        });
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    updateFooterTimer();
    initFooterButton();
});
