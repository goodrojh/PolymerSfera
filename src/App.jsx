import React, { useEffect, useRef, useState } from 'react'

import videoHero from './assets/video-hero.mp4'
import heroPoster from './assets/hero-warehouse.jpg'
import painImg from './assets/pain-concrete.jpg'
import solutionImg from './assets/solution-floor.jpg'
import caseFood from './assets/case-food.jpg'
import caseShowroom from './assets/case-showroom.jpg'
import caseOcean from './assets/case-3d-ocean.jpg'
import caseParking from './assets/case-parking.jpg'
import processImg from './assets/process-roller.jpg'

/* ------------------------------------------------------------------ */
/* Контакты — замените при необходимости                              */
/* ------------------------------------------------------------------ */
const PHONE_DISPLAY = '+7 999 898‑81‑43'
const PHONE_RAW = '79998988143'
const EMAIL = 'Halubets-1904@mail.ru'
const TG = 'https://t.me/goodrojh'
const MAX = 'https://max.ru/u/f9LHodD0cOLkw9AXo5UNy0IK1Yd4JfWt6EZsHB2PzIQgM1oaruTIqxNjBo4'
const WA = `https://wa.me/${PHONE_RAW}`
const TEL = `tel:+${PHONE_RAW}`
// FormSubmit отправляет данные формы на почту без бэкенда (нужна разовая активация по письму)
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

/* ------------------------------------------------------------------ */
/* Хелперы                                                            */
/* ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useCountdown() {
  const target = useRef(
    (() => {
      const d = new Date()
      return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)
    })()
  )
  const [left, setLeft] = useState(target.current - new Date())
  useEffect(() => {
    const t = setInterval(() => setLeft(target.current - new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.max(0, Math.floor(left / 1000))
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  }
}

async function sendLead(payload) {
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}

/* ------------------------------------------------------------------ */
/* UI-атомы                                                           */
/* ------------------------------------------------------------------ */
function Btn({ as = 'a', variant = 'primary', className = '', children, ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 px-6 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-cyan-400/60'
  const styles = {
    primary:
      'bg-cyan-500 text-white hover:bg-cyan-400 shadow-glow hover:-translate-y-0.5 active:translate-y-0',
    light:
      'bg-white text-navy-900 hover:bg-slate-100 shadow-card hover:-translate-y-0.5',
    ghost:
      'bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20',
    outline:
      'bg-transparent text-navy-900 ring-1 ring-navy-900/20 hover:bg-navy-900 hover:text-white',
  }
  const Tag = as
  return (
    <Tag className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

const IconTg = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.84.42z"/></svg>
)
const IconWa = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.737-.755zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
)
const IconMax = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM7 8.5l5 4 5-4V16h-1.6v-4.2L12 14.6 8.6 11.8V16H7V8.5z"/></svg>
)

