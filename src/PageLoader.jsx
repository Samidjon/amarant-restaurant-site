import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const loaderCopy = {
  ru: {
    location: 'РЕСТОРАН · ТАШКЕНТ',
    overline: 'ВКУСНАЯ ЕДА · ХОРОШИЕ ЛЮДИ',
    title: <>Мгновение <em>наслаждения.</em></>,
    progress: 'ГОТОВИМ ВАШ ВИЗИТ',
    skip: 'Пропустить заставку',
    aria: 'Загрузка сайта Amarant',
  },
  en: {
    location: 'RESTAURANT · TASHKENT',
    overline: 'GOOD FOOD · GOOD PEOPLE',
    title: <>A moment <em>to savour.</em></>,
    progress: 'PREPARING YOUR EXPERIENCE',
    skip: 'Skip intro',
    aria: 'Amarant site loading',
  },
  uz: {
    location: 'RESTORAN · TOSHKENT',
    overline: 'MAZALI TAOM · YAXSHI INSONLAR',
    title: <>Lazzatdan <em>bahramand bo‘ling.</em></>,
    progress: 'TASHRIFINGIZGA TAYYORLANMOQDAMIZ',
    skip: 'Kirish',
    aria: 'Amarant sayti yuklanmoqda',
  },
};

/** Branded intro with a hard timeout so blocked external assets cannot lock the page. */
export default function PageLoader() {
  const [language] = useState(() => {
    try {
      const saved = localStorage.getItem('amarant-language');
      return ['ru', 'en', 'uz'].includes(saved) ? saved : 'ru';
    } catch {
      return 'ru';
    }
  });
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(2);
  const t = loaderCopy[language];

  useEffect(() => {
    if (!visible) return undefined;
    let done = false;
    let intervalId;
    let timeoutId;
    let fadeId;
    let readyTimerId;

    const finish = () => {
      if (done) return;
      done = true;
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
      setProgress(100);
      fadeId = window.setTimeout(() => setVisible(false), 420);
    };

    intervalId = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 91) return current;
        return Math.min(91, current + Math.max(1, Math.ceil((91 - current) / 11)));
      });
    }, 85);

    if (document.readyState === 'complete') {
      readyTimerId = window.setTimeout(finish, 220);
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    // External images or fonts may stall; never keep the intro visible for more than 5.5 sec.
    timeoutId = window.setTimeout(finish, 5500);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(fadeId);
      window.clearTimeout(readyTimerId);
      window.removeEventListener('load', finish);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`page-loader ${progress === 100 ? 'is-finishing' : ''}`} role="status" aria-live="polite" aria-label={t.aria}>
      <div className="loader-topline"><span>AMARANT</span><span>{t.location}</span></div>
      <div className="loader-center">
        <div className="loader-emblem"><span>A</span><i>✳</i></div>
        <p className="loader-overline">{t.overline}</p>
        <div className="loader-title">{t.title}</div>
        <div className="loader-meter"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
        <div className="loader-progress-row"><span>{t.progress}</span><strong>{String(progress).padStart(2, '0')}%</strong></div>
      </div>
      <button className="loader-skip" onClick={() => { setProgress(100); setVisible(false); }}>{t.skip} <ArrowUpRight size={14} /></button>
      <span className="loader-orbit loader-orbit-one" /><span className="loader-orbit loader-orbit-two" />
    </div>
  );
}
