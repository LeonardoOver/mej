/* =============================================================================
   Eventos e confraternizacoes - Maria e Jose Parrilla
   -----------------------------------------------------------------------------
   Arquivo unico de comportamento. O widget do Elementor carrega apenas:

     <link rel="stylesheet" href=".../app.css">
     <div id="meje" class="meje"></div>
     <script defer src=".../app.js"></script>

   Todo o conteudo e montado por este arquivo, entao publicar uma alteracao
   e um git push.
   ============================================================================= */

(function () {
  'use strict';

  var MARKUP = `
<a href="#form-card" class="skip-link">Pular para reserva</a>

<section class="hero">
  <div class="hero-grain" aria-hidden="true"></div>

  <header class="top">
    <div class="wrap top__inner">
      <a href="https://mariaejose.com.br/" aria-label="Maria e Jose Parrilla - site oficial">
        <img src="https://mariaejose.com.br/wp-content/uploads/2024/12/logo-branco.png" alt="Maria e Jose Parrilla" class="top__logo" width="498" height="107" />
      </a>
    </div>
  </header>

  <div class="wrap hero__grid">

    <div class="hero__copy">
      <div class="hero__rating" role="img" aria-label="4,5 estrelas com 923 avaliações no Google">
        <span class="hero__rating__stars" aria-hidden="true">★★★★★</span>
        <span class="hero__rating__text"><b>4,5</b> <span aria-hidden="true">·</span> 923 avaliações no Google</span>
      </div>

      <h1 class="hero__title">Seu evento <b>na melhor parrilla</b> do interior paulista.</h1>

      <p class="hero__lede">Casamento, aniversário, batizado ou confraternização da empresa. Três salões, cardápio montado com você e a parrilla acesa. Falamos pelo WhatsApp e desenhamos o formato junto.</p>

      <ul class="hero__bullets">
        <li>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
          Três salões: fechamento parcial, total ou a casa inteira
        </li>
        <li>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
          Menu fechado, montado com as suas escolhas
        </li>
        <li>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
          Unidades em Franca/SP e Araraquara/SP
        </li>
      </ul>
    </div>

    <div class="form-card" id="form-card">
      <div class="form-card__head">
        <h2 class="form-card__title">Vamos planejar seu evento</h2>
        <p class="form-card__subtitle">Dois passos rápidos · sem compromisso</p>
      </div>

      <form class="form" id="form_eventos" novalidate aria-describedby="form-footnote">

        <ol class="steps" aria-label="Progresso do formulário">
          <li class="steps__item is-active" data-dot="1"><span>1</span> Contato</li>
          <li class="steps__item" data-dot="2"><span>2</span> Detalhes</li>
        </ol>

        <!-- ============ PASSO 1 — captura o lead ============ -->
        <div class="step" data-panel="1">

          <div class="field" data-field="nome">
            <label class="field__label" for="nome">Nome <span class="req" aria-hidden="true">*</span></label>
            <input class="field__input" type="text" id="nome" name="nome" required autocomplete="given-name" placeholder="Como podemos te chamar?" aria-describedby="err-nome" />
            <p class="field__error" role="alert" id="err-nome">Digite seu nome.</p>
          </div>

          <div class="field" data-field="whatsapp">
            <label class="field__label" for="whatsapp">WhatsApp <span class="req" aria-hidden="true">*</span></label>
            <input class="field__input" type="tel" id="whatsapp" name="whatsapp" required inputmode="tel" autocomplete="tel" placeholder="(00) 00000-0000" maxlength="16" aria-describedby="err-whatsapp" />
            <p class="field__error" role="alert" id="err-whatsapp">Digite um WhatsApp com DDD.</p>
          </div>

          <div class="field" data-field="tipo_evento">
            <label class="field__label" for="tipo_evento">Tipo de evento <span class="req" aria-hidden="true">*</span></label>
            <select class="field__select" id="tipo_evento" name="tipo_evento" required aria-describedby="err-tipo_evento">
              <option value="" disabled selected>Selecione</option>
              <option value="Casamento">Casamento</option>
              <option value="Aniversário">Aniversário</option>
              <option value="Batizado">Batizado</option>
              <option value="Confraternização empresarial">Confraternização empresarial</option>
              <option value="Outro">Outro</option>
            </select>
            <p class="field__error" role="alert" id="err-tipo_evento">Escolha o tipo de evento.</p>
          </div>

          <div class="field" data-field="convidados">
            <label class="field__label" for="convidados">Quantos convidados <span class="req" aria-hidden="true">*</span></label>
            <select class="field__select" id="convidados" name="convidados" required aria-describedby="hint-convidados err-convidados">
              <option value="" disabled selected>Selecione</option>
              <option value="10 a 30">10 a 30 pessoas</option>
              <option value="31 a 60">31 a 60 pessoas</option>
              <option value="61 a 100">61 a 100 pessoas</option>
              <option value="Mais de 100">Mais de 100 pessoas</option>
            </select>
            <p class="field__hint" id="hint-convidados">Temos três salões — dá para fechar um espaço, parte da casa ou a casa inteira.</p>
            <p class="field__error" role="alert" id="err-convidados">Escolha uma faixa.</p>
          </div>

          <button type="button" class="submit-btn" id="step-next">
            <span class="submit-btn__text">Continuar</span>
            <svg class="wp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>

          <p class="form__footnote">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
            Seus dados são usados apenas para falar sobre o seu evento.
          </p>
        </div>

        <!-- ============ PASSO 2 — qualificação ============ -->
        <div class="step" data-panel="2" hidden>

          <fieldset class="field" data-field="unidade">
            <legend class="field__label">Unidade <span class="req" aria-hidden="true">*</span></legend>
            <div class="unit-picker">
              <label>
                <input type="radio" name="unidade" value="franca" required />
                <span class="unit-picker__opt">
                  <span class="unit-picker__opt__city">Franca/SP</span>
                  <span class="unit-picker__opt__addr">Av. Major Nicácio, 2060 - Centro</span>
                </span>
              </label>
              <label>
                <input type="radio" name="unidade" value="araraquara" required />
                <span class="unit-picker__opt">
                  <span class="unit-picker__opt__city">Araraquara/SP</span>
                  <span class="unit-picker__opt__addr">Rua Voluntários da Pátria, 1505 - Centro</span>
                </span>
              </label>
            </div>
            <p class="field__error" role="alert" id="err-unidade">Escolha uma de nossas casas.</p>
          </fieldset>

          <div class="field" data-field="data">
            <label class="field__label" for="data">Data prevista <span class="field__optional">(opcional)</span></label>
            <input class="field__input" type="date" id="data" name="data" aria-describedby="hint-data" placeholder="dd/mm/aaaa" />
            <label class="checkbox">
              <input type="checkbox" id="sem-data" name="sem_data" value="1" />
              <span>Ainda estou decidindo a data</span>
            </label>
            <p class="field__hint" id="hint-data">Sem data definida também está tudo bem — a gente ajuda a escolher.</p>
            <p class="field__error" role="alert" id="err-data">Escolha uma data válida.</p>
          </div>

          <div class="field" data-field="observacao">
            <label class="field__label" for="observacao">Conte sobre o evento <span class="field__optional">(opcional)</span></label>
            <textarea class="field__input field__textarea" id="observacao" name="observacao" rows="3" maxlength="400" placeholder="Preferência de salão, decoração, horário, restrições alimentares…" aria-describedby="hint-observacao"></textarea>
            <p class="field__hint" id="hint-observacao">Quanto mais detalhe, mais rápido montamos sua proposta.</p>
          </div>

          <div class="btn-row">
            <button type="button" class="back-btn" id="step-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
              Voltar
            </button>
            <button type="submit" class="submit-btn" id="submit-btn">
              <span class="spinner" aria-hidden="true"></span>
              <svg class="wp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span class="submit-btn__text">Enviar pelo WhatsApp</span>
            </button>
          </div>

          <p class="form__footnote" id="form-footnote">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
            Sem compromisso. Montamos a proposta e você decide.
          </p>
        </div>
      </form>

      <div class="form-success" id="form-success" role="status" aria-live="polite">
        <div class="form-success__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 class="form-success__title">Recebemos seu pedido!</h3>
        <p class="form-success__text">Confira os dados e toque no botão para falar com nossa equipe pelo WhatsApp. Já podemos começar a montar sua proposta.</p>

        <div class="reservation-summary" id="reservation-summary"></div>

        <p class="form-success__notice">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="8" cy="8" r="6.5" /><path d="M8 4.5v4l2.5 1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          Tolerância de <b>15 minutos~.</b> Atrasos maiores podem liberar a mesa.
        </p>

        <a href="#" class="form-success__cta" id="whatsapp-link" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Confirmar pelo WhatsApp
        </a>

        <p class="form-success__retry">
          Errou alguma coisa? <button type="button" id="reset-btn">Editar reserva</button>
        </p>
      </div>
    </div>

  </div>
</section>

<section class="ambient" aria-labelledby="ambient-title">
  <div class="wrap">
    <div class="section-header" data-reveal>
      <span class="eyebrow">eventos na nossa casa</span>
      <h2 class="section-title" id="ambient-title">Como fica na prática</h2>
    </div>

    <div class="ambient__grid">
      <div class="ambient__item" data-reveal>
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/09/mesa-batizado.png" alt="Mesa de doces decorada montada no salão" loading="lazy" width="1448" height="1086" />
        <div class="ambient__item__caption">Mesa montada</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 80ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/05/salao-acolhedor-scaled.webp" alt="Salão do Maria e Jose Parrilla com mesas de madeira e teto rústico" loading="lazy" width="1200" height="1600" />
        <div class="ambient__item__caption">Um dos três salões</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 160ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/09/menu-batizado.png" alt="Menu impresso personalizado com o nome do evento" loading="lazy" width="1024" height="1536" />
        <div class="ambient__item__caption">Menu personalizado</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 80ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/04/capa-3-2.png" alt="Mesa servida com taças de vinho" loading="lazy" width="700" height="400" />
        <div class="ambient__item__caption">Adega à vista</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 160ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/09/bolo-batizado.png" alt="Bolo do evento sobre suporte de vidro" loading="lazy" width="1086" height="1448" />
        <div class="ambient__item__caption">Do doce ao brinde</div>
      </div>
    </div>
  </div>
</section>

<section class="experience" aria-labelledby="experience-title">
  <div class="wrap">
    <div class="section-header" data-reveal>
      <span class="eyebrow">menu fechado</span>
      <h2 class="section-title" id="experience-title">Como funciona</h2>
    </div>

    <div class="steps-grid">
      <div class="step-card" data-reveal>
        <div class="step-card__num" aria-hidden="true">1</div>
        <h3 class="feat__title">Você conta o formato</h3>
        <p class="feat__text">Tipo de evento, quantas pessoas e a data prevista. Se a data ainda estiver em aberto, a gente ajuda a escolher.</p>
      </div>
      <div class="step-card" data-reveal style="--reveal-delay: 80ms">
        <div class="step-card__num" aria-hidden="true">2</div>
        <h3 class="feat__title">Montamos o menu com você</h3>
        <p class="feat__text">Um cardápio enxuto, com as suas escolhas de entrada, corte e acompanhamento. Menu kids quando tiver criança.</p>
      </div>
      <div class="step-card" data-reveal style="--reveal-delay: 160ms">
        <div class="step-card__num" aria-hidden="true">3</div>
        <h3 class="feat__title">Reservamos o espaço</h3>
        <p class="feat__text">Definimos qual salão, se o fechamento é parcial, total ou da casa inteira, e deixamos tudo pronto para o seu dia.</p>
      </div>
    </div>

    <div class="menu-card" data-reveal style="--reveal-delay: 120ms">
      <div class="menu-card__head">
        <span class="menu-card__brand">maria e jose · parrilla argentina</span>
        <h3 class="menu-card__title">Exemplo de menu fechado</h3>
        <p class="menu-card__sub">Formato real usado em um batizado na casa. O seu é montado do zero, com o nome do evento impresso.</p>
      </div>
      <div class="menu-card__cols">
        <div class="menu-card__col">
          <h4>Entradas</h4>
          <ul>
            <li>Pão de alho da casa</li>
            <li>Linguiça artesanal</li>
            <li>Pastel canastra</li>
          </ul>
        </div>
        <div class="menu-card__col">
          <h4>Menu adulto</h4>
          <p class="menu-card__note">Cortes Angus · escolha 1</p>
          <ul>
            <li>Filet mignon</li>
            <li>Picanha</li>
          </ul>
          <p class="menu-card__note">Acompanhamentos · escolha 2</p>
          <ul>
            <li>Salada Recoleta</li>
            <li>Mandioca cozida</li>
            <li>Arroz branco</li>
            <li>Farofa San Telmo</li>
            <li>Batata frita</li>
          </ul>
        </div>
        <div class="menu-card__col">
          <h4>Menu kids</h4>
          <ul>
            <li>Filet mignon kids</li>
            <li>Arroz e batata frita</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="espaco" aria-labelledby="espaco-title">
  <div class="wrap">
    <div class="section-header" data-reveal>
      <span class="eyebrow">o espaço</span>
      <h2 class="section-title" id="espaco-title">Três salões, do intimista ao completo</h2>
    </div>

    <div class="experience__grid experience__grid--3">
      <div class="feat" data-reveal>
        <h3 class="feat__title">Fechamento parcial</h3>
        <p class="feat__text">Um salão reservado só para o seu grupo, com a casa seguindo o movimento normal ao lado.</p>
      </div>
      <div class="feat" data-reveal style="--reveal-delay: 80ms">
        <h3 class="feat__title">Fechamento total</h3>
        <p class="feat__text">Mais de um salão reservado, para grupos maiores que precisam de circulação e espaço próprio.</p>
      </div>
      <div class="feat" data-reveal style="--reveal-delay: 160ms">
        <h3 class="feat__title">Casa inteira</h3>
        <p class="feat__text">A parrilla toda sua. Exclusividade total para o evento, sem outros clientes no salão.</p>
      </div>
    </div>

    <p class="espaco__note" data-reveal>O formato certo depende da quantidade de convidados e do que você imaginou. Definimos isso junto, na conversa.</p>

    <div class="chips" data-reveal style="--reveal-delay: 80ms">
      <span class="chips__label">Já recebemos:</span>
      <span class="chip">Casamentos</span>
      <span class="chip">Aniversários</span>
      <span class="chip">Batizados</span>
      <span class="chip">Confraternizações empresariais</span>
    </div>
  </div>
</section>

<section class="faq" aria-labelledby="faq-title">
  <div class="wrap">
    <div class="section-header" data-reveal>
      <span class="eyebrow">dúvidas frequentes</span>
      <h2 class="section-title" id="faq-title">Antes de fechar</h2>
    </div>

    <div class="faq__list">
      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Cabe quantas pessoas?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Depende do formato. São <b>três salões</b>, e dá para reservar um deles, mais de um, ou a casa inteira. Você nos diz quantos convidados espera e a gente indica o arranjo que funciona melhor.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          O que é o menu fechado?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Um cardápio mais enxuto que o do dia a dia, montado com as suas escolhas — entradas, corte principal e acompanhamentos. Serve mais rápido, o custo fica previsível e ninguém fica esperando. Menu kids quando houver criança.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Dá para fechar a casa inteira?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Sim. Conforme a quantidade de pessoas e a necessidade do evento, fechamos parcial, total ou a casa toda em exclusividade.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Posso levar decoração, bolo e doces?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Sim, é o mais comum. Combinamos no atendimento o horário de montagem e como fica a disposição das mesas no salão.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Quanto custa?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Varia com o número de convidados, o menu escolhido e o tipo de fechamento. Preencha o formulário e montamos uma proposta com os valores para o seu caso.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Com quanta antecedência preciso reservar?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Quanto antes, melhor — datas de fim de semana e fim de ano saem primeiro. Se a sua data está próxima, fale com a gente mesmo assim: às vezes dá para encaixar.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Quais dias vocês atendem?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">De <b>terça a domingo</b>, no almoço (11h às 16h) e no jantar (18h30 às 23h). Às segundas as duas casas ficam fechadas. Para eventos, horários fora dessa grade podem ser combinados.</div>
      </details>
    </div>
  </div>
</section>

<section class="final-cta" aria-labelledby="final-cta-title">
  <div class="wrap">
    <h2 class="final-cta__title" id="final-cta-title" data-reveal>Seu evento começa <b>com uma conversa</b>.</h2>
    <p class="final-cta__text" data-reveal style="--reveal-delay: 80ms">Conte o que você imaginou e montamos a proposta. Sem compromisso.</p>
    <a href="#form-card" class="final-cta__btn" data-reveal style="--reveal-delay: 160ms">
      Reservar agora
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7h8 M7 3l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </a>
  </div>
</section>

<footer class="footer">
  <div class="wrap">
    <img src="https://mariaejose.com.br/wp-content/uploads/2024/12/logo-branco.png" alt="Maria e Jose Parrilla" class="footer__logo" width="498" height="107" />

    <p class="footer__hours">Terça a domingo · Almoço 11h às 16h · Jantar 18h30 às 23h</p>

    <div class="footer__locations">
      <div>
        <div class="footer__loc__city">Franca/SP</div>
        <div class="footer__loc__detail">
          <a href="https://maps.google.com/?q=Av.+Major+Nicácio,+2060,+Franca+SP" target="_blank" rel="noopener">Av. Major Nicácio, 2060 - Centro</a><br>
          <a href="https://wa.me/5516999965739" target="_blank" rel="noopener">(16) 99996-5739</a>
        </div>
      </div>
      <div>
        <div class="footer__loc__city">Araraquara/SP</div>
        <div class="footer__loc__detail">
          <a href="https://maps.google.com/?q=Rua+Voluntários+da+Pátria,+1505,+Araraquara+SP" target="_blank" rel="noopener">Rua Voluntários da Pátria, 1505 - Centro</a><br>
          <a href="https://wa.me/5516997130782" target="_blank" rel="noopener">(16) 99713-0782</a>
        </div>
      </div>
    </div>

    <div class="footer__copy">© 2026 Maria & Jose Parrilla - Todos os direitos reservados</div>
  </div>
</footer>

<div class="sticky-cta" id="sticky-cta" aria-hidden="true">
  <a href="#form-card" class="sticky-cta__btn">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 6h12 M5 1.5v3 M11 1.5v3" stroke-linecap="round" /></svg>
    Reservar mesa
  </a>
</div>
`;

  function injetarDependencias(aoTerminar) {
    var cabeca = document.head || document.documentElement;
    var pendentes = 0, avisado = false;
    function pronto() {
      if (--pendentes > 0 || avisado) return;
      avisado = true;
      aoTerminar();
    }
    function estilo(href) {
      if (document.querySelector('link[href="' + href + '"]')) return;
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      cabeca.appendChild(l);
    }
    function script(src) {
      if (document.querySelector('script[src="' + src + '"]')) return;
      pendentes++;
      var sc = document.createElement('script');
      // script inserido por JS ignora defer: async=false preserva a ordem
      sc.async = false;
      sc.src = src;
      sc.onload = sc.onerror = pronto;
      cabeca.appendChild(sc);
    }
    estilo('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
    estilo('https://cdn.jsdelivr.net/npm/flatpickr@4/dist/flatpickr.min.css');
    script('https://cdn.jsdelivr.net/npm/flatpickr@4');
    script('https://cdn.jsdelivr.net/npm/flatpickr@4/dist/l10n/pt.js');
    if (!pendentes) aoTerminar();
  }

  function montar() {
    var raiz = document.getElementById('meje');
    if (!raiz || raiz.getAttribute('data-montado')) return false;
    raiz.className = ((raiz.className || '') + ' meje').trim();
    raiz.innerHTML = MARKUP;
    raiz.setAttribute('data-montado', '1');
    return true;
  }

  var jaIniciou = false;
  function iniciarUmaVez() {
    if (jaIniciou) return;
    jaIniciou = true;
    iniciar();
  }

  function comecar() {
    if (!montar()) return;
    injetarDependencias(iniciarUmaVez);
    // rede ruim nao pode deixar a pagina parada: segue sem as bibliotecas,
    // que tem fallback proprio no CSS e nos guardas do codigo
    setTimeout(iniciarUmaVez, 3000);
  }

  function iniciar() {
    // ---------- CONFIG ----------
    const WHATSAPP_NUMBERS = {
      franca:     '5516999965739',
      araraquara: '5516997130782',
    };
    const UNIDADE_LABEL = {
      franca:     'Franca/SP',
      araraquara: 'Araraquara/SP',
    };

    // ---------- DESTINO DO LEAD (n8n) ----------
    // Mesmo workflow da pagina de reservas. O campo `origem` separa os dois na planilha.
    const N8N_WEBHOOK = 'https://n8n.overenterprise.com.br/webhook/reservas-mej';
    const ORIGEM = 'eventos';

    // ---------- EVENT ID (deduplicacao) ----------
    // Um id por tentativa, gerado no load. O passo 1 e o passo 2 enviam com o MESMO id:
    // no n8n o `appendOrUpdate` atualiza a linha em vez de criar outra, e no Meta o Lead
    // repetido e descartado (mesmo event_name + event_id em ate 48h).
    const LEAD_EVENT_ID = 'lead_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    let leadFired = false;      // pixel Meta
    let analyticsFired = false; // gtag + dataLayer

    // ---------- DATA: HOJE ATE +18 MESES ----------
    // Evento se planeja com muita antecedencia, entao a janela e bem maior que a de mesa.
    const dataInput = document.getElementById('data');
    const today = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 540);
    const isoLocal = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };
    dataInput.min = isoLocal(today);
    dataInput.max = isoLocal(max);

    // ---------- FLATPICKR ----------
    // Sem bloqueio de segunda-feira: para evento, horario fora da grade normal e combinavel.
    let fpInstance = null;
    function initFlatpickr() {
      if (fpInstance || typeof flatpickr !== 'function') return;
      fpInstance = flatpickr(dataInput, {
        locale: (typeof flatpickr.l10ns !== 'undefined' && flatpickr.l10ns.pt) ? 'pt' : 'default',
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'd/m/Y',
        altInputClass: 'field__input',
        allowInput: true,
        minDate: 'today',
        maxDate: max,
        disableMobile: true,
        parseDate: function (str) {
          if (!str) return undefined;
          const m = String(str).match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
          if (!m) return undefined;
          let [, d, mo, y] = m;
          d = parseInt(d, 10); mo = parseInt(mo, 10); y = parseInt(y, 10);
          if (y < 100) y += 2000;
          if (d < 1 || d > 31 || mo < 1 || mo > 12) return undefined;
          const dt = new Date(y, mo - 1, d);
          if (dt.getDate() !== d || dt.getMonth() !== mo - 1) return undefined;
          return dt;
        },
        onReady: function (_, __, instance) {
          if (!instance.altInput) return;
          instance.altInput.placeholder = 'dd/mm/aaaa';
          instance.altInput.setAttribute('inputmode', 'numeric');
          instance.altInput.setAttribute('autocomplete', 'off');
          instance.altInput.addEventListener('input', function (e) {
            const isDelete = e.inputType && e.inputType.indexOf('delete') === 0;
            let cleaned = e.target.value.replace(/[^\d/]/g, '').slice(0, 10);
            const parts = cleaned.split('/');
            if (parts.length > 3) cleaned = parts.slice(0, 3).join('/') + parts.slice(3).join('');
            if (cleaned.indexOf('/') === -1) {
              const digits = cleaned;
              let out = '';
              for (let k = 0; k < digits.length; k++) {
                if (k === 2 || k === 4) out += '/';
                out += digits[k];
              }
              if (!isDelete && (digits.length === 2 || digits.length === 4)) out += '/';
              cleaned = out;
            }
            e.target.value = cleaned;
          });
        },
        onChange: function () {
          if (dataInput.value) semDataInput.checked = false;
          setFieldValid('data', true);
        }
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFlatpickr);
    } else {
      setTimeout(initFlatpickr, 0);
    }
    window.addEventListener('load', initFlatpickr);

    // ---------- MASCARA WHATSAPP ----------
    const whatsappInput = document.getElementById('whatsapp');
    const isIntlPhone = (raw) => /^\s*(\+|00)/.test(raw);
    whatsappInput.addEventListener('input', (e) => {
      const raw = e.target.value;
      if (isIntlPhone(raw)) {
        const digits = raw.replace(/\D/g, '').replace(/^0+/, '').slice(0, 15);
        e.target.value = '+' + digits;
        return;
      }
      let v = raw.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (v.length > 0) {
        v = v.replace(/^(\d{0,2})$/, '($1');
      }
      e.target.value = v;
    });

    // ---------- VALIDACAO ----------
    const semDataInput = document.getElementById('sem-data');

    function setFieldValid(name, valid, customMsg) {
      const field = document.querySelector(`[data-field="${name}"]`);
      if (!field) return;
      field.classList.toggle('is-invalid', !valid);
      const control = field.querySelector('input, select, textarea');
      if (control) {
        if (valid) control.removeAttribute('aria-invalid');
        else control.setAttribute('aria-invalid', 'true');
      }
      const errEl = field.querySelector('.field__error');
      if (errEl && customMsg) errEl.textContent = customMsg;
    }

    function validateNome() {
      const ok = document.getElementById('nome').value.trim().length >= 2;
      setFieldValid('nome', ok);
      return ok;
    }
    function validateWhatsapp() {
      const raw = document.getElementById('whatsapp').value;
      const v = raw.replace(/\D/g, '');
      const ok = isIntlPhone(raw) ? v.length >= 8 : v.length >= 10;
      setFieldValid('whatsapp', ok);
      return ok;
    }
    function validateTipoEvento() {
      const ok = !!document.getElementById('tipo_evento').value;
      setFieldValid('tipo_evento', ok);
      return ok;
    }
    function validateConvidados() {
      const ok = !!document.getElementById('convidados').value;
      setFieldValid('convidados', ok);
      return ok;
    }
    function validateUnidade() {
      const ok = !!document.querySelector('input[name="unidade"]:checked');
      setFieldValid('unidade', ok);
      return ok;
    }
    // Data e opcional: so reprova se preencheram algo invalido ou uma data passada.
    function validateData() {
      if (semDataInput.checked) { setFieldValid('data', true); return true; }
      const v = dataInput.value;
      if (!v) { setFieldValid('data', true); return true; }
      const [y, m, d] = v.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      if (isNaN(dt.getTime())) {
        setFieldValid('data', false, 'Data inválida. Use dd/mm/aaaa.');
        return false;
      }
      const isPast = dt < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (isPast) {
        setFieldValid('data', false, 'Escolha uma data a partir de hoje.');
        return false;
      }
      setFieldValid('data', true);
      return true;
    }

    semDataInput.addEventListener('change', () => {
      if (semDataInput.checked) {
        if (fpInstance) fpInstance.clear(); else dataInput.value = '';
        setFieldValid('data', true);
      }
    });

    // Validacao ao vivo so depois da primeira tentativa em cada passo.
    const attempted = { 1: false, 2: false };
    function gate(step, fn) {
      return () => { if (attempted[step]) fn(); };
    }
    document.getElementById('nome').addEventListener('blur', gate(1, validateNome));
    document.getElementById('nome').addEventListener('input', gate(1, validateNome));
    whatsappInput.addEventListener('blur', gate(1, validateWhatsapp));
    whatsappInput.addEventListener('input', gate(1, validateWhatsapp));
    document.getElementById('tipo_evento').addEventListener('change', gate(1, validateTipoEvento));
    document.getElementById('convidados').addEventListener('change', gate(1, validateConvidados));
    document.querySelectorAll('input[name="unidade"]').forEach(r =>
      r.addEventListener('change', gate(2, validateUnidade)));

    function focusFirstInvalid(panel) {
      const bad = panel.querySelector('.is-invalid');
      if (!bad) return;
      bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const focusable = bad.querySelector('input, select, textarea');
      if (focusable) focusable.focus({ preventScroll: true });
    }

    // ---------- NAVEGACAO ENTRE PASSOS ----------
    const form = document.getElementById('form_eventos');
    const formCard = document.getElementById('form-card');
    const panel1 = form.querySelector('[data-panel="1"]');
    const panel2 = form.querySelector('[data-panel="2"]');
    const dot1 = form.querySelector('[data-dot="1"]');
    const dot2 = form.querySelector('[data-dot="2"]');
    const nextBtn = document.getElementById('step-next');
    const backBtn = document.getElementById('step-back');

    function goToStep(n) {
      panel1.hidden = n !== 1;
      panel2.hidden = n !== 2;
      dot1.classList.toggle('is-active', n === 1);
      dot1.classList.toggle('is-done', n === 2);
      dot2.classList.toggle('is-active', n === 2);
      formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function collect() {
      const fd = new FormData(form);
      const unidadeSlug = fd.get('unidade') || '';
      return {
        nome: (fd.get('nome') || '').trim(),
        whatsapp: fd.get('whatsapp') || '',
        tipo_evento: fd.get('tipo_evento') || '',
        convidados: fd.get('convidados') || '',
        unidade_slug: unidadeSlug,
        unidade: UNIDADE_LABEL[unidadeSlug] || '',
        data: semDataInput.checked ? '' : (fd.get('data') || ''),
        sem_data: semDataInput.checked,
        observacao: (fd.get('observacao') || '').trim(),
      };
    }

    nextBtn.addEventListener('click', () => {
      attempted[1] = true;
      const ok = [
        validateNome(),
        validateWhatsapp(),
        validateTipoEvento(),
        validateConvidados(),
      ].every(Boolean);

      if (!ok) { focusFirstInvalid(panel1); return; }

      const data = collect();

      // O lead esta capturado AQUI. Quem abandonar o passo 2 ja virou lead.
      fireLead(data);
      sendLead(data, 'parcial');

      goToStep(2);
    });

    backBtn.addEventListener('click', () => goToStep(1));

    // ---------- PIXEL ----------
    // Fonte unica: o Lead sai daqui. Se o GTM ganhar uma tag de Lead que tambem
    // pegue esta pagina, remova uma das duas — senao sao dois Leads por pessoa.
    // `leadFired` impede o disparo repetido; o eventID e a segunda camada.
    function fireLead(data) {
      if (typeof fbq === 'function' && !leadFired) {
        fbq('track', 'Lead', {
          content_name: 'Evento',
          content_category: data.tipo_evento,
          faixa_convidados: data.convidados,
        }, { eventID: LEAD_EVENT_ID }); // 4o parametro, NUNCA dentro do custom data
        leadFired = true;
      }
      if (analyticsFired) return;
      analyticsFired = true;

      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          method: 'whatsapp_evento',
          origem: ORIGEM,
          tipo_evento: data.tipo_evento,
          faixa_convidados: data.convidados,
        });
      }
      const digits = data.whatsapp.replace(/\D/g, '');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        event_id: LEAD_EVENT_ID,
        method: 'whatsapp_evento',
        origem: ORIGEM,
        telefone: isIntlPhone(data.whatsapp) ? '+' + digits : '+55' + digits,
        tipo_evento: data.tipo_evento,
        faixa_convidados: data.convidados,
      });
    }

    // ---------- ENVIO AO N8N ----------
    function getCookie(name) {
      const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return m ? m.pop() : '';
    }

    // Fire-and-forget: nunca bloqueia o fluxo do WhatsApp nem quebra se falhar.
    // Passo 1 manda `parcial`, passo 2 manda `completo` com o MESMO event_id —
    // o n8n faz upsert e a linha e atualizada em vez de duplicada.
    function sendLead(data, status) {
      const qs = new URLSearchParams(location.search);
      const fbclid = qs.get('fbclid') || '';
      fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true, // sobrevive ao window.open do WhatsApp
        body: JSON.stringify({
          event_id: LEAD_EVENT_ID,
          origem: ORIGEM,
          status: status,
          nome: data.nome,
          whatsapp: data.whatsapp,
          tipo_evento: data.tipo_evento,
          convidados: data.convidados,
          // Espelha na chave `pessoas` porque o Code node do n8n ja mapeia essa coluna.
          pessoas: data.convidados,
          unidade: data.unidade,
          unidade_slug: data.unidade_slug,
          data: data.data,
          sem_data: data.sem_data ? 'sim' : '',
          observacao: data.observacao,
          enviado_em: new Date().toISOString(),
          url: location.href,
          utm_source: qs.get('utm_source') || '',
          utm_campaign: qs.get('utm_campaign') || '',
          utm_content: qs.get('utm_content') || '',
          fbclid: fbclid,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : ''),
        }),
      }).catch(() => { /* silencioso: o WhatsApp e o caminho principal */ });
    }

    // ---------- SUBMIT (passo 2) ----------
    const submitBtn = document.getElementById('submit-btn');
    const successEl = document.getElementById('form-success');
    const whatsappLink = document.getElementById('whatsapp-link');
    const summaryEl = document.getElementById('reservation-summary');
    const resetBtn = document.getElementById('reset-btn');

    function formatDateBR(iso) {
      if (!iso) return '';
      const [y, m, d] = iso.split('-');
      return `${d}/${m}/${y}`;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      attempted[2] = true;

      const ok = [validateUnidade(), validateData()].every(Boolean);
      if (!ok) { focusFirstInvalid(panel2); return; }

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.querySelector('.submit-btn__text').textContent = 'Enviando…';

      const data = collect();
      const dataLabel = data.data ? formatDateBR(data.data) : 'A definir';

      summaryEl.innerHTML = `
        <div class="reservation-summary__row"><span class="reservation-summary__key">Nome</span><span class="reservation-summary__val">${escapeHtml(data.nome)}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Evento</span><span class="reservation-summary__val">${escapeHtml(data.tipo_evento)}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Convidados</span><span class="reservation-summary__val">${escapeHtml(data.convidados)}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Casa</span><span class="reservation-summary__val">${escapeHtml(data.unidade)}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Data</span><span class="reservation-summary__val">${escapeHtml(dataLabel)}</span></div>
        ${data.observacao ? `<div class="reservation-summary__row"><span class="reservation-summary__key">Sobre</span><span class="reservation-summary__val">${escapeHtml(data.observacao)}</span></div>` : ''}
      `;

      const msg =
        `Olá! Gostaria de falar sobre um evento no Maria e Jose Parrilla.\n\n` +
        `*Nome:* ${data.nome}\n` +
        `*Tipo de evento:* ${data.tipo_evento}\n` +
        `*Convidados:* ${data.convidados}\n` +
        `*Unidade:* ${data.unidade}\n` +
        `*Data prevista:* ${dataLabel}\n` +
        `*WhatsApp:* ${data.whatsapp}\n` +
        (data.observacao ? `*Sobre o evento:* ${data.observacao}\n` : '');

      const url = `https://wa.me/${WHATSAPP_NUMBERS[data.unidade_slug]}?text=${encodeURIComponent(msg)}`;
      whatsappLink.href = url;

      // Atualiza a linha ja criada no passo 1 (mesmo event_id).
      sendLead(data, 'completo');
      // Rede de seguranca: se o pixel ainda nao carregara no passo 1, dispara agora.
      fireLead(data);

      setTimeout(() => {
        formCard.classList.add('is-submitted');
        successEl.classList.add('is-active');
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { window.open(url, '_blank'); }, 800);
      }, 400);
    });

    resetBtn.addEventListener('click', () => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.submit-btn__text').textContent = 'Enviar pelo WhatsApp';
      formCard.classList.remove('is-submitted');
      successEl.classList.remove('is-active');
      goToStep(2);
    });

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[c]));
    }

    // ---------- STICKY CTA MOBILE ----------
    const stickyCta = document.getElementById('sticky-cta');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        const formInView = entries[0].isIntersecting;
        const submitted = formCard.classList.contains('is-submitted');
        const show = !formInView && !submitted;
        stickyCta.classList.toggle('is-visible', show);
        stickyCta.setAttribute('aria-hidden', show ? 'false' : 'true');
        document.getElementById('meje').classList.toggle('has-sticky-cta', show);
      }, { rootMargin: '-80px 0px -200px 0px', threshold: 0 });
      io.observe(formCard);
    }

    // ---------- SCROLL REVEAL ----------
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const reveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            reveal.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
      document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
    } else {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', comecar);
  } else {
    comecar();
  }
})();
