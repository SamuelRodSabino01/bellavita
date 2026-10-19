/**
 * CLÍNICA BELLA VITA — MAIN CLIENT CONTROLLER
 * High-Craft UI & Interaction Engineering
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initScrollReveal();
  initProcedureFilter();
  initSkeletonLoaders();
  initBookingModal();
});

/* ══════════════════════════════════════════
   1. HEADER SCROLL & BACKDROP BLUR
══════════════════════════════════════════ */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

/* ══════════════════════════════════════════
   2. MOBILE DRAWER NAVIGATION
══════════════════════════════════════════ */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-overlay');
  const links = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* ══════════════════════════════════════════
   3. SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   4. PROCEDURE FILTER TABS
══════════════════════════════════════════ */
function initProcedureFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.proc-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filter = tab.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('is-hidden');
          // Aciona pequena animação de entrada
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* ══════════════════════════════════════════
   5. SKELETON LOADERS
══════════════════════════════════════════ */
function initSkeletonLoaders() {
  const wrappers = document.querySelectorAll('.image-wrapper');

  wrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img');
    if (!img) return;

    if (img.complete) {
      wrapper.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        wrapper.classList.add('loaded');
      });
      img.addEventListener('error', () => {
        wrapper.classList.add('loaded');
      });
    }
  });
}

