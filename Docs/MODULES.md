# Módulos e Regras de Negócio — Clínica Bella Vita

Este documento descreve os módulos JavaScript, componentes visuais e regras de negócio implementadas.

---

## 1. Módulos JavaScript

### 1.1 `NavigationModule` (`assets/js/main.js`)
- **Responsabilidade:** Controle de scroll do header (efeito `scrolled` com vidro fosco e sombra sutil), controle do menu mobile (abertura, fechamento, bloqueio de scroll do body e armadilha de foco acessível).
- **Métodos:**
  - `initHeaderScroll()`: Adiciona classe `.is-scrolled` quando `window.scrollY > 24`.
  - `initMobileDrawer()`: Gerencia eventos do botão de menu, overlay e links de navegação.

### 1.2 `ScrollRevealModule` (`assets/js/main.js`)
- **Responsabilidade:** Animação de entrada dos elementos à medida que entram na janela de visualização utilizando `IntersectionObserver`.
- **Configuração:**
  - Root margin: `-40px`.
  - Física: Transição com `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Seletores: `.reveal`, `.reveal-delay-1`, `.reveal-delay-2`.

### 1.3 `ProcedureFilterModule` (`assets/js/main.js`)
- **Responsabilidade:** Filtragem dinâmica dos procedimentos clínicos exibidos na vitrine por categoria.
- **Categorias suportadas:**
  - `todos`: Exibe todos os 6 tratamentos.
  - `facial`: Limpeza de Pele Profunda, Hidratação Facial com Peptídeos, Peeling Químico Magistral.
  - `bioestimulacao`: Microagulhamento & Drug Delivery.
  - `corporal`: Drenagem Linfática Especializada, Massagem com Pedras Quentes.
- **Animação:** Efeito suave de fade e scale ao alternar filtros sem saltos bruscos.

### 1.4 `BookingStepperModule` (`assets/js/main.js`)
- **Responsabilidade:** Gestor de agendamento em 4 etapas (Modal / Drawer de Luxo integrado):
  - **Passo 1: Procedimento:** Seleção de card com feedback visual imediato e registro do tempo de sessão estimado.
  - **Passo 2: Data & Horário:** Seletor de dias dos próximos 7 dias úteis + grade de horários disponíveis dinâmicos.
  - **Passo 3: Dados Pessoais:** Validação em tempo real de Nome Completo, WhatsApp com máscara `(00) 00000-0000`, e-mail e notas clínicas adicionais.
  - **Passo 4: Ticket de Confirmação & WhatsApp:** Renderização de um voucher editorial perfurado com todos os dados do paciente e geração de URL codificada para a API do WhatsApp com mensagem pronta.
- **API Pública Exposta:**
  - `window.selectProcedureForBooking(procName)`: Permite que outros módulos (como o Quiz de Diagnóstico Rápido) abram o modal diretamente com o procedimento correspondente pré-selecionado.

### 1.5 `SkeletonLoadingModule` (`assets/js/main.js`)
- **Responsabilidade:** Remoção graciosa do placeholder de esqueleto assim que cada imagem carrega (`img.onload`), evitando qualquer salto de layout (Cumulative Layout Shift = 0).

### 1.6 `DiagnosticQuizModule` (`assets/js/quiz.js`)
- **Responsabilidade:** Quiz interativo de 30 segundos projetado para converter pacientes indecisas através de 3 perguntas clínicas rápidas:
  - **Pergunta 1 (Foco):** Limpeza/cravos, manchas/relevo, firmeza/linhas finas ou retenção/cansaço corporal.
  - **Pergunta 2 (Condição):** Mista a oleosa, ressecada/sensível, flacidez/linhas visíveis ou corpo pesado/retenção.
  - **Pergunta 3 (Experiência):** Glow imediato, tratamento clínico aprofundado, relaxamento total ou cuidado express sem perda de tempo.
- **Fluxo e Feedback:**
  - Barra de progresso contínua (33.33% -> 66.66% -> 100%).
  - Suporte completo a navegação por teclado (Enter e Espaço) para conformidade com WCAG / acessibilidade.
  - Micro-delay suave (160ms) para proporcionar resposta tátil antes da troca de pergunta.
  - Tela de resultado dinâmico com badge personalizado, título com ícone temático, descrição explicativa e botões de ação:
    - *Agendar Este Protocolo*: Aciona `window.selectProcedureForBooking(rec.bookingName)` para abrir o agendador imediatamente.
    - *Refazer Diagnóstico*: Reinicia o estado e retorna ao Passo 1.

---

## 2. Componentes de Conversão e Seções de Alto Padrão

### 2.1 Seção "Diagnóstico Rápido" (`#quiz`)
- **Posição:** Posicionada estrategicamente após a vitrine de Procedimentos (`#procedimentos`), servindo como facilitador imediato para visitantes que desejam orientação personalizada antes de agendar.
- **Design:** Superfície branca elevada com bordas ultrafinas, gradiente de fundo sutil em rosé claro e barra de progresso em gradiente de marca.

### 2.2 Seção Final CTA Monumental ("Pronta para redescobrir a beleza autêntica da sua pele?")
- **Posição:** Seção de fechamento que antecede o rodapé, substituindo a antiga seção "Reserve sua sessão com a Gabrieli".
- **Design:** Fundo escuro de luxo (`#141112`) com brilho radial rosé acetinado, headline em tipografia serifada de alto contraste com ênfase itálica suave, três pilares de credibilidade (*Atendimento Exclusivo*, *100% Biosseguro*, *Confirmação Ágil no WhatsApp*) com ícones SVG dourados, e CTAs duplos com efeito *Double-Layer Slide-Up* integrados ao agendamento e ao WhatsApp.

---

## 3. Catálogo Oficial de Procedimentos

| Procedimento | Categoria | Duração | Descrição |
| :--- | :--- | :--- | :--- |
| **Limpeza de Pele Profunda** | Facial | 60 min | Higienização profunda com extração de comedões, vaporizador de ozônio e máscara calmante. |
| **Hidratação Facial com Peptídeos** | Facial | 45 min | Reposição intensiva com ácido hialurônico de múltiplos pesos e peptídeos nobres. |
| **Peeling Químico Magistral** | Renovação Facial | 50 min | Renovação celular com ácidos específicos (mandélico/glicólico/salicílico) para manchas e textura. |
| **Microagulhamento & Drug Delivery** | Bioestimulação | 75 min | Microcanais para indução percutânea de colágeno, combate a poros dilatados e firmeza dérmica. |
| **Drenagem Linfática Especializada** | Corporal | 60 min | Manobras manuais especializadas para eliminação de toxinas e redução de edemas. |
| **Massagem com Pedras Quentes** | Relaxamento Corporal | 90 min | Ritual revigorante com pedras vulcânicas aquecidas para liberação muscular e equilíbrio total. |
