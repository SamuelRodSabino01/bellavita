/**
 * Bella Vita — agendamento.js
 * Multi-Step Stepper: Procedimento → Data/Hora → Dados → Confirmação → WhatsApp
 */

'use strict';

/* ══════════════════════════════════════════
   ESTADO GLOBAL DO AGENDAMENTO
══════════════════════════════════════════ */
const state = {
  step: 1,
  procedimento: null,
  categoria: null,
  duracao: null,
  icone: null,
  data: null,     // objeto Date
  dataFormatada: null,
  horario: null,
  nome: null,
  whatsapp: null,
  queixa: null,
};

/* ══════════════════════════════════════════
   NÚMERO DO WHATSAPP DA CLÍNICA
   ⚠️  Substitua pelo número real com DDI
══════════════════════════════════════════ */
const WHATSAPP_CLINICA = '5511999999999';

/* ══════════════════════════════════════════
   HORÁRIOS DISPONÍVEIS (simulação)
══════════════════════════════════════════ */
const HORARIOS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
// Horários bloqueados (simulação de agenda)
const HORARIOS_BLOQUEADOS = ['09:00', '13:00'];

/* ══════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ══════════════════════════════════════════
   STEPPER — Navegação entre etapas
══════════════════════════════════════════ */
function goToStep(newStep) {
  const current = document.getElementById(`step-${state.step}`);
  const next    = document.getElementById(`step-${newStep}`);
  if (!current || !next) return;

  // Hide current
  current.classList.remove('is-active');
  current.setAttribute('aria-hidden', 'true');

  // Show next
  next.classList.add('is-active');
  next.setAttribute('aria-hidden', 'false');

  // Update stepper indicators
  updateStepperUI(newStep);

  state.step = newStep;

  // Scroll to top of stepper
  const stepperEl = document.getElementById('stepper-progress');
  if (stepperEl) {
    const top = stepperEl.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }
}

function updateStepperUI(activeStep) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`step-indicator-${i}`);
    if (!el) continue;

    el.classList.remove('is-active', 'is-complete');
    el.removeAttribute('aria-current');

    if (i < activeStep) {
      el.classList.add('is-complete');
      const dot = el.querySelector('.stepper-dot');
      if (dot) dot.textContent = '✓';
    } else if (i === activeStep) {
      el.classList.add('is-active');
      el.setAttribute('aria-current', 'step');
      // Restore number
      const dot = el.querySelector('.stepper-dot');
      if (dot) dot.textContent = i === 4 ? '✦' : i;
    } else {
      const dot = el.querySelector('.stepper-dot');
      if (dot) dot.textContent = i === 4 ? '✦' : i;
    }
  }
}

/* ══════════════════════════════════════════
   ETAPA 1 — Seleção de Procedimento
══════════════════════════════════════════ */
(function initStep1() {
  const cards   = document.querySelectorAll('.proc-select-card');
  const nextBtn = document.getElementById('step1-next');

  function selectCard(card) {
    // Deselect all
    cards.forEach((c) => {
      c.classList.remove('is-selected');
      c.setAttribute('aria-checked', 'false');
    });

    // Select this
    card.classList.add('is-selected');
    card.setAttribute('aria-checked', 'true');

    // Save state
    state.procedimento = card.dataset.proc;
    state.categoria    = card.dataset.category;
    state.duracao      = card.dataset.duration;
    state.icone        = card.dataset.icon;

    // Enable next
    nextBtn.disabled = false;
    nextBtn.setAttribute('aria-disabled', 'false');
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => selectCard(card));

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCard(card);
      }
    });
  });

  nextBtn?.addEventListener('click', () => {
    if (!state.procedimento) return;
    buildDateStrip();
    buildTimeGrid();
    goToStep(2);
  });
})();

/* ══════════════════════════════════════════
   ETAPA 2 — Data e Horário
══════════════════════════════════════════ */
function buildDateStrip() {
  const strip = document.getElementById('date-picker-strip');
  if (!strip) return;
  strip.innerHTML = '';

  const today = new Date();
  const days  = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  // Gera 14 dias a partir de amanhã (exclui domingos)
  const dates = [];
  let d = new Date(today);
  d.setDate(d.getDate() + 1);

  while (dates.length < 12) {
    if (d.getDay() !== 0) { // Sem domingos
      dates.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }

  dates.forEach((date) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'date-day-btn';
    btn.setAttribute('aria-label', `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`);
    btn.dataset.date = date.toISOString();

    btn.innerHTML = `
      <span class="date-day-name">${days[date.getDay()]}</span>
      <span class="date-day-num">${date.getDate()}</span>
      <span class="date-day-month">${months[date.getMonth()]}</span>
    `;

    btn.addEventListener('click', () => selectDate(btn, date));
    strip.appendChild(btn);
  });
}

