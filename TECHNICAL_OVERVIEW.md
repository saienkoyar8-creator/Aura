# 🎨 Luxury Restaurant - Технічний огляд проекту

## ✨ Що було зроблено

### 1. **Реальні зображення з Unsplash**

Замість placeholder'ів додано високоякісні професійні фотографії:

#### Hero Section
- **Фонове зображення**: Елегантний інтер'єр ресторану з теплим освітленням
- **URL**: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4`
- **Ефект**: Ken Burns animation (плавне масштабування та рух)

#### About Section
- **Головне фото**: Вишукана сервірування столу
  - URL: `https://images.unsplash.com/photo-1414235077428-338989a2e8c0`
- **Додаткове фото**: Шеф-кухар за роботою
  - URL: `https://images.unsplash.com/photo-1559339352-11d035aa65de`

#### Menu Section
- **Стейки**: Соковитий преміум стейк
  - URL: `https://images.unsplash.com/photo-1600891964092-4316c288032e`
- **Морепродукти**: Свіжі делікатеси
  - URL: `https://images.unsplash.com/photo-1559737558-2f5a35f4523e`
- **Паста**: Італійська класика
  - URL: `https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9`
- **Десерти**: Солодкі шедеври
  - URL: `https://images.unsplash.com/photo-1551024506-0bccd828d307`

#### Gallery Section
- **Шеф-кухар 1**: Професійний портрет
  - URL: `https://images.unsplash.com/photo-1577219491135-ce391730fb2c`
- **Шеф-кухар 2**: За роботою на кухні
  - URL: `https://images.unsplash.com/photo-1581299894007-aaa50297cf16`
- **Кондитер**: Створення десертів
  - URL: `https://images.unsplash.com/photo-1607631568010-a87245c0daf8`
- **Інтер'єр**: Вишуканий дизайн залу
  - URL: `https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c`
- **Атмосфера**: Романтична обстановка
  - URL: `https://images.unsplash.com/photo-1466978913421-dad2ebd01d17`

#### Contact Section
- **Фон**: Панорама ресторану
  - URL: `https://images.unsplash.com/photo-1559329007-40df8a9345d8`

---

## 🎬 Анімації та ефекти

### 1. **Ken Burns Effect**
```css
@keyframes kenburns {
    0% { transform: scale(1) translateX(0); }
    100% { transform: scale(1.1) translateX(-20px); }
}
```
- Плавне масштабування та рух фонового зображення
- Створює ефект "живого" фото

### 2. **Анімовані частинки**
```javascript
// 5 золотих частинок, що плавають по екрану
.particle {
    animation: float-particle 15s ease-in-out infinite;
}
```
- Різні швидкості та траєкторії руху
- Створюють атмосферу розкоші

### 3. **Parallax ефекти**
```javascript
// Фон рухається повільніше за контент
heroBgImage.style.transform = `translateY(${scrolled * 0.5}px)`;

// Зображення в About секції
img.style.transform = `translateY(${yPos}px) scale(1.05)`;
```

### 4. **3D Tilt для карточок меню**
```javascript
// Карточка нахиляється за курсором миші
card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
```

### 5. **Hover ефекти для зображень**
```css
.menu-card:hover .menu-image {
    transform: scale(1.15) rotate(2deg);
}

.gallery-item:hover .gallery-image {
    transform: scale(1.1);
}
```

### 6. **Ripple effect на кнопках**
```css
.btn::before {
    /* Круговий ефект при наведенні */
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.3);
}
```

### 7. **Rotating glow**
```css
@keyframes rotate-glow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```
- Обертається навколо featured карточок
- Створює ефект "магічного" сяйва

### 8. **Lazy loading з fade-in**
```javascript
// Зображення з'являються плавно при прокрутці
img.style.opacity = '0';
img.addEventListener('load', () => {
    img.style.opacity = '1';
});
```

### 9. **Glassmorphism**
```css
backdrop-filter: blur(20px);
background: rgba(37, 37, 37, 0.8);
```
- Ефект матового скла для UI елементів
- Сучасний та елегантний вигляд

---

## 🎨 Нестандартні рішення

### 1. **Асиметричний layout в About секції**
```css
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.visual-main {
    grid-row: 1 / 3;  /* Займає 2 ряди */
}

.visual-small {
    grid-row: 2;  /* Тільки другий ряд */
}
```

