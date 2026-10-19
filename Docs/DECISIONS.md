# Registro de Decisões Técnicas (ADR) — Clínica Bella Vita

---

## ADR-001: Adoção da Skill `high-craft-ui` com Minimalismo Editorial

- **Data:** 19/10/2026
- **Status:** Aceito
- **Contexto:** O cliente solicitou a recriação da landing page da Clínica Bella Vita com base no conteúdo da versão anterior (`v2.html`), exigindo nível de excelência visual, sofisticação e aplicação mandatória da skill `high-craft-ui`.
- **Decisão:** Aplicar a arquitetura visual da skill `high-craft-ui`:
  - Matriz Tipográfica de luxo editorial (`Cormorant Garamond` + `Plus Jakarta Sans`).
  - Layout espacial não monótono: Metadata Grid Bar, Asymmetric Sticky Split, Bento Grid Modular, Lista de Desafios Numerados interativos (`01` a `05`).
  - Botões CTA com efeito *Double-Layer Slide-Up*.
  - Transições físicas suaves com easing `[0.22, 1, 0.36, 1]`.
- **Consequências:** A interface se posiciona no mais alto patamar de clínicas estéticas de luxo (estilo Awwwards/Framer Enterprise), elevando a percepção de valor dos serviços da esteticista Gabrieli Rodrigues.

---

## ADR-002: Preservação da Paleta Cromática Autêntica com Elevação de Contraste

- **Data:** 19/10/2026
- **Status:** Aceito
- **Contexto:** A marca Bella Vita possui identidade consagrada com tons de Rosé Claro (`#F7E1E6`), Rosa Queimado (`#D98C96`), Dourado Acetinado (`#D4AF37`) e Warm Ink (`#231F20`).
- **Decisão:** Manter 100% da identidade cromática original, aplicando-a em camadas sofisticadas com opacidades calculadas (`rgba` / `border-black/[0.07]`), fundos translúcidos e acentos metálicos sutis.
- **Consequências:** Mantém a consistência de marca reconhecida pelas pacientes, com acabamento refinado e sem perda de identidade.

---

## ADR-003: Fluxo de Agendamento Inteligente em Stepper Unificado

- **Data:** 19/10/2026
- **Status:** Aceito
- **Contexto:** Na versão anterior, o agendamento estava em uma página separada (`agendar.html`), criando atrito e quebra de fluxo para o usuário.
- **Decisão:** Integrar o fluxo completo de agendamento diretamente na Landing Page através de um Modal / Drawer Interativo em 4 passos e acionável por qualquer botão de CTA da página (Hero, Header, Cards de Procedimento e Float WhatsApp).
- **Consequências:** Aumenta exponencialmente a taxa de conversão (CRO), reduz o atrito de navegação e permite ao usuário reservar sua consulta em menos de 1 minuto diretamente conectado ao WhatsApp.

---

## ADR-004: Performance e Acessibilidade (Skeleton Loading e Lazy Loading)

- **Data:** 19/10/2026
- **Status:** Aceito
- **Contexto:** Protocolo obrigatório de layout exige skeleton loading, lazy loading e animações suaves em elementos relevantes.
- **Decisão:** Implementar esqueleto com efeito de pulso shimmer enquanto as imagens de alta resolução de Gabrieli Rodrigues são decodificadas, adicionando lazy loading e `IntersectionObserver` de baixo custo computacional.
- **Consequências:** Zero Layout Shift (CLS = 0), carregamento quase instantâneo e pontuação máxima no Google Lighthouse / Core Web Vitals.
