import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Clock3, Instagram, MapPin, Menu as MenuIcon, Star, Utensils, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLoader from './PageLoader.jsx';

gsap.registerPlugin(ScrollTrigger);

const images = {
  hero: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=88',
  interior: 'https://resto.uz/data/resto/47/4692/amarant-4003.png',
  room: 'https://resto.uz/data/resto/47/4692/amarant-4004.png',
  burrata: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=85',
  steak: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
  grill: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85',
  table: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85',
};

const copy = {
  ru: {
    nav: ['О ресторане', 'Меню', 'Атмосфера', 'Контакты'],
    book: 'Забронировать столик',
    eyebrow: 'Ресторан · Ташкент',
    heroLine1: 'Вкус, который', heroLine2: 'собирает', heroLine3: 'близких.',
    heroText: 'Место для долгих разговоров, красивых встреч и блюд, которые хочется разделить.',
    explore: 'Открыть меню',
    rating: '192 отзыва в Google',
    since: 'Место для особенных моментов',
    aboutLabel: 'Наша философия',
    aboutTitle: 'Не просто ужин.\nПовод быть вместе.',
    aboutText: 'В Amarant мы верим, что хороший вечер складывается из деталей: щедрой кухни, внимательного сервиса и пространства, в котором хочется задержаться ещё на чашечку чая.',
    aboutNote: 'Восточная щедрость. Современный характер.',
    menuLabel: 'Выбор гостей',
    menuTitle: 'В центре стола',
    menuText: 'Яркие вкусы, свежие ингредиенты и подача, которая задаёт настроение вечеру.',
    dishes: [
      { title: 'Салат «Буррата»', category: 'Свежо · Нежно', desc: 'Лёгкий акцент для начала вечера', image: images.burrata, number: '01' },
      { title: 'Стейк', category: 'С огня', desc: 'Выразительный вкус и правильная прожарка', image: images.steak, number: '02' },
      { title: 'Авторские салаты', category: 'Сезонное', desc: 'Свежесть, текстура и баланс вкусов', image: images.salad, number: '03' },
      { title: 'Блюда на гриле', category: 'Щедро · Ароматно', desc: 'Огонь, специи и удовольствие делиться', image: images.grill, number: '04' },
    ],
    fullMenu: 'Уточнить меню',
    menuFootnote: 'Состав, наличие и стоимость блюд уточняйте у ресторана.',
    atmosphereLabel: 'Пространство Amarant',
    atmosphereTitle: 'Вечер, который\nне хочется заканчивать.',
    atmosphereText: 'Уютные встречи, семейные праздники, деловые обеды и большие поводы — у каждого момента здесь свой стол.',
    spaces: ['Для близких встреч', 'Для больших поводов', 'Для новых воспоминаний'],
    reviewsLabel: 'Гости говорят',
    reviewTitle: 'Впечатления остаются.',
    reviewQuote: '«Очень красивый ресторан! Подача шикарная, вкусно и очень весело».',
    reviewAuthor: 'Сабина Мирзаева',
    reviewSource: 'Google · Local Guide',
    reviewScore: '4.3',
    reviewCount: '192 отзыва',
    reserveLabel: 'Ваш вечер начинается здесь',
    reserveTitle: 'Оставьте место\nдля хорошего вечера.',
    reserveText: 'Позвоните нам — подберём столик для уютного ужина, встречи или особенного праздника.',
    call: 'Позвонить и забронировать',
    locationLabel: 'Найдите нас',
    address: 'Улица Лутфи, 49, Ташкент, Узбекистан',
    hours: 'Ежедневно · 11:00–23:00',
    footerNote: 'Хорошие моменты созданы, чтобы ими делиться.',
    stamp: 'ВКУСНАЯ ЕДА · ХОРОШИЕ ЛЮДИ · AMARANT · ', scrollHint: 'ЛИСТАЙТЕ, ЧТОБЫ УЗНАТЬ', heroSide: 'ТАШКЕНТ · AMARANT', photoIndex: 'AMARANT — ТАШКЕНТ', miniLabel: 'МЕСТО ДЛЯ ВСТРЕЧ', marquee: 'ВКУС · АТМОСФЕРА · ВСТРЕЧИ · AMARANT · ', atmosphereSide: 'ХОРОШИЕ МОМЕНТЫ ВМЕСТЕ', reservationPlace: 'ТАШКЕНТ, УЗБЕКИСТАН', backTop: 'НАВЕРХ',
    menuAria: 'Открыть меню навигации',
    closeAria: 'Закрыть меню навигации',
  },
  en: {
    nav: ['About', 'Menu', 'Atmosphere', 'Contact'],
    book: 'Book a table', eyebrow: 'Restaurant · Tashkent',
    heroLine1: 'A taste that', heroLine2: 'brings us', heroLine3: 'together.',
    heroText: 'A place for long conversations, beautiful gatherings, and dishes made to be shared.',
    explore: 'Explore the menu', rating: '192 Google reviews', since: 'A place for special moments',
    aboutLabel: 'Our philosophy', aboutTitle: 'More than dinner.\nA reason to gather.',
    aboutText: 'At Amarant, we believe a great evening is made of details: generous food, thoughtful service, and a space that makes you want to stay for one more cup of tea.',
    aboutNote: 'Eastern generosity. Modern character.', menuLabel: 'Guest favourites', menuTitle: 'Made for the table',
    menuText: 'Vivid flavours, fresh ingredients, and presentation that sets the mood for the evening.',
    dishes: [
      { title: 'Burrata salad', category: 'Fresh · Delicate', desc: 'A light beginning to the evening', image: images.burrata, number: '01' },
      { title: 'Steak', category: 'From the fire', desc: 'Bold flavour and a perfect sear', image: images.steak, number: '02' },
      { title: 'Signature salads', category: 'Seasonal', desc: 'Freshness, texture, and balance', image: images.salad, number: '03' },
      { title: 'From the grill', category: 'Generous · Aromatic', desc: 'Fire, spices, and food worth sharing', image: images.grill, number: '04' },
    ],
    fullMenu: 'Ask about the menu', menuFootnote: 'Please contact the restaurant to confirm dishes, availability, and prices.',
    atmosphereLabel: 'The Amarant space', atmosphereTitle: 'An evening you\nwon’t want to end.',
    atmosphereText: 'Intimate gatherings, family celebrations, business lunches, and big occasions — every moment has its table here.',
    spaces: ['For intimate gatherings', 'For big occasions', 'For new memories'],
    reviewsLabel: 'Words from our guests', reviewTitle: 'The feeling stays with you.',
    reviewQuote: '“A beautiful restaurant! Wonderful presentation, delicious food, and a really fun atmosphere.”',
    reviewAuthor: 'Sabina Mirzaeva', reviewSource: 'Google · Local Guide', reviewScore: '4.3', reviewCount: '192 reviews',
    reserveLabel: 'Your evening starts here', reserveTitle: 'Make room for\na beautiful evening.',
    reserveText: 'Give us a call — we’ll help find a table for dinner, a gathering, or a special celebration.',
    call: 'Call to reserve', locationLabel: 'Find us', address: '49 Lutfi Street, Tashkent, Uzbekistan',
    hours: 'Daily · 11:00 AM–11:00 PM', footerNote: 'Good moments are made to be shared.',
    stamp: 'GOOD FOOD · GOOD PEOPLE · AMARANT · ', scrollHint: 'SCROLL TO DISCOVER', heroSide: 'TASHKENT · AMARANT', photoIndex: 'AMARANT — TASHKENT', miniLabel: 'A PLACE TO GATHER', marquee: 'TASTE · ATMOSPHERE · TOGETHERNESS · AMARANT · ', atmosphereSide: 'GOOD MOMENTS, SHARED', reservationPlace: 'TASHKENT, UZBEKISTAN', backTop: 'TOP',
    menuAria: 'Open navigation menu', closeAria: 'Close navigation menu',
  },
  uz: {
    nav: ['Restoran haqida', 'Menyu', 'Muhit', 'Aloqa'],
    book: 'Stol band qilish', eyebrow: 'Restoran · Toshkent',
    heroLine1: 'Ta’m bizni', heroLine2: 'bir joyga', heroLine3: 'jaml qiladi.',
    heroText: 'Samimiy suhbatlar, chiroyli uchrashuvlar va birga baham ko‘riladigan taomlar uchun maskan.',
    explore: 'Menyuni ko‘rish', rating: 'Google’da 192 ta sharh', since: 'O‘zgacha lahzalar uchun maskan',
    aboutLabel: 'Bizning falsafamiz', aboutTitle: 'Bu shunchaki kechki ovqat emas.\nBirga bo‘lish uchun sabab.',
    aboutText: 'Amarantda ajoyib oqshom mayda detallardan yaralishiga ishonamiz: saxovatli dasturxon, e’tiborli xizmat va yana bir piyola choy uchun qolgingiz keladigan muhit.',
    aboutNote: 'Sharqona mehmondo‘stlik. Zamonaviy ruh.', menuLabel: 'Mehmonlar tanlovi', menuTitle: 'Bir dasturxon atrofida',
    menuText: 'Yorqin ta’mlar, yangi masalliqlar va oqshom kayfiyatini belgilaydigan taqdimot.',
    dishes: [
      { title: 'Burrata salati', category: 'Yangi · Mayin', desc: 'Oqshomni yengil boshlash uchun', image: images.burrata, number: '01' },
      { title: 'Steyk', category: 'Olovdan', desc: 'Yorqin ta’m va to‘g‘ri pishirish darajasi', image: images.steak, number: '02' },
      { title: 'Mualliflik salatlari', category: 'Mavsumiy', desc: 'Yangilik, tuzilma va ta’m muvozanati', image: images.salad, number: '03' },
      { title: 'Grildagi taomlar', category: 'To‘yimli · Xushbo‘y', desc: 'Olov, ziravorlar va baham ko‘rish zavqi', image: images.grill, number: '04' },
    ],
    fullMenu: 'To‘liq menyu', menuFootnote: 'Taomlar, mavjudligi va narxlarini restoran bilan aniqlashtiring.',
    atmosphereLabel: 'Amarant muhiti', atmosphereTitle: 'Tugashini istamaydigan\noqshom.',
    atmosphereText: 'Yaqinlar davrasi, oilaviy bayramlar, ishbilarmonlik tushliklari yoki katta tadbirlar — har bir lahza uchun o‘z dasturxonimiz bor.',
    spaces: ['Yaqinlar davrasi uchun', 'Katta bayramlar uchun', 'Yangi xotiralar uchun'],
    reviewsLabel: 'Mehmonlar fikri', reviewTitle: 'Taassurotlar uzoq qoladi.',
    reviewQuote: '“Juda chiroyli restoran! Taomlar ajoyib taqdim etiladi, mazali va kayfiyat juda yaxshi.”',
    reviewAuthor: 'Sabina Mirzayeva', reviewSource: 'Google · Local Guide', reviewScore: '4.3', reviewCount: '192 ta sharh',
    reserveLabel: 'Oqshomingiz shu yerdan boshlanadi', reserveTitle: 'Yaxshi oqshom uchun\njoy ajrating.',
    reserveText: 'Qo‘ng‘iroq qiling — shinam kechki ovqat, uchrashuv yoki maxsus bayram uchun stol tanlashga yordam beramiz.',
    call: 'Qo‘ng‘iroq qilib band qilish', locationLabel: 'Bizni toping', address: 'Lutfiy ko‘chasi, 49, Toshkent, O‘zbekiston',
    hours: 'Har kuni · 11:00–23:00', footerNote: 'Yaxshi lahzalar baham ko‘rish uchun yaratilgan.',
    stamp: 'MAZALI TAOM · YAXSHI INSONLAR · AMARANT · ', scrollHint: 'KO‘PROQ BILISH UCHUN PASTGA TUSHING', heroSide: 'TOSHKENT · AMARANT', photoIndex: 'AMARANT — TOSHKENT', miniLabel: 'UCHRASHUVLAR MASKANI', marquee: 'TA’M · MUHIT · UCHRASHUVLAR · AMARANT · ', atmosphereSide: 'BIRGALIKDAGI YAXSHI LAHZALAR', reservationPlace: 'TOSHKENT, O‘ZBEKISTON', backTop: 'YUQORIGA',
    menuAria: 'Navigatsiya menyusini ochish', closeAria: 'Navigatsiya menyusini yopish',
  },
};

