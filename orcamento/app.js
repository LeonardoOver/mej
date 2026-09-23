/* =============================================================================
   Sistema de Cotacao de Eventos - Maria e Jose Parrilla
   -----------------------------------------------------------------------------
   Arquivo unico de comportamento. O widget do Elementor carrega apenas:

     <link rel="stylesheet" href=".../app.css">
     <div id="mejo-root"></div>
     <script defer src=".../app.js"></script>

   Tudo o que aparece na tela e montado por este arquivo, entao publicar uma
   alteracao e um git push. Os precos e as regras ficam em DEFAULTS, e podem
   ser sobrescritos de fora por window.MEJ_ORCAMENTO_CONFIG.
   ============================================================================= */

(function () {
  'use strict';

  var MARKUP = `
<div class="mejo" id="mejo">

  <!-- ================= HERO ================= -->
  <header class="mejo-hero">
    <img class="mejo-hero__bg" src="https://mariaejose.com.br/wp-content/uploads/2026/04/capa-3-2.png"
         alt="" aria-hidden="true" fetchpriority="high" width="1600" height="900" />
    <div class="mejo-hero__inner">
      <img class="mejo-hero__logo" src="https://mariaejose.com.br/wp-content/uploads/2024/12/logo-branco.png"
           alt="Maria e José Parrilla" width="260" height="62" />
      <p class="mejo-eyebrow mejo-hero__eyebrow">Orçamento online</p>
      <h1 class="mejo-hero__title">Monte seu evento<strong>e veja o valor na hora</strong></h1>
      <p class="mejo-hero__sub">
        Escolha data, ambiente e cardápio. O valor por pessoa e o total aparecem
        na tela conforme você escolhe, sem precisar esperar atendimento.
      </p>
      <a href="#mejo-form" class="mejo-btn mejo-btn--accent mejo-btn--lg" id="mejo-start" style="max-width:340px;margin:0 auto;">
        Começar minha cotação
      </a>
      <div class="mejo-hero__badges">
        <span class="mejo-hero__badge">20% off de terça a quinta</span>
        <span class="mejo-hero__badge">3 ambientes</span>
        <span class="mejo-hero__badge">Menu ou rodízio</span>
      </div>
    </div>
  </header>

  <!-- ================= PROGRESSO ================= -->
  <div class="mejo-progress" id="mejo-progress" aria-hidden="true">
    <div class="mejo-wrap">
      <div class="mejo-progress__marca">
        <img class="mejo-progress__logo"
             src="https://mariaejose.com.br/wp-content/uploads/2024/12/logo-2.png"
             alt="Maria e José Parrilla" width="150" height="26" />
        <p class="mejo-progress__now" id="mejo-progress-now-topo"></p>
      </div>
      <div class="mejo-progress__track">
        <div class="mejo-progress__fill" id="mejo-progress-fill"></div>
      </div>
      <div class="mejo-progress__steps">
        <span class="mejo-progress__step is-active" data-pstep="1">Dados</span>
        <span class="mejo-progress__step" data-pstep="2">Ambiente</span>
        <span class="mejo-progress__step" data-pstep="3">Consumo</span>
        <span class="mejo-progress__step" data-pstep="4">Cardápio</span>
        <span class="mejo-progress__step" data-pstep="5">Resumo</span>
      </div>
      <p class="mejo-progress__now" id="mejo-progress-now"></p>
    </div>
  </div>

  <!-- ================= FORM ================= -->
  <main class="mejo-main" id="mejo-form">
    <div class="mejo-wrap">
      <p class="mejo-sr" role="status" aria-live="polite" id="mejo-live"></p>

      <!-- ---------- ETAPA 1: DADOS ---------- -->
      <section class="mejo-step is-active" data-step="1" aria-label="Dados do evento">
        <div class="mejo-step__head">
          <p class="mejo-eyebrow">Etapa 1 de 5</p>
          <h2 class="mejo-h2">Dados do evento</h2>
          <p class="mejo-lead">Comece pelo básico. Leva menos de um minuto.</p>
        </div>

        <div class="mejo-retomar" id="mejo-retomar" hidden>
          <p class="mejo-retomar__txt" id="mejo-retomar-txt"></p>
          <button type="button" class="mejo-retomar__nova" id="mejo-retomar-nova">Começar uma nova</button>
        </div>

        <div class="mejo-field">
          <label class="mejo-label" for="mejo-nome">Seu nome <span class="mejo-req">*</span></label>
          <input class="mejo-input" type="text" id="mejo-nome" autocomplete="name"
                 placeholder="Como podemos te chamar?" maxlength="80" />
          <p class="mejo-error" id="mejo-err-nome">Informe seu nome.</p>
        </div>

        <div class="mejo-field">
          <label class="mejo-label" for="mejo-whats">Seu WhatsApp <span class="mejo-req">*</span></label>
          <input class="mejo-input" type="tel" id="mejo-whats" inputmode="tel" autocomplete="tel"
                 placeholder="(00) 00000-0000" maxlength="16" />
          <p class="mejo-error" id="mejo-err-whats">Digite um WhatsApp com DDD.</p>
        </div>

        <div class="mejo-field">
          <label class="mejo-label" for="mejo-data">Data do evento <span style="text-transform:none;letter-spacing:0;font-weight:400">(opcional)</span></label>
          <input class="mejo-input" type="date" id="mejo-data" />
          <label class="mejo-check">
            <input type="checkbox" id="mejo-sem-data" />
            <span>Ainda não tenho a data definida</span>
          </label>
          <p class="mejo-error" id="mejo-err-data">Escolha uma data ou marque a opção acima.</p>
          <p class="mejo-hint" id="mejo-dia-detect"></p>
        </div>

        <div class="mejo-field" id="mejo-field-dia" hidden>
          <label class="mejo-label" for="mejo-dia">Dia da semana pretendido <span class="mejo-req">*</span></label>
          <select class="mejo-input mejo-input--select" id="mejo-dia">
            <option value="">Selecione o dia</option>
          </select>
          <p class="mejo-error" id="mejo-err-dia">Escolha o dia da semana.</p>
          <p class="mejo-hint">De terça a quinta o evento tem <strong>20% de desconto</strong>.</p>
        </div>

        <div class="mejo-block">
          <p class="mejo-block__title">Turno <span class="mejo-req">*</span></p>
          <p class="mejo-block__hint">Almoço ou jantar.</p>
          <div class="mejo-options mejo-options--2" id="mejo-turnos"></div>
          <p class="mejo-error" id="mejo-err-turno">Escolha o turno.</p>
        </div>

        <div class="mejo-block">
          <p class="mejo-block__title">Tema do evento <span class="mejo-req">*</span></p>
          <p class="mejo-block__hint">O que vamos celebrar?</p>
          <div class="mejo-options mejo-options--2" id="mejo-temas"></div>
          <div class="mejo-field" id="mejo-field-tema-outro" hidden style="margin-top:12px;margin-bottom:0">
            <label class="mejo-label" for="mejo-tema-outro">Qual?</label>
            <input class="mejo-input" type="text" id="mejo-tema-outro" maxlength="60"
                   placeholder="Ex.: formatura, confraternização da empresa" />
          </div>
          <p class="mejo-error" id="mejo-err-tema">Escolha o tema do evento.</p>
        </div>

        <div class="mejo-alert" id="mejo-alert-1"></div>

        <div class="mejo-nav">
          <button type="button" class="mejo-btn mejo-btn--dark" data-next="1">Continuar</button>
        </div>
      </section>

      <!-- ---------- ETAPA 2: AMBIENTE ---------- -->
      <section class="mejo-step" data-step="2" aria-label="Convidados e ambiente">
        <div class="mejo-step__head">
          <p class="mejo-eyebrow">Etapa 2 de 5</p>
          <h2 class="mejo-h2">Convidados e ambiente</h2>
          <p class="mejo-lead">O número de convidados define o valor total e quais ambientes ficam disponíveis.</p>
        </div>

        <div class="mejo-field">
          <label class="mejo-label" for="mejo-conv">Número de convidados <span class="mejo-req">*</span></label>
          <div class="mejo-stepper" style="width:max-content">
            <button type="button" class="mejo-stepper__btn" data-conv="-10" aria-label="Diminuir 10 convidados">&minus;</button>
            <input class="mejo-stepper__input" type="number" id="mejo-conv" inputmode="numeric"
                   min="1" step="1" style="width:78px" />
            <button type="button" class="mejo-stepper__btn" data-conv="10" aria-label="Aumentar 10 convidados">+</button>
          </div>
          <p class="mejo-error" id="mejo-err-conv">Informe um número inteiro de convidados, maior que zero.</p>
          <p class="mejo-hint" id="mejo-conv-hint"></p>
        </div>

        <div class="mejo-block">
          <p class="mejo-block__title">Ambiente privativo? <span class="mejo-req">*</span></p>
          <p class="mejo-block__hint">Um espaço reservado só para o seu grupo.</p>
          <div class="mejo-options mejo-options--2" id="mejo-privativo"></div>
          <p class="mejo-error" id="mejo-err-privativo">Responda se deseja ambiente privativo.</p>
          <p class="mejo-hint" id="mejo-privativo-nota"></p>
        </div>

        <div class="mejo-block">
          <p class="mejo-block__title">Preferência de ambiente <span class="mejo-req">*</span></p>
          <p class="mejo-block__hint">A disponibilidade da data e do espaço é confirmada pela nossa equipe.</p>
          <div class="mejo-place" id="mejo-ambientes"></div>
          <p class="mejo-error" id="mejo-err-ambiente">Escolha um ambiente.</p>
        </div>

        <div class="mejo-alert" id="mejo-alert-2"></div>

        <div class="mejo-nav">
          <button type="button" class="mejo-nav__back" data-back="2">&larr; Voltar</button>
          <button type="button" class="mejo-btn mejo-btn--dark" data-next="2">Continuar</button>
        </div>
      </section>

      <!-- ---------- ETAPA 3: CONSUMO ---------- -->
      <section class="mejo-step" data-step="3" aria-label="Forma de consumo">
        <div class="mejo-step__head">
          <p class="mejo-eyebrow">Etapa 3 de 5</p>
          <h2 class="mejo-h2">Consumo e detalhes</h2>
          <p class="mejo-lead">Como a conta do seu evento vai funcionar.</p>
        </div>

        <div class="mejo-block">
          <p class="mejo-block__title">Forma de pagamento / consumo <span class="mejo-req">*</span></p>
          <p class="mejo-block__hint">Escolha quem paga o que durante o evento.</p>
          <div class="mejo-options" id="mejo-consumo"></div>
          <p class="mejo-error" id="mejo-err-consumo">Escolha a forma de consumo.</p>
        </div>

        <div class="mejo-block" id="mejo-block-cardapio">
          <p class="mejo-block__title">Cardápio personalizado impresso? <span class="mejo-req">*</span></p>
          <p class="mejo-block__hint" id="mejo-cardapio-hint">Menus impressos com o nome do seu evento nas mesas.</p>
          <div class="mejo-options mejo-options--2" id="mejo-impresso"></div>
          <p class="mejo-error" id="mejo-err-impresso">Responda sobre o cardápio impresso.</p>
        </div>

        <div class="mejo-alert" id="mejo-alert-3"></div>

        <div class="mejo-nav">
          <button type="button" class="mejo-nav__back" data-back="3">&larr; Voltar</button>
          <button type="button" class="mejo-btn mejo-btn--dark" data-next="3">Continuar</button>
        </div>
      </section>

      <!-- ---------- ETAPA 4: CARDAPIO ---------- -->
      <section class="mejo-step" data-step="4" aria-label="Cardápio">
        <div class="mejo-step__head">
          <p class="mejo-eyebrow">Etapa 4 de 5</p>
          <h2 class="mejo-h2">Monte seu cardápio</h2>
          <p class="mejo-lead">Selecione os itens que gostaria de incluir e obtenha seu orçamento na hora.</p>
        </div>

        <div class="mejo-sub" id="mejo-sub" hidden>
          <div class="mejo-sub__pontos" id="mejo-sub-pontos" aria-hidden="true"></div>
          <p class="mejo-sub__txt" id="mejo-sub-txt"></p>
        </div>

        <div class="mejo-block" id="mejo-bloco-formato">
          <p class="mejo-block__title">Formato do evento <span class="mejo-req">*</span></p>
          <div class="mejo-format" id="mejo-formato"></div>
          <p class="mejo-error" id="mejo-err-formato">Escolha o formato do evento.</p>
        </div>

        <div id="mejo-cardapio-passo"></div>

        <div class="mejo-alert" id="mejo-alert-4"></div>

        <div class="mejo-nav">
          <button type="button" class="mejo-nav__back" data-back="4">&larr; Voltar</button>
          <button type="button" class="mejo-btn mejo-btn--dark" data-next="4">Ver cotação</button>
        </div>
      </section>

      <!-- ---------- ETAPA 5: RESUMO ---------- -->
      <section class="mejo-step" data-step="5" aria-label="Sua cotação">
        <div class="mejo-quote">
          <div class="mejo-quote__head">
            <p class="mejo-quote__eyebrow">Maria &amp; José Parrilla</p>
            <p class="mejo-quote__title">Sua cotação</p>
          </div>
          <div class="mejo-quote__body">

            <div class="mejo-sec">
              <p class="mejo-sec__title">O evento</p>
              <div class="mejo-dl" id="mejo-res-dados"></div>
            </div>

            <div class="mejo-sec">
              <p class="mejo-sec__title">Itens selecionados</p>
              <div class="mejo-items" id="mejo-res-itens"></div>
            </div>

            <div class="mejo-sec">
              <p class="mejo-sec__title">Investimento</p>
              <div class="mejo-money" id="mejo-res-money"></div>

              <div class="mejo-total">
                <p class="mejo-total__label">Total estimado</p>
                <p class="mejo-total__value" id="mejo-res-total">R$ 0,00</p>
                <p class="mejo-total__per" id="mejo-res-per"></p>
                <span class="mejo-total__badge" id="mejo-res-badge" hidden></span>
              </div>

              <p class="mejo-disclaimer">
                Esta é uma estimativa de investimento. A confirmação da disponibilidade
                da data, ambiente e demais condições será realizada pela nossa equipe.
              </p>
            </div>

            <div class="mejo-actions">
              <div class="mejo-oferta" id="mejo-oferta">
                <p class="mejo-oferta__destaque" id="mejo-oferta-48h"></p>
                <p class="mejo-oferta__validade" id="mejo-oferta-validade"></p>
              </div>
              <a href="#" class="mejo-btn mejo-btn--wp mejo-btn--lg" id="mejo-cta-whats" target="_blank" rel="noopener">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.9-.4-1.7-.9-2.4-1.6-.6-.7-1.1-1.4-1.5-2.2-.1-.2 0-.4.1-.5.2-.2.5-.6.7-.9.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.9.9-1.2 2-1 3.2.3 1.4 1 2.6 1.9 3.7 1.5 1.9 3.4 3.2 5.7 3.8.6.2 1.3.2 1.9.1.9-.1 1.6-.7 2-1.5.2-.4.2-.9.1-1.3l-.2-.1M12 21.5c-1.7 0-3.3-.4-4.8-1.3l-.3-.2-3.6.9.9-3.4-.2-.4c-2.5-4.2-1.4-9.6 2.5-12.4C10.5 2 15.9 2.6 19 6.2c3 3.6 2.8 8.9-.5 12.2-1.7 1.9-4.1 3-6.5 3.1m9.2-16.3C17.9.9 11.7-.2 7 2.6 2.4 5.4.7 11.4 3.1 16.2L2 21.4c-.1.3.1.6.4.7h.3l5.1-1.3c1.3.7 2.8 1.1 4.3 1.1 6 0 10.9-4.8 10.9-10.8 0-2.1-.6-4.2-1.8-5.9"/></svg>
                Falar com nossa equipe
              </a>

              <p class="mejo-actions__note">
                Não encontrou exatamente o que procura?<br />
                Nossa equipe pode criar uma proposta personalizada para o seu evento.
              </p>
              <a href="#" class="mejo-btn mejo-btn--accent mejo-btn--lg" id="mejo-cta-proposta" target="_blank" rel="noopener">
                Quero uma proposta totalmente personalizada
              </a>

              <button type="button" class="mejo-edit" data-back="5">&larr; Voltar e editar</button>
              <p class="mejo-copy">
                <button type="button" class="mejo-copy__btn" id="mejo-copy">Copiar link desta cotação</button>
              </p>
            </div>

          </div>
        </div>
      </section>

      <p class="mejo-ajuda">
        Ficou com dúvida no meio do caminho?
        <a href="https://wa.me/5516982540005" target="_blank" rel="noopener" id="mejo-ajuda-link">
          Fale com nossa equipe
        </a>
      </p>

    </div>
  </main>

  <!-- ================= BARRA FIXA ================= -->
  <div class="mejo-bar" id="mejo-bar" aria-hidden="true">
    <div class="mejo-bar__inner">
      <div class="mejo-bar__info">
        <p class="mejo-bar__label">Total estimado</p>
        <p class="mejo-bar__total" id="mejo-bar-total">R$ 0,00</p>
        <p class="mejo-bar__per" id="mejo-bar-per"></p>
      </div>
      <button type="button" class="mejo-bar__cta" id="mejo-bar-cta">Continuar</button>
    </div>
  </div>

  <!-- ================= FOOTER ================= -->
  <footer class="mejo-foot">
    <img class="mejo-foot__logo" src="https://mariaejose.com.br/wp-content/uploads/2024/12/logo-branco.png"
         alt="Maria e José Parrilla" loading="lazy" width="190" height="42" />
    <p class="mejo-foot__txt">
      Dúvidas sobre o seu evento?<br />
      <a href="https://wa.me/5516982540005" target="_blank" rel="noopener">(16) 98254-0005</a>
    </p>
    <p class="mejo-foot__copy">&copy; 2026 Maria &amp; José Parrilla. Todos os direitos reservados</p>
  </footer>

</div>
`;

  /* ==========================================================================
     1. CONFIGURACAO  (PARAMETRIZACAO)
     --------------------------------------------------------------------------
     Nada de preco ou regra comercial fica preso na logica. Tudo esta aqui.
     Para o painel administrativo do WordPress: basta publicar um objeto
     window.MEJ_ORCAMENTO_CONFIG antes deste script (wp_localize_script, campo
     ACF, widget de HTML etc.) com APENAS as chaves que quiser sobrescrever.
     O merge abaixo e profundo, entao { desconto: { percentual: 15 } } muda
     somente o percentual e preserva o resto.
     ========================================================================== */

  var DEFAULTS = {

    /* ---- contato / integracoes ---- */
    whatsapp: '5516982540005',          // numero que recebe a cotacao
    // Altura de um cabecalho fixo do tema, em pixels. null = detecta
    // sozinho a barra do WordPress e assume o resto como zero.
    topoFixo: null,
    webhook: '',                        // URL do n8n. Vazio = nao envia nada.
    origem: 'orcamento',                // separa este formulario dos outros na planilha

    /* ---- desconto de dia de semana ---- */
    // dias em padrao JavaScript: 0=domingo, 1=segunda, ... 6=sabado
    desconto: {
      percentual: 20,
      dias: [2, 3, 4],                  // terca, quarta, quinta
      // sobre o que o desconto incide (regra consolidada do briefing: tudo)
      itens: { pacotes: true, cardapio: true, ambiente: true, privativo: true }
    },

    /* ---- dias disponiveis para cotacao ---- */
    // PENDENCIA DE VALIDACAO: segunda-feira (1) fica fora ate o restaurante definir.
    diasSemana: [
      { v: 2, label: 'Terça-feira' },
      { v: 3, label: 'Quarta-feira' },
      { v: 4, label: 'Quinta-feira' },
      { v: 5, label: 'Sexta-feira' },
      { v: 6, label: 'Sábado' },
      { v: 0, label: 'Domingo' }
    ],
    msgDiaIndisponivel: 'Essa data cai em um dia que ainda não está aberto para cotação online. Escolha outra data ou fale com nossa equipe pelo WhatsApp.',
    maxDiasFuturo: 540,                 // janela do calendario (18 meses)

    // Dias sem uso ate a cotacao salva no aparelho ser descartada. Conta a
    // partir da ultima alteracao, nao da primeira visita.
    validadeDiasSalvos: 14,

    /* ---- convidados ---- */
    // PENDENCIA DE VALIDACAO: minimo geral de convidados. null = sem minimo geral.
    minConvidadosGeral: null,
    maxConvidadosGeral: null,
    convidadosPadrao: 50,

    /* ---- turno ---- */
    // PENDENCIA DE VALIDACAO: turno nao altera preco nem disponibilidade.
    turnos: [
      { id: 'almoco', label: 'Almoço', desc: 'Evento durante o dia' },
      { id: 'jantar', label: 'Jantar', desc: 'Evento à noite' }
    ],

    /* ---- tema ---- */
    temas: [
      { id: 'casamento',     label: 'Casamento / Noivado' },
      { id: 'batizado',      label: 'Batizado' },
      { id: 'aniv-adulto',   label: 'Aniversário adulto' },
      { id: 'aniv-infantil', label: 'Aniversário infantil' },
      { id: 'bodas',         label: 'Bodas' },
      { id: 'empresa',       label: 'Evento de empresa' },
      { id: 'outro',         label: 'Outro' }
    ],

    /* ---- ambiente privativo ---- */
    // PENDENCIA DE VALIDACAO: hoje a resposta e apenas registrada.
    // Para cobrar: afetaPreco = true e taxa.tipo = 'fixa' | 'por_pessoa'.
    // Para filtrar ambientes: filtraAmbientes = true (usa o campo privativo de cada ambiente).
    privativo: {
      afetaPreco: false,
      filtraAmbientes: false,
      taxa: { tipo: 'nenhuma', valor: 0 },
      nota: 'Registramos sua preferência. A exclusividade do espaço é confirmada pela equipe no atendimento.'
    },

    /* ---- ambientes ---- */
    // PENDENCIA DE VALIDACAO: min/max do Salao da Lareira e do Espaco Quintal,
    // e se algum ambiente tem taxa. min/max null = sem validacao ("sob consulta").
    ambientes: [
      {
        id: 'fonte', nome: 'Salão da Fonte',
        desc: 'Salão interno com a fonte, mesas de madeira e luz baixa.',
        min: 50, max: null, privativo: true,
        foto: 'https://mariaejose.com.br/wp-content/uploads/2026/05/salao-acolhedor-scaled.webp',
        taxa: { tipo: 'nenhuma', valor: 0 }
      },
      {
        id: 'lareira', nome: 'Salão da Lareira',
        desc: 'Ambiente aconchegante em volta da lareira, ideal para grupos reunidos.',
        min: null, max: null, privativo: true,
        foto: 'https://mariaejose.com.br/wp-content/uploads/2026/05/mesa-completa.png',
        taxa: { tipo: 'nenhuma', valor: 0 }
      },
      {
        id: 'quintal', nome: 'Espaço Quintal',
        desc: 'Área aberta, ao ar livre, com clima de quintal de casa.',
        min: null, max: null, privativo: false,
        foto: 'https://mariaejose.com.br/wp-content/uploads/2026/09/mesa-batizado.png',
        taxa: { tipo: 'nenhuma', valor: 0 }
      }
    ],

    /* ---- forma de pagamento / consumo ---- */
    // PENDENCIA DE VALIDACAO: hoje nenhuma das tres altera o calculo.
    consumo: [
      { id: 'adesao', label: '100% Adesão',
        desc: 'Tudo será pago pelos convidados através de comandas individuais.' },
      { id: 'misto', label: 'Misto',
        desc: 'Alguns itens serão pagos pelo anfitrião e outros ficarão nas comandas individuais dos convidados.' },
      { id: 'comanda-unica', label: '100% Comanda Única',
        desc: 'O anfitrião será responsável por todo o consumo. Os convidados não pagarão nada.' }
    ],

    /* ---- cardapio personalizado impresso ---- */
    // modo: 'fixo' (valor por evento) | 'por_pessoa'
    // valor 0 = aparece na cotacao como "a combinar" e NAO entra no calculo.
    cardapioImpresso: {
      ativo: true,
      modo: 'por_pessoa',
      valor: 1.5,
      aplicaDesconto: true,
      nota: 'Valor do cardápio impresso a combinar com a equipe.'
    },

    /* ---- bebidas alcoolicas ---- */
    // permitirSem = true libera a opcao "nao desejo bebidas alcoolicas".
    // No menu sequencial o pacote Basico de bebidas ja e so nao alcoolico;
    // no rodizio a opcao aparece como caixa de selecao abaixo dos cards.
    // PENDENCIA DE VALIDACAO: o rodizio sem alcool muda de preco? Hoje nao.
    bebidasAlcoolicas: { obrigatorio: false, permitirSem: true },

    /* ---- salada ---- */
    // PENDENCIA DE VALIDACAO: salada no Principal Premium e no Rodizio Premium.
    saladaObrigatoria: true,
    saladaLabel: 'Salada para todos os convidados',

    /* ---- distribuicao de pratos ---- */
    // false = o convidado escolhe o prato no dia, e o anfitriao nao informa
    // quantidades. true = volta a pedir a distribuicao somando os convidados.
    distribuirQuantidades: false,

    /* ---- MENU SEQUENCIAL ---- */
    // Campos opcionais de cada pacote:
    //   desc        linha de apoio no topo da lista de itens
    //   precoTexto  substitui o valor em reais (ex.: 'A parte'), com precoNota embaixo
    //   semPreco    true = o card nao mostra preco (ex.: 'Sem sobremesa')
    //   semPacote   true = o resumo mostra so o nome, sem a palavra 'Pacote'
    // notaOpcoes da categoria aparece no fim dos cards que listam opcoes.
    categorias: [
      {
        id: 'entradas', nome: 'Entradas', obrigatorio: true,
        pacotes: [
          { id: 'basico', tier: 'Básico', preco: 25, itens: [
            'Pão de alho artesanal', 'Linguiça Dom José', 'Pastel Canastra'
          ] },
          { id: 'premium', tier: 'Premium', preco: 39, itens: [
            'Pão de alho artesanal', 'Linguiça Dom José',
            'Pastel Canastra com molho artesanal de pimenta dedo-de-moça',
            'Queijo coalho com melaço de maçã verde', 'Provoleta'
          ] },
          { id: 'cardapio', tier: 'Cardápio normal', preco: 0, semPacote: true,
            precoTexto: 'À parte', precoNota: 'conforme consumo',
            desc: 'As entradas são pedidas do cardápio do restaurante e lançadas conforme o consumo.' }
        ]
      },
      {
        id: 'principal', nome: 'Principal + acompanhamentos', obrigatorio: true,
        notaOpcoes: 'Cada convidado escolhe uma opção.',
        distTitulo: 'Distribuição dos pratos principais',
        distHint: 'Cada convidado tem direito a um prato principal. Informe quantos de cada.',
        distUnidade: 'pratos principais',
        pacotes: [
          { id: 'basico', tier: 'Básico', preco: 65, salada: true, distribuir: true, opcoes: [
            { curto: 'Chorizo Angus', nome: 'Chorizo Angus com batata ao murro, chimichurri e Farofa Puerto Madero' },
            { curto: 'Costela Angus', nome: 'Costela Angus com Arroz Biro-Biro e mandioca cozida na manteiga' },
            { curto: 'Galeto na brasa', nome: 'Galeto na brasa com arroz e batata rústica' }
          ] },
          { id: 'premium', tier: 'Premium', preco: 85, salada: true, distribuir: true, opcoes: [
            { curto: 'Picanha Angus', nome: 'Picanha Angus com batata ao murro, chimichurri e Farofa Puerto Madero' },
            { curto: 'Filet Mignon', nome: 'Filet Mignon com Arroz Biro-Biro e mandioca cozida na manteiga' },
            { curto: 'Costela Angus', nome: 'Costela Angus com Arroz Biro-Biro e mandioca cozida na manteiga' },
            { curto: 'Salmão na brasa', nome: 'Salmão na brasa com arroz e mix de legumes braseados' }
          ] }
        ]
      },
      {
        id: 'sobremesa', nome: 'Sobremesa', obrigatorio: true,
        notaOpcoes: 'Uma por convidado.',
        distTitulo: 'Distribuição das sobremesas',
        distHint: 'Cada convidado tem direito a uma sobremesa. Informe quantas de cada.',
        distUnidade: 'sobremesas',
        pacotes: [
          { id: 'basico', tier: 'Básico', preco: 15, distribuir: false, itens: [
            'Pudim de leite condensado'
          ] },
          { id: 'premium', tier: 'Premium', preco: 22, distribuir: true, opcoes: [
            { curto: 'Brownie', nome: 'Brownie chocolatudo com sorvete de creme' },
            { curto: 'Banana Maravilha', nome: 'Banana Maravilha',
              desc: 'Banana na brasa finalizada com caramelo e canela, uma bola de sorvete de creme e uma colher de doce de leite argentino.' }
          ] },
          { id: 'sem', tier: 'Sem sobremesa', preco: 0, semPacote: true, semPreco: true,
            desc: 'O evento não terá sobremesa.' }
        ]
      },
      {
        id: 'bebidas', nome: 'Bebidas à vontade', obrigatorio: true,
        pacotes: [
          { id: 'basico', tier: 'Básico', preco: 30,
            desc: 'Bebidas não alcoólicas à vontade',
            itens: ['Água com e sem gás', 'Suco natural', 'Refrigerante em lata'] },
          { id: 'premium', tier: 'Premium', preco: 50,
            desc: 'Bebidas não alcoólicas e chopp à vontade',
            itens: ['Água com e sem gás', 'Suco natural', 'Refrigerante em lata', 'Chopp Heineken'] },
          { id: 'super', tier: 'Super Premium', preco: 80,
            desc: 'Bebidas não alcoólicas e chopp à vontade',
            itens: [
              'Água com e sem gás', 'Suco natural', 'Refrigerante em lata',
              'Chopp Heineken', 'Chopp Lagunitas IPA', 'Chopp Blue Moon',
              'Vinho branco chileno', 'Vinho tinto argentino',
              '3 drinks alcoólicos à sua escolha'
            ] },
          { id: 'parte', tier: 'Sem pacote de bebidas', preco: 0, semPacote: true,
            precoTexto: 'À parte', precoNota: 'conforme consumo',
            desc: 'As bebidas serão pedidas à parte, conforme o consumo.' }
        ]
      }
    ],

    /* ---- RODIZIO ---- */
    rodizios: [
      {
        id: 'basico', nome: 'Rodízio Básico', preco: 160,
        blocos: [
          { titulo: 'Entradas', itens: ['Pão de alho artesanal', 'Linguiça Dom José', 'Pastel Canastra'] },
          { titulo: 'Sobremesa', itens: ['Pudim de leite condensado'] },
          { titulo: 'Bebidas não alcoólicas', itens: ['Água', 'Suco', 'Refrigerante em lata'] },
          { titulo: 'Bebida alcoólica', alcool: true, itens: ['Cerveja 600 ml'] }
        ],
        salada: true,
        principais: [
          { curto: 'Chorizo Angus', nome: 'Chorizo Angus com batata ao murro, chimichurri e Farofa Puerto Madero' },
          { curto: 'Costela Angus', nome: 'Costela Angus com Arroz Biro-Biro e mandioca cozida na manteiga' },
          { curto: 'Galeto na brasa', nome: 'Galeto na brasa com arroz e batata rústica' }
        ],
        sobremesas: null
      },
      {
        id: 'premium', nome: 'Rodízio Premium', preco: 200,
        blocos: [
          { titulo: 'Entradas', itens: [
            'Pão de alho artesanal', 'Linguiça Dom José',
            'Pastel Canastra com molho artesanal de pimenta dedo-de-moça',
            'Queijo coalho com melaço de maçã verde', 'Provoleta'
          ] },
          { titulo: 'Bebidas não alcoólicas', itens: ['2 mocktails', 'Água', 'Suco natural', 'Refrigerante em lata'] },
          { titulo: 'Bebidas alcoólicas', alcool: true, itens: ['Chopp Heineken', 'Caipirinha', 'Caipiroska', 'Vinho'] }
        ],
        salada: true,
        principais: [
          { curto: 'Picanha Angus', nome: 'Picanha Angus com batata ao murro, chimichurri e Farofa Puerto Madero' },
          { curto: 'Filet Mignon', nome: 'Filet Mignon com Arroz Biro-Biro e mandioca cozida na manteiga' },
          { curto: 'Salmão na brasa', nome: 'Salmão na brasa com arroz e mix de legumes braseados' }
        ],
        sobremesas: [
          { curto: 'Brownie', nome: 'Brownie chocolatudo com sorvete de creme' },
          { curto: 'Banana Maravilha', nome: 'Banana Maravilha',
            desc: 'Banana na brasa finalizada com caramelo e canela, uma bola de sorvete de creme e uma colher de doce de leite argentino.' }
        ]
      }
    ],

    /* ---- textos comerciais editaveis ---- */
    textos: {
      whatsappAbertura: 'Olá! Fiz uma cotação de evento no Maria e José Parrilla e gostaria de falar com a equipe sobre minha proposta.',
      propostaAbertura: 'Olá! Fiz uma cotação no site e gostaria de uma proposta totalmente personalizada para o meu evento.',
      // aparecem no resultado, logo acima do botão do WhatsApp; vazio = não mostra
      ofertaFechamento: 'Você tem <strong>48h</strong> para fechar o evento e <strong>ganhar o cardápio impresso sem custo</strong>.',
      validadeProposta: 'Proposta válida por uma semana. Para fechar, clique no botão do WhatsApp abaixo.'
    }
  };

  function isPlain(o) {
    return o && typeof o === 'object' && !Array.isArray(o);
  }
  function deepMerge(base, over) {
    var out = {}, k;
    for (k in base) if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k];
    for (k in over) {
      if (!Object.prototype.hasOwnProperty.call(over, k)) continue;
      out[k] = (isPlain(base[k]) && isPlain(over[k])) ? deepMerge(base[k], over[k]) : over[k];
    }
    return out;
  }

  var CONFIG = deepMerge(DEFAULTS, window.MEJ_ORCAMENTO_CONFIG || {});

  /* ==========================================================================
     2. HELPERS
     ========================================================================== */

  var $ = function (id) { return document.getElementById(id); };
  var BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function round2(v) {
    return Math.round((Number(v) || 0) * 100) / 100;
  }
  function money(v) { return BRL.format(round2(v)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var DIA_LABEL = {
    0: 'Domingo', 1: 'Segunda-feira', 2: 'Terça-feira', 3: 'Quarta-feira',
    4: 'Quinta-feira', 5: 'Sexta-feira', 6: 'Sábado'
  };
  function pad2(n) { return String(n).length < 2 ? '0' + n : String(n); }
  function parseISO(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    if (!m) return null;
    var d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return isNaN(d.getTime()) ? null : d;
  }
  function fmtBR(iso) {
    var d = parseISO(iso);
    if (!d) return '';
    return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function isoLocal(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function diaPermitido(v) {
    return CONFIG.diasSemana.some(function (d) { return d.v === v; });
  }

  /* ==========================================================================
     3. ESTADO
     ========================================================================== */

  function estadoVazio() {
    return {
      nome: '', whats: '', data: '', semData: false, dia: null,
      turno: '', tema: '', temaOutro: '',
      convidados: null, privativo: '', ambiente: '',
      consumo: '', impresso: '',
      formato: '', rodizio: '',
      pacotes: {}, semAlcool: false,
      dist: { principal: {}, sobremesa: {} }
    };
  }
  var S = estadoVazio();

  var STEP = 1;
  var SUB = 0;          // 0 = escolha do formato; 1..n = passos do cardapio
  var MAX_STEP = 5;
  var stepAlcancado = 1;
  function novoEventId() {
    return 'orc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
  }
  var EVENT_ID = novoEventId();
  var leadParcialEnviado = false;

  /* ==========================================================================
     4. LOOKUPS
     ========================================================================== */

  function getCat(id) {
    for (var i = 0; i < CONFIG.categorias.length; i++) {
      if (CONFIG.categorias[i].id === id) return CONFIG.categorias[i];
    }
    return null;
  }
  function getPacote(cat, pid) {
    if (!cat || !pid) return null;
    for (var i = 0; i < cat.pacotes.length; i++) {
      if (cat.pacotes[i].id === pid) return cat.pacotes[i];
    }
    return null;
  }
  function getRodizio(id) {
    for (var i = 0; i < CONFIG.rodizios.length; i++) {
      if (CONFIG.rodizios[i].id === id) return CONFIG.rodizios[i];
    }
    return null;
  }
  function getAmbiente(id) {
    for (var i = 0; i < CONFIG.ambientes.length; i++) {
      if (CONFIG.ambientes[i].id === id) return CONFIG.ambientes[i];
    }
    return null;
  }
  function getTema(id) {
    for (var i = 0; i < CONFIG.temas.length; i++) {
      if (CONFIG.temas[i].id === id) return CONFIG.temas[i];
    }
    return null;
  }
  function getTurno(id) {
    for (var i = 0; i < CONFIG.turnos.length; i++) {
      if (CONFIG.turnos[i].id === id) return CONFIG.turnos[i];
    }
    return null;
  }
  function getConsumo(id) {
    for (var i = 0; i < CONFIG.consumo.length; i++) {
      if (CONFIG.consumo[i].id === id) return CONFIG.consumo[i];
    }
    return null;
  }

  // dia da semana efetivo: vem da data informada, ou do seletor manual
  function diaSemana() {
    if (S.data) {
      var d = parseISO(S.data);
      if (d) return d.getDay();
    }
    return (S.dia === null || S.dia === '') ? null : Number(S.dia);
  }
  function temDesconto() {
    var d = diaSemana();
    return d !== null && CONFIG.desconto.dias.indexOf(d) !== -1;
  }

  /* grupos de distribuicao ativos agora: [{key, titulo, hint, unidade, opcoes}] */
  function gruposDist() {
    var out = [];
    if (!CONFIG.distribuirQuantidades) return out;
    if (S.formato === 'sequencial') {
      ['principal', 'sobremesa'].forEach(function (cid) {
        var cat = getCat(cid);
        var p = getPacote(cat, S.pacotes[cid]);
        if (p && p.distribuir && p.opcoes && p.opcoes.length) {
          out.push({
            key: cid, titulo: cat.distTitulo, hint: cat.distHint,
            unidade: cat.distUnidade, opcoes: p.opcoes
          });
        }
      });
    } else if (S.formato === 'rodizio') {
      var r = getRodizio(S.rodizio);
      if (r) {
        if (r.principais && r.principais.length) {
          out.push({
            key: 'principal', titulo: 'Distribuição dos pratos principais',
            hint: 'Cada convidado tem direito a um prato principal. Informe quantos de cada.',
            unidade: 'pratos principais', opcoes: r.principais
          });
        }
        if (r.sobremesas && r.sobremesas.length) {
          out.push({
            key: 'sobremesa', titulo: 'Distribuição das sobremesas',
            hint: 'Cada convidado tem direito a uma sobremesa. Informe quantas de cada.',
            unidade: 'sobremesas', opcoes: r.sobremesas
          });
        }
      }
    }
    return out;
  }
  function grupoPorKey(key) {
    var found = null;
    gruposDist().forEach(function (g) { if (g.key === key) found = g; });
    return found;
  }
  function somaDist(key) {
    var t = 0, o = S.dist[key] || {}, k;
    for (k in o) if (Object.prototype.hasOwnProperty.call(o, k)) t += Number(o[k]) || 0;
    return t;
  }
  // divide os convidados o mais igualmente possivel entre as opcoes
  function distribuirIgual(key, opcoes) {
    var g = Number(S.convidados) || 0;
    var n = opcoes.length;
    if (!g || !n) { S.dist[key] = {}; return; }
    var base = Math.floor(g / n), resto = g % n, novo = {};
    for (var i = 0; i < n; i++) novo[i] = base + (i < resto ? 1 : 0);
    S.dist[key] = novo;
  }

  /* ==========================================================================
     5. CALCULO
     --------------------------------------------------------------------------
     Ordem obrigatoria (briefing 21.5): pacotes x convidados -> soma adicionais
     -> desconto sobre o subtotal geral dos itens elegiveis.
     ========================================================================== */

  function calc() {
    var g = Number(S.convidados) || 0;
    var perPessoa = 0;

    if (S.formato === 'sequencial') {
      CONFIG.categorias.forEach(function (cat) {
        if (cat.alcool && S.semAlcool) return;
        var p = getPacote(cat, S.pacotes[cat.id]);
        if (!p) return;
        perPessoa += Number(p.preco) || 0;
      });
    } else if (S.formato === 'rodizio') {
      var r = getRodizio(S.rodizio);
      if (r) perPessoa = Number(r.preco) || 0;
    }
    perPessoa = round2(perPessoa);

    var subConv = round2(perPessoa * g);

    /* ---- adicionais ---- */
    var adicionais = [];

    var ci = CONFIG.cardapioImpresso;
    if (ci.ativo && S.impresso === 'sim' && Number(ci.valor) > 0) {
      adicionais.push({
        label: 'Cardápio personalizado impresso',
        valor: ci.modo === 'por_pessoa' ? round2(Number(ci.valor) * g) : round2(Number(ci.valor)),
        desconta: !!(ci.aplicaDesconto && CONFIG.desconto.itens.cardapio)
      });
    }

    var amb = getAmbiente(S.ambiente);
    if (amb && amb.taxa && amb.taxa.tipo !== 'nenhuma' && Number(amb.taxa.valor) > 0) {
      adicionais.push({
        label: 'Taxa de ambiente - ' + amb.nome,
        valor: amb.taxa.tipo === 'por_pessoa'
          ? round2(Number(amb.taxa.valor) * g) : round2(Number(amb.taxa.valor)),
        desconta: !!CONFIG.desconto.itens.ambiente
      });
    }

    var pv = CONFIG.privativo;
    if (S.privativo === 'sim' && pv.afetaPreco && pv.taxa.tipo !== 'nenhuma' && Number(pv.taxa.valor) > 0) {
      adicionais.push({
        label: 'Taxa de ambiente privativo',
        valor: pv.taxa.tipo === 'por_pessoa'
          ? round2(Number(pv.taxa.valor) * g) : round2(Number(pv.taxa.valor)),
        desconta: !!CONFIG.desconto.itens.privativo
      });
    }

    var totalAdic = round2(adicionais.reduce(function (a, b) { return a + b.valor; }, 0));
    var subGeral = round2(subConv + totalAdic);

    var ativo = temDesconto();
    var base = 0;
    if (ativo) {
      if (CONFIG.desconto.itens.pacotes) base += subConv;
      adicionais.forEach(function (a) { if (a.desconta) base += a.valor; });
    }
    var desconto = ativo ? round2(base * (Number(CONFIG.desconto.percentual) || 0) / 100) : 0;
    var total = round2(subGeral - desconto);

    return {
      convidados: g,
      perPessoa: perPessoa,
      subConv: subConv,
      adicionais: adicionais,
      totalAdic: totalAdic,
      subGeral: subGeral,
      temDesconto: ativo,
      percentual: Number(CONFIG.desconto.percentual) || 0,
      desconto: desconto,
      total: total,
      perPessoaFinal: g ? round2(total / g) : 0
    };
  }

  /* ==========================================================================
     6. RENDER DOS CAMPOS DINAMICOS
     ========================================================================== */

  function optCard(name, value, titulo, desc, meta, checked, disabled) {
    return '' +
      '<label class="mejo-opt">' +
        '<input type="radio" name="' + name + '" value="' + esc(value) + '"' +
          (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + ' />' +
        '<span class="mejo-opt__box">' +
          '<span class="mejo-opt__name">' + esc(titulo) + '</span>' +
          (desc ? '<span class="mejo-opt__desc">' + esc(desc) + '</span>' : '') +
          (meta ? '<span class="mejo-opt__meta">' + esc(meta) + '</span>' : '') +
        '</span>' +
      '</label>';
  }

  function renderEstaticos() {
    var html = '<option value="">Selecione o dia</option>';
    CONFIG.diasSemana.forEach(function (d) {
      var off = CONFIG.desconto.dias.indexOf(d.v) !== -1;
      html += '<option value="' + d.v + '">' + esc(d.label) +
              (off ? ' - ' + CONFIG.desconto.percentual + '% de desconto' : '') + '</option>';
    });
    $('mejo-dia').innerHTML = html;

    $('mejo-turnos').innerHTML = CONFIG.turnos.map(function (t) {
      return optCard('mejo-turno', t.id, t.label, t.desc, '', false, false);
    }).join('');

    $('mejo-temas').innerHTML = CONFIG.temas.map(function (t) {
      return optCard('mejo-tema', t.id, t.label, '', '', false, false);
    }).join('');

    $('mejo-privativo').innerHTML =
      optCard('mejo-priv', 'sim', 'Sim', 'Quero um espaço reservado', '', false, false) +
      optCard('mejo-priv', 'nao', 'Não', 'Pode ser ambiente compartilhado', '', false, false);
    $('mejo-privativo-nota').textContent = CONFIG.privativo.nota || '';

    $('mejo-consumo').innerHTML = CONFIG.consumo.map(function (c) {
      return optCard('mejo-consumo-r', c.id, c.label, c.desc, '', false, false);
    }).join('');

    if (!CONFIG.cardapioImpresso.ativo) {
      $('mejo-block-cardapio').hidden = true;
    } else {
      var ci = CONFIG.cardapioImpresso;
      var metaSim = Number(ci.valor) > 0 ? metaImpresso() : 'valor a combinar';
      $('mejo-impresso').innerHTML =
        optCard('mejo-impresso-r', 'sim', 'Sim', '', metaSim, false, false) +
        optCard('mejo-impresso-r', 'nao', 'Não quero', '', 'sem custo', false, false);
      if (Number(ci.valor) <= 0 && ci.nota) $('mejo-cardapio-hint').textContent = ci.nota;
    }

    var menorSeq = CONFIG.categorias.reduce(function (acc, cat) {
      return acc + Math.min.apply(null, cat.pacotes.map(function (p) { return Number(p.preco) || 0; }));
    }, 0);
    var menorRod = Math.min.apply(null, CONFIG.rodizios.map(function (r) { return Number(r.preco) || 0; }));

    $('mejo-formato').innerHTML = '' +
      '<label class="mejo-format__opt">' +
        '<input type="radio" name="mejo-formato-r" value="sequencial" />' +
        '<span class="mejo-format__box">' +
          '<span class="mejo-format__name">Menu Sequencial</span>' +
          '<span class="mejo-format__desc">Monte seu menu personalizado, escolhendo pacote por pacote.</span>' +
          '<span class="mejo-format__from">A partir de ' + money(menorSeq) + ' por pessoa</span>' +
        '</span>' +
      '</label>' +
      '<label class="mejo-format__opt">' +
        '<input type="radio" name="mejo-formato-r" value="rodizio" />' +
        '<span class="mejo-format__box">' +
          '<span class="mejo-format__name">Rodízio</span>' +
          '<span class="mejo-format__desc">Tudo à vontade, com entradas, principais, sobremesa e bebidas inclusos.</span>' +
          '<span class="mejo-format__from">A partir de ' + money(menorRod) + ' por pessoa</span>' +
        '</span>' +
      '</label>';

    renderAmbientes();
  }

  function renderAmbientes() {
    var g = Number(S.convidados) || 0;
    var querPriv = S.privativo === 'sim';

    $('mejo-ambientes').innerHTML = CONFIG.ambientes.map(function (a) {
      var bloqueio = '';
      if (g > 0) {
        if (a.min && g < a.min) {
          bloqueio = 'O ' + a.nome + ' possui minimo de ' + a.min +
            ' convidados. Altere o número de convidados ou escolha outro ambiente.';
        } else if (a.max && g > a.max) {
          bloqueio = 'O ' + a.nome + ' acomoda ate ' + a.max +
            ' convidados. Altere o número de convidados ou escolha outro ambiente.';
        }
      }
      if (!bloqueio && CONFIG.privativo.filtraAmbientes && querPriv && !a.privativo) {
        bloqueio = 'O ' + a.nome + ' nao funciona como ambiente privativo.';
      }

      var cap;
      if (a.min && a.max)  cap = 'De ' + a.min + ' a ' + a.max + ' convidados';
      else if (a.min)      cap = 'Mínimo de ' + a.min + ' convidados';
      else if (a.max)      cap = 'Até ' + a.max + ' convidados';
      else                 cap = 'Capacidade sob consulta';

      return '' +
        '<label class="mejo-place__opt' + (bloqueio ? ' is-blocked' : '') + '">' +
          '<input type="radio" name="mejo-ambiente-r" value="' + esc(a.id) + '"' +
            (S.ambiente === a.id && !bloqueio ? ' checked' : '') + (bloqueio ? ' disabled' : '') + ' />' +
          '<span class="mejo-place__box">' +
            (a.foto
              ? '<img class="mejo-place__img" src="' + esc(a.foto) + '" alt="" loading="lazy" />'
              : '<span class="mejo-place__img" style="background:var(--c-bg-soft)"></span>') +
            '<span class="mejo-place__body">' +
              '<span class="mejo-place__name">' + esc(a.nome) + '</span>' +
              '<span class="mejo-place__desc">' + esc(a.desc || '') + '</span>' +
              '<span class="mejo-place__cap">' + esc(cap) + '</span>' +
              (bloqueio ? '<span class="mejo-place__warn">' + esc(bloqueio) + '</span>' : '') +
            '</span>' +
          '</span>' +
        '</label>';
    }).join('');

    if (!$('mejo-ambientes').querySelector('input:checked')) S.ambiente = '';
  }

  function precoCard(p) {
    if (p.semPreco) return '';
    if (p.precoTexto) {
      return '<span class="mejo-pack__price">' + esc(p.precoTexto) +
        (p.precoNota ? '<small>' + esc(p.precoNota) + '</small>' : '') + '</span>';
    }
    return '<span class="mejo-pack__price">' + money(p.preco) + '<small>por pessoa</small></span>';
  }

  // usados no resumo e na mensagem do WhatsApp
  function nomePacote(p) { return p.semPacote ? p.tier : 'Pacote ' + p.tier; }
  function precoResumo(p) {
    if (p.semPreco) return 'sem custo';
    if (p.precoTexto) return (p.precoTexto + (p.precoNota ? ' ' + p.precoNota : '')).toLowerCase();
    return money(p.preco) + ' por pessoa';
  }

  function metaImpresso() {
    var ci = CONFIG.cardapioImpresso;
    return money(ci.valor) + (ci.modo === 'por_pessoa' ? ' por pessoa' : ' por evento');
  }

  function packCard(cat, p, checked) {
    var catId = cat.id;
    var linhas = '';
    if (p.desc) linhas += '<span class="mejo-pack__desc">' + esc(p.desc) + '</span>';
    if (p.salada && CONFIG.saladaObrigatoria) {
      linhas += '<span class="mejo-pack__item mejo-pack__item--fixed">' +
        esc(CONFIG.saladaLabel) + '</span>';
    }
    (p.itens || []).forEach(function (i) {
      linhas += '<span class="mejo-pack__item">' + esc(i) + '</span>';
    });
    (p.opcoes || []).forEach(function (o) {
      linhas += '<span class="mejo-pack__item">' + esc(o.nome) + '</span>';
    });
    if (p.opcoes && p.opcoes.length) {
      var nota = CONFIG.distribuirQuantidades
        ? 'Um por convidado. Você distribui as quantidades.'
        : (cat.notaOpcoes || '');
      if (nota) linhas += '<span class="mejo-pack__nota">' + esc(nota) + '</span>';
    }

    return '' +
      '<label class="mejo-pack__opt">' +
        '<input type="radio" name="mejo-pack-' + esc(catId) + '" value="' + esc(p.id) + '"' +
          (checked ? ' checked' : '') + ' />' +
        '<span class="mejo-pack__box">' +
          '<span class="mejo-pack__top">' +
            '<span class="mejo-pack__tier">' + esc(p.tier) + '</span>' +
            precoCard(p) +
          '</span>' +
          '<span class="mejo-pack__list">' + linhas + '</span>' +
        '</span>' +
      '</label>';
  }

  function msgDist(grp, soma, g) {
    if (soma > g) return 'A quantidade de ' + grp.unidade + ' selecionada ultrapassa o numero de convidados.';
    if (soma < g) return 'Você possui ' + g + ' convidados. Ainda faltam selecionar ' +
      (g - soma) + ' ' + grp.unidade + '.';
    return '';
  }

  function distBlock(grp) {
    var g = Number(S.convidados) || 0;
    var atual = S.dist[grp.key] || {};

    var rows = grp.opcoes.map(function (o, i) {
      var q = Number(atual[i]) || 0;
      return '' +
        '<div class="mejo-dist__row">' +
          '<div class="mejo-dist__info">' +
            '<p class="mejo-dist__name">' + esc(o.curto) + '</p>' +
            '<p class="mejo-dist__desc">' + esc(o.desc || o.nome) + '</p>' +
          '</div>' +
          '<div class="mejo-stepper">' +
            '<button type="button" class="mejo-stepper__btn" data-dist="' + grp.key +
              '" data-i="' + i + '" data-d="-1" aria-label="Diminuir ' + esc(o.curto) + '">&minus;</button>' +
            '<input class="mejo-stepper__input" type="number" inputmode="numeric" min="0" step="1" ' +
              'value="' + q + '" data-distinput="' + grp.key + '" data-i="' + i + '" ' +
              'aria-label="Quantidade de ' + esc(o.curto) + '" />' +
            '<button type="button" class="mejo-stepper__btn" data-dist="' + grp.key +
              '" data-i="' + i + '" data-d="1" aria-label="Aumentar ' + esc(o.curto) + '">+</button>' +
          '</div>' +
        '</div>';
    }).join('');

    var soma = somaDist(grp.key);
    var cls = soma === g ? 'is-ok' : (soma > g ? 'is-bad' : '');

    return '' +
      '<div class="mejo-dist" data-distgroup="' + grp.key + '">' +
        '<p class="mejo-dist__title">' + esc(grp.titulo) + '</p>' +
        '<p class="mejo-dist__hint">' + esc(grp.hint) + '</p>' +
        rows +
        '<div class="mejo-dist__foot">' +
          '<p class="mejo-dist__count ' + cls + '">Total selecionado: <strong>' + soma +
            '</strong> de ' + g + '</p>' +
          '<button type="button" class="mejo-dist__split" data-split="' + grp.key +
            '">Distribuir igualmente</button>' +
        '</div>' +
        '<p class="mejo-dist__msg">' + esc(msgDist(grp, soma, g)) + '</p>' +
      '</div>';
  }

  /* --------------------------------------------------------------------
     Sub-etapas do cardapio.

     A etapa 4 chegava a 4025px de altura no celular, cinco telas de
     rolagem com sete decisoes empilhadas. Agora e uma decisao por tela:
     primeiro o formato, depois cada categoria do menu sequencial, ou a
     escolha do rodizio. O progresso do topo continua marcando "Cardapio",
     porque continua sendo uma etapa so no fluxo do briefing.
     -------------------------------------------------------------------- */

  function passosCardapio() {
    if (S.formato === 'sequencial') {
      return CONFIG.categorias.map(function (cat) {
        return { tipo: 'categoria', cat: cat, titulo: cat.nome };
      });
    }
    if (S.formato === 'rodizio') {
      return [{ tipo: 'rodizio', titulo: 'Escolha o rodízio' }];
    }
    return [];
  }

  function totalPassos() { return passosCardapio().length; }

  function passoAtual() {
    var lista = passosCardapio();
    return SUB > 0 ? lista[SUB - 1] : null;
  }

  // grupos de distribuicao que pertencem ao passo aberto
  function gruposDoPasso(passo) {
    if (!passo) return [];
    var todos = gruposDist();
    if (passo.tipo === 'rodizio') return todos;
    return todos.filter(function (g) { return g.key === passo.cat.id; });
  }

  function renderSubProgresso() {
    var caixa = $('mejo-sub');
    var total = totalPassos();
    var mostra = SUB > 0 && total > 1;
    caixa.hidden = !mostra;
    if (!mostra) { $('mejo-sub-txt').textContent = ''; $('mejo-sub-pontos').innerHTML = ''; return; }
    var pontos = '';
    for (var i = 1; i <= total; i++) {
      pontos += '<span class="mejo-sub__ponto' +
        (i < SUB ? ' is-feito' : (i === SUB ? ' is-atual' : '')) + '"></span>';
    }
    $('mejo-sub-pontos').innerHTML = pontos;
    var passo = passoAtual();
    $('mejo-sub-txt').textContent = (passo ? passo.titulo : '') + ' \u00b7 ' + SUB + ' de ' + total;
  }

  function renderCardapio() {
    var caixa = $('mejo-cardapio-passo');
    $('mejo-bloco-formato').hidden = SUB !== 0;
    renderSubProgresso();

    if (SUB === 0) { caixa.innerHTML = ''; return; }

    var passo = passoAtual();
    if (!passo) { caixa.innerHTML = ''; return; }

    var grupos = gruposDoPasso(passo);

    if (passo.tipo === 'categoria') {
      var cat = passo.cat;
      var escolhido = S.pacotes[cat.id] || '';
      var semAlc = cat.alcool && S.semAlcool;
      caixa.innerHTML = '' +
        '<div class="mejo-block">' +
          '<p class="mejo-block__title">' + esc(cat.nome) +
            (cat.obrigatorio ? ' <span class="mejo-req">*</span>' : '') + '</p>' +
          '<p class="mejo-block__hint">Escolha uma opção nesta categoria.</p>' +
          (semAlc ? '' :
            '<div class="mejo-pack">' + cat.pacotes.map(function (pk) {
              return packCard(cat, pk, escolhido === pk.id);
            }).join('') + '</div>') +
          (cat.alcool && CONFIG.bebidasAlcoolicas.permitirSem
            ? '<label class="mejo-check"><input type="checkbox" id="mejo-sem-alcool"' +
              (S.semAlcool ? ' checked' : '') +
              ' /><span>Não desejo bebidas alcoólicas no meu evento</span></label>'
            : '') +
          grupos.map(distBlock).join('') +
          '<p class="mejo-error" id="mejo-err-pack-' + esc(cat.id) + '">Escolha um pacote de ' +
            esc(cat.nome.toLowerCase()) + '.</p>' +
        '</div>';
      return;
    }

    // rodizio
    var cards = CONFIG.rodizios.map(function (r) {
      var blocos = (r.salada && CONFIG.saladaObrigatoria)
        ? [{ titulo: 'Acompanhamento', itens: [CONFIG.saladaLabel] }].concat(r.blocos)
        : r.blocos;

      // O título da categoria não leva marcador: o ponto fica só nos itens,
      // e é essa diferença que deixa o olho separar um grupo do outro.
      var lista = '';
      function grupo(titulo, nota, itens) {
        lista += '<span class="mejo-pack__titulo">' + esc(titulo) +
          (nota ? ' <small>' + esc(nota) + '</small>' : '') + '</span>';
        itens.forEach(function (i) {
          lista += '<span class="mejo-pack__item">' + esc(i) + '</span>';
        });
      }
      function nomes(ops) { return ops.map(function (o) { return o.nome; }); }

      blocos.forEach(function (b) {
        if (b.alcool && S.semAlcool) return;
        grupo(b.titulo, '', b.itens);
      });
      if (r.principais && r.principais.length) {
        grupo('Principais', CONFIG.distribuirQuantidades ? 'um por convidado' : 'cada convidado escolhe um',
          nomes(r.principais));
      }
      if (r.sobremesas && r.sobremesas.length) {
        grupo('Sobremesas', 'uma por convidado', nomes(r.sobremesas));
      }

      return '' +
        '<label class="mejo-pack__opt">' +
          '<input type="radio" name="mejo-rodizio-r" value="' + esc(r.id) + '"' +
            (S.rodizio === r.id ? ' checked' : '') + ' />' +
          '<span class="mejo-pack__box">' +
            '<span class="mejo-pack__top">' +
              '<span class="mejo-pack__tier">' + esc(r.nome) + '</span>' +
              '<span class="mejo-pack__price">' + money(r.preco) + '<small>por pessoa</small></span>' +
            '</span>' +
            '<span class="mejo-pack__list">' + lista + '</span>' +
          '</span>' +
        '</label>';
    }).join('');

    caixa.innerHTML = '' +
      '<div class="mejo-block">' +
        '<p class="mejo-block__title">Escolha o rodízio <span class="mejo-req">*</span></p>' +
        '<p class="mejo-block__hint">Tudo à vontade. O valor por pessoa inclui todos os itens listados.</p>' +
        // acima dos cards: o card Premium e longo e a caixa sumia la embaixo
        (CONFIG.bebidasAlcoolicas.permitirSem
          ? '<label class="mejo-check mejo-check--topo"><input type="checkbox" id="mejo-sem-alcool"' +
            (S.semAlcool ? ' checked' : '') +
            ' /><span>Não desejo bebidas alcoólicas no meu evento</span></label>'
          : '') +
        '<div class="mejo-pack">' + cards + '</div>' +
        '<p class="mejo-error" id="mejo-err-rodizio">Escolha um rodízio.</p>' +
        grupos.map(distBlock).join('') +
      '</div>';
  }

  /* ==========================================================================
     7. RESUMO
     ========================================================================== */

  function labelTema() {
    var t = getTema(S.tema);
    if (!t) return '-';
    if (t.id === 'outro') return S.temaOutro ? 'Outro - ' + S.temaOutro : 'Outro';
    return t.label;
  }
  function labelDia() {
    var d = diaSemana();
    return d === null ? 'A definir' : DIA_LABEL[d];
  }
  function labelFormato() {
    if (S.formato === 'sequencial') return 'Menu Sequencial';
    if (S.formato === 'rodizio') {
      var r = getRodizio(S.rodizio);
      return r ? r.nome : 'Rodízio';
    }
    return '-';
  }
  function distTexto(key) {
    var grp = grupoPorKey(key);
    if (!grp) return '';
    var o = S.dist[key] || {};
    var partes = [];
    grp.opcoes.forEach(function (op, i) {
      var q = Number(o[i]) || 0;
      if (q > 0) partes.push(q + ' x ' + op.curto);
    });
    return partes.join(', ');
  }

  function renderResumo() {
    var c = calc();

    var rows = [
      ['Nome', S.nome || '-'],
      ['Evento', labelTema()],
      ['Data', S.data ? fmtBR(S.data) : 'A definir'],
      ['Dia da semana', labelDia()],
      ['Turno', (getTurno(S.turno) || {}).label || '-'],
      ['Convidados', String(c.convidados)],
      ['Ambiente', (getAmbiente(S.ambiente) || {}).nome || '-'],
      ['Ambiente privativo', S.privativo === 'sim' ? 'Sim' : (S.privativo === 'nao' ? 'Não' : '-')],
      ['Forma de consumo', (getConsumo(S.consumo) || {}).label || '-'],
      ['Formato', labelFormato()]
    ];
    $('mejo-res-dados').innerHTML = rows.map(function (r) {
      return '<div class="mejo-dl__row"><span class="mejo-dl__k">' + esc(r[0]) +
        '</span><span class="mejo-dl__v">' + esc(r[1]) + '</span></div>';
    }).join('');

    var itens = [];
    if (S.formato === 'sequencial') {
      CONFIG.categorias.forEach(function (cat) {
        if (cat.alcool && S.semAlcool) { itens.push([cat.nome, 'Sem bebidas alcoólicas']); return; }
        var p = getPacote(cat, S.pacotes[cat.id]);
        if (!p) return;
        var det = [];
        if (p.desc) det.push(p.desc);
        if (p.salada && CONFIG.saladaObrigatoria) det.push(CONFIG.saladaLabel);
        (p.itens || []).forEach(function (i) { det.push(i); });
        // sem distribuicao, as opcoes so aparecem aqui
        if (p.opcoes && p.opcoes.length && !grupoPorKey(cat.id)) {
          det.push('Opções: ' + p.opcoes.map(function (o) { return o.curto; }).join(', '));
        }
        itens.push([
          cat.nome + ' - ' + nomePacote(p) + ' (' + precoResumo(p) + ')',
          det.join(' | ')
        ]);
      });
    } else if (S.formato === 'rodizio') {
      var r = getRodizio(S.rodizio);
      if (r) {
        var det2 = [];
        if (r.salada && CONFIG.saladaObrigatoria) det2.push(CONFIG.saladaLabel);
        (r.blocos || []).forEach(function (b) {
          if (b.alcool && S.semAlcool) return;
          det2.push(b.titulo + ': ' + b.itens.join(', '));
        });
        if (S.semAlcool) det2.push('Sem bebidas alcoólicas');
        if (!CONFIG.distribuirQuantidades) {
          var curtos = function (ops) { return ops.map(function (o) { return o.curto; }).join(', '); };
          if (r.principais && r.principais.length) det2.push('Principais: ' + curtos(r.principais));
          if (r.sobremesas && r.sobremesas.length) det2.push('Sobremesas: ' + curtos(r.sobremesas));
        }
        itens.push([r.nome + ' (' + money(r.preco) + ' por pessoa)', det2.join(' | ')]);
      }
    }
    var dp = distTexto('principal');
    if (dp) itens.push(['Pratos principais', dp]);
    var ds = distTexto('sobremesa');
    if (ds) itens.push(['Sobremesas', ds]);
    if (CONFIG.cardapioImpresso.ativo) {
      itens.push(['Cardápio personalizado impresso', S.impresso === 'sim'
        ? (Number(CONFIG.cardapioImpresso.valor) > 0 ? 'Sim (' + metaImpresso() + ')' : 'Sim - valor a combinar com a equipe')
        : 'Não']);
    }
    $('mejo-res-itens').innerHTML = itens.map(function (i) {
      return '<div class="mejo-item"><p class="mejo-item__cat">' + esc(i[0]) +
        '</p><p class="mejo-item__val">' + esc(i[1]) + '</p></div>';
    }).join('');

    var m = '';
    m += '<div class="mejo-money__row"><span>Valor dos pacotes por pessoa</span><strong>' +
         money(c.perPessoa) + '</strong></div>';
    m += '<div class="mejo-money__row"><span>Subtotal dos convidados (' + c.convidados +
         ' x ' + money(c.perPessoa) + ')</span><strong>' + money(c.subConv) + '</strong></div>';
    if (c.adicionais.length) {
      c.adicionais.forEach(function (a) {
        m += '<div class="mejo-money__row"><span>' + esc(a.label) + '</span><strong>' +
             money(a.valor) + '</strong></div>';
      });
    } else {
      m += '<div class="mejo-money__row"><span>Adicionais</span><strong>' + money(0) + '</strong></div>';
    }
    m += '<div class="mejo-money__row mejo-money__row--sub"><span>Subtotal geral</span><strong>' +
         money(c.subGeral) + '</strong></div>';
    if (c.temDesconto) {
      m += '<div class="mejo-money__row mejo-money__row--disc"><span>Desconto de dia de semana (' +
           c.percentual + '%)</span><strong>- ' + money(c.desconto) + '</strong></div>';
    }
    $('mejo-res-money').innerHTML = m;

    $('mejo-res-total').textContent = money(c.total);
    $('mejo-res-per').textContent = c.convidados
      ? 'Equivale a ' + money(c.perPessoaFinal) + ' por convidado'
      : '';

    var badge = $('mejo-res-badge');
    if (c.temDesconto) {
      badge.hidden = false;
      badge.textContent = c.percentual + '% de desconto aplicado - ' + labelDia();
    } else {
      badge.hidden = true;
    }

    var oferta = CONFIG.textos.ofertaFechamento || '';
    var validade = CONFIG.textos.validadeProposta || '';
    $('mejo-oferta').hidden = !oferta && !validade;
    $('mejo-oferta-48h').innerHTML = oferta;
    $('mejo-oferta-48h').hidden = !oferta;
    $('mejo-oferta-validade').textContent = validade;
    $('mejo-oferta-validade').hidden = !validade;

    $('mejo-cta-whats').href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' +
      encodeURIComponent(montarMensagem(c, CONFIG.textos.whatsappAbertura));
    $('mejo-cta-proposta').href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' +
      encodeURIComponent(montarMensagem(c, CONFIG.textos.propostaAbertura));
  }

  function montarMensagem(c, abertura) {
    var L = [];
    L.push(abertura);
    L.push('');
    L.push('*MINHA COTAÇÃO*');
    L.push('Nome: ' + (S.nome || '-'));
    L.push('WhatsApp: ' + (S.whats || '-'));
    L.push('Data: ' + (S.data ? fmtBR(S.data) : 'a definir'));
    L.push('Dia: ' + labelDia());
    L.push('Turno: ' + ((getTurno(S.turno) || {}).label || '-'));
    L.push('Tema: ' + labelTema());
    L.push('Convidados: ' + c.convidados);
    L.push('Ambiente: ' + ((getAmbiente(S.ambiente) || {}).nome || '-'));
    L.push('Ambiente privativo: ' + (S.privativo === 'sim' ? 'Sim' : 'Não'));
    L.push('Forma de consumo: ' + ((getConsumo(S.consumo) || {}).label || '-'));
    L.push('Formato: ' + labelFormato());
    L.push('');
    L.push('*PACOTES*');
    if (S.formato === 'sequencial') {
      CONFIG.categorias.forEach(function (cat) {
        if (cat.alcool && S.semAlcool) { L.push('- ' + cat.nome + ': sem bebidas alcoolicas'); return; }
        var p = getPacote(cat, S.pacotes[cat.id]);
        if (p) L.push('- ' + cat.nome + ': ' + p.tier + ' (' + precoResumo(p) + ')');
      });
    } else {
      var r = getRodizio(S.rodizio);
      if (r) L.push('- ' + r.nome + ' (' + money(r.preco) + ' por pessoa)');
      if (r && S.semAlcool) L.push('- Sem bebidas alcoólicas');
    }
    var dp = distTexto('principal');
    if (dp) { L.push(''); L.push('*PRATOS PRINCIPAIS*'); L.push(dp); }
    var ds = distTexto('sobremesa');
    if (ds) { L.push(''); L.push('*SOBREMESAS*'); L.push(ds); }
    L.push('');
    L.push('*ADICIONAIS*');
    // quando cobrado, o impresso ja aparece com o valor na lista de adicionais
    var impressoCobrado = S.impresso === 'sim' && Number(CONFIG.cardapioImpresso.valor) > 0;
    if (CONFIG.cardapioImpresso.ativo && !impressoCobrado) {
      L.push('- Cardápio impresso: ' + (S.impresso === 'sim'
        ? (Number(CONFIG.cardapioImpresso.valor) > 0 ? 'Sim (' + metaImpresso() + ')' : 'Sim (valor a combinar)')
        : 'Não'));
    }
    if (c.adicionais.length) {
      c.adicionais.forEach(function (a) { L.push('- ' + a.label + ': ' + money(a.valor)); });
    } else {
      L.push('- Sem adicionais tarifados');
    }
    L.push('');
    L.push('*INVESTIMENTO*');
    L.push('Por pessoa (pacotes): ' + money(c.perPessoa));
    L.push('Subtotal dos convidados: ' + money(c.subConv));
    L.push('Adicionais: ' + money(c.totalAdic));
    L.push('Subtotal geral: ' + money(c.subGeral));
    if (c.temDesconto) {
      L.push('Desconto ' + c.percentual + '% (' + labelDia() + '): -' + money(c.desconto));
    }
    L.push('TOTAL ESTIMADO: ' + money(c.total));
    if (c.convidados) L.push('(' + money(c.perPessoaFinal) + ' por convidado)');
    L.push('');
    // a equipe precisa da data para contar as 48h e a semana de validade
    L.push('Cotação gerada em ' + fmtBR(isoLocal(new Date())) + '.');
    return L.join('\n');
  }

  /* ==========================================================================
     8. BARRA FIXA DE TOTAL
     ========================================================================== */

  // enquanto um campo esta em foco o teclado do celular cobre a base da
  // tela, entao a barra fixa sai do caminho
  var digitando = false;

  // A barra de progresso e sticky em top: var(--topo). Sem isso ela para
  // embaixo da barra de administracao do WordPress e o titulo da etapa
  // aparece cortado para quem esta logado.
  function ajustarTopo() {
    var px = 0;
    var manual = CONFIG.topoFixo;
    if (manual !== null && manual !== undefined && isFinite(Number(manual))) {
      px = Number(manual);
    } else {
      var admin = document.getElementById('wpadminbar');
      if (admin) {
        var cs = getComputedStyle(admin);
        // abaixo de 783px o WordPress solta a barra e ela rola junto
        if (cs.position === 'fixed') px = admin.offsetHeight;
      }
    }
    $('mejo').style.setProperty('--topo', px + 'px');
  }

  function renderBarra() {
    var bar = $('mejo-bar');
    var raiz = $('mejo');
    var c = calc();
    var mostra = STEP >= 2 && STEP <= 4 && c.convidados > 0 && c.total > 0 && !digitando;

    bar.classList.toggle('is-visible', mostra);
    bar.setAttribute('aria-hidden', mostra ? 'false' : 'true');
    raiz.classList.toggle('has-bar', mostra);
    if (!mostra) { raiz.style.removeProperty('--bar-h'); return; }

    $('mejo-bar-total').textContent = money(c.total);
    var estreito = window.innerWidth < 380;
    $('mejo-bar-per').textContent = money(c.perPessoaFinal) +
      (estreito ? ' por pessoa' : ' por convidado') +
      (c.temDesconto ? (estreito ? ' \u00b7 -' + c.percentual + '%' : ' - ja com ' + c.percentual + '% off') : '');

    // a altura real muda com a largura e com a area segura do aparelho,
    // entao a reserva de espaco no fim da pagina e medida, nao chutada
    raiz.style.setProperty('--bar-h', Math.ceil(bar.offsetHeight) + 'px');
  }

  /* ==========================================================================
     9. VALIDACAO
     ========================================================================== */

  function showErr(id, on, msg) {
    var el = $(id);
    if (!el) return;
    if (msg) el.textContent = msg;
    el.classList.toggle('is-visible', !!on);
  }
  function alerta(step, msg) {
    var el = $('mejo-alert-' + step);
    if (!el) return;
    if (msg) { el.textContent = msg; el.classList.add('is-visible'); }
    else { el.classList.remove('is-visible'); }
  }
  function limparErros(step) {
    var sec = document.querySelector('.mejo-step[data-step="' + step + '"]');
    if (!sec) return;
    Array.prototype.forEach.call(sec.querySelectorAll('.mejo-error.is-visible'), function (e) {
      e.classList.remove('is-visible');
    });
    Array.prototype.forEach.call(sec.querySelectorAll('.mejo-input.is-invalid'), function (e) {
      e.classList.remove('is-invalid');
    });
    alerta(step, '');
  }
  function whatsValido(v) {
    var raw = String(v || '');
    if (/^\s*(\+|00)/.test(raw)) return raw.replace(/\D/g, '').length >= 10;
    var d = raw.replace(/\D/g, '');
    return d.length === 10 || d.length === 11;
  }
  function scrollPara(el) {
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (el.focus) el.focus({ preventScroll: true });
    } catch (e) { /* noop */ }
  }

  function validaStep(step, foco) {
    limparErros(step);
    var ok = true, primeiro = null;

    function falha(errId, campo, msg) {
      ok = false;
      showErr(errId, true, msg);
      if (campo) campo.classList.add('is-invalid');
      if (!primeiro) primeiro = campo || $(errId);
    }

    if (step === 1) {
      if (!S.nome || S.nome.trim().length < 2) falha('mejo-err-nome', $('mejo-nome'));
      if (!whatsValido(S.whats)) falha('mejo-err-whats', $('mejo-whats'));

      if (!S.data && !S.semData) {
        falha('mejo-err-data', $('mejo-data'), 'Escolha uma data ou marque a opção acima.');
      } else if (S.data) {
        var d = parseISO(S.data);
        if (!d) falha('mejo-err-data', $('mejo-data'), 'Data inválida.');
        else if (d < hojeZero()) falha('mejo-err-data', $('mejo-data'), 'Essa data já passou. Escolha outra.');
        else if (!diaPermitido(d.getDay())) {
          falha('mejo-err-data', $('mejo-data'), CONFIG.msgDiaIndisponivel);
        }
      }
      if (!S.data && S.semData && (S.dia === null || S.dia === '')) {
        falha('mejo-err-dia', $('mejo-dia'));
      }
      if (!S.turno) falha('mejo-err-turno', null);
      if (!S.tema) falha('mejo-err-tema', null);
      else if (S.tema === 'outro' && !String(S.temaOutro || '').trim()) {
        falha('mejo-err-tema', $('mejo-tema-outro'), 'Conte pra gente qual é o tipo de evento.');
      }
      if (!ok) alerta(1, 'Confira os campos destacados para continuar.');
    }

    if (step === 2) {
      var g = Number(S.convidados);
      if (!g || !isFinite(g) || g <= 0 || Math.floor(g) !== g) {
        falha('mejo-err-conv', $('mejo-conv'),
          'Informe um número inteiro de convidados, maior que zero.');
      } else if (CONFIG.minConvidadosGeral && g < CONFIG.minConvidadosGeral) {
        falha('mejo-err-conv', $('mejo-conv'),
          'Atendemos eventos a partir de ' + CONFIG.minConvidadosGeral + ' convidados.');
      } else if (CONFIG.maxConvidadosGeral && g > CONFIG.maxConvidadosGeral) {
        falha('mejo-err-conv', $('mejo-conv'),
          'Para mais de ' + CONFIG.maxConvidadosGeral + ' convidados, fale direto com nossa equipe.');
      }
      if (!S.privativo) falha('mejo-err-privativo', null);
      if (!S.ambiente) {
        falha('mejo-err-ambiente', null, 'Escolha um ambiente.');
      } else {
        var amb = getAmbiente(S.ambiente);
        if (amb && amb.min && g && g < amb.min) {
          falha('mejo-err-ambiente', null, 'O ' + amb.nome + ' possui minimo de ' + amb.min +
            ' convidados. Altere o número de convidados ou escolha outro ambiente.');
        } else if (amb && amb.max && g && g > amb.max) {
          falha('mejo-err-ambiente', null, 'O ' + amb.nome + ' acomoda ate ' + amb.max +
            ' convidados. Altere o número de convidados ou escolha outro ambiente.');
        }
      }
      if (!ok) alerta(2, 'Confira os campos destacados para continuar.');
    }

    if (step === 3) {
      if (!S.consumo) falha('mejo-err-consumo', null);
      if (CONFIG.cardapioImpresso.ativo && !S.impresso) falha('mejo-err-impresso', null);
      if (!ok) alerta(3, 'Confira os campos destacados para continuar.');
    }

    // A etapa 4 valida apenas o passo aberto. O resumo so e alcancado
    // depois do ultimo passo, entao tudo acaba validado de qualquer forma.
    if (step === 4) {
      if (SUB === 0) {
        if (!S.formato) {
          showErr('mejo-err-formato', true);
          alerta(4, 'Escolha entre Menu Sequencial e Rodízio.');
          if (foco) scrollPara($('mejo-formato'));
          return false;
        }
        return true;
      }

      var passo = passoAtual();
      if (!passo) return true;

      if (passo.tipo === 'categoria') {
        var cat = passo.cat;
        var pulaAlcool = cat.alcool && S.semAlcool;
        if (!pulaAlcool && cat.obrigatorio && !S.pacotes[cat.id]) {
          falha('mejo-err-pack-' + cat.id, null);
        }
      } else if (!S.rodizio) {
        falha('mejo-err-rodizio', null);
      }

      var g2 = Number(S.convidados) || 0;
      var faltas = [];
      gruposDoPasso(passo).forEach(function (grp) {
        var soma = somaDist(grp.key);
        if (soma !== g2) {
          ok = false;
          faltas.push(msgDist(grp, soma, g2));
          if (!primeiro) primeiro = document.querySelector('[data-distgroup="' + grp.key + '"]');
        }
      });
      if (!ok) {
        alerta(4, faltas.length ? faltas.join(' ') : 'Escolha um pacote para continuar.');
      }
    }

    if (!ok && foco) scrollPara(primeiro);
    return ok;
  }

  /* ==========================================================================
     10. NAVEGACAO
     ========================================================================== */

  // leva a pessoa para o topo da etapa, parando abaixo da barra de progresso
  function rolarParaTopoDaEtapa() {
    var barra = $('mejo-progress');
    var offset = (barra ? barra.offsetHeight : 58) +
      (parseFloat(getComputedStyle($('mejo')).getPropertyValue('--topo')) || 0) + 8;
    var alvo = $('mejo-form').getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: Math.max(0, alvo), behavior: 'smooth' });
  }

  // o botao da etapa 4 so vira "Ver cotacao" na ultima decisao do cardapio
  function atualizaPrimario() {
    var botao = document.querySelector('.mejo-step[data-step="4"] [data-next]');
    if (!botao) return;
    botao.textContent = (SUB >= totalPassos() && SUB > 0) ? 'Ver cotação' : 'Continuar';
    if (STEP === 4) {
      var barraCta = $('mejo-bar-cta');
      if (barraCta) barraCta.textContent = botao.textContent;
    }
  }

  // O hero sai de cena quando a pessoa comeca, e a barra de progresso assume
  // a marca no lugar dele. A escolha NAO e gravada no estado: recarregar a
  // pagina na etapa 1 traz o hero de volta, que e o que se espera de um
  // recarregamento. Da etapa 2 em diante ele fica fora de qualquer forma,
  // porque ai a peca de venda so atrapalha quem esta preenchendo.
  var comecouNestaVisita = false;

  function heroVisivel() {
    return !comecouNestaVisita && STEP < 2;
  }

  function aplicarHero() {
    $('mejo').classList.toggle('comecou', !heroVisivel());
  }

  function colapsarHero() {
    if (comecouNestaVisita) return false;
    comecouNestaVisita = true;
    aplicarHero();
    return true;
  }

  function irPara(n, semScroll) {
    var anterior = STEP;
    STEP = Math.max(1, Math.min(MAX_STEP, n));
    if (STEP > stepAlcancado) {
      stepAlcancado = STEP;
      track('orcamento_etapa', { etapa: STEP });
    }
    Array.prototype.forEach.call(document.querySelectorAll('.mejo-step'), function (s) {
      s.classList.toggle('is-active', Number(s.getAttribute('data-step')) === STEP);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.mejo-progress__step'), function (s) {
      var v = Number(s.getAttribute('data-pstep'));
      s.classList.toggle('is-active', v === STEP);
      s.classList.toggle('is-done', v < STEP);
    });
    aplicarHero();

    // rodape completo so no resultado; durante o fluxo, so a linha de ajuda
    $('mejo').classList.toggle('mostra-rodape', STEP === MAX_STEP);
    $('mejo').classList.toggle('mostra-ajuda', STEP < MAX_STEP);

    $('mejo-progress-fill').style.width = (STEP / MAX_STEP * 100) + '%';
    $('mejo-live').textContent = 'Etapa ' + STEP + ' de ' + MAX_STEP;

    // versao compacta do progresso, usada em telas estreitas
    var rotulo = document.querySelector('.mejo-progress__step[data-pstep="' + STEP + '"]');
    var texto = '<span>Etapa ' + STEP + ' de ' + MAX_STEP + '</span> &middot; ' +
      (rotulo ? rotulo.textContent : '');
    $('mejo-progress-now').innerHTML = texto;
    $('mejo-progress-now-topo').innerHTML = texto;

    // a barra fixa dispara o mesmo botao da etapa, entao usa o mesmo rotulo
    var primario = document.querySelector('.mejo-step.is-active [data-next]');
    if (primario) $('mejo-bar-cta').textContent = primario.textContent.trim();

    if (STEP === 4) {
      // Quem chega pela etapa 3 comeca o cardapio pela escolha do formato,
      // mesmo com escolhas salvas: elas continuam marcadas, mas a pessoa
      // passa por cada sub-etapa em vez de cair direto na ultima. So quem
      // volta da tela de resultado cai na ultima decisao do cardapio.
      var total = totalPassos();
      if (anterior < 4) SUB = 0;
      else if (anterior > 4 && S.formato && total > 0) SUB = total;
      if (SUB > total) SUB = total;
      renderCardapio();
      atualizaPrimario();
    }
    if (STEP === 5) renderResumo();
    renderBarra();
    salvar();

    if (!semScroll) {
      // para logo abaixo da barra de progresso, respeitando --topo
      var barra = $('mejo-progress');
      var offset = (barra ? barra.offsetHeight : 58) +
        (parseFloat(getComputedStyle($('mejo')).getPropertyValue('--topo')) || 0) + 8;
      var top = $('mejo-form').getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     11. PERSISTENCIA + LINK COMPARTILHAVEL
     ========================================================================== */

  var LS_KEY = 'mejo_orcamento_v1';

  var DIA_MS = 24 * 60 * 60 * 1000;

  function salvar() {
    try {
      S.sub = SUB;
      // a data de gravacao fica fora do S para nao entrar no link compartilhavel
      var dados = JSON.parse(JSON.stringify(S));
      dados._salvoEm = Date.now();
      localStorage.setItem(LS_KEY, JSON.stringify(dados));
    } catch (e) { /* noop */ }
  }

  function hojeZero() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }
  function aplicar(obj) {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(S).forEach(function (k) {
      if (obj[k] !== undefined) S[k] = obj[k];
    });
    if (!S.pacotes || typeof S.pacotes !== 'object') S.pacotes = {};
    if (!S.dist || typeof S.dist !== 'object') S.dist = { principal: {}, sobremesa: {} };
    if (!S.dist.principal) S.dist.principal = {};
    if (!S.dist.sobremesa) S.dist.sobremesa = {};
    if (obj.sub !== undefined) SUB = Math.max(0, Number(obj.sub) || 0);
  }
  // Devolve o que foi recuperado, para o aviso de retomada:
  // null quando nao ha nada, ou { dataVencida } quando ha.
  function carregarLocal() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      var validade = (Number(CONFIG.validadeDiasSalvos) || 14) * DIA_MS;
      if (obj && obj._salvoEm && Date.now() - obj._salvoEm > validade) {
        localStorage.removeItem(LS_KEY);
        return null;
      }
      aplicar(obj);

      // uma data que ja passou nao serve para nada, e mantida ela ainda
      // puxaria o desconto do dia da semana para um evento impossivel
      var dataVencida = false;
      var d = parseISO(S.data);
      if (d && d < hojeZero()) {
        S.data = '';
        dataVencida = true;
      }
      return { dataVencida: dataVencida };
    } catch (e) { return null; }
  }

  function esquecerCotacao() {
    try { localStorage.removeItem(LS_KEY); } catch (e) { /* noop */ }
  }
  function encodeState() {
    try {
      return btoa(unescape(encodeURIComponent(JSON.stringify(S)))).replace(/=+$/, '');
    } catch (e) { return ''; }
  }
  function decodeState(str) {
    try {
      var pad = str + '==='.slice(0, (4 - str.length % 4) % 4);
      return JSON.parse(decodeURIComponent(escape(atob(pad))));
    } catch (e) { return null; }
  }
  function lerHash() {
    var m = /[#&]c=([A-Za-z0-9+/=_-]+)/.exec(window.location.hash || '');
    if (!m) return false;
    var obj = decodeState(m[1]);
    if (!obj) return false;
    aplicar(obj);
    return true;
  }

  /* ==========================================================================
     12. ANALYTICS + REGISTRO DA COTACAO
     ========================================================================== */

  function track(evento, extra) {
    var payload = { event: evento, origem: CONFIG.origem, event_id: EVENT_ID };
    if (extra) Object.keys(extra).forEach(function (k) { payload[k] = extra[k]; });
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    } catch (e) { /* noop */ }
    try {
      if (typeof window.gtag === 'function') window.gtag('event', evento, payload);
    } catch (e) { /* noop */ }
  }

  // etapa: 'parcial' (fim do passo 1) | 'completo' (cotacao calculada)
  function enviarLead(etapa) {
    if (!CONFIG.webhook) return;
    var c = calc();
    var body = {
      origem: CONFIG.origem,
      etapa: etapa,
      event_id: EVENT_ID,
      criado_em: new Date().toISOString(),
      nome: S.nome,
      whatsapp: S.whats,
      data_evento: S.data || '',
      dia_semana: labelDia(),
      turno: (getTurno(S.turno) || {}).label || '',
      tema: labelTema(),
      convidados: c.convidados,
      ambiente: (getAmbiente(S.ambiente) || {}).nome || '',
      ambiente_privativo: S.privativo,
      forma_consumo: (getConsumo(S.consumo) || {}).label || '',
      formato: labelFormato(),
      pacotes: S.formato === 'sequencial' ? S.pacotes : { rodizio: S.rodizio },
      pratos: distTexto('principal'),
      sobremesas: distTexto('sobremesa'),
      cardapio_impresso: S.impresso,
      sem_bebidas_alcoolicas: !!S.semAlcool,
      valor_por_pessoa: c.perPessoa,
      subtotal_convidados: c.subConv,
      adicionais: c.totalAdic,
      subtotal_geral: c.subGeral,
      desconto: c.desconto,
      total: c.total,
      url: window.location.href
    };
    try {
      fetch(CONFIG.webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true
      })['catch'](function () { /* noop */ });
    } catch (e) { /* noop */ }
  }

  /* ==========================================================================
     13. INICIALIZACAO E BINDINGS
     ========================================================================== */

  function atualizaDia() {
    var campoDia = $('mejo-field-dia');
    var hint = $('mejo-dia-detect');
    if (S.data) {
      campoDia.hidden = true;
      var d = parseISO(S.data);
      if (d) {
        var wd = d.getDay();
        var off = CONFIG.desconto.dias.indexOf(wd) !== -1;
        // sem artigo: sabado e domingo sao masculinos e os demais femininos,
        // entao "cai em uma <dia>" errava a concordancia na metade dos casos
        hint.innerHTML = '<strong>' + DIA_LABEL[wd] + '</strong>, ' + esc(fmtBR(S.data)) +
          (off ? '. Seu evento tem <strong>' + CONFIG.desconto.percentual + '% de desconto</strong>.'
               : '. Preco de tabela.');
      }
    } else {
      campoDia.hidden = !S.semData;
      hint.textContent = S.semData
        ? ''
        : 'Se preferir, marque a opção acima e informe apenas o dia da semana.';
    }
    showErr('mejo-err-data', false);
    renderBarra();
  }

  function atualizaHintConv() {
    var amb = getAmbiente(S.ambiente);
    var el = $('mejo-conv-hint');
    if (amb && (amb.min || amb.max)) {
      el.textContent = amb.nome + ': ' +
        (amb.min && amb.max ? 'de ' + amb.min + ' a ' + amb.max + ' convidados'
          : amb.min ? 'minimo de ' + amb.min + ' convidados'
          : 'ate ' + amb.max + ' convidados') + '.';
    } else {
      el.textContent = 'O valor total é calculado por pessoa.';
    }
  }

  function atualizaContador(key) {
    var box = document.querySelector('[data-distgroup="' + key + '"]');
    if (!box) return;
    var g = Number(S.convidados) || 0;
    var soma = somaDist(key);
    var grp = grupoPorKey(key);
    var cnt = box.querySelector('.mejo-dist__count');
    var msgEl = box.querySelector('.mejo-dist__msg');
    if (cnt) {
      cnt.innerHTML = 'Total selecionado: <strong>' + soma + '</strong> de ' + g;
      cnt.className = 'mejo-dist__count ' + (soma === g ? 'is-ok' : (soma > g ? 'is-bad' : ''));
    }
    if (msgEl && grp) msgEl.textContent = msgDist(grp, soma, g);
  }

  function setDist(key, i, valor, leve) {
    var v = parseInt(String(valor).replace(/\D/g, ''), 10);
    if (!isFinite(v) || v < 0) v = 0;
    if (!S.dist[key]) S.dist[key] = {};
    S.dist[key][i] = v;
    alerta(4, '');
    salvar();
    if (leve) atualizaContador(key);
    else renderCardapio();
    renderBarra();
  }

  function hidratar() {
    $('mejo-nome').value = S.nome || '';
    $('mejo-whats').value = S.whats || '';
    $('mejo-data').value = S.data || '';
    $('mejo-sem-data').checked = !!S.semData;
    if (S.dia !== null && S.dia !== '') $('mejo-dia').value = String(S.dia);

    function marca(name, valor) {
      if (!valor) return;
      var el = document.querySelector('input[name="' + name + '"][value="' + valor + '"]');
      if (el) el.checked = true;
    }
    marca('mejo-turno', S.turno);
    marca('mejo-tema', S.tema);
    marca('mejo-priv', S.privativo);
    marca('mejo-consumo-r', S.consumo);
    marca('mejo-impresso-r', S.impresso);
    marca('mejo-formato-r', S.formato);

    $('mejo-field-tema-outro').hidden = S.tema !== 'outro';
    $('mejo-tema-outro').value = S.temaOutro || '';
    if (S.convidados) $('mejo-conv').value = S.convidados;
    renderAmbientes();
  }

  // Aviso no topo da etapa 1 quando a pessoa volta com dados salvos. Explica
  // por que os campos ja vem preenchidos, diz que ficam neste aparelho e da
  // uma saida para quem quer outra cotacao ou nao e a mesma pessoa.
  function mostrarRetomada(r) {
    var caixa = $('mejo-retomar');
    if (!r || !String(S.nome || '').trim()) { caixa.hidden = true; return; }
    var txt = 'Continuando a cotação de <strong>' + esc(S.nome.trim()) + '</strong>. ' +
      'Suas respostas ficaram salvas neste aparelho.';
    if (r.dataVencida) txt += ' A data que você tinha escolhido já passou, escolha outra.';
    $('mejo-retomar-txt').innerHTML = txt;
    caixa.hidden = false;
  }

  function comecarNova() {
    esquecerCotacao();
    S = estadoVazio();
    S.convidados = Number(CONFIG.convidadosPadrao) || null;
    SUB = 0;
    stepAlcancado = 1;
    // cotacao nova, lead novo: o parcial da anterior ja foi enviado
    EVENT_ID = novoEventId();
    leadParcialEnviado = false;

    Array.prototype.forEach.call(
      document.querySelectorAll('#mejo input[type=radio], #mejo input[type=checkbox]'),
      function (el) { el.checked = false; });
    Array.prototype.forEach.call(document.querySelectorAll('#mejo .is-invalid'),
      function (el) { el.classList.remove('is-invalid'); });
    Array.prototype.forEach.call(document.querySelectorAll('#mejo .mejo-error.is-visible'),
      function (el) { el.classList.remove('is-visible'); });
    $('mejo-dia').value = '';
    var fp = $('mejo-data')._flatpickr;
    if (fp) fp.clear(false);

    hidratar();
    atualizaDia();
    atualizaHintConv();
    renderCardapio();
    renderBarra();
    $('mejo-retomar').hidden = true;
    track('orcamento_nova_cotacao', {});
    irPara(1, true);
    try { $('mejo-nome').focus({ preventScroll: true }); } catch (e) { $('mejo-nome').focus(); }
  }

  function iniciaFlatpickr() {
    var dataEl = $('mejo-data');
    var limite = new Date();
    limite.setDate(limite.getDate() + (Number(CONFIG.maxDiasFuturo) || 540));

    function go() {
      if (dataEl._flatpickr || typeof window.flatpickr !== 'function') return;
      window.flatpickr(dataEl, {
        locale: (window.flatpickr.l10ns && window.flatpickr.l10ns.pt) ? 'pt' : 'default',
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'd/m/Y',
        altInputClass: 'mejo-input',
        allowInput: true,
        minDate: 'today',
        maxDate: limite,
        // no celular o flatpickr entrega o seletor nativo do sistema, que e
        // mais rapido de usar e ja mostra dd/mm/aaaa no formato pt-BR
        disableMobile: false,
        onReady: function (_, __, inst) {
          if (!inst.altInput) return;
          inst.altInput.placeholder = 'dd/mm/aaaa';
          inst.altInput.setAttribute('inputmode', 'numeric');
          inst.altInput.setAttribute('autocomplete', 'off');
        },
        onChange: function () {
          S.data = dataEl.value || '';
          if (S.data) { $('mejo-sem-data').checked = false; S.semData = false; }
          atualizaDia();
          renderBarra();
          salvar();
        }
      });
      if (S.data && dataEl._flatpickr) dataEl._flatpickr.setDate(S.data, false);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
    else setTimeout(go, 0);
    window.addEventListener('load', go);
  }

  function bindRadios(container, cb) {
    container.addEventListener('change', function (e) {
      var t = e.target;
      if (!t || t.type !== 'radio') return;
      cb(t.value, t);
      salvar();
    });
  }

  function init() {
    renderEstaticos();

    var veioDeLink = lerHash();
    var retomada = veioDeLink ? null : carregarLocal();
    if (!S.convidados) S.convidados = Number(CONFIG.convidadosPadrao) || null;
    hidratar();
    mostrarRetomada(retomada);

    /* ------- etapa 1 ------- */
    $('mejo-retomar-nova').addEventListener('click', comecarNova);

    var nome = $('mejo-nome');
    nome.addEventListener('input', function () {
      S.nome = nome.value;
      nome.classList.remove('is-invalid');
      showErr('mejo-err-nome', false);
      salvar();
    });

    var temaOutro = $('mejo-tema-outro');
    temaOutro.addEventListener('input', function () {
      S.temaOutro = temaOutro.value;
      temaOutro.classList.remove('is-invalid');
      salvar();
    });

    var whats = $('mejo-whats');
    whats.addEventListener('input', function () {
      var raw = whats.value;
      if (/^\s*(\+|00)/.test(raw)) {
        whats.value = '+' + raw.replace(/\D/g, '').replace(/^0+/, '').slice(0, 15);
      } else {
        var v = raw.replace(/\D/g, '').slice(0, 11);
        if (v.length > 10)     v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
        else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        whats.value = v;
      }
      S.whats = whats.value;
      whats.classList.remove('is-invalid');
      showErr('mejo-err-whats', false);
      salvar();
    });

    var dataEl = $('mejo-data');
    var hoje = new Date();
    var limite = new Date();
    limite.setDate(limite.getDate() + (Number(CONFIG.maxDiasFuturo) || 540));
    dataEl.min = isoLocal(hoje);
    dataEl.max = isoLocal(limite);

    function onData() {
      S.data = dataEl.value || '';
      if (S.data) { $('mejo-sem-data').checked = false; S.semData = false; }
      atualizaDia();
      salvar();
    }
    dataEl.addEventListener('change', onData);
    dataEl.addEventListener('input', onData);

    $('mejo-sem-data').addEventListener('change', function () {
      S.semData = this.checked;
      if (this.checked) {
        S.data = '';
        dataEl.value = '';
        if (dataEl._flatpickr) dataEl._flatpickr.clear();
      }
      atualizaDia();
      salvar();
    });

    $('mejo-dia').addEventListener('change', function () {
      S.dia = this.value === '' ? null : Number(this.value);
      showErr('mejo-err-dia', false);
      atualizaDia();
      salvar();
    });

    bindRadios($('mejo-turnos'), function (v) {
      S.turno = v;
      showErr('mejo-err-turno', false);
    });
    bindRadios($('mejo-temas'), function (v) {
      S.tema = v;
      $('mejo-field-tema-outro').hidden = v !== 'outro';
      showErr('mejo-err-tema', false);
    });

    /* ------- etapa 2 ------- */
    var conv = $('mejo-conv');
    if (S.convidados) conv.value = S.convidados;

    function onConv() {
      var v = parseInt(String(conv.value).replace(/\D/g, ''), 10);
      S.convidados = (isFinite(v) && v > 0) ? v : null;
      conv.classList.remove('is-invalid');
      showErr('mejo-err-conv', false);
      showErr('mejo-err-ambiente', false);
      atualizaHintConv();
      renderAmbientes();
      // as distribuicoes seguem o numero de convidados
      gruposDist().forEach(function (grp) { distribuirIgual(grp.key, grp.opcoes); });
      renderCardapio();
      renderBarra();
      salvar();
    }
    conv.addEventListener('input', onConv);
    Array.prototype.forEach.call(document.querySelectorAll('[data-conv]'), function (b) {
      b.addEventListener('click', function () {
        var d = Number(b.getAttribute('data-conv'));
        conv.value = Math.max(1, (Number(S.convidados) || 0) + d);
        onConv();
      });
    });

    bindRadios($('mejo-privativo'), function (v) {
      S.privativo = v;
      showErr('mejo-err-privativo', false);
      renderAmbientes();
      renderBarra();
    });

    $('mejo-ambientes').addEventListener('change', function (e) {
      if (!e.target || e.target.type !== 'radio') return;
      S.ambiente = e.target.value;
      showErr('mejo-err-ambiente', false);
      atualizaHintConv();
      renderBarra();
      salvar();
    });

    /* ------- etapa 3 ------- */
    bindRadios($('mejo-consumo'), function (v) {
      S.consumo = v;
      showErr('mejo-err-consumo', false);
      renderBarra();
    });
    if (CONFIG.cardapioImpresso.ativo) {
      bindRadios($('mejo-impresso'), function (v) {
        S.impresso = v;
        showErr('mejo-err-impresso', false);
        renderBarra();
      });
    }

    /* ------- etapa 4 ------- */
    $('mejo-formato').addEventListener('change', function (e) {
      if (!e.target || e.target.type !== 'radio') return;
      S.formato = e.target.value;
      S.pacotes = {};
      S.rodizio = '';
      S.semAlcool = false;
      S.dist = { principal: {}, sobremesa: {} };
      SUB = 0;
      showErr('mejo-err-formato', false);
      alerta(4, '');
      renderCardapio();
      atualizaPrimario();
      renderBarra();
      salvar();
    });

    var step4 = document.querySelector('.mejo-step[data-step="4"]');

    step4.addEventListener('change', function (e) {
      var t = e.target;
      if (!t) return;

      if (t.type === 'radio' && t.name && t.name.indexOf('mejo-pack-') === 0) {
        var catId = t.name.replace('mejo-pack-', '');
        S.pacotes[catId] = t.value;
        showErr('mejo-err-pack-' + catId, false);
        alerta(4, '');
        if (catId === 'principal' || catId === 'sobremesa') S.dist[catId] = {};
        gruposDist().forEach(function (grp) {
          if (!somaDist(grp.key)) distribuirIgual(grp.key, grp.opcoes);
        });
        renderCardapio();
        renderBarra();
        salvar();
        return;
      }

      if (t.type === 'radio' && t.name === 'mejo-rodizio-r') {
        S.rodizio = t.value;
        S.dist = { principal: {}, sobremesa: {} };
        showErr('mejo-err-rodizio', false);
        alerta(4, '');
        gruposDist().forEach(function (grp) { distribuirIgual(grp.key, grp.opcoes); });
        renderCardapio();
        renderBarra();
        salvar();
        return;
      }

      if (t.id === 'mejo-sem-alcool') {
        S.semAlcool = t.checked;
        if (t.checked) delete S.pacotes.bebidas_alc;
        renderCardapio();
        renderBarra();
        salvar();
        return;
      }

      if (t.hasAttribute && t.hasAttribute('data-distinput')) {
        setDist(t.getAttribute('data-distinput'), Number(t.getAttribute('data-i')), t.value);
      }
    });

    step4.addEventListener('input', function (e) {
      var t = e.target;
      if (t && t.hasAttribute && t.hasAttribute('data-distinput')) {
        setDist(t.getAttribute('data-distinput'), Number(t.getAttribute('data-i')), t.value, true);
      }
    });

    step4.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-dist],[data-split]') : null;
      if (!btn) return;

      if (btn.hasAttribute('data-split')) {
        var key = btn.getAttribute('data-split');
        var grp = grupoPorKey(key);
        if (grp) {
          distribuirIgual(key, grp.opcoes);
          renderCardapio();
          renderBarra();
          alerta(4, '');
          salvar();
        }
        return;
      }

      var k = btn.getAttribute('data-dist');
      var i = Number(btn.getAttribute('data-i'));
      var d = Number(btn.getAttribute('data-d'));
      setDist(k, i, Math.max(0, (Number((S.dist[k] || {})[i]) || 0) + d));
    });

    /* ------- navegacao ------- */
    Array.prototype.forEach.call(document.querySelectorAll('[data-next]'), function (b) {
      b.addEventListener('click', function () {
        var n = Number(b.getAttribute('data-next'));
        if (!validaStep(n, true)) return;

        // quem rola direto para o formulario, sem tocar no CTA, tambem comecou
        if (n === 1) colapsarHero();

        if (n === 1 && !leadParcialEnviado) {
          leadParcialEnviado = true;
          track('orcamento_iniciado', {});
          enviarLead('parcial');
        }

        // dentro da etapa 4 o "Continuar" anda de sub-etapa antes de sair
        if (n === 4 && SUB < totalPassos()) {
          SUB++;
          renderCardapio();
          atualizaPrimario();
          renderBarra();
          salvar();
          track('cardapio_passo', { passo: SUB, de: totalPassos() });
          rolarParaTopoDaEtapa();
          return;
        }

        if (n === 4) {
          var c = calc();
          track('orcamento_concluido', {
            convidados: c.convidados,
            valor_total: c.total,
            valor_por_pessoa: c.perPessoa,
            formato: labelFormato()
          });
          enviarLead('completo');
        }
        irPara(n + 1);
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-back]'), function (b) {
      b.addEventListener('click', function () {
        var n = Number(b.getAttribute('data-back'));
        if (n === 4 && SUB > 0) {
          SUB--;
          renderCardapio();
          atualizaPrimario();
          renderBarra();
          salvar();
          rolarParaTopoDaEtapa();
          return;
        }
        irPara(n - 1);
      });
    });
    $('mejo-bar-cta').addEventListener('click', function () {
      var b = document.querySelector('.mejo-step.is-active [data-next]');
      if (b) b.click();
    });
    // O CTA do topo nao deveria ser so uma rolagem: leva ate o formulario e
    // ja coloca o cursor no primeiro campo, entao a pessoa comeca a digitar
    // em vez de procurar por onde comecar.
    $('mejo-start').addEventListener('click', function (e) {
      e.preventDefault();
      track('orcamento_start_click', {});
      // com o hero fora, o formulario passa a ser o topo da pagina
      colapsarHero();
      window.scrollTo(0, 0);
      setTimeout(function () {
        var nome = $('mejo-nome');
        if (nome && !nome.value) { try { nome.focus({ preventScroll: true }); } catch (err) { nome.focus(); } }
      }, 60);
    });

    /* ------- CTAs finais ------- */
    $('mejo-cta-whats').addEventListener('click', function () {
      var c = calc();
      track('whatsapp_click', { valor_total: c.total, convidados: c.convidados });
    });
    $('mejo-cta-proposta').addEventListener('click', function () {
      var c = calc();
      track('proposta_personalizada', { valor_total: c.total, convidados: c.convidados });
    });
    $('mejo-copy').addEventListener('click', function () {
      var btn = $('mejo-copy');
      var url = window.location.href.split('#')[0] + '#c=' + encodeState();
      function feito() {
        btn.textContent = 'Link copiado!';
        setTimeout(function () { btn.textContent = 'Copiar link desta cotação'; }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(feito, function () { window.prompt('Copie o link:', url); });
      } else {
        window.prompt('Copie o link:', url);
      }
      track('copiar_link_cotacao', {});
    });

    // --- teclado virtual: a barra fixa sai do caminho enquanto se digita ---
    var ehCampo = function (el) {
      return el && el.matches && el.matches(
        'input:not([type="radio"]):not([type="checkbox"]), select, textarea');
    };
    document.addEventListener('focusin', function (e) {
      if (!$('mejo').contains(e.target) || !ehCampo(e.target)) return;
      digitando = true;
      renderBarra();
    });
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        if (ehCampo(document.activeElement)) return;
        digitando = false;
        renderBarra();
      }, 120);
    });

    // --- giro de tela e mudanca de altura do teclado ---
    var reagir = function () { ajustarTopo(); renderBarra(); };
    window.addEventListener('resize', reagir);
    window.addEventListener('orientationchange', function () { setTimeout(reagir, 250); });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', reagir);

    aplicarHero();
    ajustarTopo();
    atualizaPrimario();
    $('mejo-ajuda-link').href = 'https://wa.me/' + CONFIG.whatsapp;

    iniciaFlatpickr();

    atualizaDia();
    atualizaHintConv();
    renderCardapio();
    renderBarra();

    irPara(veioDeLink ? 5 : 1, true);
  }

  /* ==========================================================================
     14. MONTAGEM
     --------------------------------------------------------------------------
     O widget do Elementor contem apenas <div id="mejo-root"> e a tag deste
     script. Todo o resto e injetado aqui, entao atualizar a pagina publicada
     e um git push: o arquivo servido pelo GitHub Pages muda e pronto.
     ========================================================================== */

  function injetarDependencias() {
    var cabeca = document.head || document.documentElement;

    function estilo(href) {
      if (document.querySelector('link[href="' + href + '"]')) return;
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      cabeca.appendChild(l);
    }
    function script(src, aoCarregar) {
      var existente = document.querySelector('script[src="' + src + '"]');
      if (existente) { if (aoCarregar) existente.addEventListener('load', aoCarregar); return; }
      var sc = document.createElement('script');
      sc.src = src;
      sc.defer = true;
      if (aoCarregar) sc.onload = aoCarregar;
      cabeca.appendChild(sc);
    }

    estilo('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
    estilo('https://cdn.jsdelivr.net/npm/flatpickr@4/dist/flatpickr.min.css');

    // o locale depende do core, entao vem encadeado
    script('https://cdn.jsdelivr.net/npm/flatpickr@4', function () {
      script('https://cdn.jsdelivr.net/npm/flatpickr@4/dist/l10n/pt.js', function () {
        try { iniciaFlatpickr(); } catch (e) { /* noop */ }
      });
    });
  }

  function montar() {
    if (document.getElementById('mejo')) return true;   // ja montado
    var raiz = document.getElementById('mejo-root');
    if (!raiz) return false;
    raiz.innerHTML = MARKUP;
    return true;
  }

  function comecar() {
    if (!montar()) return;
    injetarDependencias();
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', comecar);
  } else {
    comecar();
  }
})();
