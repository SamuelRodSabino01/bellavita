# Módulos e Regras de Negócio — Clínica Bella Vita

Este documento descreve os módulos JavaScript, componentes visuais e regras de negócio implementadas.

---

## 1. Módulos JavaScript (`assets/js/main.js`)

### 1.1 `NavigationModule`
- **Responsabilidade:** Controle de scroll do header (efeito `scrolled` com vidro fosco e sombra sutil), controle do menu mobile (abertura, fechamento, bloqueio de scroll do body e armadilha de foco acessível).
- **Métodos:**
  - `initHeaderScroll()`: Adiciona classe `.is-scrolled` quando `window.scrollY > 30`.
  - `initMobileDrawer()`: Gerencia eventos do botão de menu, overlay e links de navegação.

### 1.2 `ScrollRevealModule`
- **Responsabilidade:** Animação de entrada dos elementos à medida que entram na janela de visualização utilizando `IntersectionObserver`.
- **Configuração:**
  - Root margin: `-60px`.
  - Física: Transição com `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Seletores: `.reveal`, `.reveal-delay-1`, `.reveal-delay-2`, `.reveal-delay-3`.

### 1.3 `ProcedureFilterModule`
- **Responsabilidade:** Filtragem dinâmica dos procedimentos clínicos exibidos na vitrine por categoria.
- **Categorias suportadas:**
  - `todos`: Exibe todos os 6 tratamentos.
  - `facial`: Limpeza de Pele Profunda, Hidratação Facial, Peeling Químico.
  - `bioestimulacao`: Microagulhamento.
  - `corporal`: Drenagem Linfática, Massagem com Pedras Quentes.
- **Animação:** Efeito suave de fade e scale ao alternar filtros sem saltos bruscos.

### 1.4 `BookingStepperModule`
- **Responsabilidade:** Gestor de agendamento em 4 etapas (Modal / Drawer de Luxo integrado):
  - **Passo 1: Procedimento:** Seleção de card com feedback visual imediato e registro do tempo de sessão estimado.
  - **Passo 2: Data & Horário:** Seletor de dias dos próximos 7 a 14 dias úteis + grade de horários disponíveis dinâmicos.
  - **Passo 3: Dados Pessoais:** Validação em tempo real de Nome Completo, WhatsApp com máscara `(00) 00000-0000`, e-mail e notas clínicas adicionais.
  - **Passo 4: Ticket de Confirmação & WhatsApp:** Renderização de um voucher editorial perfurado com todos os dados do paciente e geração de URL codificada para a API do WhatsApp com mensagem pronta.
- **Estrutura da Mensagem WhatsApp:**
  ```text
  Olá, Gabrieli! Gostaria de confirmar meu agendamento na Clínica Bella Vita:
  • Procedimento: {nome_do_procedimento} ({tempo} min)
  • Data: {data_selecionada} às {horario_selecionado}
  • Nome: {nome_paciente}
  • WhatsApp: {telefone_paciente}
  • Observações: {observacoes}
  ```

### 1.5 `SkeletonLoadingModule`
- **Responsabilidade:** Remoção graciosa do placeholder de esqueleto assim que cada imagem carrega (`img.onload`), evitando qualquer salto de layout (Cumulative Layout Shift = 0).

---

## 2. Catálogo Oficial de Procedimentos

| Procedimento | Categoria | Duração | Descrição |
| :--- | :--- | :--- | :--- |
| **Limpeza de Pele Profunda** | Facial | 60 min | Higienização profunda com extração de comedões, vaporizador de ozônio e máscara calmante. |
| **Hidratação Facial** | Facial | 45 min | Reposição intensiva com ácido hialurônico de múltiplos pesos e peptídeos nobres. |
| **Peeling Químico** | Renovação Facial | 50 min | Renovação celular com ácidos específicos (mandélico/glicólico/salicílico) para manchas e textura. |
| **Microagulhamento** | Bioestimulação | 75 min | Microcanais para indução percutânea de colágeno, combate a poros dilatados e firmeza dérmica. |
| **Drenagem Linfática** | Corporal | 60 min | Manobras manuais especializadas para eliminação de toxinas e redução de edemas. |
| **Massagem com Pedras Quentes** | Relaxamento Corporal | 90 min | Ritual revigorante com pedras vulcânicas aquecidas para liberação muscular e equilíbrio total. |
