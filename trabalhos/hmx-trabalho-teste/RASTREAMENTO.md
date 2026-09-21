# Rastreamento — teste

Esta página sai preparada para medir conversão desde já — assim, quando as
questões de performance, SEO e tráfego chegarem no fim do projeto, o
rastreamento já está no lugar e não vira retrabalho. **Preencha os IDs abaixo
e ative só o que for de fato usar** (deixe o resto comentado).

## Como plugar nesta stack — **HTML único**

Cole os snippets do `<head>` no cabeçalho do `index.html`. Na extensão HTMLmentor você pode gerenciar isso pelo campo de código do `<head>`; ou edite o arquivo direto por IDE. Os eventos custom (submit, clique de CTA) vão no `js/animations.js` ou num `<script>` inline no fim do `<body>`.

## IDs a preencher

- Meta Pixel — `PIXEL_ID`
- Google Analytics 4 — `G-XXXXXXX`
- Microsoft Clarity — `CLARITY_ID`
- Google Tag Manager — `GTM-XXXXXXX`

> Sem o ID, **não** carregue o provedor — um snippet com o placeholder literal
> (`PIXEL_ID`, `G-XXXXXXX`) manda dados para lugar nenhum e polui o console.

## Onde disparar cada evento (o funil)

| momento | evento (Meta / GA4) |
|---|---|
| página carregou | `PageView` |
| viu a oferta (scroll até a seção) | `ViewContent` |
| enviou formulário / capturou lead | `Lead` / `generate_lead` |
| clicou em comprar (vai ao checkout) | `InitiateCheckout` / `begin_checkout` |
| compra confirmada (página de obrigado) | `Purchase` / `purchase` |
| clique num destino (link na bio) | evento custom por link |

> **Não conte a conversão em dobro:** ou o GTM é a camada única (Pixel/GA4
> configurados por dentro dele), ou você cola os snippets diretos — nunca os dois.

---

## Snippets por provedor

## Meta Pixel (Facebook/Instagram)

Ative só se houver um `PIXEL_ID`. Cole no `<head>`:

```html
<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL_ID');           /* ← substitua */
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=PIXEL_ID&ev=PageView&noscript=1"/></noscript>
```

Eventos por tipo de página (dispare no clique/submit correspondente):

```js
fbq('track', 'ViewContent');                     // viu a oferta (scroll até a seção)
fbq('track', 'Lead');                            // enviou formulário de captura
fbq('track', 'InitiateCheckout');                // clicou em "comprar" (vai ao checkout)
fbq('track', 'Purchase', {value: 297, currency: 'BRL'}); // na página de obrigado
fbq('trackCustom', 'ClickWhatsApp');             // link na bio / contato
```

> LGPD: o Pixel usa cookies. Numa página que atende UE/consentimento, carregue-o
> só após o opt-in.


---

## Google Analytics 4 (gtag.js)

Ative só se houver um `G-XXXXXXX`. Cole no `<head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');       /* ← substitua */
</script>
```

Eventos (nomes de conversão recomendados do GA4):

```js
gtag('event', 'generate_lead');                          // formulário enviado
gtag('event', 'begin_checkout', {currency:'BRL', value:297}); // clicou em comprar
gtag('event', 'purchase', {currency:'BRL', value:297, transaction_id:'...'}); // obrigado
gtag('event', 'select_content', {content_type:'link', item_id:'whatsapp'}); // link na bio
```

> Marque `generate_lead`, `begin_checkout` e `purchase` como **conversões** no
> painel do GA4 (Admin → Eventos) para elas aparecerem nos relatórios.


---

## Microsoft Clarity (heatmap + gravação de sessão)

Ative só se houver um `CLARITY_ID`. Só o snippet — sem eventos custom
obrigatórios. Cole no `<head>`:

```html
<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "CLARITY_ID");  /* ← substitua */
</script>
```

Opcional — marque a sessão quando algo importante acontece, para filtrar as
gravações depois:

```js
clarity('set', 'evento', 'lead_enviado');   // aparece como tag/filtro no Clarity
```

> Clarity é gratuito e ótimo para *ver* onde a página trava — combine com o
> heatmap para calibrar hero, CTA e comprimento das seções.


---

## Google Tag Manager (container único)

Ative só se houver um `GTM-XXXXXXX`. O GTM é uma **camada única**: em vez de colar
Pixel + GA4 + Clarity direto na página, você cola só o container e pluga os demais
**por dentro** do painel do GTM. Vale a pena quando os IDs mudam com frequência ou
quem edită tags não mexe no código.

No `<head>`, o mais alto possível:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>  <!-- ← substitua -->
```

Logo após abrir o `<body>`:

```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

Empurre os eventos para o `dataLayer` (as tags disparam a partir dele no painel):

```js
dataLayer.push({event: 'lead'});             // formulário enviado
dataLayer.push({event: 'begin_checkout', value: 297, currency: 'BRL'});
dataLayer.push({event: 'purchase', value: 297, currency: 'BRL'});
```

> **Escolha uma abordagem:** ou o GTM como camada única (e Pixel/GA4 configurados
> dentro dele), ou os snippets diretos acima — **não os dois**, ou você conta a
> conversão em dobro.