function App() {
  const [language, setLanguage] = useState(() => {
    try { const saved = localStorage.getItem('amarant-language'); return ['ru', 'en', 'uz'].includes(saved) ? saved : 'ru'; }
    catch { return 'ru'; }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const rootRef = useRef(null);
  const t = copy[language];

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      gsap.from('.hero-copy > *', {
        y: 34, opacity: 0, duration: 1.05, stagger: 0.12, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.hero-visual', {
        opacity: 0, scale: 0.84, rotateY: -18, rotateX: 8, y: 50,
        duration: 1.35, ease: 'power3.out', delay: 0.25,
      });
      gsap.to('.hero-visual', {
        yPercent: 18, rotateY: 8, rotateX: -5, scale: 0.96, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
      gsap.to('.hero-orbit', {
        rotate: 24, x: 20, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 },
      });
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 45, opacity: 0, rotateX: 4, transformPerspective: 900 }, {
          y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });
      gsap.utils.toArray('.dish-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 70, rotateY: i % 2 ? 8 : -8, rotateX: 6, opacity: 0 }, {
          y: 0, rotateY: 0, rotateX: 0, opacity: 1, duration: 0.9, delay: i * 0.08,
          ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });
        gsap.to(card.querySelector('.dish-image'), {
          yPercent: -8, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });
      gsap.to('.atmosphere-photo img', {
        yPercent: 12, scale: 1.1, ease: 'none',
        scrollTrigger: { trigger: '.atmosphere', start: 'top bottom', end: 'bottom top', scrub: 1.25 },
      });
      gsap.to('.floating-stamp', {
        rotate: 360, ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 2 },
      });
      gsap.from('.reservation-panel', {
        y: 80, rotateX: 8, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.reservation', start: 'top 78%', once: true },
      });
    }, rootRef);

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      ctx.revert();
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);
  const changeLanguage = (next) => {
    setLanguage(next);
    try { localStorage.setItem('amarant-language', next); } catch { /* localStorage may be disabled */ }
  };

  return (
    <div className="site-shell" ref={rootRef}>
      <PageLoader />
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollPercent / 100})` }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Amarant — главная" onClick={closeMenu}>
          <span className="brand-mark">A<span>✳</span></span>
          <span className="brand-name">amarant<span>restaurant</span></span>
        </a>
        <nav className={`desktop-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Главная навигация">
          {t.nav.map((label, index) => (
            <a key={label} href={['#about', '/menu', '#atmosphere', '#contact'][index]} onClick={closeMenu}>{label}</a>
          ))}
          <a className="mobile-book" href="tel:+998950767777">{t.book} <ArrowUpRight size={15} /></a>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Выбор языка">
            <button className={language === 'ru' ? 'active' : ''} onClick={() => changeLanguage('ru')} aria-pressed={language === 'ru'}>RU</button>
            <span>/</span>
            <button className={language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')} aria-pressed={language === 'en'}>EN</button>
            <span>/</span>
            <button className={language === 'uz' ? 'active' : ''} onClick={() => changeLanguage('uz')} aria-pressed={language === 'uz'}>UZ</button>
          </div>
          <a className="header-book" href="tel:+998950767777">{t.book}<ArrowUpRight size={15} /></a>
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? t.closeAria : t.menuAria} aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grain" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{t.eyebrow}</p>
            <h1 id="hero-title"><span>{t.heroLine1}</span><span className="italic-line">{t.heroLine2}</span><span>{t.heroLine3}</span></h1>
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-ctas">
              <a href="/menu" className="button button-dark">{t.explore}<ArrowDownRight size={17} /></a>
              <a href="tel:+998950767777" className="round-link" aria-label={t.book}><ArrowUpRight size={20} /></a>
            </div>
            <div className="hero-rating">
              <div className="rating-stars" aria-label="4.3 из 5"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star className="star-muted" fill="currentColor" /></div>
              <span><strong>4.3/5</strong> · {t.rating}</span>
            </div>
          </div>
          <div className="hero-art-wrap">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-visual">
              <img src={images.hero} alt="Аппетитная подача блюда в ресторане" fetchPriority="high" />
              <div className="hero-image-shade" />
              <div className="hero-image-label"><span>01 / 04</span><i /> {t.since}</div>
            </div>
            <div className="floating-stamp"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="circlePath" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" /></defs><text><textPath href="#circlePath">{t.stamp}</textPath></text><circle cx="50" cy="50" r="17" /><path d="M50 37 L53 47 L63 50 L53 53 L50 63 L47 53 L37 50 L47 47 Z" /></svg></div>
          </div>
          <a className="scroll-cue" href="#about"><span>{t.scrollHint}</span><ArrowDown size={15} /></a>
          <span className="hero-side-note">{t.heroSide}</span>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-video-background" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata" poster="/amarant-intro-poster.webp" tabIndex={-1}>
              <source src="/amarant-intro.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="section-kicker reveal"><span className="number-kicker">01</span><span>{t.aboutLabel}</span><span className="kicker-line" /></div>
          <div className="about-grid">
            <div className="about-video-space reveal" aria-hidden="true">
              <div className="about-video-caption"><span className="about-video-caption-dot" />{t.photoIndex}</div>
              <span className="about-video-index">01 / AMARANT</span>
            </div>
            <div className="about-copy reveal">
              <span className="mini-label">{t.miniLabel}</span>
              <h2>{t.aboutTitle.split('\n').map((line, i) => <span key={line} className={i === 1 ? 'serif-italic' : ''}>{line}<br /></span>)}</h2>
              <p>{t.aboutText}</p>
              <div className="about-note"><span className="note-icon"><Utensils size={19} /></span><span>{t.aboutNote}</span></div>
              <a href="#atmosphere" className="text-link">{t.nav[2]} <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="marquee" aria-hidden="true"><div className="marquee-track"><span>{t.marquee}</span><span>{t.marquee}</span></div></div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="menu-heading">
            <div className="section-kicker reveal"><span className="number-kicker">02</span><span>{t.menuLabel}</span><span className="kicker-line" /></div>
            <div className="menu-heading-main reveal"><h2>{t.menuTitle}<span className="period">.</span></h2><p>{t.menuText}</p></div>
          </div>
          <div className="dish-grid">
            {t.dishes.map((dish) => (
              <article className="dish-card" key={dish.number}>
                <div className="dish-image-wrap"><img className="dish-image" src={dish.image} alt={dish.title} loading="lazy" /><span className="dish-number">{dish.number}</span><span className="dish-arrow"><ArrowUpRight size={20} /></span></div>
                <div className="dish-meta"><span>{dish.category}</span><span className="dish-dot" /></div>
                <h3>{dish.title}</h3>
                <p>{dish.desc}</p>
              </article>
            ))}
          </div>
          <div className="menu-bottom reveal"><p>{t.menuFootnote}</p><a className="button button-outline" href="/menu">{t.fullMenu}<ArrowUpRight size={16} /></a></div>
        </section>

        <section className="atmosphere" id="atmosphere">
          <div className="atmosphere-photo"><img src={images.table} alt="Красивая сервировка стола для особенного вечера" loading="lazy" /><div className="atmosphere-overlay" /></div>
          <div className="atmosphere-content reveal"><span className="atmosphere-eyebrow">{t.atmosphereLabel}</span><h2>{t.atmosphereTitle.split('\n').map((line, i) => <span key={line} className={i === 1 ? 'serif-italic' : ''}>{line}<br /></span>)}</h2><p>{t.atmosphereText}</p><a href="tel:+998950767777" className="light-link">{t.book}<ArrowUpRight size={16} /></a></div>
          <div className="atmosphere-side-label">{t.atmosphereSide}</div>
          <div className="space-chips">{t.spaces.map((space, i) => <span key={space}><i>0{i + 1}</i>{space}</span>)}</div>
        </section>

        <section className="reviews section-pad">
          <div className="reviews-top reveal"><div className="section-kicker"><span className="number-kicker">03</span><span>{t.reviewsLabel}</span><span className="kicker-line" /></div><h2>{t.reviewTitle}</h2></div>
          <div className="review-card reveal"><span className="quote-mark">“</span><div className="review-copy"><div className="rating-stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star className="star-muted" fill="currentColor" /></div><blockquote>{t.reviewQuote}</blockquote><div className="review-byline"><div className="review-avatar">{t.reviewAuthor.charAt(0)}</div><div><strong>{t.reviewAuthor}</strong><span>{t.reviewSource}</span></div></div></div><div className="review-score"><strong>{t.reviewScore}</strong><div className="score-stars">★★★★★</div><span>{t.reviewCount}</span></div></div>
        </section>

        <section className="reservation section-pad" id="contact">
          <div className="reservation-panel">
            <div className="reservation-copy reveal"><span className="reservation-label"><span />{t.reserveLabel}</span><h2>{t.reserveTitle.split('\n').map((line, i) => <span key={line} className={i === 1 ? 'serif-italic' : ''}>{line}<br /></span>)}</h2><p>{t.reserveText}</p><a className="button button-light" href="tel:+998950767777"><span>{t.call}</span><ArrowUpRight size={17} /></a><span className="reservation-decoration">A.</span></div>
            <div className="reservation-image"><img src={images.interior} alt="Пространство ресторана для вашего вечера" loading="lazy" /><div className="reservation-image-caption"><span>AMARANT RESTAURANT</span><span>{t.reservationPlace}</span></div></div>
          </div>
          <div className="contact-grid reveal">
            <div className="contact-item"><span className="contact-icon"><MapPin size={17} /></span><div><h3>{t.locationLabel}</h3><a href="https://www.google.com/maps/search/?api=1&query=Amarant+Restaurant+Lutfi+Street+49+Tashkent" target="_blank" rel="noreferrer">{t.address}<ArrowUpRight size={14} /></a></div></div>
            <div className="contact-item"><span className="contact-icon"><Clock3 size={17} /></span><div><h3>{language === 'ru' ? 'Время работы' : language === 'uz' ? 'Ish vaqti' : 'Opening hours'}</h3><p>{t.hours}</p></div></div>
            <div className="contact-item"><span className="contact-icon"><CalendarDays size={17} /></span><div><h3>{language === 'ru' ? 'Бронирование' : language === 'uz' ? 'Band qilish' : 'Reservations'}</h3><a href="tel:+998950767777">+998 95 076 77 77<ArrowUpRight size={14} /></a></div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark">A<span>✳</span></span><span className="brand-name">amarant<span>restaurant</span></span></a>
        <p>{t.footerNote}</p>
        <div className="footer-right"><a href="https://www.instagram.com/amarant.restaurants/?hl=ru" target="_blank" rel="noreferrer" aria-label="Instagram Amarant"><Instagram size={17} /></a><a className="back-top" href="#top">{t.backTop} <ArrowUpRight size={14} /></a><span>© AMARANT 2026</span></div>
      </footer>
    </div>
  );
}

export default App;
