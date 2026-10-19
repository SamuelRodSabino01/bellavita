# Changelog — Clínica Bella Vita

Todas as mudanças relevantes no projeto são documentadas neste arquivo em ordem cronológica reversa.

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
