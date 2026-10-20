# Changelog — Clínica Bella Vita

Todas as mudanças relevantes no projeto são documentadas neste arquivo em ordem cronológica reversa.

---

## [1.1.1] - 2026-10-20

### Adicionado
- Adicionado botão "X" dedicado de fechamento (`#drawer-close-btn`) e cabeçalho institucional com o logo da clínica (`.drawer-header`) no topo do menu drawer móvel.
- Melhorada a ergonomia de navegação no mobile com rolagem interna suave (`overflow-y: auto`), microinteração de rotação de 90° ao interagir com o botão de fechar e fechamento automático ao clicar nos botões de CTA internos.

---

## [1.1.0] - 2026-10-19

### Adicionado
- Adicionada a seção interativa **"Diagnóstico Rápido"** (`#quiz`) logo após a vitrine de procedimentos, permitindo à paciente descobrir o tratamento ideal em 3 passos com barra de progresso dinâmica.
- Criado o módulo **`assets/js/quiz.js`** com mapeamento de objetivos clínicos, cálculo de recomendações e suporte completo a navegação por teclado (acessibilidade com `Enter` e `Espaço`).
- Exposta a API global `window.selectProcedureForBooking(procName)` no módulo `assets/js/main.js` para integração imediata entre o Quiz e o Modal de Agendamento.
- Adicionados atalhos de navegação para a seção de Diagnóstico Rápido no Header principal, no Menu Drawer mobile e na coluna de navegação do Rodapé.

### Alterado
- Substituída a seção *"Reserve sua sessão com a Gabrieli."* pela seção monumental de alta conversão **"Pronta para redescobrir a beleza autêntica da sua pele?"**, apresentando contraste noturno de alto padrão (`#141112`), brilho radial rosé, 3 pilares de confiança com ícones SVG dourados e botões duplos de ação com efeito *Double-Layer Slide-Up*.
- Estilos correspondentes adicionados em `assets/css/style.css` mantendo conformidade integral com os tokens de design do projeto.

---

## [1.0.0] - 2026-10-19

### Adicionado
- Estruturação completa da documentação obrigatória no diretório `Docs/` (`ARCHITECTURE.md`, `FILE_MAP.md`, `MODULES.md`, `DECISIONS.md`, `CHANGELOG.md`).
- Implementação da nova Landing Page de alta conversão para a **Clínica Bella Vita by Gabrieli Rodrigues**, baseada no conteúdo oficial e fotos de alta resolução da versão anterior.
- Aplicação estrita da skill **`high-craft-ui`**:
  - Matriz Tipográfica Editorial (`Cormorant Garamond` + `Plus Jakarta Sans`).
  - Layout espacial com *Metadata Grid Bar*, *Asymmetric Sticky Split*, *Bento Grid Modular* e *Interactive Challenge/Journey List*.
  - Botões de chamada para ação com efeito *Double-Layer Slide-Up*.
  - Animações físicas fluidas com curva `cubic-bezier(0.22, 1, 0.36, 1)`.
- Implementação de **Skeleton Loading** e **Lazy Loading** para imagens e cartões.
- Vitrine de 6 procedimentos especializados com filtros dinâmicos por categoria (Todos, Facial, Bioestimulação, Corporal).
- Sistema de **Agendamento Interativo (Stepper 4 Passos)** integrado com seleção de data/hora, formulário validado e emissão de Ticket/Voucher com link direto e mensagem formatada para o WhatsApp.
- Componentes responsivos: Header flutuante com blur, Menu Drawer com bloqueio de scroll, Mobile FAB e botão flutuante de WhatsApp para desktop.
