#!/usr/bin/env node
/**
 * qualidade/verificar.mjs — autoverificação da pasta `site/`.
 *
 * Roda sem dependência nenhuma (`node qualidade/verificar.mjs`) e varre o que
 * está escrito nos arquivos gerados, cruzando com as três regras do trabalho:
 * PADROES-PROIBIDOS.md, RESPONSIVIDADE.md e PERFORMANCE-SEO.md.
 *
 * Ele existe porque a diferença entre "a IA leu a regra" e "a IA obedeceu a
 * regra" só aparece no arquivo. Pedir para reler o documento custa uma rodada
 * de conversa; rodar isto custa dois segundos e devolve arquivo e linha.
 *
 * O que ele NÃO faz — e nenhuma regex faria: dizer se a página está bonita, se
 * o ritmo entre seções varia, se a copy diz alguma coisa, ou se o layout aguenta
 * 320px de verdade. Isso é leitura humana com o screenshot da referência ao lado.
 *
 * Supressão: uma linha `verificar-ignore: <id>` em qualquer lugar do arquivo
 * (comentário HTML, CSS ou JS) desliga aquele id **naquele arquivo**. Use com
 * parcimônia e explique o motivo ao lado.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, resolve } from 'node:path';

// ── alvo ───────────────────────────────────────────────────────────────────
const arg = process.argv[2];
const CANDIDATES = arg ? [arg] : ['site', join('..', 'site'), '.'];
const ROOT = CANDIDATES.map((p) => resolve(p)).find((p) => existsSync(p) && statSync(p).isDirectory());

if (!ROOT) {
  console.error('✗ Não encontrei a pasta `site/`. Rode a partir da raiz do trabalho,');
  console.error('  ou passe o caminho: node qualidade/verificar.mjs caminho/para/site');
  process.exit(2);
}

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro', '.vercel', '.next', 'build']);
const EXT = new Set(['.html', '.htm', '.css', '.js', '.mjs', '.astro', '.jsx', '.tsx', '.ts']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXT.has(extname(name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
if (!files.length) {
  console.error(`✗ Nenhum arquivo de página em ${ROOT}. A entrega vai em site/ — confira a regra de pasta do STARTER.md.`);
  process.exit(2);
}

// ── relato ─────────────────────────────────────────────────────────────────
const findings = [];
let currentFile = '';
let currentText = '';

const lineAt = (text, index) => text.slice(0, index).split('\n').length;

function report(id, severity, line, message, fix) {
  if (new RegExp(`verificar-ignore:\\s*${id.replace('/', '\\/')}\\b`).test(currentText)) return;
  findings.push({ id, severity, file: relative(ROOT, currentFile) || '.', line, message, fix });
}
const erro = (id, line, message, fix) => report(id, 'erro', line, message, fix);
const aviso = (id, line, message, fix) => report(id, 'aviso', line, message, fix);

/** Percorre linha a linha aplicando um teste — o caminho mais previsível. */
function eachLine(text, fn) {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) fn(lines[i], i + 1);
}

/**
 * Blocos CSS mais internos (`seletor { … }` sem chave dentro). É o suficiente
 * para achar o que interessa aqui — `:hover`, `.card`, `@media` só embrulha —
 * e evita carregar um parser de CSS inteiro para quatro checagens.
 */
function cssBlocks(text) {
  const out = [];
  for (const m of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    // A captura começa logo depois do `}` anterior, então `m.index` cai na linha
    // de cima. A linha do seletor é a da abertura da chave — que é onde ele está
    // em qualquer formatação normal, e casa com o `.pop()` de seletor multilinha.
    out.push({
      selector: m[1].trim().split('\n').pop().trim(),
      body: m[2],
      line: lineAt(text, m.index + m[1].length),
    });
  }
  return out;
}

/** Só o `:root` — os literais lá dentro são a fonte de valores, não um erro. */
const stripRoot = (css) => css.replace(/:root[^{]*\{[^}]*\}/g, '');

