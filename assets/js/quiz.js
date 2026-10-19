/**
 * CLÍNICA BELLA VITA — DIAGNOSTIC QUIZ CONTROLLER
 * Quiz de Diagnóstico Rápido em 30 Segundos (3 Perguntas -> Recomendação Personalizada)
 */

'use strict';

const quizData = {
  step: 1,
  answers: {
    foco: null,
    condicao: null,
    experiencia: null,
  },
};

const PROTOCOL_RECOMMENDATIONS = {
  limpeza: {
    title: 'Limpeza de Pele Profunda',
    bookingName: 'Limpeza de Pele Profunda',
    category: 'Tratamento Facial Especializado',
    duration: '60 minutos',
    badge: 'Protocolo Mais Recomendado',
    desc: 'Indicado para purificar os poros, remover comedões e restabelecer o equilíbrio da barreira lipídica com vapor de ozônio e máscara calmante.',
    icon: '🌿',
  },
  hidratacao: {
    title: 'Hidratação Facial com Peptídeos',
    bookingName: 'Hidratação Facial com Peptídeos',
    category: 'Restauração da Barreira Cutânea',
    duration: '45 minutos',
    badge: 'Glow e Viço Imediato',
    desc: 'Reposição intensiva com ácido hialurônico de múltiplos pesos e peptídeos nobres para devolver a maciez, viço e luminosidade natural da sua pele.',
    icon: '💧',
  },
  peeling: {
    title: 'Peeling Químico Magistral',
    bookingName: 'Peeling Químico Magistral',
    category: 'Renovação Celular',
    duration: '50 minutos',
    badge: 'Uniformização e Renovação',
    desc: 'Esfoliação com ácidos controlados (glicólico, mandélico ou salicílico) para atenuar manchas, regular a oleosidade e acelerar o turnover celular.',
    icon: '✨',
  },
  microagulhamento: {
    title: 'Microagulhamento & Colágeno',
    bookingName: 'Microagulhamento & Drug Delivery',
    category: 'Bioestimulação de Colágeno',
    duration: '75 minutos',
    badge: 'Firmeza e Rejuvenescimento',
    desc: 'Microcanais de indução percutânea de colágeno, altamente recomendado para textura irregular, poros dilatados e linhas de expressão.',
    icon: '🔬',
  },
  drenagem: {
    title: 'Drenagem Linfática Especializada',
    bookingName: 'Drenagem Linfática Especializada',
    category: 'Tratamento Corporal Especializado',
    duration: '60 minutos',
    badge: 'Alívio e Leveza Corporal',
    desc: 'Manobras suaves e precisas para escoamento de linfa, reduzindo edemas, retenção hídrica e sensação de cansaço nos membros inferiores.',
    icon: '🌸',
  },
  pedras: {
    title: 'Massagem com Pedras Quentes',
    bookingName: 'Massagem com Pedras Quentes',
    category: 'Relaxamento e Equilíbrio Energético',
    duration: '90 minutos',
    badge: 'Ritual Sensorial Profundo',
    desc: 'Terapia com pedras de basalto aquecidas e óleos botânicos aromáticos, dissipando contraturas musculares e proporcionando relaxamento integral.',
    icon: '🪨',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

function initQuiz() {
  const optionCards = document.querySelectorAll('.quiz-option-card');
  const progressBar = document.getElementById('quiz-progress-fill');

  optionCards.forEach((card) => {
    function handleSelect() {
      const question = card.dataset.question;
      const value = card.dataset.val;

      quizData.answers[question] = value;

      // Feedback visual na seleção do card
      const currentStepPanel = card.closest('.quiz-step-panel');
      if (currentStepPanel) {
        currentStepPanel.querySelectorAll('.quiz-option-card').forEach((c) => c.classList.remove('is-selected'));
      }
      card.classList.add('is-selected');

      // Avança a etapa visual com micro-delay suave para percepção da seleção
      setTimeout(() => {
        if (quizData.step === 1) {
          quizData.step = 2;
          showQuizQuestion(2);
          if (progressBar) progressBar.style.width = '66.66%';
        } else if (quizData.step === 2) {
          quizData.step = 3;
          showQuizQuestion(3);
          if (progressBar) progressBar.style.width = '100%';
        } else if (quizData.step === 3) {
          calculateAndDisplayResult();
        }
      }, 160);
    }

    card.addEventListener('click', handleSelect);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    });
  });

  const restartBtn = document.getElementById('btn-quiz-restart');
  if (restartBtn) {
    restartBtn.addEventListener('click', resetQuiz);
  }
}

function showQuizQuestion(num) {
  document.querySelectorAll('.quiz-step-panel').forEach((panel) => {
    panel.style.display = 'none';
  });
  const current = document.getElementById(`quiz-step-${num}`);
  if (current) {
    current.style.display = 'block';
  }
}

function calculateAndDisplayResult() {
  document.querySelectorAll('.quiz-step-panel').forEach((panel) => {
    panel.style.display = 'none';
  });

  const resultBox = document.getElementById('quiz-result-box');
  const f = quizData.answers.foco;
  const c = quizData.answers.condicao;
  const e = quizData.answers.experiencia;

  let recKey = 'limpeza';

  if (f === 'corpo') {
    if (e === 'relax') recKey = 'pedras';
    else recKey = 'drenagem';
  } else if (f === 'rejuvenescimento' || c === 'linhas') {
    recKey = 'microagulhamento';
  } else if (f === 'manchas' || c === 'manchas') {
    recKey = 'peeling';
  } else if (c === 'seca') {
    recKey = 'hidratacao';
  } else {
    recKey = 'limpeza';
  }

  const rec = PROTOCOL_RECOMMENDATIONS[recKey];

  if (resultBox && rec) {
    resultBox.classList.add('is-active');

    const badgeEl = document.getElementById('quiz-res-badge');
    const titleEl = document.getElementById('quiz-res-title');
    const descEl = document.getElementById('quiz-res-desc');
    const ctaBtn = document.getElementById('btn-quiz-schedule');

    if (badgeEl) badgeEl.textContent = rec.badge;
    if (titleEl) titleEl.textContent = `${rec.icon} ${rec.title}`;
    if (descEl) descEl.textContent = rec.desc;

    if (ctaBtn) {
      ctaBtn.onclick = () => {
        if (typeof window.selectProcedureForBooking === 'function') {
          window.selectProcedureForBooking(rec.bookingName || rec.title);
        }
      };
    }
  }
}

function resetQuiz() {
  quizData.step = 1;
  quizData.answers = { foco: null, condicao: null, experiencia: null };

  document.querySelectorAll('.quiz-option-card').forEach((c) => c.classList.remove('is-selected'));

  const resultBox = document.getElementById('quiz-result-box');
  if (resultBox) resultBox.classList.remove('is-active');

  const progressBar = document.getElementById('quiz-progress-fill');
  if (progressBar) progressBar.style.width = '33.33%';

  showQuizQuestion(1);
}