/* Логотип-вордмарк (векторный, без растровой картинки) */
function Logo({ className = '', size = 'md' }) {
  const txt = size === 'sm' ? 'text-base' : 'text-lg sm:text-xl'
  const dim = size === 'sm' ? 'h-6 w-6' : 'h-7 w-7 sm:h-8 sm:w-8'
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="ПолимерСфера">
      <svg viewBox="0 0 32 32" className={dim} aria-hidden="true">
        <defs>
          <radialGradient id="sphereGrad" cx="36%" cy="30%" r="78%">
            <stop offset="0%" stopColor="#7fdcf0" />
            <stop offset="50%" stopColor="#0ea5c4" />
            <stop offset="100%" stopColor="#0a2240" />
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#sphereGrad)" />
        <ellipse cx="11.5" cy="10" rx="4.2" ry="2.6" fill="#ffffff" opacity="0.5" />
      </svg>
      <span className={`font-extrabold tracking-tight leading-none ${txt}`}>
        <span className="text-white">Полимер</span>
        <span className="text-cyan-400">Сфера</span>
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Хедер                                                              */
/* ------------------------------------------------------------------ */
function Header({ onCta }) {
  const [open, setOpen] = useState(false)
  const links = [
    ['Услуги и цены', '#prices'],
    ['Как работаем', '#process'],
    ['Кейсы', '#cases'],
    ['Отзывы', '#reviews'],
    ['Гарантии', '#guarantee'],
    ['FAQ', '#faq'],
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center">
          <Logo />
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([t, h]) => (
            <a key={h} href={h} className="text-sm font-medium text-slate-300 hover:text-white">
              {t}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={TEL} className="hidden text-sm font-bold text-white sm:block">
            {PHONE_DISPLAY}
          </a>
          <Btn as="button" onClick={onCta} className="!px-4 !py-2.5 !text-sm">
            Рассчитать
          </Btn>
          <button
            aria-label="Меню"
            className="lg:hidden text-white"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-navy-950">
          <div className="container-x flex flex-col py-3">
            {links.map(([t, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="py-2.5 text-slate-200"
              >
                {t}
              </a>
            ))}
            <a href={TEL} className="py-2.5 font-bold text-cyan-400">{PHONE_DISPLAY}</a>
          </div>
        </div>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Герой                                                              */
/* ------------------------------------------------------------------ */
function Hero({ onCta }) {
  const c = useCountdown()
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      >
        <source src={videoHero} type="video/mp4" />
      </video>
      {/* Нейтральный (не синий) тёмный скрим только для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
      <div className="relative container-x py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 ring-1 ring-white/15">
            Промышленные · декоративные · 3D полы · Москва и МО
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Полимерный пол, который <span className="text-gradient">переживёт ваши погрузчики</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Считаем пол под вашу нагрузку, фиксируем цену в договоре и монтируем без остановки
            производства. Гарантия — письменно.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Btn as="button" onClick={onCta} className="!px-7 !py-4 !text-base">
              Рассчитать пол за 24 часа
            </Btn>
            <Btn as="a" href={TG} target="_blank" rel="noopener" variant="ghost" className="!px-6 !py-4">
              <IconTg className="h-5 w-5" /> Написать в Telegram
            </Btn>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            {['Договор с фикс‑ценой', 'Материалы BASF / Sika', 'Гарантия письменно'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                {t}
              </span>
            ))}
          </div>
          {/* Акция-таймер */}
          <div className="mt-9 inline-flex flex-col gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur sm:flex-row sm:items-center sm:gap-5">
            <div className="text-sm">
              <div className="font-bold text-white">−15% на монтаж + бесплатный 3D‑макет</div>
              <div className="text-slate-300">при заказе до конца месяца</div>
            </div>
            <div className="flex gap-2">
              {[['дн', c.d], ['ч', c.h], ['мин', c.m], ['сек', c.s]].map(([l, v]) => (
                <div key={l} className="min-w-[52px] rounded-lg bg-navy-950/70 px-2 py-1.5 text-center">
                  <div className="text-xl font-extrabold tabular-nums">{pad(v)}</div>
                  <div className="text-[10px] uppercase text-slate-400">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Боль → Решение                                                     */
/* ------------------------------------------------------------------ */
function PainSolution() {
  const pains = [
    'Пыль от бетона оседает на товаре и технике',
    'Трещины и выбоины под нагрузкой погрузчиков',
    'Скользко и травмоопасно для сотрудников',
    'Пол не проходит проверки СЭС / HACCP',
  ]
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Бетон пылит, крошится и сыпется в ваш товар?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Каждый день на голом бетоне — это пыль, ремонт и риск проверок. Полимерное покрытие
            решает проблему один раз и надолго.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div className="reveal grid gap-3">
            {pains.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-red-100 text-red-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </span>
                <span className="font-medium text-navy-900">{p}</span>
              </div>
            ))}
            <div className="mt-3 rounded-2xl bg-navy-900 p-6 text-white">
              <h3 className="text-xl font-bold">Решение — монолитное полимерное покрытие</h3>
              <p className="mt-2 text-slate-300">
                Закрывает бетон бесшовной плёнкой: без пыли, швов и трещин. Держит погрузчики,
                химию и перепады −30…+50 °C, служит 15–20 лет.
              </p>
            </div>
          </div>

          <div className="reveal grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl shadow-card">
              <img src={painImg} alt="Старый бетонный пол с трещинами и пылью" className="h-56 w-full object-cover" loading="lazy" />
              <figcaption className="bg-slate-100 px-4 py-2 text-center text-sm font-semibold text-slate-500">Было: голый бетон</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl shadow-card">
              <img src={solutionImg} alt="Глянцевый полимерный пол после устройства" className="h-56 w-full object-cover" loading="lazy" />
              <figcaption className="bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-white">Стало: полимерный пол</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Выгоды с цифрами                                                   */
/* ------------------------------------------------------------------ */
function Benefits() {
  const stats = [
    ['15–20 лет', 'срок службы покрытия'],
    ['от 1 дня', 'монтаж без остановки цеха'],
    ['−30…+50 °C', 'рабочий диапазон'],
    ['до 5 т/м²', 'выдерживаемая нагрузка'],
    ['0 швов', 'монолитная бесшовная плёнка'],
    ['100%', 'гигиеничность для пищёвки и фармы'],
  ]
  return (
    <section className="bg-navy-950 py-16 text-white sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Что вы получаете в цифрах</h2>
          <p className="mt-3 text-slate-300">Инженерный подход вместо «зальём и посмотрим».</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {stats.map(([n, t]) => (
            <div key={t} className="reveal rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-3xl font-extrabold text-gradient sm:text-4xl">{n}</div>
              <div className="mt-2 text-sm text-slate-300">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Услуги и цены                                                      */
/* ------------------------------------------------------------------ */
function Prices({ onCta }) {
  const rows = [
    ['Обеспыливание / упрочнение', 'склады, паркинги', 'от 290'],
    ['Тонкослойное полиуретановое', 'склады, гаражи', 'от 690'],
    ['Наливной промышленный 2 мм', 'цеха, производства', 'от 1 400'],
    ['Химстойкое / пищевое', 'пищёвка, фарма, лаборатории', 'от 1 900'],
    ['Декоративное (чипсы / флоки)', 'шоурумы, автомойки, HoReCa', 'от 2 400'],
    ['3D‑пол с дизайн‑макетом', 'премиум‑интерьеры, бутики', 'от 6 500'],
  ]
  return (
    <section id="prices" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Услуги и цены по задаче</h2>
          <p className="mt-3 text-slate-600">
            Чем больше метраж — тем ниже цена за м². Точную смету даёт технолог бесплатно.
          </p>
        </div>

        <div className="reveal mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-card">
          <div className="hidden grid-cols-[1.4fr_1.2fr_auto] bg-navy-900 px-6 py-4 text-sm font-semibold text-white sm:grid">
            <div>Решение</div><div>Под какой объект</div><div className="text-right">Цена, ₽/м²</div>
          </div>
          {rows.map(([s, o, p], i) => (
            <div
              key={s}
              className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[1.4fr_1.2fr_auto] sm:items-center ${i % 2 ? 'bg-slate-50' : 'bg-white'}`}
            >
              <div className="font-bold text-navy-900">{s}</div>
              <div className="text-sm text-slate-500">{o}</div>
              <div className="text-right text-lg font-extrabold text-cyan-600">{p}</div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-slate-400">
          Цена зависит от площади, состояния основания и нагрузки. Указаны ориентиры «от».
        </p>
        <div className="mt-8 text-center">
          <Btn as="button" onClick={onCta} className="!px-7 !py-4 !text-base">Узнать цену моего объекта</Btn>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Как работаем                                                       */
/* ------------------------------------------------------------------ */
function Process() {
  const steps = [
    ['Заявка и бесплатный выезд', 'Технолог замеряет, проверяет основание и считает нагрузку на объекте.'],
    ['Смета с фикс‑ценой', 'За 24 часа готовим расчёт и закрепляем цену в договоре — без доплат «по ходу».'],
    ['Монтаж от 1 дня', 'Своя бригада, заводские материалы, ежедневные фото‑отчёты о ходе работ.'],
    ['Сдача + гарантия', 'Подписываем акт и выдаём письменную гарантию на покрытие.'],
  ]
  return (
    <section id="process" className="relative bg-navy-900 py-16 text-white sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="reveal">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Как мы работаем</h2>
            <p className="mt-3 text-slate-300">Прозрачно на каждом этапе — вы всегда знаете, что происходит.</p>
          </div>
          <div className="mt-8 grid gap-4">
            {steps.map(([t, d], i) => (
              <div key={t} className="reveal flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-cyan-500 text-lg font-extrabold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-slate-300">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal overflow-hidden rounded-3xl shadow-glow">
          <img src={processImg} alt="Мастер наносит полимерное покрытие игольчатым валиком" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Кейсы                                                              */
/* ------------------------------------------------------------------ */
function Cases() {
  const items = [
    [caseFood, 'Пищевое производство', 'Полиуретан, бесшовные галтели · {{1 200 м²}}'],
    [caseShowroom, 'Автосалон / шоурум', 'Декоративный флоковый пол · {{640 м²}}'],
    [caseOcean, '3D‑пол «Океан»', 'Эпоксидный 3D с макетом · {{интерьер}}'],
    [caseParking, 'Паркинг', 'Полиуретан + разметка · {{3 000 м²}}'],
    [heroPoster, 'Склад / логистика', 'Наливной промышленный 2 мм · {{2 400 м²}}'],
    [solutionImg, 'Производственный цех', 'Химстойкое покрытие · {{900 м²}}'],
  ]
  return (
    <section id="cases" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Наши работы</h2>
          <p className="mt-3 text-slate-600">От складов до 3D‑полов премиум‑класса. Подписи — под ваши реальные объекты.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([img, t, d]) => (
            <figure key={t} className="reveal group overflow-hidden rounded-2xl shadow-card ring-1 ring-slate-100">
              <div className="overflow-hidden">
                <img src={img} alt={t} loading="lazy" className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <figcaption className="p-4">
                <div className="font-bold text-navy-900">{t}</div>
                <div className="mt-1 text-sm text-slate-500">{d}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Отзывы                                                             */
/* ------------------------------------------------------------------ */
function Reviews() {
  const items = [
    ['Андрей М.', 'директор склада', 'Залили 1 200 м² за два дня и не остановили отгрузку. Пыли больше нет, погрузчики ездят — полу хоть бы что.'],
    ['Ирина С.', 'управляющая рестораном', 'Сделали бесшовный пол на кухне, прошли проверку СЭС без замечаний. Моется за пять минут.'],
    ['Сергей В.', 'владелец автосервиса', 'Цену зафиксировали в договоре, по факту ни рубля сверху. Декоративный пол смотрится дорого.'],
    ['Мария К.', 'частный заказчик', 'Сделали 3D‑пол «океан» в гостиной. Сначала прислали макет, всё согласовали — результат один в один.'],
  ]
  return (
    <section id="reviews" className="bg-slate-50 py-16 sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Что говорят клиенты</h2>
          <p className="mt-3 text-slate-600">Отзывы с Яндекс и Авито · замените на свои реальные.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {items.map(([n, r, q]) => (
            <blockquote key={n} className="reveal rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5 4.9 1.2 7-6.2-3.3L5.8 21l1.2-7-5-4.9 7-.9z" /></svg>
                ))}
              </div>
              <p className="mt-3 text-navy-900">«{q}»</p>
              <footer className="mt-4 text-sm font-semibold text-slate-500">{n} — {r}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Гарантии                                                           */
/* ------------------------------------------------------------------ */
function Guarantee() {
  const items = [
    ['Договор с фикс‑ценой', 'Стоимость из сметы закрепляем в договоре — без доплат по ходу работ.'],
    ['Гарантия письменно', 'Выдаём письменную гарантию на покрытие после сдачи объекта.'],
    ['Сертифицированные материалы', 'Работаем на составах BASF, Sika, QTP — с паспортами и сертификатами.'],
    ['Оплата по этапам', 'Аванс и расчёт по договору — вы платите за результат, а не «вперёд и наугад».'],
  ]
  return (
    <section id="guarantee" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Снимаем все риски</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([t, d]) => (
            <div key={t} className="reveal rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
              </div>
              <h3 className="mt-4 font-bold text-navy-900">{t}</h3>
              <p className="mt-2 text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Квиз / калькулятор                                                 */
/* ------------------------------------------------------------------ */
function Quiz({ refEl }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ object: '', area: '', task: '', base: '', name: '', phone: '', channel: 'Telegram' })
  const [status, setStatus] = useState('idle')

  const steps = [
    { key: 'object', q: 'Какой у вас объект?', opts: ['Склад / логистика', 'Производство / цех', 'Паркинг / СТО', 'Коммерция (шоурум, HoReCa)', 'Квартира / дом'] },
    { key: 'area', q: 'Какая площадь, м²?', opts: ['до 100', '100–500', '500–1500', 'более 1500'] },
    { key: 'task', q: 'Что важнее всего?', opts: ['Прочность под нагрузку', 'Химстойкость / гигиена', 'Декор и внешний вид', '3D‑пол'] },
    { key: 'base', q: 'Состояние основания?', opts: ['Новая стяжка', 'Старый бетон', 'Старое покрытие', 'Не знаю'] },
  ]
  const total = steps.length + 1
  const progress = Math.round(((step) / total) * 100)

  const pick = (key, val) => {
    setData((d) => ({ ...d, [key]: val }))
    setStep((s) => s + 1)
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const ok = await sendLead({
      _subject: 'Заявка с квиза — ПолимерСфера',
      Объект: data.object,
      Площадь: data.area,
      Задача: data.task,
      Основание: data.base,
      Имя: data.name,
      Телефон: data.phone,
      'Куда отправить': data.channel,
    })
    setStatus(ok ? 'done' : 'error')
  }

  return (
    <section id="quiz" ref={refEl} className="bg-gradient-to-b from-navy-950 to-navy-900 py-16 text-white sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Рассчитайте свой пол за 1 минуту</h2>
          <p className="mt-3 text-slate-300">4 вопроса — и технолог подготовит смету с фиксированной ценой.</p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 text-navy-900 shadow-glow sm:p-8">
          {status === 'done' ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">Заявка принята!</h3>
              <p className="mt-2 text-slate-600">Технолог свяжется с вами и пришлёт расчёт. Обычно — в течение 24 часов.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-cyan-500 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>

              {step < steps.length ? (
                <div>
                  <div className="text-sm font-semibold text-cyan-600">Шаг {step + 1} из {total}</div>
                  <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">{steps[step].q}</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {steps[step].opts.map((o) => (
                      <button
                        key={o}
                        onClick={() => pick(steps[step].key, o)}
                        className="rounded-xl border-2 border-slate-200 px-4 py-3.5 text-left font-medium hover:border-cyan-500 hover:bg-cyan-50"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep((s) => s - 1)} className="mt-5 text-sm font-semibold text-slate-400 hover:text-slate-600">← Назад</button>
                  )}
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="text-sm font-semibold text-cyan-600">Последний шаг</div>
                  <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">Куда отправить расчёт?</h3>
                  <div className="mt-5 grid gap-3">
                    <input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Ваше имя" className="rounded-xl border-2 border-slate-200 px-4 py-3.5 focus:border-cyan-500 focus:outline-none" />
                    <input required type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="Телефон" className="rounded-xl border-2 border-slate-200 px-4 py-3.5 focus:border-cyan-500 focus:outline-none" />
                    <select value={data.channel} onChange={(e) => setData({ ...data, channel: e.target.value })} className="rounded-xl border-2 border-slate-200 px-4 py-3.5 focus:border-cyan-500 focus:outline-none">
                      <option>Telegram</option><option>MAX</option><option>Звонок</option><option>E‑mail</option>
                    </select>
                  </div>
                  <Btn as="button" type="submit" className="mt-5 w-full !py-4 !text-base" variant="primary">
                    {status === 'sending' ? 'Отправляем…' : 'Получить расчёт'}
                  </Btn>
                  {status === 'error' && (
                    <p className="mt-3 text-center text-sm text-red-600">
                      Не удалось отправить. Напишите нам в <a className="underline" href={TG}>Telegram</a> или позвоните {PHONE_DISPLAY}.
                    </p>
                  )}
                  <p className="mt-3 text-center text-xs text-slate-400">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
                  <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-2 block w-full text-center text-sm font-semibold text-slate-400 hover:text-slate-600">← Назад</button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                */
/* ------------------------------------------------------------------ */
function FAQ() {
  const items = [
    ['За сколько зальёте пол?', 'Тонкослойные покрытия — от 1 дня, наливные 2 мм — 2–4 дня с учётом полимеризации. Точные сроки технолог называет после осмотра основания.'],
    ['Нужно ли останавливать производство?', 'Чаще всего нет: работаем участками, ночами или в выходные. Логистику согласуем заранее, чтобы не мешать отгрузке.'],
    ['Что с гарантией?', 'Выдаём письменную гарантию на покрытие после сдачи объекта. Срок зависит от типа пола и нагрузки — фиксируем в договоре.'],
    ['Можно ли по старому основанию?', 'Да, если основание ремонтопригодно. Технолог проверит прочность и влажность и предложит подготовку — иногда достаточно шлифовки.'],
    ['Сколько реально будет стоить мой объект?', 'Цена зависит от площади, нагрузки и состояния основания. Бесплатный выезд и расчёт дают точную смету за 24 часа.'],
    ['Делаете ли 3D‑пол в квартиру?', 'Да. Сначала готовим дизайн‑макет, согласуем с вами, и только потом приступаем к работам.'],
    ['Работаете в Московской области?', 'Да, по всей Москве и МО. Выезд технолога на объект — бесплатно.'],
  ]
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Частые вопросы</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl ring-1 ring-slate-200">
          {items.map(([q, a], i) => (
            <div key={q} className="reveal">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6">
                <span className="font-bold text-navy-900">{q}</span>
                <svg className={`h-5 w-5 flex-none text-cyan-500 transition-transform ${open === i ? 'rotate-45' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              {open === i && <p className="px-5 pb-5 text-slate-600 sm:px-6">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Финальный CTA + форма                                              */
/* ------------------------------------------------------------------ */
function FinalCta() {
  const [data, setData] = useState({ name: '', phone: '', area: '' })
  const [status, setStatus] = useState('idle')
  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const ok = await sendLead({ _subject: 'Заявка с формы — ПолимерСфера', Имя: data.name, Телефон: data.phone, Площадь: data.area })
    setStatus(ok ? 'done' : 'error')
  }
  return (
    <section id="contact" className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-24">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="container-x relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Получите смету с фиксированной ценой за 24 часа</h2>
          <p className="mt-4 text-lg text-slate-300">
            Оставьте контакты — технолог бесплатно выедет на объект, замерит и подготовит расчёт.
            Сейчас действует <span className="font-bold text-cyan-400">−15% на монтаж + бесплатный 3D‑макет</span>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn as="a" href={TG} target="_blank" rel="noopener" variant="ghost"><IconTg className="h-5 w-5" /> Telegram</Btn>
            <Btn as="a" href={MAX} target="_blank" rel="noopener" variant="ghost"><IconMax className="h-5 w-5" /> MAX</Btn>
            <Btn as="a" href={TEL} variant="ghost">{PHONE_DISPLAY}</Btn>
          </div>
        </div>

        <div className="reveal rounded-3xl bg-white p-6 text-navy-900 shadow-glow sm:p-8">
          {status === 'done' ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <h3 className="mt-4 text-2xl font-extrabold">Спасибо! Заявка отправлена</h3>
              <p className="mt-2 text-slate-600">Перезвоним и пришлём расчёт в течение 24 часов.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3">
              <h3 className="text-xl font-extrabold">Заказать бесплатный расчёт</h3>
              <input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Ваше имя" className="rounded-xl border-2 border-slate-200 px-4 py-3.5 focus:border-cyan-500 focus:outline-none" />
              <input required type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="Телефон" className="rounded-xl border-2 border-slate-200 px-4 py-3.5 focus:border-cyan-500 focus:outline-none" />
              <input value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })} placeholder="Площадь, м² (необязательно)" className="rounded-xl border-2 border-slate-200 px-4 py-3.5 focus:border-cyan-500 focus:outline-none" />
              <Btn as="button" type="submit" className="mt-1 w-full !py-4 !text-base">{status === 'sending' ? 'Отправляем…' : 'Получить расчёт'}</Btn>
              {status === 'error' && <p className="text-center text-sm text-red-600">Ошибка отправки. Напишите в <a className="underline" href={TG}>Telegram</a>.</p>}
              <p className="text-center text-xs text-slate-400">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Футер                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-navy-950 pt-14 text-slate-300">
      <div className="container-x grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-slate-400">
            Промышленные, декоративные и 3D полимерные полы под ключ в Москве и Московской области.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white">Контакты</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={TEL} className="hover:text-white">{PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
            <li><a href={TG} target="_blank" rel="noopener" className="hover:text-white">Telegram @goodrojh</a></li>
            <li><a href={MAX} target="_blank" rel="noopener" className="hover:text-white">Мессенджер MAX</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">Услуги</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#prices" className="hover:text-white">Промышленные полы</a></li>
            <li><a href="#prices" className="hover:text-white">Декоративные полы</a></li>
            <li><a href="#prices" className="hover:text-white">3D‑полы</a></li>
            <li><a href="#cases" className="hover:text-white">Наши работы</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">Зона работ</h4>
          <p className="mt-4 text-sm text-slate-400">Москва и Московская область. Выезд технолога — бесплатно.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} ПолимерСфера. Все права защищены.</span>
          <span>
            Сайт разработан компанией{' '}
            <a href="http://lendingsfera.ru" target="_blank" rel="noopener" className="font-semibold text-slate-300 underline decoration-slate-600 underline-offset-2 hover:text-white">
              ЛендингСфера
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* Плавающие мессенджеры + мобильная панель CTA                       */
/* ------------------------------------------------------------------ */
function FloatingMessengers() {
  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3 sm:bottom-6">
      <a href={MAX} target="_blank" rel="noopener" aria-label="MAX" className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#3D6FFF] to-[#22B8D8] text-white shadow-lg transition hover:scale-110">
        <IconMax className="h-7 w-7" />
      </a>
      <a href={TG} target="_blank" rel="noopener" aria-label="Telegram" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition hover:scale-110">
        <IconTg className="h-6 w-6" />
      </a>
    </div>
  )
}

function MobileBar({ onCta }) {
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-white/10 bg-navy-950/95 p-3 backdrop-blur sm:hidden">
      <div className="flex gap-2">
        <a href={TEL} className="flex flex-1 items-center justify-center rounded-xl bg-white/10 py-3 font-bold text-white">Позвонить</a>
        <button onClick={onCta} className="flex flex-[1.4] items-center justify-center rounded-xl bg-cyan-500 py-3 font-bold text-white">Рассчитать пол</button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Поп-ап на выход                                                    */
/* ------------------------------------------------------------------ */
function ExitPopup() {
  const [show, setShow] = useState(false)
  const [data, setData] = useState({ phone: '' })
  const [status, setStatus] = useState('idle')
  useEffect(() => {
    if (sessionStorage.getItem('exitShown')) return
    const onLeave = (e) => {
      if (e.clientY <= 0) {
        setShow(true)
        sessionStorage.setItem('exitShown', '1')
        document.removeEventListener('mouseout', onLeave)
      }
    }
    const timer = setTimeout(() => document.addEventListener('mouseout', onLeave), 4000)
    return () => { clearTimeout(timer); document.removeEventListener('mouseout', onLeave) }
  }, [])
  if (!show) return null
  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const ok = await sendLead({ _subject: 'Заявка (поп-ап выхода) — ПолимерСфера', Телефон: data.phone })
    setStatus(ok ? 'done' : 'error')
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShow(false)}>
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} aria-label="Закрыть" className="absolute right-4 top-4 text-slate-400 hover:text-slate-700">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        {status === 'done' ? (
          <div className="py-6 text-center">
            <h3 className="text-2xl font-extrabold text-navy-900">Готово!</h3>
            <p className="mt-2 text-slate-600">Технолог перезвонит в течение 15 минут.</p>
          </div>
        ) : (
          <>
            <div className="text-4xl">🎁</div>
            <h3 className="mt-3 text-2xl font-extrabold text-navy-900">Уходите без расчёта?</h3>
            <p className="mt-2 text-slate-600">Заберите <b>−15% на монтаж</b> и <b>бесплатный 3D‑макет</b>. Оставьте телефон — технолог перезвонит за 15 минут.</p>
            <form onSubmit={submit} className="mt-5 grid gap-3">
              <input required type="tel" value={data.phone} onChange={(e) => setData({ phone: e.target.value })} placeholder="Ваш телефон" className="rounded-xl border-2 border-slate-200 px-4 py-3.5 focus:border-cyan-500 focus:outline-none" />
              <Btn as="button" type="submit" className="w-full !py-4">{status === 'sending' ? 'Отправляем…' : 'Забрать скидку'}</Btn>
              {status === 'error' && <p className="text-center text-sm text-red-600">Ошибка. Напишите в <a className="underline" href={TG}>Telegram</a>.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  useReveal()
  const quizRef = useRef(null)
  const toQuiz = () => quizRef.current?.scrollIntoView({ behavior: 'smooth' })
  return (
    <div className="font-sans text-navy-900">
      <Header onCta={toQuiz} />
      <main>
        <Hero onCta={toQuiz} />
        <PainSolution />
        <Benefits />
        <Prices onCta={toQuiz} />
        <Process />
        <Cases />
        <Reviews />
        <Guarantee />
        <Quiz refEl={quizRef} />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      <FloatingMessengers />
      <MobileBar onCta={toQuiz} />
      <ExitPopup />
    </div>
  )
}
