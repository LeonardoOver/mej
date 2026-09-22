/* =============================================================================
   Reservas - Maria e Jose Parrilla
   -----------------------------------------------------------------------------
   Arquivo unico de comportamento. O widget do Elementor carrega apenas:

     <link rel="stylesheet" href=".../app.css">
     <div id="mejr" class="mejr"></div>
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

      <h1 class="hero__title">Reserve sua mesa <b>na melhor parrilla</b> do interior paulista.</h1>

      <p class="hero__lede">Cortes argentinos selecionados, preparo lento na parrilla e o atendimento que faz nossa casa virar a sua. Resposta pelo WhatsApp em poucos minutos.</p>

      <ul class="hero__bullets">
        <li>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
          Confirmação rápida pelo WhatsApp
        </li>
        <li>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
          Unidades em Franca/SP e Araraquara/SP
        </li>
        <li>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
          Almoço (11h às 16h) e jantar (18h30 às 23h), de terça a domingo
        </li>
      </ul>
    </div>

    <div class="form-card" id="form-card">
      <div class="form-card__head">
        <h2 class="form-card__title">Reserva de mesa</h2>
        <p class="form-card__subtitle">Preencha em 30 segundos · sem cadastro</p>
      </div>

      <form class="form" id="form_reservas" novalidate aria-describedby="form-footnote">

        <fieldset class="field">
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

        <div class="field--row">
          <div class="field" data-field="data">
            <label class="field__label" for="data">Data <span class="req" aria-hidden="true">*</span></label>
            <input class="field__input" type="date" id="data" name="data" required aria-describedby="err-data" placeholder="dd/mm/aaaa" />
            <p class="field__error" role="alert" id="err-data">Escolha uma data válida.</p>
          </div>
          <div class="field" data-field="horario">
            <label class="field__label" for="horario">Horário <span class="req" aria-hidden="true">*</span></label>
            <select class="field__select" id="horario" name="horario" required aria-describedby="hint-horario err-horario">
              <option value="" disabled selected>Selecione</option>
              <optgroup label="Almoço" id="opt-almoco">
                <option value="11:00">11h00</option>
                <option value="11:15">11h15</option>
                <option value="11:30">11h30</option>
                <option value="11:45">11h45</option>
                <option value="12:00">12h00</option>
                <option value="12:15">12h15</option>
              </optgroup>
              <optgroup label="Jantar" id="opt-jantar">
                <option value="18:30">18h30</option>
                <option value="18:45">18h45</option>
                <option value="19:00">19h00</option>
                <option value="19:15">19h15</option>
              </optgroup>
            </select>
            <p class="field__error" role="alert" id="err-horario">Selecione o horário.</p>
          </div>
        </div>
        <p class="field__hint field__hint--row" id="hint-horario">Reservas até 12h15 (almoço) e 19h15 (jantar). Após esses horários, atendimento por ordem de chegada.</p>

        <div class="field" data-field="pessoas">
          <label class="field__label" for="pessoas">Quantas pessoas <span class="req" aria-hidden="true">*</span></label>
          <select class="field__select" id="pessoas" name="pessoas" required aria-describedby="err-pessoas">
            <option value="" disabled selected>Selecione</option>
            <option value="1">1 pessoa</option>
            <option value="2">2 pessoas</option>
            <option value="3">3 pessoas</option>
            <option value="4">4 pessoas</option>
            <option value="5">5 pessoas</option>
            <option value="6">6 pessoas</option>
            <option value="7">7 pessoas</option>
            <option value="8">8 pessoas</option>
            <option value="9+">9 ou mais (evento)</option>
          </select>
          <p class="field__hint" id="hint-pessoas">Para grupos de 10+ falamos sobre menu fechado e área reservada.</p>
          <p class="field__error" role="alert" id="err-pessoas">Escolha quantas pessoas.</p>
        </div>

        <div class="field" data-field="observacao">
          <label class="field__label" for="observacao">Observação <span class="field__optional">(opcional)</span></label>
          <textarea class="field__input field__textarea" id="observacao" name="observacao" rows="3" maxlength="280" placeholder="Aniversário, cadeira de bebê, restrição alimentar, mesa na varanda…" aria-describedby="hint-observacao"></textarea>
          <p class="field__hint" id="hint-observacao">Algum pedido especial? Conte aqui — faremos o possível.</p>
        </div>

        <button type="submit" class="submit-btn" id="submit-btn">
          <span class="spinner" aria-hidden="true"></span>
          <svg class="wp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          <span class="submit-btn__text">Reservar pelo WhatsApp</span>
        </button>

        <p class="form__footnote" id="form-footnote">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M2 7l3 3 7-7" /></svg>
          Seus dados são usados apenas para confirmar a reserva.
        </p>
      </form>

      <div class="form-success" id="form-success" role="status" aria-live="polite">
        <div class="form-success__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 class="form-success__title">Quase lá!</h3>
        <p class="form-success__text">Confira sua reserva e toque no botão para confirmar com nossa equipe pelo WhatsApp.</p>

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
      <span class="eyebrow">o ambiente</span>
      <h2 class="section-title" id="ambient-title">Descubra o que te aguarda</h2>
    </div>

    <div class="ambient__grid">
      <div class="ambient__item" data-reveal>
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/04/1777489012641.png" alt="Cortes argentinos servidos em tábua de madeira" loading="lazy" width="900" height="600" />
        <div class="ambient__item__caption">Cortes nobres</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 80ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/05/salao-acolhedor-scaled.webp" alt="Salão do Maria e Jose Parrilla com mesas de madeira e teto rústico" loading="lazy" width="1200" height="1600" />
        <div class="ambient__item__caption">Salão acolhedor</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 160ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/05/grelha-cheia.png" alt="Carnes assando na parrilla argentina sobre o fogo" loading="lazy" width="700" height="400" />
        <div class="ambient__item__caption">Na parrilla</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 80ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/04/capa-3-2.png" alt="Mesa servida com taças de vinho" loading="lazy" width="700" height="400" />
        <div class="ambient__item__caption">Vinhos selecionados</div>
      </div>
      <div class="ambient__item" data-reveal style="--reveal-delay: 160ms">
        <img src="https://mariaejose.com.br/wp-content/uploads/2026/05/IMG_5161-scaled.jpg" alt="Detalhes da mesa montada" loading="lazy" width="700" height="400" />
        <div class="ambient__item__caption">Detalhes que importam</div>
      </div>
    </div>
  </div>
</section>

<section class="experience" aria-labelledby="experience-title">
  <div class="wrap">
    <div class="section-header" data-reveal>
      <span class="eyebrow">a experiência</span>
      <h2 class="section-title" id="experience-title">O que esperar</h2>
    </div>

    <div class="experience__grid">
      <div class="feat" data-reveal>
        <div class="feat__icon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">
            <!-- Garfo (esquerda) -->
            <path d="M9 6 L 9 14 M 12 6 L 12 14 M 15 6 L 15 14" />
            <path d="M9 14 L 15 14" />
            <path d="M12 14 L 12 30" />
            <!-- Faca (direita) -->
            <path d="M21 22 L 21 13 C 21 9, 23 6, 27 6 L 27 22 Z" />
            <path d="M22 22 L 22 30 L 26 30 L 26 22" />
          </svg>
        </div>
        <h3 class="feat__title">Carne Angus</h3>
        <p class="feat__text">Cortes nobres com a suculência e maciez que só a raça entrega.</p>
      </div>

      <div class="feat" data-reveal style="--reveal-delay: 80ms">
        <div class="feat__icon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="18" cy="18" r="13" />
            <path d="M11 18 L 16 23 L 25 13" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h3 class="feat__title">Tradição argentina</h3>
        <p class="feat__text">Receitas autênticas com toque de brasilidade, no preparo lento da parrilla.</p>
      </div>

      <div class="feat" data-reveal style="--reveal-delay: 160ms">
        <div class="feat__icon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 18 C 6 12, 12 8, 18 8 C 24 8, 30 12, 30 18" stroke-linecap="round" />
            <circle cx="13" cy="20" r="2" fill="currentColor" stroke="none" />
            <circle cx="23" cy="20" r="2" fill="currentColor" stroke="none" />
            <path d="M11 25 Q 18 30, 25 25" stroke-linecap="round" />
          </svg>
        </div>
        <h3 class="feat__title">Atendimento prestativo</h3>
        <p class="feat__text">Equipe atenta que conhece os cortes e ajuda a montar sua experiência.</p>
      </div>

      <div class="feat" data-reveal style="--reveal-delay: 240ms">
        <div class="feat__icon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="8" y="6" width="20" height="24" rx="2" />
            <path d="M13 13 L 23 13 M 13 18 L 23 18 M 13 23 L 19 23" stroke-linecap="round" />
          </svg>
        </div>
        <h3 class="feat__title">Para grupos e família</h3>
        <p class="feat__text">Mesas de 1 a 9+ pessoas. Eventos privados em até 50 convidados.</p>
      </div>
    </div>
  </div>
</section>

<section class="reviews" aria-labelledby="reviews-title">
  <div class="wrap">
    <div class="section-header" data-reveal>
      <span class="eyebrow">o que dizem de nós</span>
      <h2 class="section-title" id="reviews-title">Avaliações reais</h2>
    </div>

    <div class="reviews__summary" data-reveal>
      <div class="reviews__big-rating">4,5</div>
      <div class="reviews__stars" aria-hidden="true">★★★★★</div>
      <div class="reviews__count">com base em <b>923 avaliações</b> no Google</div>
    </div>

    <div class="embla" id="reviews-embla">
    <div class="embla__viewport">
    <div class="reviews__grid">
      <article class="review">
        <header class="review__head">
          <div class="review__avatar" aria-hidden="true">M</div>
          <div>
            <div class="review__name">Maria O.</div>
            <div class="review__date">há 2 semanas</div>
          </div>
        </header>
        <div class="review__stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <p class="review__text">Sempre fomos ao restaurante antes da reforma e sempre foi ótima experiência. Ontem fomos conhecer a nova estrutura e superou todas as expectativas: comida de ótima qualidade, local aconchegante e acolhedor, bebidas e drinks excelentes. Minha família amou e com certeza continuaremos a voltar sempre.</p>
      </article>

      <article class="review">
        <header class="review__head">
          <div class="review__avatar" aria-hidden="true">A</div>
          <div>
            <div class="review__name">Ana P.</div>
            <div class="review__date">há 1 mês</div>
          </div>
        </header>
        <div class="review__stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <p class="review__text">Já somos clientes há muito tempo. Fomos conhecer a casa após a reforma. Que maravilha! O lugar ficou lindo demais. Sentamos nas mesinhas na calçada, que gostoso! Pedimos a parrillada e estava sensacional, no ponto certo, saborosa e o chimichurri dá o toque especial. PARABÉNS pessoal, está tudo maravilhoso.</p>
      </article>

      <article class="review">
        <header class="review__head">
          <div class="review__avatar" aria-hidden="true">W</div>
          <div>
            <div class="review__name">Weber S.</div>
            <div class="review__date">há 4 meses</div>
          </div>
        </header>
        <div class="review__stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <p class="review__text">Sensacional a experiência que tivemos, eu e esposa, no dia 19/12. Sabor dos alimentos, simpatia no atendimento, qualidade da carne. Indico com confiança, quem for terá uma excelente experiência.</p>
      </article>

      <article class="review">
        <header class="review__head">
          <div class="review__avatar" aria-hidden="true">V</div>
          <div>
            <div class="review__name">Vinicius B.</div>
            <div class="review__date">há 1 ano</div>
          </div>
        </header>
        <div class="review__stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <p class="review__text">Ótimo restaurante, as carnes são de ótima qualidade. Experiência completa, recomendo a todos que apreciam um bom corte.</p>
      </article>

      <article class="review">
        <header class="review__head">
          <div class="review__avatar" aria-hidden="true">G</div>
          <div>
            <div class="review__name">Gabriel G.</div>
            <div class="review__date">há 1 ano</div>
          </div>
        </header>
        <div class="review__stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <p class="review__text">Muito bom! Atendimento atencioso, ambiente agradável e cardápio excelente. Voltaremos sem dúvida.</p>
      </article>

      <article class="review">
        <header class="review__head">
          <div class="review__avatar" aria-hidden="true">M</div>
          <div>
            <div class="review__name">Mariana C.</div>
            <div class="review__date">há 6 meses</div>
          </div>
        </header>
        <div class="review__stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <p class="review__text">A melhor parrilla da região. Bife de chorizo no ponto perfeito e o chimichurri da casa é especial. Ambiente acolhedor.</p>
      </article>
    </div>
    </div>
    <div class="embla__dots" id="reviews-dots" aria-label="Navegação das avaliações"></div>
    </div>
  </div>
</section>

<section class="faq" aria-labelledby="faq-title">
  <div class="wrap">
    <div class="section-header" data-reveal>
      <span class="eyebrow">dúvidas frequentes</span>
      <h2 class="section-title" id="faq-title">Antes de reservar</h2>
    </div>

    <div class="faq__list">
      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          A reserva é gratuita?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Sim. Não cobramos taxa de reserva e você não precisa criar cadastro. O pedido cai direto no nosso WhatsApp e nossa equipe confirma o horário em poucos minutos.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Funcionam todos os dias?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Atendemos de <b>terça a domingo</b>, no almoço (11h às 16h) e no jantar (18h30 às 23h). Às segundas-feiras as duas casas ficam fechadas.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Posso aparecer sem reserva?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Pode. Reservas online vão até 12h15 (almoço) e 19h15 (jantar), depois disso é só chegar. Em finais de semana e datas especiais a casa enche rápido; reservar com pelo menos 1h de antecedência garante seu lugar e evita espera.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          E se eu atrasar?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">A tolerância é de <b>15 minutos</b> sobre o horário reservado. Atrasos maiores podem liberar a mesa para outra família que esteja esperando. Se já souber que vai atrasar, manda mensagem na mesma conversa do WhatsApp.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          E se eu precisar mudar o horário ou cancelar?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Sem problema. Basta responder a mesma conversa no WhatsApp avisando da mudança, quanto antes, melhor para reabrirmos a mesa para outra família.</div>
      </details>

      <details class="faq__item" data-reveal>
        <summary class="faq__q">
          Tenho um aniversário ou evento. Como funciona?
          <span class="faq__q__icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 1v10M1 6h10" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="faq__a">Recebemos eventos privados em até 50 convidados nas duas unidades, com menu fechado e área reservada. Ao reservar para 9 ou mais pessoas, nossa equipe entra em contato para acertar os detalhes.</div>
      </details>
    </div>
  </div>
</section>

<section class="final-cta" aria-labelledby="final-cta-title">
  <div class="wrap">
    <h2 class="final-cta__title" id="final-cta-title" data-reveal>Sua mesa está <b>esperando</b>.</h2>
    <p class="final-cta__text" data-reveal style="--reveal-delay: 80ms">Garanta seu lugar para almoço ou jantar. Confirmação em poucos minutos pelo WhatsApp.</p>
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
    script('https://cdn.jsdelivr.net/npm/embla-carousel@8/embla-carousel.umd.min.js');
    if (!pendentes) aoTerminar();
  }

  function montar() {
    var raiz = document.getElementById('mejr');
    if (!raiz || raiz.getAttribute('data-montado')) return false;
    raiz.className = ((raiz.className || '') + ' mejr').trim();
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
    // ---------- DESTINO DA RESERVA (n8n) ----------
    // Workflow "MEJ - Reservas (LP) -> Planilha + WhatsApp".
    // Grava na planilha (upsert por event_id) e notifica a dona no WhatsApp.
    const N8N_WEBHOOK = 'https://n8n.overenterprise.com.br/webhook/reservas-mej';
    // Separa o lead de mesa do lead de evento na planilha e no pixel.
    // Na página de eventos, trocar para 'eventos'.
    const ORIGEM = 'reservas';
    const CLOSED_WEEKDAY = 1; // 0=domingo, 1=segunda

    // ---------- EVENT ID (deduplicação) ----------
    // Um id por tentativa de reserva, gerado no carregamento da página.
    // "Editar reserva" reenvia com o MESMO id: o Meta descarta o Lead repetido
    // (mesmo event_name + event_id em até 48h) e a planilha atualiza a linha
    // existente em vez de criar outra. Recarregar a página gera um id novo —
    // aí é de fato uma reserva nova.
    const LEAD_EVENT_ID = 'lead_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    let leadFired = false;

    // ---------- UNIDADE PRE-SELECIONADA PELA URL ----------
    // O anuncio de Franca aponta para /reservas/?u=franca (idem araraquara).
    // Tira um campo obrigatorio do caminho de quem vem de midia paga, sem tirar a
    // escolha de ninguem: o radio continua visivel, marcado e editavel.
    // Valor ausente ou desconhecido = nada acontece, o usuario escolhe normalmente.
    (function preselectUnidade() {
      const qs = new URLSearchParams(location.search);
      const raw = (qs.get('u') || qs.get('unidade') || '').trim().toLowerCase();
      if (!raw) return;

      const ALIAS = {
        franca: 'franca',
        fr: 'franca',
        araraquara: 'araraquara',
        ara: 'araraquara',
        ar: 'araraquara',
      };
      const slug = ALIAS[raw];
      if (!slug) return;

      const radio = document.querySelector('input[name="unidade"][value="' + slug + '"]');
      if (!radio) return;

      radio.checked = true;
      // Mantem qualquer listener de validacao em sincronia com o estado marcado.
      radio.dispatchEvent(new Event('change', { bubbles: true }));
    })();

    // ---------- DATA: HOJE ATÉ +90 DIAS ----------
    const dataInput = document.getElementById('data');
    const today = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 90);
    const isoLocal = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };
    // Fallback (caso Flatpickr não carregue): native date picker com min/max
    dataInput.min = isoLocal(today);
    dataInput.max = isoLocal(max);

    // ---------- FLATPICKR ----------
    // Carregado via <script defer>; inicializa quando o script estiver pronto.
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
        disable: [
          function(date) { return date.getDay() === CLOSED_WEEKDAY; }
        ],
        disableMobile: true,
        // Parser permissivo: aceita 8/7/2026, 08/7/2026, 8/07/26, etc.
        parseDate: function(str, format) {
          if (!str) return undefined;
          const m = String(str).match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
          if (!m) return undefined;
          let [, d, mo, y] = m;
          d = parseInt(d, 10); mo = parseInt(mo, 10); y = parseInt(y, 10);
          if (y < 100) y += 2000;
          if (d < 1 || d > 31 || mo < 1 || mo > 12) return undefined;
          const dt = new Date(y, mo - 1, d);
          // Confirma que o Date não rolou (ex.: 31/02 vira 03/03)
          if (dt.getDate() !== d || dt.getMonth() !== mo - 1) return undefined;
          return dt;
        },
        onReady: function(_, __, instance) {
          if (!instance.altInput) return;
          instance.altInput.placeholder = 'dd/mm/aaaa';
          instance.altInput.setAttribute('inputmode', 'numeric');
          instance.altInput.setAttribute('autocomplete', 'off');
          // Máscara leve: aceita dígitos e "/", auto-insere "/" quando útil.
          // Se usuário começa com slashes próprios (ex.: 8/7/2026), preserva layout.
          instance.altInput.addEventListener('input', function(e) {
            const isDelete = e.inputType && e.inputType.indexOf('delete') === 0;
            const raw = e.target.value;
            // Strip caracteres não permitidos
            let cleaned = raw.replace(/[^\d/]/g, '').slice(0, 10);
            // Limita a 2 slashes
            const parts = cleaned.split('/');
            if (parts.length > 3) cleaned = parts.slice(0, 3).join('/') + parts.slice(3).join('');
            // Se usuário NÃO usou "/" e tem ≥2 dígitos, auto-formata como dd/mm/aaaa
            if (cleaned.indexOf('/') === -1) {
              const digits = cleaned;
              let out = '';
              for (let i = 0; i < digits.length; i++) {
                if (i === 2 || i === 4) out += '/';
                out += digits[i];
              }
              if (!isDelete && (digits.length === 2 || digits.length === 4)) out += '/';
              cleaned = out;
            }
            e.target.value = cleaned;
          });
        },
        onChange: function() {
          if (dataShowsError()) validateData();
          filterTimeOptions();
        },
        onClose: function(selectedDates, dateStr, instance) {
          // Usuário digitou algo mas Flatpickr não parseou: marca inválido (só se já devemos mostrar erro)
          if (instance.altInput && instance.altInput.value && selectedDates.length === 0) {
            if (dataShowsError()) setFieldValid('data', false, 'Data inválida. Use dd/mm/aaaa.');
          } else {
            if (dataShowsError()) validateData();
            filterTimeOptions();
          }
        }
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFlatpickr);
    } else {
      // Garante init mesmo se DOMContentLoaded já passou
      setTimeout(initFlatpickr, 0);
    }
    // Se o defer demorar, tenta novamente após window load
    window.addEventListener('load', initFlatpickr);

    // ---------- MÁSCARA WHATSAPP ----------
    const whatsappInput = document.getElementById('whatsapp');
    // Internacional se começar com + ou 00 (gringo). Senão, máscara BR padrão.
    const isIntlPhone = (raw) => /^\s*(\+|00)/.test(raw);
    whatsappInput.addEventListener('input', (e) => {
      const raw = e.target.value;
      if (isIntlPhone(raw)) {
        // Normaliza pra E.164: + seguido de dígitos (00 vira +), máx 15 dígitos.
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

    // ---------- VALIDAÇÃO INLINE ----------
    function setFieldValid(name, valid, customMsg) {
      const field = document.querySelector(`[data-field="${name}"]`)
                || document.querySelector(`fieldset.field input[name="${name}"]`)?.closest('fieldset');
      if (!field) return;
      field.classList.toggle('is-invalid', !valid);
      // a11y: marca o controle como inválido pro leitor de tela.
      const control = field.querySelector('input, select, textarea');
      if (control) {
        if (valid) control.removeAttribute('aria-invalid');
        else control.setAttribute('aria-invalid', 'true');
      }
      const errEl = field.querySelector('.field__error');
      if (errEl) {
        if (customMsg) errEl.textContent = customMsg;
        // Re-injeta o texto ao ficar inválido p/ disparar o role="alert".
        else if (!valid) errEl.textContent = errEl.textContent;
      }
    }
    function validateNome() {
      const v = document.getElementById('nome').value.trim();
      const ok = v.length >= 2;
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
    function validateUnidade() {
      const checked = document.querySelector('input[name="unidade"]:checked');
      const fieldset = document.querySelector('fieldset.field');
      const ok = !!checked;
      if (fieldset) {
        fieldset.classList.toggle('is-invalid', !ok);
        const errEl = fieldset.querySelector('.field__error');
        if (!ok && errEl) errEl.textContent = errEl.textContent; // dispara role="alert"
        document.querySelectorAll('input[name="unidade"]').forEach(r => {
          if (ok) r.removeAttribute('aria-invalid'); else r.setAttribute('aria-invalid', 'true');
        });
      }
      return ok;
    }
    function validateData() {
      const v = dataInput.value;
      if (!v) { setFieldValid('data', false, 'Escolha uma data.'); return false; }
      const [y, m, d] = v.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      const isPast = dt < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isClosed = dt.getDay() === CLOSED_WEEKDAY;
      if (isPast)    { setFieldValid('data', false, 'Escolha uma data a partir de hoje.'); return false; }
      if (isClosed)  { setFieldValid('data', false, 'Casa fechada às segundas. Escolha outro dia.'); return false; }
      setFieldValid('data', true);
      return true;
    }
    function validateHorario() {
      const ok = !!document.getElementById('horario').value;
      setFieldValid('horario', ok);
      return ok;
    }
    function validatePessoas() {
      const ok = !!document.getElementById('pessoas').value;
      setFieldValid('pessoas', ok);
      return ok;
    }

    // ---------- TIMING: "reward early, punish late" ----------
    // Antes do 1º submit, não mostra erro (evita validação prematura - Baymard/NN/g).
    // Depois que um campo fica inválido, revalida ao vivo p/ limpar assim que corrigir.
    const submitState = { attempted: false };
    function shouldShow(fieldSel) {
      const field = document.querySelector(fieldSel);
      return submitState.attempted || (field && field.classList.contains('is-invalid'));
    }
    function dataShowsError() { return shouldShow('[data-field="data"]'); }
    function gate(fieldSel, fn) {
      return () => { if (shouldShow(fieldSel)) fn(); };
    }
    const nomeEl = document.getElementById('nome');
    const whatsEl = document.getElementById('whatsapp');
    nomeEl.addEventListener('blur', gate('[data-field="nome"]', validateNome));
    nomeEl.addEventListener('input', gate('[data-field="nome"]', validateNome));
    whatsEl.addEventListener('blur', gate('[data-field="whatsapp"]', validateWhatsapp));
    whatsEl.addEventListener('input', gate('[data-field="whatsapp"]', validateWhatsapp));
    document.querySelectorAll('input[name="unidade"]').forEach(r => r.addEventListener('change', gate('fieldset.field', validateUnidade)));
    dataInput.addEventListener('change', () => {
      if (dataShowsError()) validateData();
      filterTimeOptions();
    });
    document.getElementById('horario').addEventListener('change', gate('[data-field="horario"]', validateHorario));
    document.getElementById('pessoas').addEventListener('change', gate('[data-field="pessoas"]', validatePessoas));

    // ---------- FILTRAR HORÁRIOS QUANDO DATA = HOJE ----------
    const horarioSelect = document.getElementById('horario');
    const allTimeOptions = Array.from(horarioSelect.querySelectorAll('option[value]:not([disabled])'));
    function filterTimeOptions() {
      const v = dataInput.value;
      if (!v) return;
      const isToday = v === isoLocal(new Date());
      const now = new Date();
      const buffer = 60; // minutos mínimos a partir de agora
      const cutoff = now.getHours() * 60 + now.getMinutes() + buffer;

      let firstAvailable = null;
      allTimeOptions.forEach(opt => {
        if (!isToday) {
          opt.disabled = false; opt.hidden = false; return;
        }
        const [h, m] = opt.value.split(':').map(Number);
        const minutes = h * 60 + m;
        const tooLate = minutes < cutoff;
        opt.disabled = tooLate;
        opt.hidden = tooLate;
        if (!tooLate && firstAvailable === null) firstAvailable = opt.value;
      });

      // Se o horário selecionado virou inválido, limpa
      if (horarioSelect.value && allTimeOptions.find(o => o.value === horarioSelect.value)?.disabled) {
        horarioSelect.value = '';
      }
    }

    // ---------- HELPERS ----------
    function formatDateBR(iso) {
      const [y, m, d] = iso.split('-');
      return `${d}/${m}/${y}`;
    }
    function formatTimeBR(t) { return t.replace(':', 'h'); }
    function formatPessoas(p) {
      if (p === '1') return '1 pessoa';
      if (p === '9+') return '9 ou mais';
      return `${p} pessoas`;
    }

    function getCookie(name) {
      const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return m ? m.pop() : '';
    }

    // Envia a reserva para o n8n (planilha + WhatsApp para a dona). Fire-and-forget:
    // nunca bloqueia o fluxo do WhatsApp nem quebra o envio se falhar.
    // O lead é capturado AQUI, no submit — não depende do usuário concluir o WhatsApp.
    function sendReservation(data, unidadeNome) {
      const qs = new URLSearchParams(location.search);
      const fbclid = qs.get('fbclid') || '';
      const payload = {
        event_id: LEAD_EVENT_ID,
        origem: ORIGEM,
        nome: data.nome,
        whatsapp: data.whatsapp,
        unidade: unidadeNome,
        unidade_slug: data.unidade,
        data: data.data,
        horario: data.horario,
        pessoas: data.pessoas,
        observacao: data.observacao || '',
        enviado_em: new Date().toISOString(),
        url: location.href,
        // Sinais de atribuição — melhoram o match quality se o n8n mandar o Lead via CAPI.
        utm_source: qs.get('utm_source') || '',
        utm_campaign: qs.get('utm_campaign') || '',
        utm_content: qs.get('utm_content') || '',
        fbclid: fbclid,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : ''),
      };
      fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Sem keepalive a request morre no window.open do WhatsApp logo abaixo.
        keepalive: true,
        body: JSON.stringify(payload),
      }).catch(() => { /* silencioso: o WhatsApp é o caminho principal */ });
    }

    // ---------- SUBMIT ----------
    const form = document.getElementById('form_reservas');
    const formCard = document.getElementById('form-card');
    const submitBtn = document.getElementById('submit-btn');
    const successEl = document.getElementById('form-success');
    const whatsappLink = document.getElementById('whatsapp-link');
    const summaryEl = document.getElementById('reservation-summary');
    const resetBtn = document.getElementById('reset-btn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // A partir do 1º submit, a validação ao vivo (blur/input/change) fica ativa.
      submitState.attempted = true;

      const allValid = [
        validateUnidade(),
        validateNome(),
        validateWhatsapp(),
        validateData(),
        validateHorario(),
        validatePessoas(),
      ].every(Boolean);

      if (!allValid) {
        const firstInvalid = document.querySelector('.field.is-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const focusable = firstInvalid.querySelector('input, select');
          focusable && focusable.focus({ preventScroll: true });
        }
        return;
      }

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.querySelector('.submit-btn__text').textContent = 'Reservando…';

      const fd = new FormData(form);
      const data = {
        nome:     fd.get('nome').trim(),
        whatsapp: fd.get('whatsapp'),
        unidade:  fd.get('unidade'),
        data:     fd.get('data'),
        horario:  fd.get('horario'),
        pessoas:  fd.get('pessoas'),
        observacao: (fd.get('observacao') || '').trim(),
      };
      const unidadeNome = UNIDADE_LABEL[data.unidade];

      // Resumo visível
      summaryEl.innerHTML = `
        <div class="reservation-summary__row"><span class="reservation-summary__key">Nome</span><span class="reservation-summary__val">${escapeHtml(data.nome)}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Casa</span><span class="reservation-summary__val">${unidadeNome}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Data</span><span class="reservation-summary__val">${formatDateBR(data.data)}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Horário</span><span class="reservation-summary__val">${formatTimeBR(data.horario)}</span></div>
        <div class="reservation-summary__row"><span class="reservation-summary__key">Pessoas</span><span class="reservation-summary__val">${formatPessoas(data.pessoas)}</span></div>
        ${data.observacao ? `<div class="reservation-summary__row"><span class="reservation-summary__key">Observação</span><span class="reservation-summary__val">${escapeHtml(data.observacao)}</span></div>` : ''}
      `;

      const msg =
        `Olá! Gostaria de fazer uma reserva no Maria e Jose Parrilla.\n\n` +
        `*Nome:* ${data.nome}\n` +
        `*Unidade:* ${unidadeNome}\n` +
        `*Data:* ${formatDateBR(data.data)}\n` +
        `*Horário:* ${formatTimeBR(data.horario)}\n` +
        `*Pessoas:* ${formatPessoas(data.pessoas)}\n` +
        `*WhatsApp:* ${data.whatsapp}\n` +
        (data.observacao ? `*Observação:* ${data.observacao}\n` : '') +
        `\n_Ciente da tolerância de 15min sobre o horário reservado._`;

      const phone = WHATSAPP_NUMBERS[data.unidade];
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      whatsappLink.href = url;

      // ---------- ENVIO DA RESERVA ----------
      // Dispara antes do redirect pro WhatsApp; não bloqueia o fluxo.
      sendReservation(data, unidadeNome);

      setTimeout(() => {
        // ---------- DISPARO DO PIXEL DA META ----------
        // Crítico: o evento Lead PRECISA disparar aqui, antes do redirect,
        // para que a campanha consiga otimizar.
        //
        // ATENÇÃO — fonte única. O Lead sai daqui (fbq direto). Se o GTM também
        // tiver uma tag de Lead do Meta no evento `generate_lead` abaixo, são dois
        // Leads por reserva: remova uma das duas.
        //
        // `leadFired` impede o Lead repetido quando o usuário clica em "Editar
        // reserva" e envia de novo. O eventID é a segunda camada: mesmo se algo
        // reenviar, o Meta descarta duplicata com mesmo event_name + event_id.
        // `value` é campo MONETÁRIO no Meta e exige `currency` junto. Número de
        // pessoas não é receita: mandar ali suja o Value Optimization e o ROAS.
        // Vai como propriedade custom — serve para Conversão Personalizada e público.
        // Receita real entra depois, via CAPI, quando o negócio é ganho no Pipedrive.
        const numPessoas = parseInt(data.pessoas, 10) || 0; // '9+' -> 9
        if (typeof fbq === 'function' && !leadFired) {
          fbq('track', 'Lead', {
            content_name: ORIGEM === 'eventos' ? 'Evento' : 'Reserva',
            content_category: unidadeNome,
            num_pessoas: numPessoas,
            faixa_pessoas: data.pessoas, // rótulo original, inclui '9+'
          }, { eventID: LEAD_EVENT_ID }); // 4º parâmetro, NUNCA dentro do custom data
          leadFired = true;
        }
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', {
            method: 'whatsapp_reservation',
            origem: ORIGEM,
            unidade: unidadeNome,
            num_pessoas: numPessoas,
            faixa_pessoas: data.pessoas,
          });
        }
        const telefoneDigits = data.whatsapp.replace(/\D/g, '');
        const telefoneE164 = isIntlPhone(data.whatsapp)
          ? '+' + telefoneDigits
          : '+55' + telefoneDigits;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'generate_lead',
          event_id: LEAD_EVENT_ID, // mesmo id do fbq, para deduplicar no server-side
          method: 'whatsapp_reservation',
          origem: ORIGEM,
          telefone: telefoneE164,
          unidade: unidadeNome,
          num_pessoas: numPessoas,
          faixa_pessoas: data.pessoas,
        });

        formCard.classList.add('is-submitted');
        successEl.classList.add('is-active');
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Tenta abrir o WhatsApp (pode ser bloqueado por popup blocker; o botão visível é o fallback principal)
        setTimeout(() => { window.open(url, '_blank'); }, 800);
      }, 500);
    });

    resetBtn.addEventListener('click', () => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.submit-btn__text').textContent = 'Reservar pelo WhatsApp';
      formCard.classList.remove('is-submitted');
      successEl.classList.remove('is-active');
      formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
      }[c]));
    }

    // ---------- STICKY MOBILE CTA ----------
    const stickyCta = document.getElementById('sticky-cta');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        const formInView = entries[0].isIntersecting;
        const submitted = formCard.classList.contains('is-submitted');
        const show = !formInView && !submitted;
        stickyCta.classList.toggle('is-visible', show);
        stickyCta.setAttribute('aria-hidden', show ? 'false' : 'true');
        document.getElementById('mejr').classList.toggle('has-sticky-cta', show);
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

    // ---------- EMBLA - REVIEWS CAROUSEL ----------
    let emblaInstance = null;
    function initEmbla() {
      if (emblaInstance || typeof EmblaCarousel !== 'function') return;
      const root = document.getElementById('reviews-embla');
      if (!root) return;
      const viewport = root.querySelector('.embla__viewport');
      const dotsNode = document.getElementById('reviews-dots');

      emblaInstance = EmblaCarousel(viewport, {
        loop: true,
        align: 'start',
        containScroll: false,
        dragFree: false,
        skipSnaps: false,
      });
      root.classList.add('is-ready');

      // Gera dots
      const snaps = emblaInstance.scrollSnapList();
      dotsNode.innerHTML = '';
      snaps.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'embla__dot';
        dot.setAttribute('aria-label', `Ir para avaliação ${i + 1}`);
        dot.addEventListener('click', () => emblaInstance.scrollTo(i));
        dotsNode.appendChild(dot);
      });

      const updateDots = () => {
        const selected = emblaInstance.selectedScrollSnap();
        dotsNode.querySelectorAll('.embla__dot').forEach((d, i) => {
          d.classList.toggle('is-active', i === selected);
          d.setAttribute('aria-current', i === selected ? 'true' : 'false');
        });
      };
      emblaInstance.on('select', updateDots);
      emblaInstance.on('reInit', updateDots);
      updateDots();
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initEmbla);
    } else {
      setTimeout(initEmbla, 0);
    }
    window.addEventListener('load', initEmbla);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', comecar);
  } else {
    comecar();
  }
})();
