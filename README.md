# ЭкоАймақ — Геоэкологиялық аудандастыру (10 «Ә»)

Сайт: https://makpalkubantova-arch.github.io/geoecoaudandastyru/


10 «Ә» сынып, география, оқу мақсаты 10.3.2.3. Ашық сабаққа арналған сайт: тақта, мұғалім панелі, оқушы беті, парақшалар, қонақтардың кері байланысы.

## Жариялау

**GitHub Pages (ең оңайы):** Settings → Pages → Source: **GitHub Actions**. Әр `main`-ге жүктелген өзгерістен кейін сайт өзі жаңарады.

**Firebase Hosting:**
1. console.firebase.google.com → жаңа жоба, ID: `ekoaimaq` (басқа ID болса, `.firebaserc` пен workflow ішіндегі `projectId`-ді ауыстырыңыз).
2. Компьютерде: `npm i -g firebase-tools`, `firebase login`, `firebase init hosting:github` — бұл GitHub-қа `FIREBASE_SERVICE_ACCOUNT` құпиясын өзі қосады.
3. Осыдан кейін `main`-ге әр жүктеу сайтты `https://ekoaimaq.web.app` мекенжайында жаңартады.


Firebase қосылған соң: Settings → Secrets and variables → Actions → Variables → `FIREBASE_ON` = `1`.
