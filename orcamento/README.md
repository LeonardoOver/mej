# Sistema de Cotação de Eventos: Maria e José Parrilla

Página de orçamento online, mobile first, com cálculo em tempo real, desconto automático de dia de semana e envio da cotação pelo WhatsApp.

Sem build e sem framework. Servido pelo GitHub Pages, carregado pelo Elementor em três linhas.

---

## 1. Como publicar

Os arquivos ficam no GitHub e são servidos pelo GitHub Pages. O widget do Elementor guarda só três linhas e nunca mais precisa ser editado: publicar uma alteração é um `git push`.

| Arquivo | O que é |
|---|---|
| `app.css` | Todo o CSS, escopado em `.mejo` |
| `app.js` | Todo o comportamento, com o markup da página dentro |
| `index.html` | Casca fina, sem markup próprio. Serve para preview local e é a página do GitHub Pages |
| `embed.html` | O trecho para colar no Elementor, uma vez só |

### Primeira vez

Já está feito. O repositório é [LeonardoOver/mej](https://github.com/LeonardoOver/mej) e o Pages serve em `https://leonardoover.github.io/mej/`.

As três páginas do projeto seguem o mesmo formato:

| Página | Preview no Pages | Colar no Elementor |
|---|---|---|
| Orçamento | `https://leonardoover.github.io/mej/orcamento/` | `orcamento/embed.html` |
| Eventos | `https://leonardoover.github.io/mej/eventos/` | `eventos/embed.html` |
| Reservas | `https://leonardoover.github.io/mej/reservas/` | `reservas/embed.html` |

Cada `embed.html` já vem com as URLs reais. Cole o conteúdo num widget **HTML** do Elementor, dentro de uma **seção de largura total** com padding lateral **0**.

### Depois disso

```bash
git add -A && git commit -m "ajuste" && git push
```

O GitHub Pages guarda o arquivo em cache por cerca de 10 minutos. Para conferir na hora, abra a URL do `app.js` com `?v=2` no fim, ou use uma janela anônima.

### Preços e regras sem tocar no GitHub

O `embed.html` traz um bloco comentado com `window.MEJ_ORCAMENTO_CONFIG`. Descomentar e ajustar ali muda preços, desconto, webhook e limites de ambiente direto pelo Elementor, sem commit. Detalhes na seção 2.

### Por que não um iframe

Seria mais simples de montar e pior de usar. `position: fixed` dentro de um iframe se prende ao iframe, não à janela, então a barra fixa com o total sai da tela no celular e a barra de progresso sticky para de funcionar. A rolagem entre sub-etapas mexeria no conteúdo do iframe em vez da página, e o GTM do site não enxergaria os eventos. O carregador mantém tudo no documento da página e nada disso muda.

---

## 2. Parametrização (preços e regras)

Nenhum preço está preso na lógica. Tudo fica no objeto `DEFAULTS`, no começo do `<script>`, seção **1. CONFIGURACAO**.

Há duas formas de alterar:

### a) Editar direto o `DEFAULTS`
Rápido para ajustes pontuais. Basta mudar o número e salvar.

### b) Sobrescrever de fora (recomendado para o painel administrativo)
Publique um objeto `window.MEJ_ORCAMENTO_CONFIG` **antes** do bloco. O merge é profundo: você declara só o que quer mudar e o resto é preservado.

```html
<script>
window.MEJ_ORCAMENTO_CONFIG = {
  desconto: { percentual: 15 },              // muda só o percentual
  cardapioImpresso: { modo: 'por_pessoa', valor: 8 },
  whatsapp: '5516999999999'
};
</script>
```

Isso é o gancho para o painel administrativo do briefing (seção 28): um plugin, um CPT ou campos ACF geram esse objeto via `wp_localize_script` / `wp_add_inline_script`, e o restaurante passa a editar preços sem programação. A página não precisa ser alterada.

### Principais chaves

| Chave | O que controla |
|---|---|
| `whatsapp` | Número que recebe a cotação (só dígitos, com 55) |
| `webhook` | URL do n8n para registrar a cotação. **Vazio = não envia nada** |
| `origem` | Identificador do formulário na planilha de leads |
| `desconto.percentual` | Percentual do desconto |
| `desconto.dias` | Dias com desconto, padrão JavaScript: `0`=domingo … `6`=sábado. Padrão `[2,3,4]` (ter/qua/qui) |
| `desconto.itens` | Sobre quais itens o desconto incide (`pacotes`, `cardapio`, `ambiente`, `privativo`) |
| `diasSemana` | Dias abertos para cotação. Segunda-feira (`1`) está fora. Ver pendências |
| `minConvidadosGeral` / `maxConvidadosGeral` | Limites gerais. `null` = sem limite |
| `convidadosPadrao` | Valor que já vem preenchido no campo de convidados |
| `turnos`, `temas`, `consumo` | Listas de opções (label + descrição) |
| `ambientes[]` | `nome`, `desc`, `min`, `max`, `privativo`, `foto`, `taxa` |
| `cardapioImpresso` | `ativo`, `modo` (`fixo` \| `por_pessoa`), `valor`, `aplicaDesconto` |
| `bebidasAlcoolicas` | `obrigatorio`, `permitirSem` (libera "não desejo bebidas alcoólicas") |
| `saladaObrigatoria` | Se a salada aparece como item fixo dos pacotes de principal e rodízios |
| `categorias[]` | Pacotes do Menu Sequencial: preço, itens, opções. Campos opcionais do pacote: `desc` (linha de apoio), `precoTexto` + `precoNota` (ex.: "À parte / conforme consumo"), `semPreco`, `semPacote`. `notaOpcoes` da categoria aparece nos cards com opções |
| `distribuirQuantidades` | `false` (padrão): o convidado escolhe o prato no dia. `true`: o anfitrião informa quantos de cada, somando o número de convidados |
| `rodizios[]` | Rodízio Básico e Premium: preço, blocos de itens, principais, sobremesas |
| `textos` | Mensagens de abertura do WhatsApp; `ofertaFechamento` (48h) e `validadeProposta`, mostrados acima do botão do WhatsApp. Vazio = não mostra |

### Taxas de ambiente

Cada ambiente aceita:

```js
taxa: { tipo: 'nenhuma', valor: 0 }      // sem custo (padrão)
taxa: { tipo: 'fixa', valor: 800 }       // R$ 800 por evento
taxa: { tipo: 'por_pessoa', valor: 15 }  // R$ 15 por convidado
```

Quando a taxa é maior que zero, ela entra como adicional na cotação e é somada **antes** do desconto.

---

## 3. Ordem do cálculo

Exatamente a ordem consolidada do briefing (seções 18 e 21.5):

```
1. valor por pessoa = soma dos pacotes escolhidos (ou preço do rodízio)
2. subtotal dos convidados = valor por pessoa × nº de convidados
3. subtotal geral = subtotal dos convidados + adicionais
4. desconto = (itens elegíveis) × percentual        [só em dias com desconto]
5. total final = subtotal geral − desconto
```

O desconto **nunca** é aplicado sobre o preço unitário antes dos adicionais. Todos os valores são arredondados em duas casas decimais.

Conferência feita em navegador:

| Cenário | Esperado | Obtido |
|---|---|---|
| 80 convidados, quarta-feira, Menu Sequencial todo Premium (R$ 197/pessoa) | R$ 12.608,00 | R$ 12.608,00 |
| 80 convidados, quarta-feira, Rodízio Premium (R$ 200/pessoa) | R$ 12.800,00 | R$ 12.800,00 |
| 50 convidados, sexta-feira, Menu Sequencial todo Básico (R$ 148/pessoa) | R$ 7.400,00 (sem desconto) | R$ 7.400,00 |

---

## 4. Pendências de validação (briefing seção 33)

Nenhuma regra comercial foi inventada. Cada pendência foi implementada como **parâmetro neutro**: a resposta do cliente é registrada e aparece na cotação, mas **não altera o preço** até o restaurante definir.

| # | Pendência | Como está hoje | Onde mudar |
|---|---|---|---|
| 1 | Como "Ambiente privativo?" altera fluxo/preço | Só registra a resposta | `privativo.afetaPreco`, `privativo.taxa`, `privativo.filtraAmbientes` |
| 2 | Mín./capacidade do Salão da Lareira | `min: null, max: null` → "Capacidade sob consulta" | `ambientes[1].min/max` |
| 3 | Mín./capacidade do Espaço Quintal | `min: null, max: null` | `ambientes[2].min/max` |
| 4 | Taxa ou valor mínimo por ambiente | `taxa.tipo: 'nenhuma'` | `ambientes[].taxa` |
| 5 | Segunda-feira disponível? | **Fora** da lista de dias | `diasSemana` (adicionar `{ v: 1, label: 'Segunda-feira' }`) |
| 6 | Turno altera preço/disponibilidade? | Só registra | `turnos` |
| 7 | Forma de consumo altera preço? | Só registra | `consumo` |
| 8 | Cardápio impresso: por evento ou por pessoa? | **Resolvido pelo cliente:** R$ 1,50 por pessoa | `cardapioImpresso.modo` / `.valor` |
| 9 | Salada no Principal Premium? | Incluída (regra consolidada) | `saladaObrigatoria` / `categorias[1].pacotes[1].salada` |
| 10 | Salada no Rodízio Premium? | Incluída | `rodizios[1].salada` |
| 11 | Bebidas alcoólicas obrigatórias? | **Resolvido pelo cliente:** não. No sequencial, o Básico de bebidas já é só não alcoólico; no rodízio há a caixa "Não desejo bebidas alcoólicas", que tira os blocos alcoólicos do card e do resumo. **Ainda pendente:** o rodízio sem álcool muda de preço? Hoje não | `bebidasAlcoolicas.permitirSem` |
| 12 | Desconto incide sobre taxa de ambiente? | Sim (regra consolidada) | `desconto.itens.ambiente` |
| 13 | Desconto sobre todos os adicionais futuros? | Sim | `desconto.itens` |
| 14 | Distribuição de pratos é escolha prévia ou estimativa? | **Resolvido pelo cliente:** nenhuma das duas, o convidado escolhe no dia | `distribuirQuantidades` |

Ao mudar o percentual da pendência 8 para `por_pessoa`, o valor passa a multiplicar pelo número de convidados automaticamente.

---

## 5. Registro das cotações (lead), seção 29

Enquanto `webhook` está vazio, nada é enviado. Ao preencher com a URL de um webhook n8n, a página faz `POST` JSON em dois momentos:

- **`etapa: "parcial"`**: ao concluir a etapa 1 (nome + WhatsApp já capturados). Garante o lead mesmo se o cliente abandonar.
- **`etapa: "completo"`**: ao gerar a cotação (entrada na tela de resumo).

Os dois envios usam o mesmo `event_id`, então um `appendOrUpdate` no n8n atualiza a mesma linha em vez de criar duas.

Payload:

```json
{
  "origem": "orcamento", "etapa": "completo", "event_id": "orc_...",
  "criado_em": "2026-09-21T14:00:00.000Z",
  "nome": "", "whatsapp": "", "data_evento": "", "dia_semana": "",
  "turno": "", "tema": "", "convidados": 80,
  "ambiente": "", "ambiente_privativo": "", "forma_consumo": "", "formato": "",
  "pacotes": {}, "pratos": "", "sobremesas": "", "cardapio_impresso": "",
  "valor_por_pessoa": 197, "subtotal_convidados": 15760, "adicionais": 0,
  "subtotal_geral": 15760, "desconto": 3152, "total": 12608,
  "url": ""
}
```

---

## 6. Analytics, seção 32

Eventos enviados para `dataLayer` (GTM) e `gtag`, quando presentes:

| Evento | Quando |
|---|---|
| `orcamento_start_click` | Clique no CTA do topo |
| `orcamento_iniciado` | Conclusão da etapa 1 |
| `orcamento_etapa` | Cada etapa nova alcançada (`etapa: 1..5`), permite medir abandono |
| `orcamento_concluido` | Cotação calculada (com `valor_total`, `convidados`, `formato`) |
| `whatsapp_click` | Clique em "Falar com nossa equipe" |
| `proposta_personalizada` | Clique em "Quero uma proposta totalmente personalizada" |
| `copiar_link_cotacao` | Clique em "Copiar link desta cotação" |

---

## 7. Recursos implementados

- **5 etapas** com barra de progresso: Dados → Ambiente → Consumo → Cardápio → Resumo. A partir de 420px de largura, as etapas da barra são clicáveis: voltar é livre, e avançar vai só até onde a pessoa já chegou, validando cada etapa no caminho.
- **Básico já marcado**: escolher o formato marca o pacote base de cada categoria (ou o Rodízio Básico), então o total aparece na hora. Os outros pacotes mostram a diferença ("+R$ 14,00 por pessoa"). Para mudar o pacote base, use `padrao: true` no pacote.
- **Data opcional** com calendário em `dd/mm/aaaa`; o dia da semana é detectado automaticamente e o desconto é anunciado na hora. Sem data, o cliente escolhe apenas o dia da semana.
- **Validação de convidados**: apenas inteiros positivos; ambientes abaixo do mínimo ou acima da capacidade ficam desabilitados com a mensagem exata do briefing.
- **Distribuição de pratos e sobremesas** (desligada por padrão, `distribuirQuantidades`) com stepper, contador "Total selecionado: X de Y", botão "Distribuir igualmente" e bloqueio de avanço enquanto a soma não fecha. A distribuição se reajusta sozinha quando o número de convidados muda.
- **Barra fixa de total** nas etapas 2 a 4, com valor total e valor por convidado atualizados em tempo real.
- **Resumo completo** com dados do evento, itens selecionados, distribuições, memória de cálculo e total.
- **WhatsApp** com a cotação inteira já formatada na mensagem.
- **Voltar e editar** sem perder nada; recalcula automaticamente.
- **Link compartilhável**: "Copiar link desta cotação" gera uma URL com o estado codificado no hash (`#c=...`). Quem abrir cai direto no resumo.
- **Retomada automática**: o estado fica em `localStorage`, então recarregar a página não apaga o preenchimento. A cotação salva vale por `validadeDiasSalvos` dias (padrão 14) contados da última alteração; depois disso é descartada. Uma data que já passou é apagada ao carregar e a pessoa escolhe outra. Quando há dados salvos, a etapa 1 mostra "Continuando a cotação de [nome]" com o botão "Começar uma nova", que apaga tudo e gera um novo `event_id` para o lead.
- Acessibilidade: foco visível, `aria-live` nas trocas de etapa, rótulos em todos os controles, respeito a `prefers-reduced-motion`.

---

## 8. Padrões de botão e acessibilidade

Todos os controles clicáveis foram auditados no navegador (contraste calculado sobre o fundo efetivo, tamanho medido pelo `getBoundingClientRect`). Resultado atual: nenhum controle abaixo de 4,5:1 de contraste nem abaixo de 44px de alvo de toque, nas 5 etapas.

| Item | Como está |
|---|---|
| Alvo de toque | Botão primário 52px, CTA da barra fixa 48px, stepper 44x44, links de texto 44px de altura |
| Contraste | Primário 16,3:1. CTA accent 6,1:1. "Voltar" 7,8:1. CTA WhatsApp 9,2:1 |
| Estado pressionado | `transform: scale(0.985)` no toque, sem deslocar o layout |
| Hover | Dentro de `@media (hover: hover)`, para não ficar preso depois do tap no celular |
| Foco | Anel de 2px visível em todos os controles, com `outline-offset` |
| Desabilitado | Opacidade 0,45 mais `cursor: not-allowed` |
| Rótulo duplicado | O CTA da barra fixa lê o texto do botão da etapa ativa, então os dois sempre dizem a mesma coisa |

Varredura feita em 375px, 768px, 1265px e 1885px, percorrendo as 5 etapas e os 6 estados de cardápio (formato vazio, sequencial básico, sequencial premium, rodízio básico, rodízio premium, ambiente bloqueado por mínimo de convidados). Procurou caixa inline fragmentada, sobreposição real entre irmãos, texto cortado por `overflow`, texto vazando do pai, contraste abaixo de 4,5:1, alvo abaixo de 44px e rolagem horizontal. Zero ocorrências nas quatro larguras.

Quatro decisões que valem registro:

**Reset dentro de `:where()`.** Um reset escrito como `.mejo button { background: none }` tem especificidade maior que `.mejo-btn--dark`, então apagava o fundo dos botões e deixava texto branco sobre transparente. Envolver o reset em `:where()` zera a especificidade dele e faz qualquer regra de componente ganhar. Se precisar acrescentar reset novo, mantenha o padrão `.mejo :where(elemento)`.

**Blindagem contra o tema, em duas camadas.** O reset usa `:where()` de propósito, para nunca ganhar dos componentes. O efeito colateral é que ele também perde para o tema do WordPress, que costuma pintar `<button>` e `<a>` com a cor da marca dele. Foi assim que "Distribuir igualmente" apareceu com fundo rosa.

A solução tem ordem: primeiro um neutralizador em `.mejo button` e `.mejo a` com `!important` em `background-color`, `background-image`, `border-color` e `color`, e logo depois cada componente declarando a própria cor, também com `!important` e com especificidade `.mejo .classe`. Quem vem depois ganha, que é o comportamento desejado.

Todo botão e todo link do bloco precisa declarar a própria cor. Se criar um componente novo e esquecer, ele herda o neutro (transparente com `color: inherit`), não a cor do tema.

Verificado injetando um tema hostil que pinta `button` e `a` de rosa, inclusive numa variante com `!important`: nenhum dos 8 tipos de botão e link do bloco foi contaminado, e a caixa alta, a fonte Montserrat e os tamanhos se mantiveram.

**Todo sub-elemento de cartão declara o `display`.** Um `<label>` só aceita conteúdo de frase, então o miolo dos cartões (formato, pacote, ambiente, opção) é feito de `<span>`. Span sem `display` declarado é caixa inline: `margin-top` é ignorado, as linhas se juntam e, quando há fundo ou padding, a caixa se fragmenta em vários pedaços a cada quebra de linha. Era o borrão que aparecia nos cards de "Monte seu cardápio". Ao criar sub-elemento novo de cartão, declare `display: block` junto.

**Texto escuro no botão do WhatsApp.** Branco sobre `#25D366` dá 1,98:1, bem abaixo do mínimo. Mantivemos o verde reconhecível e escurecemos o texto, o que dá 9,16:1. Se a preferência for texto branco, o verde precisa escurecer para algo como `#0E7C3A`, que dá 5,3:1. Uma linha em `.mejo .mejo-btn--wp`.

---

## 9. Mobile

A página é construída para o celular primeiro. O que isso significa em decisões concretas:

| Item | Como está |
|---|---|
| Campos numéricos | 16px. Abaixo disso o Safari do iOS aplica zoom ao focar e desalinha a página inteira |
| Calendário | No celular usa o seletor nativo do sistema (`disableMobile: false`), que já mostra dd/mm/aaaa em pt-BR. No desktop usa o Flatpickr |
| Barra fixa de total | A altura real é medida em JS e vira `--bar-h`, então a reserva no fim da página acompanha a largura da tela e a área segura do aparelho |
| Teclado virtual | Enquanto um campo está em foco a barra fixa sai do caminho e volta no blur |
| Giro de tela | `resize`, `orientationchange` e `visualViewport` recalculam a barra |
| Altura do hero | `svh` além de `vh`, para a barra do Safari não cortar o conteúdo |
| Barra de progresso | Abaixo de 420px os 5 rótulos não cabem, então vira uma linha só com a etapa atual. O "Etapa X de 5" repetido dentro da etapa some junto |
| Primeira tela | O botão principal vem antes dos selos e o hero encolhe abaixo de 400px, então o CTA cabe sem rolar mesmo num aparelho de 320x568 |
| Tela deitada e baixa | Abaixo de 600px de altura o hero perde a altura mínima |
| Checkbox | Desenhado no lugar do controle nativo, que muda de forma e de cor em cada navegador e ignora `border-radius`. O `<input>` continua existindo para teclado e leitor de tela. O rótulo inteiro é clicável e tem 47px de altura |
| Cabeçalho fixo do tema | Se o tema do WordPress tiver header fixo, defina `--topo` com a altura dele em `.mejo`. A barra de progresso e o scroll entre etapas respeitam esse valor |

### Alinhamento do checkbox

Medido por varredura de pixels do texto renderizado (métricas de canvas mentem quando a fonte cai para uma substituta). Em Lato 14,5px com entrelinha 23,2px: linha de base em 17,1px dentro da caixa de linha, tinta subindo 11px, x-height de 8px.

| Referência | Posição na caixa de linha |
|---|---|
| Centro da caixa de linha | 11,6px |
| Centro da banda maiúscula até base | 11,6px |
| Centro do x-height | 13,1px |

O quadrado fica em 12,35px, no meio das duas bandas, que é onde o olho espera. Os três valores vivem em `--check-tam`, `--check-linha` e `--check-ajuste` dentro de `.mejo-check`, então mudar o corpo do texto não exige recalcular na mão.

### Varredura automática

Um auditor percorre as 5 etapas e os 6 estados de cardápio procurando caixa inline fragmentada, sobreposição real entre irmãos, texto cortado por `overflow`, texto vazando do pai, contraste abaixo de 4,5:1, alvo de toque abaixo de 44px e rolagem horizontal.

| Largura | Resultado |
|---|---|
| 320 x 568 (iPhone SE antigo) | limpo |
| 360 x 800 (Android comum) | limpo |
| 375 x 812 | limpo |
| 390 x 844 | limpo |
| 414 x 896 | limpo |
| 430 x 932 | limpo |
| 740 x 360 (deitado) | limpo |
| 1440 x 900 | limpo |
| 1900 x 950 | limpo |

Em 320px a varredura tinha acusado três defeitos que já foram corrigidos: os rótulos do progresso estouravam a página em 2px, a barra fixa crescia para 124px enquanto a reserva continuava em 76px e escondia conteúdo, e a chave do resumo não encolhia e empurrava o valor para fora da linha.

---

## 10. Decisões de fluxo

**O CTA do topo não é só rolagem.** Ele tira o hero de cena e coloca o cursor no primeiro campo, então a pessoa começa a digitar em vez de procurar por onde começar. No celular isso abre o teclado direto.

**O hero sai quando a cotação começa, e a marca vai para a barra de progresso.** Deixar o hero no caminho alonga toda rolagem, permite voltar para a peça de venda no meio do preenchimento e mantém um botão "Começar" que não significa mais nada. Mas a página do WordPress é só este bloco, sem cabeçalho de tema por cima, então some-lo por completo deixaria a pessoa preenchendo sem saber de quem é a página. A barra de progresso passa a mostrar o logo junto da etapa atual.

Num 375x812: a página cai de 1752px para 1279px e o primeiro campo sobe de y=725 para y=253. A barra sticky vai de 55px para 86px, que é o custo do logo.

A escolha **não** é gravada no estado. Recarregar a página traz o hero de volta, que é o que se espera de um recarregamento. Vale saber que a etapa também não é persistida: recarregar volta para a etapa 1 com os dados preenchidos.

**O rodapé sai de cena durante o preenchimento.** Logo, telefone e copyright no fim de cada etapa só oferecem saída e alongam a rolagem. Ele volta na tela de resultado, onde as ações finais vivem. No lugar dele, durante o fluxo, fica uma linha discreta de ajuda com o WhatsApp, para quem travar no meio do caminho.

**O cardápio virou uma decisão por tela.** A etapa 4 chegava a 4025px no celular, cinco telas de rolagem com sete decisões empilhadas, e era o ponto natural de abandono. Agora são sub-etapas: primeiro o formato, depois cada categoria do menu sequencial, ou a escolha do rodízio. Um indicador de pontos mostra "Entradas · 1 de 5".

| Tela | Antes | Depois |
|---|---|---|
| Escolha do formato | junto de tudo | 570px (0,7 tela) |
| Entradas | junto de tudo | 728px (0,9 tela) |
| Principal | junto de tudo | 910px (1,1 tela) |
| Sobremesa | junto de tudo | 628px (0,8 tela) |
| Bebidas não alcoólicas | junto de tudo | 684px (0,8 tela) |
| Bebidas alcoólicas | junto de tudo | 634px (0,8 tela) |
| **Etapa 4 inteira** | **4025px, 5 telas** | **6 telas de ~0,8 cada** |

A barra de progresso do topo continua marcando "Cardápio", porque no fluxo do briefing continua sendo uma etapa só. O botão principal diz "Continuar" até a última decisão e vira "Ver cotação" no fim. O "Voltar" anda de sub-etapa antes de sair da etapa 4, e o "Voltar e editar" da tela de resultado cai na última decisão do cardápio.

O caminho do rodízio tem uma sub-etapa só, com 1726px, porque os dois cartões listam o menu inteiro. É uma decisão só, então a altura se justifica.

---

## 11. Preview local

```bash
python -m http.server 4599
```

Depois abra `http://localhost:4599/orcamento/`.

---

## 12. O que ainda depende de backend

O briefing pede um **painel administrativo** (seção 28) e o **registro das cotações** (seção 29). Esta página entrega o lado do cliente e os dois ganchos necessários:

- `window.MEJ_ORCAMENTO_CONFIG` para receber preços e regras de fora;
- `webhook` para gravar cada cotação.

O painel em si (CRUD de produtos, pacotes, ambientes, preços e textos) precisa de um plugin WordPress, CPTs ou ACF, e não cabe em um arquivo HTML. A estrutura do `CONFIG` já é o contrato: quem construir o painel só precisa devolver esse mesmo formato de objeto.
