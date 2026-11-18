/* ЭкоАймақ · 2-қабат: «Планетаға 4 тілек» ↔ «Сауыққан планета», геосфералар, тақтадағы өзара бағалау */
(function () {
  const SP = { su: ['гидросфера', 'Су'], aua: ['атмосфера', 'Ауа'], topyraq: ['литосфера', 'Топырақ'], biota: ['биосфера', 'Биота'] };
  window.SP = SP;
  const order = ['aua', 'su', 'topyraq', 'biota'];
  S.planet = S.planet || { wish: {}, on: {} };
  S.heal = S.heal || {};
  S.dock = false;

  /* ---------- планета SVG: v = {aua,su,topyraq,biota} → 0..1 (жандану) ---------- */
  function planet(v, size) {
    const k = id => Math.max(0, Math.min(1, +v[id] || 0));
    const mood = (k('aua') + k('su') + k('topyraq') + k('biota')) / 4;
    const my = 52 + 0, mc = 52 + (mood - .5) * 44; /* ауыз қисығы: мұңды → күлімдеген */
    const land = 'M-118-40C-96-92-40-108-6-86C20-70 4-40 30-30C60-18 80-52 104-30C124-8 110 30 84 44C56 60 40 30 16 46C-6 60-18 96-48 92C-84 86-70 50-92 36C-112 24-132-6-118-40Z';
    const land2 = 'M38 70C58 58 84 66 92 86C80 108 50 118 30 108C20 94 26 78 38 70Z';
    const trees = [[-92, -30], [-64, -60], [-30, -70], [-50, -24], [-80, 14], [-56, 60], [-30, 30], [60, -26], [92, 0], [70, 30], [50, 86], [76, 90]];
    const L = (id, grey, col) => `<g style="transition:opacity .9s"><g>${grey}</g><g style="opacity:${k(id)};transition:opacity .9s">${col}</g></g>`;
    return `<svg viewBox="-200 -200 400 400" style="width:${size || 100}%;height:auto;display:block;overflow:visible">
      <defs><radialGradient id="pOc" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#4FB3E6"/><stop offset="1" stop-color="#0B5FA5"/></radialGradient>
      <radialGradient id="pGr" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#A9B0B3"/><stop offset="1" stop-color="#6B7378"/></radialGradient>
      <clipPath id="pClip"><circle r="150"/></clipPath></defs>
      ${L('aua', '<circle r="176" fill="none" stroke="#9AA0A6" stroke-width="30" stroke-dasharray="6 10" opacity=".55"/><g fill="#8a8f94" opacity=".5"><circle cx="-150" cy="-110" r="18"/><circle cx="-130" cy="-122" r="14"/><circle cx="140" cy="-120" r="16"/></g>',
        '<circle r="176" fill="none" stroke="#B9A6FF" stroke-width="30" opacity=".55"/><circle r="176" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="2 14" opacity=".9"/>')}
      ${L('su', '<circle r="150" fill="url(#pGr)"/>', '<circle r="150" fill="url(#pOc)"/>')}
      <g clip-path="url(#pClip)">
      ${L('topyraq', `<path d="${land}" fill="#8C8174"/><path d="${land2}" fill="#8C8174"/><g stroke="#5f574e" stroke-width="3" fill="none"><path d="M-60-50l14 10-8 14 12 8"/><path d="M20 0l10 12-6 10"/></g>`,
        `<path d="${land}" fill="#D9A55B"/><path d="${land2}" fill="#D9A55B"/>`)}
      ${L('biota', trees.map(t => `<g transform="translate(${t[0]} ${t[1]})"><path d="M0 0v10" stroke="#5c5149" stroke-width="3"/><path d="M-5-2l5-10 5 10" fill="none" stroke="#6f655c" stroke-width="2.5"/></g>`).join(''),
        trees.map(t => `<g transform="translate(${t[0]} ${t[1]})"><path d="M0 2v10" stroke="#7a4a1d" stroke-width="3"/><circle r="11" fill="#1FA67A"/><circle cx="-4" cy="-4" r="4" fill="#5DD3A2"/></g>`).join(''))}
      </g>
      <g transform="translate(0 6)"><ellipse cx="-34" cy="18" rx="9" ry="${mood > .4 ? 11 : 6}" fill="#0E3B35"/><ellipse cx="34" cy="18" rx="9" ry="${mood > .4 ? 11 : 6}" fill="#0E3B35"/>
      <circle cx="-31" cy="14" r="3" fill="#fff"/><circle cx="37" cy="14" r="3" fill="#fff"/>
      ${mood > .6 ? '<ellipse cx="-58" cy="40" rx="12" ry="7" fill="#F28CA0" opacity=".7"/><ellipse cx="58" cy="40" rx="12" ry="7" fill="#F28CA0" opacity=".7"/>' : ''}
      <path d="M-28 ${my}Q0 ${mc} 28 ${my}" fill="none" stroke="#0E3B35" stroke-width="6" stroke-linecap="round"/>
      ${mood < .25 ? '<path d="M-48-4l18 6M48-4l-18 6" stroke="#0E3B35" stroke-width="4" stroke-linecap="round"/><path d="M-62 30q-6 14 0 18q6-4 0-18" fill="#4FB3E6"/>' : ''}</g>
    </svg>`;
  }
  window.planetSVG = planet;

  /* ---------- 1. Сабақ басы: «Планетаға 4 тілек» + топқа бөлу ---------- */
  function grInner() {
    const P = S.planet, by = g => S.students.filter(s => s.group === g), has = S.students.length > 0;
    const v = {}; order.forEach(id => v[id] = P.on[id] ? 1 : 0);
    const n = order.filter(id => P.on[id]).length;
    const card = id => { const g = grp(id); return `<div class="card" style="border-top:8px solid ${g.color};padding:12px 16px;display:flex;flex-direction:column;gap:6px;min-height:0">
      <div style="display:flex;align-items:center;gap:8px"><b style="font-size:26px">${g.icon} ${g.name}</b><span class="chip" style="font-size:15px">${SP[id][0]}</span></div>
      <div style="font-size:19px;line-height:1.3;flex:1;min-height:0;overflow:hidden">${by(id).map(s => esc(s.name)).join(' · ') || '<span style="color:var(--muted)">—</span>'}</div>
      <div style="display:flex;gap:8px;align-items:center"><input value="${esc(P.wish[id] || '')}" placeholder="Тілек: бір сөз…" onkeydown="if(event.key==='Enter')this.blur()" onchange="planetWish('${id}',this.value)" style="flex:1;font:inherit;font-size:20px;padding:8px 12px;border-radius:12px;border:2px solid ${g.color}55">
      <button class="btn" style="background:${P.on[id] ? g.color : '#fff'};color:${P.on[id] ? '#fff' : g.color};border:2px solid ${g.color};padding:8px 14px" onclick="planetTog('${id}')">${P.on[id] ? '✓' : '✨'}</button></div></div>`; };
    return `<div style="display:flex;align-items:center;gap:16px"><div class="mid" style="font-size:36px">🌍 Планета ауырып тұр — әр топ өз сферасына тілек айтады</div><div style="flex:1"></div>
      <button class="btn" onclick="balancedGroups();renderSlide()">🎲 Кездейсоқ, бірақ тең бөлу</button></div>
      ${has ? '' : '<div class="note" style="font-size:18px">Оқушылар тізімі бұл браузерде жоқ. Мұғалім панеліндегі «Оқушылар» бөлімінде енгізіңіз.</div>'}
      <div class="grow" style="display:grid;grid-template-columns:1fr 470px 1fr;gap:18px;min-height:0;align-items:stretch">
        <div style="display:grid;grid-template-rows:1fr 1fr;gap:14px;min-height:0">${card('aua')}${card('su')}</div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:0"><div style="width:100%;max-width:420px">${planet(v)}</div>
          <div style="font-size:22px;font-weight:900;text-align:center">${n === 4 ? '💚 Планета жанданды! Тілектеріміз орындала ма — сабақ соңында көреміз' : `Жанданған сфера: ${n} / 4`}</div></div>
        <div style="display:grid;grid-template-rows:1fr 1fr;gap:14px;min-height:0">${card('topyraq')}${card('biota')}</div></div>`;
  }
  window.planetWish = (id, t) => { S.planet.wish[id] = String(t || '').trim().slice(0, 40); if (S.planet.wish[id]) S.planet.on[id] = true; save(); redraw('grx', grInner); };
  window.planetTog = id => { S.planet.on[id] = !S.planet.on[id]; save(); redraw('grx', grInner); };
  function redraw(id, fn) { const el = document.getElementById(id); if (el) el.innerHTML = fn(); }
  SL.groups = function () { return `<div class="full" id="grx" style="display:flex;flex-direction:column;gap:14px">${grInner()}</div>`; };

  /* ---------- Мұғалімдер: «Планетаға сыйлық» ---------- */
  const GIFT = { tree: ['🌳', 'Ағаш', 'биосфера'], drop: ['💧', 'Мөлдір тамшы', 'гидросфера'], bird: ['🕊️', 'Таза ауа', 'атмосфера'], flower: ['🌸', 'Құнарлы жер', 'литосфера'] };
  window.GIFT = GIFT;
  const _rg = renderGuest;
  window.gGift = k => { GF.gift = k; renderGuest(true); };
  renderGuest = function (keep) {
    _rg(keep); const box = document.querySelector('#guest .gq');
    if (GF.sent) { const c = document.querySelector('#guest .panel h2'); if (c && GF.gift && GIFT[GF.gift]) c.insertAdjacentHTML('afterend', `<div style="font-size:60px">${GIFT[GF.gift][0]}</div><p style="font-size:17px;font-weight:700;color:#1FA67A">Сыйлығыңыз тақтадағы планетаның айналасында пайда болды!</p>`); return; }
    if (!box) return;
    box.insertAdjacentHTML('beforebegin', `<div class="card gq" style="background:linear-gradient(135deg,#E9F7F1,#EAF4FF)"><label style="font-size:19px">🌍 Планетаға сыйлық қалдырыңыз</label>
      <p style="color:var(--muted);font-size:15px;margin:4px 0 10px">Сабақ ұнаса — сыйлығыңыз тақтадағы планетаны жасартып, атыңызбен көрінеді.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${Object.keys(GIFT).map(k => `<button onclick="gGift('${k}')" style="display:flex;align-items:center;gap:10px;font:inherit;font-weight:800;font-size:17px;padding:12px;border-radius:14px;cursor:pointer;text-align:left;border:3px solid ${GF.gift === k ? '#1FA67A' : '#d6e4df'};background:${GF.gift === k ? '#D3F3E5' : '#fff'};color:#0E3B35"><span style="font-size:34px">${GIFT[k][0]}</span><span>${GIFT[k][1]}<small style="display:block;font-weight:600;color:var(--muted)">${GIFT[k][2]}</small></span></button>`).join('')}</div></div>`);
  };
  function guestGifts() { return allGuests().filter(g => g.gift && GIFT[g.gift]); }
  function orbit(list) {
    return list.slice(0, 18).map((g, i, A) => { const a = (-90 + i * 360 / Math.max(A.length, 8)) * Math.PI / 180, x = 50 + 52 * Math.cos(a), y = 50 + 52 * Math.sin(a);
      return `<div class="gorb" style="left:${x}%;top:${y}%;animation-delay:${i * .15}s"><span>${GIFT[g.gift][0]}</span><small>${esc((g.who || 'Мұғалім').split(' ')[0])}</small></div>`; }).join('');
  }

  /* ---------- 2. Сабақ соңы: «Сауыққан планета» + бағдаршам ---------- */
  const LT = { g: ['#22c55e', '🟢', 'Түсіндім, басқаға түсіндіре аламын'], y: ['#eab308', '🟡', 'Түсіндім, сұрағым бар'], r: ['#f43f5e', '🔴', 'Көмек керек'] };
  function fbInner() {
    const R = roster(), H = S.heal, cnt = { g: 0, y: 0, r: 0 };
    R.forEach(r => { if (H[r.key]) cnt[H[r.key]]++; }); if (!R.length) Object.assign(cnt, S.healN || {});
    const n = cnt.g + cnt.y + cnt.r, base = Math.max(R.length, n, 1);
    const self = n ? (cnt.g + cnt.y * .55 + cnt.r * .15) / base : 0;
    const act = R.length ? R.reduce((a, r) => a + indOf(r).tot, 0) / (R.length * MAXT) : GROUPS.reduce((a, g) => a + grpPart(g.id), 0) / (GROUPS.length * 10);
    const GG = guestGifts(), gb = Math.min(.1, GG.length * .02), GA = allGuests();
    const rs = GA.flatMap(g => Object.values(g.r || {}).map(Number)).filter(x => x > 0), avg = rs.length ? (rs.reduce((a, b) => a + b, 0) / rs.length).toFixed(1) : '';
    const h = Math.min(1, (n ? self * .5 : 0) + act * .5 + gb + (n && act > .75 ? .05 : 0)), hp = Math.round(h * 100), win = hp >= 80;
    const v = {}; order.forEach(id => v[id] = Math.max(h, 0.04));
    const W = S.planet.wish || {};
    const wl = order.filter(id => W[id]).map(id => { const g = grp(id); return `<span style="background:${g.color};color:#fff;border-radius:999px;padding:4px 12px;font-weight:800;font-size:17px">${g.icon} ${esc(W[id])}</span>`; }).join(' ');
    const names = R.length ? `<div style="display:grid;grid-template-columns:repeat(${R.length > 18 ? 3 : 2},1fr);gap:6px 10px;align-content:start;overflow:auto;min-height:0">${R.map(r => { const g = grp(r.g), c = H[r.key]; return `<button onclick="healTap('${esc(r.key)}')" style="display:flex;align-items:center;gap:8px;font:inherit;font-size:19px;font-weight:700;padding:7px 10px;border-radius:12px;cursor:pointer;text-align:left;border:2px solid ${c ? LT[c][0] : '#dfe7e4'};background:${c ? LT[c][0] + '22' : '#fff'};color:#0E3B35"><span style="width:10px;height:10px;border-radius:50%;flex:none;background:${g ? g.color : '#ccc'}"></span><span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.name)}</span><span>${c ? LT[c][1] : '🍂'}</span></button>`; }).join('')}</div>`
      : `<div style="display:flex;gap:12px;flex-wrap:wrap">${Object.keys(LT).map(k => `<button class="btn" style="background:${LT[k][0]};font-size:24px" onclick="healCnt('${k}')">${LT[k][1]} +1 · ${S.healN && S.healN[k] || 0}</button>`).join('')}</div>`;
    return `<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><div class="mid" style="font-size:36px">🌍 Сабақ басындағы планета сауықты ма?</div>${wl ? `<span style="font-size:17px;color:var(--muted);font-weight:700">Сабақ басындағы тілектер:</span>${wl}` : ''}</div>
      <div class="grow" style="display:grid;grid-template-columns:440px 1fr;gap:20px;min-height:0">
        <div class="card" style="padding:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px"><div class="pwrap${win ? ' win' : ''}" style="width:100%;max-width:360px;position:relative">${win ? '<div class="prain"></div>' : ''}${planet(v)}${orbit(GG)}${win ? '<i class="psp" style="left:6%;top:12%">✨</i><i class="psp" style="right:4%;top:6%;animation-delay:.4s">✨</i><i class="psp" style="right:10%;bottom:12%;animation-delay:.8s">🕊️</i><i class="psp" style="left:2%;bottom:20%;animation-delay:1.2s">🌸</i><i class="psp" style="left:44%;top:-6%;animation-delay:.6s">☀️</i>' : ''}</div>
          <div style="font-size:30px;font-weight:900;color:${hp >= 70 ? '#1FA67A' : hp >= 40 ? '#E8A317' : '#E2475F'}">${win ? '🎉 ' : ''}Планета ${hp}% сауықты</div>
          <div style="font-size:16px;font-weight:700;color:var(--muted);text-align:center">Сабақтағы ұпай: ${Math.round(act * 100)}% · Өзін-өзі бағалау: ${Math.round(self * 100)}%${GG.length ? ` · 👩‍🏫 Мұғалімдер сыйлығы: +${Math.round(gb * 100)}%` : ''}</div>
          <div style="display:flex;gap:12px;font-size:20px;font-weight:800">${Object.keys(LT).map(k => `<span>${LT[k][1]} ${cnt[k]}</span>`).join('')}</div></div>
        <div class="card" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;min-height:0">
          <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:17px;font-weight:700;color:var(--muted)">${Object.keys(LT).map(k => `<span>${LT[k][1]} ${LT[k][2]}</span>`).join('')}<span>· атыңды бір рет бас → 🟢, тағы → 🟡, тағы → 🔴</span></div>
          ${names}
          <div style="display:flex;gap:14px;align-items:center;margin-top:auto"><div class="card" style="flex:1;padding:12px 16px;font-size:20px;background:#E9F7F1;box-shadow:none">💬 2–3 оқушы: <b>«Таңертеңгі тілегіміз орындалуы үшін мен … істеймін»</b></div>
          </div>
          <div style="display:flex;gap:12px;align-items:stretch;min-height:0"><div style="flex:none;transform:scale(.85);transform-origin:left top;margin-bottom:-24px">${qrBlockFor(guestURL(), '👩‍🏫 Мұғалімдер', 'Планетаға сыйлық + пікір')}</div>
          <div style="flex:1;min-width:0;background:#FFF6DD;border-radius:16px;padding:10px 14px;display:flex;flex-direction:column;gap:6px;overflow:hidden">
            <div style="display:flex;gap:10px;align-items:center;font-weight:900;font-size:19px">👩‍🏫 Мұғалімдер бағы <span style="font-size:24px">${GG.slice(0, 12).map(g => GIFT[g.gift][0]).join('') || '🌱'}</span><span style="flex:1"></span>${avg ? `<span style="color:#B7791F">★ ${avg} / 5</span>` : ''}<span style="color:var(--muted);font-size:16px">${GA.length} пікір</span></div>
            ${GA.filter(g => g.s1 || g.w).slice(-2).reverse().map(g => `<div style="font-size:16px;line-height:1.3"><b>${g.gift && GIFT[g.gift] ? GIFT[g.gift][0] : '👩‍🏫'} ${esc(g.who || 'Мұғалім')}:</b> ${esc(g.s1 || g.w).slice(0, 110)}</div>`).join('') || '<div style="font-size:16px;color:var(--muted)">QR арқылы: планетаға сыйлық таңдап, сабақты бағалаңыз — сыйлығыңыз планетаның айналасында шығады.</div>'}</div></div></div></div>`;
  }
  window.healTap = k => { const nx = { undefined: 'g', g: 'y', y: 'r', r: undefined }; const c = nx[S.heal[k]]; if (c) S.heal[k] = c; else delete S.heal[k]; save(); redraw('fbx', fbInner); };
  window.healCnt = k => { S.healN = S.healN || {}; S.healN[k] = (S.healN[k] || 0) + 1; save(); redraw('fbx', fbInner); };
  SL.fb = function () { return `<div class="full" id="fbx" style="display:flex;flex-direction:column;gap:12px">${fbInner()}</div>`; };

  /* ---------- 3. Бекіту: экопаспорт — әр топ өз сферасы бойынша ---------- */
  const PASS = {
    aua: ['Көмір шахталарынан метан мен шаң, жеке үйлердің көмір пешті жылытуы, көлік', 'Ауаны жасыл белдеу, газға көшу, ауа сапасын өлшеу (IQAir)'],
    su: ['Шахта суларын ағызу, жерасты суларының деңгейі мен сапасының өзгеруі', 'Шахта суын тазарту, су үнемдеу, суды зертханада тексеру'],
    topyraq: ['Жыныс үйінділері (террикондар), шахта қуыстарынан жер бетінің шөгуі', 'Террикондарды рекультивациялау, қоқысты сұрыптау'],
    biota: ['Өсімдік жамылғысының бұзылуы, жасыл аймақтың аздығы, шаңның әсері', 'Ағаш отырғызу акциясы, мектеп ауласын көгалдандыру']
  };
  SL.fix = function () { return `<div class="main" style="display:flex;flex-direction:column;gap:12px"><div class="mid" style="font-size:36px">Абай қаласының экопаспорты: 4 сфера — 4 топ</div>
    <div class="grow rows" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${order.map(id => { const g = grp(id); return `<div class="card" style="padding:12px 18px;border-left:8px solid ${g.color};display:flex;flex-direction:column;gap:4px;justify-content:center">
      <div style="font-size:26px;font-weight:900">${g.icon} ${g.name} тобы · ${SP[id][0]}</div>
      <div style="font-size:19px;line-height:1.35"><b>Фактор:</b> <span style="color:var(--muted)">${PASS[id][0]}</span></div>
      <div style="font-size:19px;line-height:1.35"><b>Дәлел → деңгей (7-кесте) → 2 шешім:</b> <span style="color:var(--muted)">${PASS[id][1]}…</span></div></div>`; }).join('')}</div>
    <div class="card" style="padding:12px 18px;font-size:19px;line-height:1.4"><b>Әр топ толтырады:</b> 2 антропогендік фактор · дәлел (қайтымды ма?) · ықтимал деңгей · 2 нақты шешім · ЖИ-ге 1 сұрақ. <b>Қорытынды:</b> 4 сфераны қосып, Абай қаласының жалпы деңгейін бірге анықтаймыз. <span style="color:var(--muted)">Рөлдер: 🎤 спикер · ✍️ хатшы · 🔬 сарапшы · ⏱ уақыт сақшысы</span></div></div>${sidePanel(STAGES.find(x => x.id === 'fix'))}`; };

  /* ---------- 4. Кейс және фото: сфера белгілері ---------- */
  const _k2 = SL.k2; SL.k2 = function () { let h = _k2(); GROUPS.forEach(g => { h = h.replace(`${g.icon} ${g.name} тобы</span>`, `${g.icon} ${g.name} тобы · ${SP[g.id][0]}</span>`); }); return h; };

  /* ---------- 5. Тақтадағы бағалау: әр тапсырма бетінде, өзара тексеру ---------- */
  const GT = ['t0', 't2', 't4'], IT = ['t1', 't3'];
  const nextG = i => GROUPS[(i + 1) % GROUPS.length];
  function tSum(t) { return GROUPS.reduce((a, g) => a + sc(t, g.id).reduce((x, y) => x + y, 0), 0); }
  function indVal(r, t) { const o = (S.ind || {})[r.key] || {}; if (o[t] != null && o[t] !== '') return { v: +o[t], auto: false }; const a = t === 't1' ? autoT1(r.live) : autoT3(r.live); return a == null ? { v: null } : { v: a, auto: true }; }
  function dockBody(t) {
    const T = TASKS[t], mx = maxOf(t);
    if (GT.includes(t)) return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;flex:1;min-height:0">${GROUPS.map((g, gi) => { const v = sc(t, g.id), sm = v.reduce((a, b) => a + b, 0);
      return `<div style="border:3px solid ${g.color};border-radius:18px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;min-height:0;background:#fff">
        <div style="display:flex;align-items:center;gap:8px"><b style="font-size:24px">${g.icon} ${g.name}</b><span style="flex:1"></span><b style="font-size:30px;color:${g.color}">${sm}<small style="font-size:18px;color:var(--muted)">/${mx}</small></b></div>
        <div style="font-size:15px;color:var(--muted);font-weight:700">🔍 тексереді: ${GROUPS[(gi + GROUPS.length - 1) % GROUPS.length].icon} ${GROUPS[(gi + GROUPS.length - 1) % GROUPS.length].name} тобы</div>
        ${T.d.map((d, k) => `<div style="display:flex;flex-direction:column;gap:4px"><span style="font-size:16px;line-height:1.25">${esc(d[0])}</span><div style="display:flex;gap:6px">${Array.from({ length: d[1] + 1 }, (_, p) => `<button onclick="dkSet('${t}','${g.id}',${k},${p})" style="flex:1;font:inherit;font-size:20px;font-weight:900;padding:6px 0;border-radius:10px;cursor:pointer;border:2px solid ${g.color};background:${v[k] === p ? g.color : '#fff'};color:${v[k] === p ? '#fff' : g.color}">${p}</button>`).join('')}</div></div>`).join('')}</div>`; }).join('')}</div>`;
    const R = roster();
    if (!R.length) return `<div style="font-size:22px;color:var(--muted);padding:20px">Оқушылар тізімі бұл браузерде жоқ — мұғалім панелінде енгізіңіз. Топ ұпайы: «★ Ұпай қою».</div>`;
    return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;flex:1;min-height:0">${GROUPS.map(g => { const rs = R.filter(r => r.g === g.id); return `<div style="border:3px solid ${g.color};border-radius:18px;padding:8px 10px;display:flex;flex-direction:column;gap:5px;min-height:0;overflow:auto;background:#fff">
      <b style="font-size:20px">${g.icon} ${g.name}</b>${rs.map(r => { const iv = indVal(r, t); return `<div style="display:flex;align-items:center;gap:6px"><span style="flex:1;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.name)}</span>${Array.from({ length: mx + 1 }, (_, p) => `<button onclick="dkInd('${esc(r.key)}','${t}',${p})" style="width:36px;font:inherit;font-size:17px;font-weight:900;padding:3px 0;border-radius:8px;cursor:pointer;border:2px ${iv.auto && iv.v === p ? 'dashed' : 'solid'} ${g.color};background:${!iv.auto && iv.v === p ? g.color : '#fff'};color:${!iv.auto && iv.v === p ? '#fff' : g.color}">${p}</button>`).join('')}</div>`; }).join('') || '<span style="color:var(--muted)">—</span>'}</div>`; }).join('')}</div>`;
  }
  function dockHTML(t) {
    const T = TASKS[t], isG = GT.includes(t), mx = maxOf(t);
    const rule = isG ? `🔄 Өзара тексеру: ${GROUPS.map(g => g.icon + ' ' + g.name).join(' → ')} → ${GROUPS[0].icon}. Әр топ көршісінің жұмысын критериймен тексеріп, ұпайын дауыстап айтады — тақтада басамыз.`
      : t === 't1' ? '🔄 Парақша №2-ні көршіңмен алмастыр, жауапты глобуспен тексеріп, ұпайын айт (0–3). Үзік сызықты — телефоннан автоматты түскен ұпай.'
        : '🔄 Жұптар парақша №4-ті алмастырып, 3 қатені тексереді, ұпайын айтады (0–3). Үзік сызықты — телефоннан автоматты түскен ұпай.';
    const mini = isG ? GROUPS.map(g => `<span style="background:${g.color};color:#fff;border-radius:999px;padding:4px 12px;font-weight:900">${g.icon} ${sc(t, g.id).reduce((a, b) => a + b, 0)}</span>`).join('')
      : (() => { const R = roster(); const d = R.filter(r => indVal(r, t).v != null).length; return `<span style="background:#0E3B35;color:#fff;border-radius:999px;padding:4px 12px;font-weight:900">✔ ${d} / ${R.length} оқушы</span>`; })();
    return `<div class="sdbar" onclick="dkTog()"><b style="font-size:22px">⭐ Бағалау</b><span style="font-size:18px;font-weight:700;color:var(--muted)">${esc(T.name)} · ${mx} ұпай · ${isG ? 'топтар бір-бірін тексереді' : 'оқушылар бір-бірін тексереді'}</span><span style="flex:1"></span>${mini}<span class="btn" style="padding:8px 18px">${S.dock ? 'Жабу ▼' : 'Ашу ▲'}</span></div>
      ${S.dock ? `<div class="sdpanel"><div style="font-size:18px;font-weight:700;background:#FFF6DD;border-radius:12px;padding:8px 14px">${rule} <span style="color:#1FA67A">Ұпай рейтингке өзі қосылады (${MAXT} ұпай → 10 балл).</span></div>${dockBody(t)}</div>` : ''}`;
  }
  function drawDock() { const d = document.getElementById('sdock'); const st = STAGES[S.stage]; if (d && st && st.task) d.innerHTML = dockHTML(st.task); }
  window.dkTog = () => { S.dock = !S.dock; save(); drawDock(); };
  window.dkSet = (t, g, k, p) => { S.scores[t] = S.scores[t] || {}; const v = sc(t, g).slice(); v[k] = p; S.scores[t][g] = v; save(); drawDock(); };
  window.dkInd = (key, t, p) => { const o = (S.ind || {})[key] || {}; setInd(key, t, (o[t] != null && +o[t] === p) ? '' : p); drawDock(); };

  const css = document.createElement('style');
  css.textContent = `#sdock{position:absolute;left:48px;right:48px;bottom:130px;z-index:30;display:flex;flex-direction:column-reverse;gap:10px;pointer-events:none}
  #sdock>*{pointer-events:auto}
  .sdbar{height:66px;display:flex;align-items:center;gap:14px;padding:0 14px 0 22px;background:#fff;border-radius:18px;box-shadow:0 14px 30px -14px rgba(14,59,53,.55),inset 0 0 0 3px #E8A317;cursor:pointer}
  .sdpanel{height:560px;background:rgba(255,255,255,.98);border-radius:22px;padding:14px;display:flex;flex-direction:column;gap:10px;box-shadow:0 30px 60px -20px rgba(14,59,53,.6),inset 0 0 0 3px #E8A31755}
  #stage[data-tk="1"] .who{display:none}
  .pwrap svg{transition:filter 1s}.pwrap.win svg{filter:drop-shadow(0 0 26px #5DD3A2) drop-shadow(0 0 8px #FFE27A);animation:pglow 2.4s ease-in-out infinite}
  @keyframes pglow{50%{transform:scale(1.04)}}
  .prain{position:absolute;left:-6%;right:-6%;top:-10%;height:62%;border-radius:50% 50% 0 0;border:14px solid transparent;border-top-color:#F87171;box-shadow:inset 0 14px 0 -0px #FBBF24,inset 0 28px 0 0 #34D399,inset 0 42px 0 0 #60A5FA;opacity:.55;clip-path:inset(0 0 40% 0);pointer-events:none}
  .gorb{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;animation:gpop .6s cubic-bezier(.2,1.6,.4,1) both;z-index:2}.gorb span{font-size:30px;filter:drop-shadow(0 3px 4px rgba(0,0,0,.2))}.gorb small{font-size:12px;font-weight:800;background:#fff;border-radius:999px;padding:0 6px;color:#0E3B35;white-space:nowrap}
  @keyframes gpop{from{opacity:0;transform:translate(-50%,-50%) scale(.2)}}
  .wplan svg{animation:wspin 6s ease-in-out infinite}@keyframes wspin{50%{transform:translateY(-14px) rotate(4deg)}}
  .psp{position:absolute;font-style:normal;font-size:34px;animation:psp 2s ease-in-out infinite}
  @keyframes psp{50%{transform:translateY(-12px) scale(1.2);opacity:.6}}`;
  document.head.appendChild(css);

  /* ---------- 0. Алғашқы экран: «Сабағыма қош келдіңіздер!» ---------- */
  if (!STAGES.find(x => x.id === 'welcome')) STAGES.unshift({ id: 'welcome', title: 'Сабағыма қош келдіңіздер!', min: 0, kind: 'Сабақ басы · Қарсы алу', method: 'Қарсы алу экраны', mdesc: 'Сабақ басталғанға дейін тақтада тұрады: тақырып, оқу мақсаты, сабақ мақсаты.' });
  MASC_LINES.welcome = ['wave', 'Құрметті әріптестер, сабағымызға қош келдіңіздер!'];
  SL.welcome = function () { const st = S.settings || {}, hv = { aua: 1, su: 1, topyraq: 1, biota: 1 };
    return `<div class="full wlc" style="display:grid;grid-template-columns:1fr 520px;gap:34px;top:110px;bottom:130px">
      <div style="display:flex;flex-direction:column;gap:18px;min-height:0;justify-content:center">
        <div style="font-size:30px;font-weight:800;color:#1FA67A">Құрметті әріптестер!</div>
        <div style="font-size:84px;font-weight:900;line-height:1;color:#0E3B35">Сабағыма<br><span class="grad">қош келдіңіздер!</span></div>
        <div class="card" style="padding:18px 24px;border-left:10px solid #1C8FCB"><div style="font-size:18px;font-weight:800;color:var(--muted)">ТАҚЫРЫП</div><div style="font-size:40px;font-weight:900;line-height:1.1">${esc(LESSON.topic)}</div></div>
        <div class="card" style="padding:16px 24px;border-left:10px solid #E8A317"><div style="font-size:18px;font-weight:800;color:var(--muted)">ОҚУ МАҚСАТЫ</div><div style="font-size:23px;font-weight:700;line-height:1.35">${esc(LESSON.goalCode)}</div></div>
        <div class="card" style="padding:16px 24px;border-left:10px solid #1FA67A"><div style="font-size:18px;font-weight:800;color:var(--muted)">САБАҚ МАҚСАТЫ</div>${LESSON.aims.map(a => { const p = a.split(':'); return `<div style="font-size:20px;line-height:1.35;margin-top:4px"><b>${esc(p[0])}:</b>${esc(p.slice(1).join(':'))}</div>`; }).join('')}</div>
        <div style="font-size:21px;font-weight:700;color:var(--muted)">${esc(LESSON.subject)} · ${esc(LESSON.grade)} · Мұғалім: ${esc(LESSON.teacher)}${st.school ? ' · ' + esc(st.school) : ''}</div></div>
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;min-height:0"><div class="wplan" style="width:100%;max-width:470px">${planet(hv)}</div>
        <div style="font-size:24px;font-weight:800;text-align:center;color:#0E3B35">🌍 Жер — біздің ортақ үйіміз</div></div></div>`; };

  /* ---------- 6. renderSlide орамы ---------- */
  const _r = renderSlide;
  renderSlide = function () {
    if (window._lastStg !== S.stage) { S.dock = false; window._lastStg = S.stage; }
    _r(); const st = STAGES[S.stage], stg = document.getElementById('stage'), sl = document.querySelector('#slideHost .slide');
    if (!sl) return; stg.dataset.tk = st.task ? '1' : '';
    if (st.task) { sl.insertAdjacentHTML('beforeend', '<div id="sdock"></div>'); drawDock(); }
  };
  window.addEventListener('focus', () => { if (location.hash === '#board') drawDock(); });
  let _gn = -1; setInterval(() => { if (location.hash !== '#board') return; if (!S.dock) drawDock(); if (STAGES[S.stage] && STAGES[S.stage].id === 'fb') { const n = allGuests().length; if (n !== _gn) { _gn = n; redraw('fbx', fbInner); } } }, 4000);
  if (location.hash === '#board') renderSlide();
})();