/** HTML sem script/style/comentário: o que a pessoa de fato lê na tela. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<style[\s\S]*?<\/style>/gi, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<[^>]+>/g, ' ');
}

// ── CSS ────────────────────────────────────────────────────────────────────
function checkCss(css, offsetLine = 0) {
  const L = (n) => n + offsetLine;

  for (const block of cssBlocks(css)) {
    const sel = block.selector;
    const body = block.body;
    const line = L(block.line);

    if (/:hover/.test(sel)) {
      if (/box-shadow\s*:(?!\s*none)/i.test(body)) {
        erro('slop/hover-sombra', line, `sombra no :hover de \`${sel}\``,
          'troque por mudança de cor de fundo, borda ou texto — o :hover medido está na RECEITA-VISUAL.md');
      }
      if (/transform\s*:[^;]*(translate|scale)/i.test(body) || /\b(scale|translate)\s*:\s*[^;]+/i.test(body)) {
        erro('slop/hover-movimento', line, `o elemento se move no :hover de \`${sel}\``,
          'hover não desloca nem amplia; deslocamento de 1px só em :active, e só se a referência tiver');
      }
    }

    if (/\.eyebrow[^{]*::?before/i.test(sel) && /content\s*:\s*['"]\s*['"]/.test(body)) {
      erro('slop/eyebrow-risco', line, 'risco decorativo antes do eyebrow',
        'eyebrow é texto puro ou badge — sem ::before desenhando traço');
    }

    if (/content\s*:\s*['"]0[1-9]/.test(body) || /counter-increment/.test(body)) {
      erro('slop/numeracao', line, 'numeração automática 01/02/03 por CSS',
        'use ícone SVG, badge de texto com o papel do bloco, ou nada');
    }

    // `min-height` é justamente o certo — só `height` cru prende o bloco.
    const fixa = /(?:^|[;{\s])height\s*:\s*(\d{3,})px/.exec(body);
    if (fixa && !/(icon|logo|avatar|svg|line|divider|bar|thumb|stripe)/i.test(sel)) {
      const px = fixa[1];
      aviso('resp/altura-fixa', line, `altura fixa de ${px}px em \`${sel}\``,
        'bloco com texto usa min-height — português ocupa mais linhas que o layout da referência previa');
    }

    if (/^(body|html)\b/.test(sel) && /overflow(-x)?\s*:\s*hidden/.test(body)) {
      aviso('resp/overflow-hidden-body', line, 'overflow:hidden no body quebra position:sticky da página inteira',
        'use `body { overflow-x: clip }` e conserte a causa (decoração absoluta sem ancestral com clip)');
    }
  }

  eachLine(css, (raw, n) => {
    const line = L(n);
    const s = raw.replace(/\/\*[\s\S]*?\*\//g, '');

    if (/minmax\(\s*\d+\s*px/.test(s) && !/minmax\(\s*min\(/.test(s)) {
      erro('resp/grade-espreme', line, 'minmax() com mínimo em px vaza abaixo dessa largura',
        'use minmax(min(100%, 280px), 1fr) — abaixo de 280px a coluna passa a ocupar 100% em vez de estourar');
    }
    if (/grid-template-columns\s*:[^;}]*\b\d*fr\b/.test(s) && !/minmax/.test(s)) {
      erro('resp/fr-puro', line, '`1fr` puro em grid vaza (é minmax(auto,1fr) e respeita o conteúdo)',
        'use minmax(0, 1fr) em toda coluna, e min-width:0 em filho de flex com texto');
    }
    if (/:\s*100vw\b/.test(s)) {
      erro('resp/vw-total', line, '100vw inclui a barra de rolagem e gera scroll horizontal',
        'use width:100% (ou 100dvw se precisar mesmo da viewport)');
    }
    if (/(min-)?height\s*:\s*100vh\b/.test(s)) {
      aviso('resp/vh-total', line, '100vh no mobile é maior que a tela visível',
        'use min-height:100svh — e min-height, nunca height, para o hero poder crescer');
    }
    if (/transition\s*:\s*all\b/.test(s)) {
      erro('slop/transition-all', line, '`transition: all` anima o que você não previu, inclusive layout',
        'declare a propriedade: transition: background-color .16s ease-out');
    }
    if (/transition\s*:[^;]*\b(width|height|top|left|right|bottom|margin|padding)\b/.test(s)) {
      aviso('slop/anima-layout', line, 'transição em propriedade de layout força reflow a cada frame',
        'anime só transform e opacity; para altura, grid-template-rows 0fr→1fr ou <details>');
    }
    if (/background-clip\s*:\s*text|-webkit-background-clip\s*:\s*text/.test(s)) {
      aviso('slop/texto-gradiente', line, 'texto com gradiente',
        'só se a RECEITA-VISUAL.md registrou — senão é decoração inventada e some na troca de paleta');
    }
    if (/backdrop-filter\s*:/.test(s)) {
      aviso('slop/vidro', line, 'vidro fosco (backdrop-filter)',
        'só se a referência tem; custa composite caro no scroll');
    }
    if (/filter\s*:\s*blur\(\s*([6-9]\d|\d{3,})px/.test(s)) {
      aviso('slop/blur-decorativo', line, 'blob borrado de fundo — assinatura de página gerada por IA',
        'fundo é --color-bg/--color-surface; gradiente só o medido');
    }
    if (/@import\b/.test(s)) {
      erro('perf/import-css', line, '@import serializa o download de cada arquivo CSS',
        'use vários <link> no <head>, na ordem tokens → base → sections');
    }
    if (/white-space\s*:\s*nowrap/.test(s) && !/(header|nav|brand|logo|btn|badge|pill|tag|chip|menu)/i.test(s)) {
      aviso('resp/nowrap', line, 'white-space:nowrap fora de header/botão costuma vazar em 320px',
        'nowrap é para marca, item de nav e CTA — e obriga o header a colapsar antes de espremer');
    }
  });

  // Gradiente é legítimo quando medido, mas cinco deles numa folha só é o
  // template roxo de sempre. Conta em vez de proibir.
  const grads = (css.match(/(linear|radial|conic)-gradient\(/g) || []).length;
  if (grads >= 4) {
    aviso('slop/gradiente', L(1), `${grads} gradientes na folha`,
      'confira um a um contra a RECEITA-VISUAL.md; o que não estiver medido, vira cor sólida');
  }

  const bangs = (css.match(/!important/g) || []).length;
  if (bangs > 5) {
    aviso('css/important', L(1), `${bangs} !important`,
      'quase sempre sinal de especificidade brigando consigo mesma — resolva no seletor');
  }

  const hex = stripRoot(css).match(/#[0-9a-f]{3,8}\b/gi) || [];
  if (hex.length) {
    aviso('contrato/hardcoded', L(1), `${hex.length} cor(es) literais fora de :root (${[...new Set(hex)].slice(0, 4).join(', ')}…)`,
      'todo valor vira token em :root — é o que faz trocar a direção criativa sem reescrever a página');
  }
}

// ── HTML ───────────────────────────────────────────────────────────────────
const MICROCOPY = [
  'transforme seu neg', 'soluções inovadoras', 'solucoes inovadoras', 'próximo nível',
  'proximo nivel', 'descubra o poder', 'vamos começar?', 'vamos comecar?', 'simples assim',
  'a revolução chegou', 'a revolucao chegou', 'não perca mais tempo', 'nao perca mais tempo',
  'clique aqui', 'saiba mais e entre em contato',
];

function checkHtml(html) {
  const head = (/<head[\s\S]*?<\/head>/i.exec(html) || [''])[0];
  const text = visibleText(html);

  // <style> embutido é CSS: aplica as mesmas regras, com a linha certa.
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    checkCss(m[1], lineAt(html, m.index) - 1);
  }

  eachLine(text, (raw, line) => {
    if (/[—–]/.test(raw)) {
      erro('slop/travessao', line, 'travessão longo em texto visível',
        'reescreva com vírgula, ponto, dois-pontos ou parênteses — regra absoluta, vale contra a referência');
    }
    if (/\p{Extended_Pictographic}/u.test(raw) && !/verificar-ignore/.test(raw)) {
      aviso('slop/emoji', line, 'emoji no conteúdo',
        'ícone é SVG inline com stroke=currentColor; emoji só quando é conteúdo (fala de alguém)');
    }
    const low = raw.toLowerCase();
    for (const phrase of MICROCOPY) {
      if (low.includes(phrase)) {
        aviso('slop/microcopy', line, `frase genérica: "${phrase}"`,
          'toda headline e CTA carrega uma informação específica do projeto — o que é, para quem, o que muda');
        break;
      }
    }
  });

  const nums = [...html.matchAll(/>\s*0[1-9][.)°º]?\s*</g)];
  if (nums.length >= 2) {
    erro('slop/numeracao', lineAt(html, nums[0].index), `${nums.length} numerações decorativas (01, 02, 03…)`,
      'use ícone SVG, badge com o papel do bloco (Antes/Durante/Entrega), asset real, ou nada — numere só quando a ordem é a informação');
  }

  if (!/<meta[^>]+name=["']viewport["']/i.test(head)) {
    erro('resp/viewport', 1, 'falta <meta name="viewport">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">');
  }
  if (!/<html[^>]+lang=/i.test(html)) {
    erro('seo/lang', 1, 'falta lang no <html>', 'lang="pt-BR"');
  }
  if (!/<title>[^<]{3,}<\/title>/i.test(head)) {
    erro('seo/title', 1, 'falta <title> com conteúdo', 'até ~60 caracteres, com a promessa real da página');
  }
  if (!/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{40,}/i.test(head)) {
    erro('seo/description', 1, 'falta <meta name="description"> (ou está curta demais)', '140–160 caracteres');
  }
  if (!/<link[^>]+rel=["']canonical["']/i.test(head)) {
    aviso('seo/canonical', 1, 'sem <link rel="canonical">', 'aponte para a URL final da página');
  }
  if (!/property=["']og:image["']/i.test(head)) {
    aviso('seo/og', 1, 'sem Open Graph completo', 'og:type/title/description/image (1200×630)/url + twitter:card');
  }

  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 === 0) erro('seo/h1', 1, 'nenhum <h1>', 'um só, no hero, com a promessa principal');
  if (h1 > 1) erro('seo/h1', 1, `${h1} elementos <h1>`, 'um por página; os demais viram <h2>');

  // Imagens: dimensão reservada, alt, e lazy no lugar certo.
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  imgs.forEach((m, i) => {
    const tag = m[0];
    const line = lineAt(html, m.index);
    if (!/\balt\s*=/i.test(tag)) {
      erro('a11y/img-sem-alt', line, '<img> sem alt', 'alt descritivo; alt="" só em imagem decorativa');
    }
    if (!(/\bwidth\s*=/i.test(tag) && /\bheight\s*=/i.test(tag))) {
      erro('perf/img-sem-dimensao', line, '<img> sem width/height',
        'as dimensões reais reservam a caixa e mantêm o CLS em zero');
    }
    if (i === 0 && /loading\s*=\s*["']lazy/i.test(tag)) {
      erro('perf/lazy-no-hero', line, 'a primeira imagem está com loading="lazy"',
        'a imagem do hero é o LCP: fetchpriority="high", decoding="async", sem lazy');
    }
    // `fetchpriority="high"` é a declaração de "esta é a imagem do LCP" — quando
    // o topo tem um logo antes do hero, é ela que diz qual das duas manda.
    if (i > 0 && !/loading\s*=\s*["']lazy/i.test(tag) && !/fetchpriority\s*=\s*["']high/i.test(tag)) {
      aviso('perf/sem-lazy', line, '<img> abaixo da dobra sem loading="lazy"',
        'loading="lazy" decoding="async" em tudo que não é o hero');
    }
  });

  // Rede: nada de CDN, nada bloqueando o parser.
  for (const m of html.matchAll(/<script\b[^>]*>/gi)) {
    const tag = m[0];
    const line = lineAt(html, m.index);
    const src = /\bsrc\s*=\s*["']([^"']+)/i.exec(tag);
    if (src && /^(https?:)?\/\//i.test(src[1])) {
      erro('perf/cdn', line, `script externo (${src[1].slice(0, 60)})`,
        'GSAP e afins ficam vendados em site/js/ — o projeto tem que abrir offline e de file://');
    }
    if (src && !/\b(defer|async|type\s*=\s*["']module)/i.test(tag)) {
      aviso('perf/script-bloqueante', line, '<script src> sem defer/async', 'defer em tudo');
    }
  }
  for (const m of html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)) {
    const tag = m[0];
    const line = lineAt(html, m.index);
    const href = /\bhref\s*=\s*["']([^"']+)/i.exec(tag)?.[1] || '';
    if (/fonts\.googleapis\.com/.test(href)) {
      if (!/display=swap/.test(href)) {
        erro('perf/fonte-swap', line, 'Google Fonts sem &display=swap',
          'sem swap o texto fica invisível durante o carregamento e o LCP conta o que ninguém viu');
      }
      if (!/rel=["']preconnect["'][^>]*fonts\.gstatic\.com/i.test(head)) {
        aviso('perf/preconnect', line, 'Google Fonts sem preconnect para fonts.gstatic.com',
          '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
      }
    } else if (/^(https?:)?\/\//i.test(href)) {
      aviso('perf/cdn', line, `CSS externo (${href.slice(0, 60)})`, 'hospede junto do projeto');
    }
  }

  eachLine(html, (raw, line) => {
    if (/\sstyle\s*=\s*["']/.test(raw)) {
      erro('contrato/inline-style', line, 'estilo inline',
        'a extensão não edita style=""; leve para o CSS com var(--token)');
    }
  });

  if (/\[MOCK\]/.test(html)) {
    const has = existsSync(join(ROOT, 'DECISOES.md')) || existsSync(join(ROOT, '..', 'site', 'DECISOES.md'));
    report('copy/mock-sem-lista', has ? 'aviso' : 'erro', 1,
      `a página tem dados marcados [MOCK]${has ? '' : ' e não há site/DECISOES.md'}`,
      'todo [MOCK] entra na lista do site/DECISOES.md; nada marcado pode ir ao ar');
  }
}

// ── JS ─────────────────────────────────────────────────────────────────────
function checkJs(js) {
  eachLine(js, (raw, line) => {
    if (/console\.(log|debug)\s*\(/.test(raw)) {
      aviso('js/console', line, 'console.log esquecido', 'remova antes de entregar');
    }
    if (/addEventListener\(\s*['"](scroll|touchmove|wheel)['"]/.test(raw) && !/passive\s*:\s*true/.test(raw)) {
      aviso('perf/listener-passivo', line, 'listener de scroll sem { passive: true }',
        'ou troque por IntersectionObserver / ScrollTrigger');
    }
    if (/from\s+['"]https?:/.test(raw) || /import\(\s*['"]https?:/.test(raw)) {
      erro('perf/cdn', line, 'import de URL externa', 'dependência vendada localmente');
    }
  });
  if (/gsap/i.test(js) && !/prefers-reduced-motion/.test(js)) {
    aviso('a11y/reduced-motion', 1, 'anima com GSAP e não checa prefers-reduced-motion',
      'if (!window.matchMedia(\'(prefers-reduced-motion: reduce)\').matches) { … }');
  }
}

// ── execução ───────────────────────────────────────────────────────────────
for (const file of files) {
  currentFile = file;
  currentText = readFileSync(file, 'utf8');
  const ext = extname(file).toLowerCase();
  if (ext === '.css') checkCss(currentText);
  else if (ext === '.html' || ext === '.htm' || ext === '.astro') checkHtml(currentText);
  else checkJs(currentText);
}

const erros = findings.filter((f) => f.severity === 'erro');
const avisos = findings.filter((f) => f.severity === 'aviso');

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}

console.log(`\nVerificação de qualidade — ${relative(process.cwd(), ROOT) || ROOT}`);
console.log(`${files.length} arquivo(s) · ${erros.length} erro(s) · ${avisos.length} aviso(s)\n`);

for (const [file, list] of byFile) {
  console.log(file);
  for (const f of list.sort((a, b) => a.line - b.line)) {
    console.log(`  ${f.severity === 'erro' ? '✗' : '⚠'} ${f.file}:${f.line}  [${f.id}] ${f.message}`);
    console.log(`      → ${f.fix}`);
  }
  console.log('');
}

if (!findings.length) console.log('Nada a apontar nas checagens estáticas.\n');

console.log('Isto cobre o que está escrito no arquivo. Continua com você:');
console.log('  · abrir em 320, 360, 390, 768, 900, 1024, 1280 e 1920px e procurar grade espremida;');
console.log('  · comparar cada seção com o recorte dela em referencia/screenshots/;');
console.log('  · rodar o Lighthouse mobile e conferir LCP < 2,5s e CLS < 0,1;');
console.log('  · ler a página inteira de cima a baixo, procurando ritmo repetido de seção.\n');

process.exit(erros.length ? 1 : 0);