### 2. **Masonry grid для меню**
```css
.menu-grid-masonry {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.menu-card-large { grid-column: span 1; }
.menu-card-featured { /* Спеціальний стиль */ }
```

### 3. **Split layout для контактів**
```css
.contact-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
}
```
- Ліва частина: фото з інформацією
- Права частина: форма бронювання

### 4. **Кастомні градієнти**
```css
--gradient-primary: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
--gradient-secondary: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
```

### 5. **Анімовані бейджі**
```css
.pulse-dot {
    animation: pulse 2s ease-in-out infinite;
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
}
```

---

## 📱 Адаптивність

### Breakpoints:
- **Desktop**: 1920px+ (повний функціонал)
- **Laptop**: 1024px+ (адаптований grid)
- **Tablet**: 768px+ (мобільне меню, вертикальні секції)
- **Mobile**: 480px+ (одноколонковий layout)

### Особливості:
```css
@media (max-width: 768px) {
    .stats-bar { flex-direction: column; }
    .menu-grid-masonry { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr; }
}
```

---

## 🚀 Продуктивність

### Оптимізації:
1. **Debounce для scroll events**
```javascript
function debounce(func, wait = 10) { /* ... */ }
window.addEventListener('scroll', debounce(highlightNavigation, 10));
```

2. **Intersection Observer для анімацій**
```javascript
const observer = new IntersectionObserver((entries) => {
    // Анімація тільки коли елемент видимий
});
```

3. **Lazy loading зображень**
```javascript
const imageObserver = new IntersectionObserver(/* ... */);
images.forEach(img => imageObserver.observe(img));
```

---

## 🎯 Унікальні фічі

### 1. **Анімований лічильник статистики**
```javascript
function animateCounter(element, target, duration = 2000) {
    // Плавна анімація чисел від 0 до target
}
```

### 2. **Кастомна система нотифікацій**
```javascript
showNotification('Дякуємо! Ми зв\'яжемося з вами...', 'success');
```
- Slide-in анімація
- Автоматичне закриття через 6 секунд
- Золотий градієнт для success

### 3. **Активна навігація**
```javascript
// Автоматичне підсвічування активної секції
function highlightNavigation() {
    // Визначає поточну секцію та підсвічує відповідний пункт меню
}
```

### 4. **Console art**
```javascript
console.log('%c🍽️ Золота Ложка', 
    'font-size: 28px; background: linear-gradient(...); ...');
```

---

## 📂 Структура файлів

```
luxury-restaurant/
├── index.html (28.8 KB)
│   ├── Hero section з video background
│   ├── About з асиметричним layout
│   ├── Menu з masonry grid
│   ├── Gallery з різними розмірами карточок
│   ├── Contact з split layout
│   └── Footer з повною інформацією
│
├── style.css (30.3 KB)
│   ├── CSS Variables
│   ├── Animations (@keyframes)
│   ├── Responsive design
│   ├── Glassmorphism effects
│   └── 3D transforms
│
├── script.js (15.5 KB)
│   ├── Parallax effects
│   ├── Lazy loading
│   ├── 3D tilt
│   ├── Smooth scroll
│   ├── Form handling
│   └── Notification system
│
└── README.md (4.6 KB)
    └── Інструкції для користувача
```

---

## 🎨 Кольорова палітра

| Колір | HEX | Використання |
|-------|-----|--------------|
| Золотий | `#D4AF37` | Акценти, кнопки, іконки |
| Світло-золотий | `#FFD700` | Градієнти, hover ефекти |
| Темний | `#0D0D0D` | Основний фон |
| Сірий | `#1A1A1A` | Вторинний фон |
| Карточки | `#252525` | Фон карточок |
| Срібний | `#C0C0C0` | Вторинний текст |
| Коричневий | `#8B4513` | Акцентні градієнти |

---

## 🌟 Висновок

Проект **"Золота Ложка"** - це сучасний, елегантний та повністю функціональний веб-сайт luxury ресторану з:

✅ Реальними високоякісними зображеннями  
✅ Крутими анімаціями та ефектами  
✅ 3D трансформаціями  
✅ Parallax ефектами  
✅ Glassmorphism дизайном  
✅ Повною адаптивністю  
✅ Оптимізованою продуктивністю  

**Проект готовий до використання!** 🎉

---

**Створено з ❤️ та увагою до деталей**
