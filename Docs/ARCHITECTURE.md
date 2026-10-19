# Arquitetura — Clínica Bella Vita Landing Page

## 1. Visão Geral

A nova Landing Page da **Clínica Bella Vita by Gabrieli Rodrigues** foi projetada seguindo rigorosamente os padrões de engenharia de software e design de ponta estabelecidos pela skill **`high-craft-ui`** e pelos protocolos de excelência em UX/UI da clínica.

O objetivo é proporcionar uma experiência digital de luxo editorial contemporâneo (*Awwwards / Framer Enterprise finish*), com alta performance de carregamento, responsividade impecável, animações fluidas baseadas em curvas físicas de amortecimento (`cubic-bezier(0.22, 1, 0.36, 1)`), skeleton loading para prevenção de Cumulative Layout Shift (CLS) e um fluxo de agendamento interativo em 4 passos conectado diretamente ao WhatsApp.

---

## 2. Padrões de Design e Identidade Visual

### 2.1 Identidade Tipográfica Editorial
- **Títulos & Headlines de Destaque:** `Cormorant Garamond` (pesos 300, 400, com suporte a *italics* refinados, `letter-spacing: -0.03em`, `line-height: 1.08`).
- **Corpo de Texto & Dados de Interface:** `Plus Jakarta Sans` (pesos 300, 400, 500, 600, `line-height: 1.6`, com conforto visual `max-w-[62ch]`).
- **Eyebrows & Tags:** `Plus Jakarta Sans` em caixa alta com dot luminoso (`h-1.5 w-1.5 rounded-full`), `letter-spacing: 0.08em`.

### 2.2 Sistema de Cores e Tokens
- `--color-rose-claro`: `#F7E1E6` (fundos acetinados secundários)
- `--color-rose`: `#E8B1B8` (bordas finas e detalhes)
- `--color-rosa-queimado`: `#D98C96` (destaques de marca, acentos)
- `--color-dourado`: `#D4AF37` / `#C5A059` (ouro champanhe para detalhes nobres)
- `--color-warm-ink`: `#231F20` (tipografia de alto contraste de luxo)
- `--color-muted-taupe`: `#6E6264` (textos secundários com conforto de leitura)
- `--color-surface-bg`: `#FAF8F7` / `#FFFFFF` (superfícies limpas)

---

## 3. Estrutura de Layout e Padrões Espaciais (High-Craft UI)

1. **Header Flutuante com Glassmorphism (`backdrop-filter: blur(16px)`):** Navegação fluida com links âncora, drawer responsivo com trava de scroll e botão com slide-up de dupla camada.
2. **Hero Monumental:**
   - Eyebrow com indicador de status
   - Headline com tipografia serifada de alto contraste editorial
   - Parágrafo de valor com limitação ótica de linha (`max-w-[60ch]`)
   - CTAs com efeito Double-Layer Slide-Up
   - **Metadata Grid Bar**: 4 colunas com divisão precisa (`Pacientes Atendidas`, `Protocolos Clínicos`, `Avaliação Média`, `Biossegurança`)
   - Moldura de imagem com skeleton loader integrado e badge flutuante de autoridade.
3. **Seção Bento Grid Modular (Arquitetura de Excelência & Diferenciais):**
   - Grid assimétrico (cards 7/5 e 4/4/4) com bordas hairline translúcidas e efeito glassmorphic.
4. **Procedimentos Especializados com Filtros por Categoria:**
   - Tabs interativas (Todos, Facial, Corporal, Bioestimulação)
   - Cards com indicação de tempo de sessão, anamnese personalizada e CTA de seleção direta.
5. **Asymmetric Sticky Split (Sobre a Clínica & Fundadora Gabrieli Rodrigues):**
   - Coluna esquerda sticky com headline imponente
   - Coluna direita narrativa com lista de autoridade clínica e biossegurança.
6. **Interactive Journey / Como Funciona (`01` a `05`):**
   - Linhas de etapas com hover expansivo e destaque numérico mono-espaçado.
7. **Depoimentos e Prova Social de Alto Padrão:**
   - Cards com avaliações 5 estrelas e detalhes do tratamento realizado.
8. **Fluxo de Agendamento Interativo (Modal / Stepper em 4 Passos):**
   - Passo 1: Seleção do Procedimento
   - Passo 2: Data & Horário
   - Passo 3: Dados da Paciente (com validação em tempo real)
   - Passo 4: Voucher / Ticket de Confirmação com integração direta para o WhatsApp com mensagem formatada.
9. **Footer Monumental & Mobile FAB:**
   - Links institucionais, redes sociais e botão de ação flutuante para mobile.

---

## 4. Engenharia de Movimento e Performance

- **Física de Transição:** Todas as animações utilizam a curva de amortecimento `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Skeleton Loading:** Esqueletos pré-renderizados com animação de pulso suave shimmer para imagens e cartões antes do carregamento total.
- **Lazy Loading Nativo:** Atributos `loading="lazy"` e `decoding="async"` em todas as imagens que estão abaixo da dobra.
- **IntersectionObserver:** Detecção otimizada de viewport para acionar transições de revelação sem impactar o thread principal de renderização.
