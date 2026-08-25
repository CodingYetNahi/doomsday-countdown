# doomsday-countdown
Doomsday countdown — React + TypeScript + Vite demo with cinematic animations and notification control (Avengers: Doomsday Release Countdown)

## Google AdSense setup

- Publisher ID: `ca-pub-9395184812907805`.
- The authorised-seller record is in `public/ads.txt` and is published as `/ads.txt` (for the custom domain: `https://doomsday.cfd/ads.txt`).
- The asynchronous verification script is declared once in `index.html`.
- The single manually placed responsive unit is implemented in `src/components/AdSenseUnit.tsx`.
- No advertisement is rendered while `ADSENSE_SLOT_ID` is empty or invalid. After creating a responsive display-ad unit in AdSense, insert its numerical slot ID in `src/config/ads.ts`.

AdSense approval and ad serving are controlled by Google. The site owner must not click their own advertisements or encourage anyone to click them. Before serving personalised advertisements internationally, configure the appropriate consent messages for applicable visitors in AdSense **Privacy & Messaging**. This project does not enable Auto Ads or implement its own consent system.
