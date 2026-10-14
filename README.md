# Amarant Restaurant — restaurant website

A responsive Russian / English / Uzbek restaurant website concept for Amarant in Tashkent. It includes a cinematic loading screen with a safe timeout, scroll-linked 3D/parallax effects on the home page, and a separate searchable menu page at `/menu`.

## Included

- Three-language interface: Russian, English and Uzbek (Latin script).
- Branded loading screen with animated percentage, Russian / English / Uzbek copy, and a manual skip control. It automatically closes after 5.5 seconds if a remote asset is slow or blocked.
- Shimmer placeholders keep menu photo cards visually responsive while images are loading.
- Separate menu page with food/drinks tabs, category filters, search, responsive menu cards and prices in UZS.
- 98 menu entries with item names and prices transcribed from the two supplied menu PDFs; the local item photos are cropped from those menus where available.
- Responsive navigation, click-to-call booking, Google Maps and Instagram links.
- Hosting fallback files for Vercel and Netlify routing to `/menu`.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local Vite URL and use the **Menu** link or go directly to `/menu`.

## Production build

```bash
npm run build
npm run preview
```

## Before publishing

- Confirm current menu prices and availability with the restaurant, as these were transcribed from the supplied PDF menus.
- Confirm official opening hours and address.
- Replace or approve the home-page stock imagery and obtain permission to use official restaurant imagery.
- Confirm that the restaurant has approved the displayed Google review excerpt and rating.

## Deployment

The project uses Vite + React and can be deployed to Vercel or Netlify. For Vercel, use build command `npm run build` and output directory `dist`. Routing rewrites are included for `/menu`.

## Видео-фон блока «Наша философия»

Видео интерьера подключено локально и автоматически воспроизводится без звука в цикле на главной странице. Файл находится в `public/amarant-intro.mp4`, а `public/amarant-intro-poster.webp` используется как превью до начала воспроизведения. Чтобы заменить ролик, сохраните новый MP4 под тем же именем. Если браузер или устройство ограничивает автовоспроизведение, остаётся постер и цветной фон, а текст остаётся читаемым поверх затемнения.