/* ══════════════════════════════════════════
   6. INTERACTIVE BOOKING STEPPER MODAL
══════════════════════════════════════════ */
function initBookingModal() {
  const overlay = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('booking-modal-close');
  const openTriggers = document.querySelectorAll('[data-open-booking]');
  
  if (!overlay) return;

  // Estado do Agendamento
  const state = {
    step: 1,
    procedure: 'Limpeza de Pele Profunda',
    procedureDuration: '60 minutos',
    date: '',
    time: '09:30',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    notes: ''
  };

  // Elementos do Stepper
  const stepNodes = overlay.querySelectorAll('.step-node');
  const stepPanels = overlay.querySelectorAll('.step-panel');
  const barFill = overlay.querySelector('.stepper-bar-fill');

  // Inicializar Datas
  populateDates();

  // Abrir modal
  function openModal(preSelectedProc = null) {
    if (preSelectedProc) {
      selectProcedure(preSelectedProc);
    }
    setStep(1);
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Fechar modal
  function closeModal() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proc = btn.getAttribute('data-procedure');
      openModal(proc);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Atualizar visual do Stepper
  function setStep(newStep) {
    state.step = newStep;

    // Atualizar Nodes
    stepNodes.forEach((node, idx) => {
      const stepIdx = idx + 1;
      node.classList.remove('is-active', 'is-completed');
      if (stepIdx === newStep) {
        node.classList.add('is-active');
      } else if (stepIdx < newStep) {
        node.classList.add('is-completed');
      }
    });

    // Atualizar Bar Fill
    if (barFill) {
      const progressPercent = ((newStep - 1) / (stepNodes.length - 1)) * 100;
      barFill.style.width = `calc(${progressPercent}% * 0.85)`;
    }

    // Painéis
    stepPanels.forEach(panel => {
      const pStep = parseInt(panel.getAttribute('data-step') || '1', 10);
      if (pStep === newStep) {
        panel.classList.add('is-active');
      } else {
        panel.classList.remove('is-active');
      }
    });

    // Se estiver no passo 4, preencher o Ticket
    if (newStep === 4) {
      renderVoucher();
    }
  }

  // Passo 1: Seleção de Procedimento
  const procOptions = overlay.querySelectorAll('.modal-proc-option');
  procOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      procOptions.forEach(o => o.classList.remove('is-selected'));
      opt.classList.add('is-selected');

      state.procedure = opt.getAttribute('data-proc-name') || '';
      state.procedureDuration = opt.getAttribute('data-proc-duration') || '60 minutos';
    });
  });

  function selectProcedure(procName) {
    procOptions.forEach(opt => {
      const name = opt.getAttribute('data-proc-name');
      if (name && name.toLowerCase().includes(procName.toLowerCase())) {
        procOptions.forEach(o => o.classList.remove('is-selected'));
        opt.classList.add('is-selected');
        state.procedure = name;
        state.procedureDuration = opt.getAttribute('data-proc-duration') || '60 minutos';
      }
    });
  }

  // Passo 2: Geração de Datas e Horários
  function populateDates() {
    const datesContainer = overlay.querySelector('.dates-strip');
    if (!datesContainer) return;

    datesContainer.innerHTML = '';
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const today = new Date();
    let daysAdded = 0;
    let dayOffset = 1;

    // Gerar próximos 7 dias úteis
    while (daysAdded < 7) {
      const cur = new Date(today);
      cur.setDate(today.getDate() + dayOffset);
      dayOffset++;

      // Pular Domingos
      if (cur.getDay() === 0) continue;

      const dateBtn = document.createElement('button');
      dateBtn.type = 'button';
      dateBtn.className = `date-btn ${daysAdded === 0 ? 'is-selected' : ''}`;
      
      const formattedDate = `${String(cur.getDate()).padStart(2, '0')}/${String(cur.getMonth() + 1).padStart(2, '0')}`;
      if (daysAdded === 0) {
        state.date = formattedDate;
      }

      dateBtn.innerHTML = `
        <span class="weekday">${weekdays[cur.getDay()]}</span>
        <span class="day-number">${cur.getDate()}</span>
        <span style="font-size:0.6rem; opacity:0.7">${months[cur.getMonth()]}</span>
      `;

      dateBtn.addEventListener('click', () => {
        datesContainer.querySelectorAll('.date-btn').forEach(b => b.classList.remove('is-selected'));
        dateBtn.classList.add('is-selected');
        state.date = formattedDate;
      });

      datesContainer.appendChild(dateBtn);
      daysAdded++;
    }

    // Horários
    const timeSlots = overlay.querySelectorAll('.time-slot-btn');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('is-selected'));
        slot.classList.add('is-selected');
        state.time = slot.getAttribute('data-time') || slot.textContent.trim();
      });
    });
  }

  // Passo 3: Máscara e Validação de Dados
  const inputPhone = overlay.querySelector('#booking-phone');
  if (inputPhone) {
    inputPhone.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        e.target.value = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        e.target.value = `(${v.slice(0,2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        e.target.value = `(${v}`;
      } else {
        e.target.value = '';
      }
    });
  }

  function validateStep3() {
    const inputName = overlay.querySelector('#booking-name');
    const inputEmail = overlay.querySelector('#booking-email');
    const inputNotes = overlay.querySelector('#booking-notes');
    let isValid = true;

    // Nome
    const nameVal = inputName ? inputName.value.trim() : '';
    const errName = overlay.querySelector('#err-name');
    if (!nameVal || nameVal.length < 3) {
      if (inputName) inputName.classList.add('has-error');
      if (errName) errName.classList.add('is-visible');
      isValid = false;
    } else {
      if (inputName) inputName.classList.remove('has-error');
      if (errName) errName.classList.remove('is-visible');
    }

    // Telefone
    const phoneVal = inputPhone ? inputPhone.value.trim() : '';
    const rawPhone = phoneVal.replace(/\D/g, '');
    const errPhone = overlay.querySelector('#err-phone');
    if (rawPhone.length < 10) {
      if (inputPhone) inputPhone.classList.add('has-error');
      if (errPhone) errPhone.classList.add('is-visible');
      isValid = false;
    } else {
      if (inputPhone) inputPhone.classList.remove('has-error');
      if (errPhone) errPhone.classList.remove('is-visible');
    }

    if (isValid) {
      state.patientName = nameVal;
      state.patientPhone = phoneVal;
      state.patientEmail = inputEmail ? inputEmail.value.trim() : '';
      state.notes = inputNotes ? inputNotes.value.trim() : '';
    }

    return isValid;
  }

  // Navegação entre Passos
  const nextStep1 = overlay.querySelector('#step1-next');
  const prevStep2 = overlay.querySelector('#step2-prev');
  const nextStep2 = overlay.querySelector('#step2-next');
  const prevStep3 = overlay.querySelector('#step3-prev');
  const nextStep3 = overlay.querySelector('#step3-next');
  const btnWhatsApp = overlay.querySelector('#btn-confirm-wa');

  if (nextStep1) nextStep1.addEventListener('click', () => setStep(2));
  if (prevStep2) prevStep2.addEventListener('click', () => setStep(1));
  if (nextStep2) nextStep2.addEventListener('click', () => setStep(3));
  if (prevStep3) prevStep3.addEventListener('click', () => setStep(2));

  if (nextStep3) {
    nextStep3.addEventListener('click', () => {
      if (validateStep3()) {
        setStep(4);
      }
    });
  }

  // Renderizar Voucher
  function renderVoucher() {
    const vProc = overlay.querySelector('#voucher-proc');
    const vTime = overlay.querySelector('#voucher-time');
    const vDate = overlay.querySelector('#voucher-date');
    const vName = overlay.querySelector('#voucher-name');
    const vPhone = overlay.querySelector('#voucher-phone');

    if (vProc) vProc.textContent = state.procedure;
    if (vTime) vTime.textContent = state.procedureDuration;
    if (vDate) vDate.textContent = `${state.date} às ${state.time}`;
    if (vName) vName.textContent = state.patientName;
    if (vPhone) vPhone.textContent = state.patientPhone;

    // Configurar Botão do WhatsApp
    if (btnWhatsApp) {
      const msg = encodeURIComponent(
        `Olá, Gabrieli! Gostaria de confirmar meu agendamento na Clínica Bella Vita:\n\n` +
        `• *Procedimento:* ${state.procedure} (${state.procedureDuration})\n` +
        `• *Data & Horário:* ${state.date} às ${state.time}\n` +
        `• *Paciente:* ${state.patientName}\n` +
        `• *WhatsApp:* ${state.patientPhone}` +
        (state.notes ? `\n• *Observações:* ${state.notes}` : '') +
        `\n\nAguardo a confirmação da sessão!`
      );

      btnWhatsApp.href = `https://wa.me/5511999999999?text=${msg}`;
    }
  }
}
