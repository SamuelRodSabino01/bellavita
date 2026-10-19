# Mapa de Arquivos — Clínica Bella Vita

Índice dos arquivos do projeto, com caminho relativo, finalidade, dependências e referências cruzadas.

---

## 1. Documentação (`Docs/`)

- **[`Docs/ARCHITECTURE.md`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/Docs/ARCHITECTURE.md)**
  - *Finalidade:* Visão geral da arquitetura, tokens, tipografia, padrões espaciais e princípios de engenharia.
  - *Dependências:* Nenhuma.
  - *Referências:* Usado como guia por todos os arquivos de código.

- **[`Docs/FILE_MAP.md`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/Docs/FILE_MAP.md)**
  - *Finalidade:* Mapa estrutural do repositório, dependências e referências cruzadas.
  - *Dependências:* Nenhuma.
  - *Referências:* Mantido sincronizado a cada alteração arquitetural.

- **[`Docs/MODULES.md`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/Docs/MODULES.md)**
  - *Finalidade:* Especificação detalhada de módulos JS, componentes, métodos e regras de negócio.
  - *Dependências:* Nenhuma.
  - *Referências:* Documenta `assets/js/main.js`.

- **[`Docs/CHANGELOG.md`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/Docs/CHANGELOG.md)**
  - *Finalidade:* Registro cronológico de mudanças e versões.
  - *Dependências:* Nenhuma.

- **[`Docs/DECISIONS.md`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/Docs/DECISIONS.md)**
  - *Finalidade:* Registro de decisões arquiteturais (ADR).
  - *Dependências:* Nenhuma.

---

## 2. Aplicação Principal

- **[`index.html`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/index.html)**
  - *Finalidade:* Página principal da Landing Page de alta conversão e acabamento editorial.
  - *Dependências:*
    - `assets/css/style.css`
    - `assets/js/main.js`
    - `assets/images/*`
    - Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`)
  - *Referências:* Ponto de entrada do usuário no navegador.

- **[`assets/css/style.css`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/assets/css/style.css)**
  - *Finalidade:* Folha de estilos completa com tokens CSS, layouts de Bento Grid, Sticky Split, Metadata Grid Bar, botões com Double-Layer Slide-Up, Stepper interativo de agendamento e skeleton loading.
  - *Dependências:* Google Fonts.
  - *Referências:* Importado por `index.html`.

- **[`assets/js/main.js`](file:///c:/Users/samuel.sabino/Desktop/clinicabellavita/assets/js/main.js)**
  - *Finalidade:* Lógica client-side para menu drawer, scroll suave, reveal com IntersectionObserver, filtro de procedimentos por categoria, stepper interativo de agendamento com validação, geração de voucher e redirecionamento WhatsApp.
  - *Dependências:* DOM API.
  - *Referências:* Carregado em `index.html`.

---

## 3. Ativos Estáticos (`assets/images/`)

- **`assets/images/logo_png.png`**: Logo colorido principal da Bella Vita. Usado no header e no ticket de agendamento.
- **`assets/images/logo_branco.png`**: Logo versão branca para contraste no footer escuro.
- **`assets/images/gabrieli_principal.jpg`**: Foto editorial de Gabrieli Rodrigues no Hero.
- **`assets/images/gabrieli02.jpg`**: Foto de Gabrieli em ambiente clínico na seção Sobre / Biossegurança.