function selectDate(btn, date) {
  document.querySelectorAll('.date-day-btn').forEach((b) => b.classList.remove('is-selected'));
  btn.classList.add('is-selected');
  state.data = date;

  const days   = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  state.dataFormatada = `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;

  // Reset horário selection
  state.horario = null;
  document.querySelectorAll('.time-btn').forEach((t) => t.classList.remove('is-selected'));
  updateStep2Next();
}

function buildTimeGrid() {
  const grid = document.getElementById('time-grid');
  if (!grid) return;
  grid.innerHTML = '';

  HORARIOS.forEach((h) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'time-btn';
    btn.textContent = h;

    const bloqueado = HORARIOS_BLOQUEADOS.includes(h);
    if (bloqueado) {
      btn.classList.add('is-unavailable');
      btn.disabled = true;
      btn.setAttribute('aria-label', `${h} — Indisponível`);
    } else {
      btn.setAttribute('aria-label', `Selecionar horário ${h}`);
      btn.addEventListener('click', () => selectTime(btn, h));
    }

    grid.appendChild(btn);
  });
}

function selectTime(btn, horario) {
  document.querySelectorAll('.time-btn:not(.is-unavailable)').forEach((b) => b.classList.remove('is-selected'));
  btn.classList.add('is-selected');
  state.horario = horario;
  updateStep2Next();
}

function updateStep2Next() {
  const nextBtn = document.getElementById('step2-next');
  if (!nextBtn) return;
  const canProceed = state.data && state.horario;
  nextBtn.disabled = !canProceed;
  nextBtn.setAttribute('aria-disabled', canProceed ? 'false' : 'true');
}

(function initStep2() {
  document.getElementById('step2-back')?.addEventListener('click', () => goToStep(1));

  document.getElementById('step2-next')?.addEventListener('click', () => {
    if (!state.data || !state.horario) return;
    goToStep(3);
  });
})();

/* ══════════════════════════════════════════
   MÁSCARA — WhatsApp
══════════════════════════════════════════ */
function maskPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return value;
}

/* ══════════════════════════════════════════
   ETAPA 3 — Dados da Paciente
══════════════════════════════════════════ */
(function initStep3() {
  const inputNome = document.getElementById('input-nome');
  const inputWa   = document.getElementById('input-whatsapp');

  // Máscara automática
  inputWa?.addEventListener('input', (e) => {
    const raw = e.target.value;
    e.target.value = maskPhone(raw);
  });

  document.getElementById('step3-back')?.addEventListener('click', () => goToStep(2));

  document.getElementById('step3-next')?.addEventListener('click', () => {
    if (!validateStep3()) return;
    populateTicket();
    goToStep(4);
  });

  function validateStep3() {
    let valid = true;

    // Nome
    const nome = inputNome?.value.trim() ?? '';
    const errNome = document.getElementById('error-nome');
    if (nome.length < 3) {
      inputNome?.classList.add('has-error');
      if (errNome) errNome.textContent = 'Por favor, insira seu nome completo.';
      valid = false;
    } else {
      inputNome?.classList.remove('has-error');
      if (errNome) errNome.textContent = '';
    }

    // WhatsApp — mínimo 14 chars formatado = (00) 00000-0000
    const wa = inputWa?.value.trim() ?? '';
    const errWa = document.getElementById('error-whatsapp');
    const digitsOnly = wa.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      inputWa?.classList.add('has-error');
      if (errWa) errWa.textContent = 'Informe um WhatsApp válido com DDD.';
      valid = false;
    } else {
      inputWa?.classList.remove('has-error');
      if (errWa) errWa.textContent = '';
    }

    if (valid) {
      state.nome     = nome;
      state.whatsapp = wa;
      state.queixa   = document.getElementById('input-queixa')?.value.trim() || null;
    }

    return valid;
  }
})();

/* ══════════════════════════════════════════
   ETAPA 4 — Ticket de Confirmação
══════════════════════════════════════════ */
function populateTicket() {
  setText('ticket-proc',     `${state.icone} ${state.procedimento}`);
  setText('ticket-category', state.categoria);
  setText('ticket-duration', state.duracao);
  setText('ticket-date',     state.dataFormatada);
  setText('ticket-time',     state.horario);
  setText('ticket-name',     state.nome);

  const queixaRow = document.getElementById('ticket-queixa-row');
  if (state.queixa && queixaRow) {
    queixaRow.style.display = 'flex';
    setText('ticket-queixa', state.queixa);
  } else if (queixaRow) {
    queixaRow.style.display = 'none';
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? '—';
}

(function initStep4() {
  document.getElementById('step4-back')?.addEventListener('click', () => goToStep(3));

  document.getElementById('btn-confirmar')?.addEventListener('click', () => {
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_CLINICA}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();

/* ══════════════════════════════════════════
   MENSAGEM FORMATADA PARA O WHATSAPP
══════════════════════════════════════════ */
function buildWhatsAppMessage() {
  const linhas = [
    `🌸 *Solicitação de Agendamento — Bella Vita*`,
    ``,
    `✦ *Procedimento:* ${state.procedimento}`,
    `📋 *Categoria:* ${state.categoria}`,
    `⏱ *Duração estimada:* ${state.duracao}`,
    ``,
    `📅 *Data desejada:* ${state.dataFormatada}`,
    `🕐 *Horário desejado:* ${state.horario}`,
    ``,
    `👤 *Nome:* ${state.nome}`,
    `📱 *WhatsApp:* ${state.whatsapp}`,
  ];

  if (state.queixa) {
    linhas.push(``, `💬 *Observações:* ${state.queixa}`);
  }

  linhas.push(``, `_Agendamento realizado pelo site bellavita.com.br_`);

  return linhas.join('\n');
}
