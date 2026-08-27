// Bandwidth tier resolver. Uses navigator.connection if the browser exposes it
// (Chrome/Edge/Android), otherwise falls back to a lightweight benchmark: fetches
// a 100KB non-compressible blob and measures throughput. iOS Safari has no
// Network Information API, so the benchmark is what covers it.
async function pickTier() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData) return 'low';
    if (['slow-2g', '2g'].includes(conn.effectiveType)) return 'low';
    if (conn.effectiveType === '3g') return 'mid';
    return 'high';
  }
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 3000);
    const t0 = performance.now();
    const r = await fetch('assets/probe.bin?t=' + Date.now(), { cache: 'no-store', signal: ctrl.signal });
    const buf = await r.arrayBuffer();
    clearTimeout(timeout);
    const kbps = (buf.byteLength * 8) / ((performance.now() - t0) / 1000) / 1024;
    if (kbps < 700) return 'low';
    if (kbps < 4000) return 'mid';
    return 'high';
  } catch (e) {
    return 'mid';
  }
}

(async () => {
  const tier = await pickTier();
  const suffix = { high: '', mid: '-m', low: '-mlow' }[tier];
  const clipFor = (n) => `assets/vid/scene_${n}${suffix}.mp4`;

  mountScrollWorld(document.getElementById('world'), {
    brand: { name: 'Erik Figueiredo', href: '#', logo: 'assets/logo.png' },
    diveScroll: 1.4,
    hint: 'scroll para voar pelo mundo',
    nav: true,
    atmosphere: false,
    sections: [
      {
        id: 'craft',
        label: 'The Craft',
        still: 'assets/scenes/scene_1.webp',
        clip: clipFor(1),
        accent: '#F97316',
        scroll: 1.6,
        linger: 0.4,
        eyebrow: '01 · The Craft',
        title: 'From the coast of São Paulo, full-stack com cabeça de backend e olho de designer.',
        body: 'Sistemas que rodam quando ninguém tá olhando. Interfaces que fazem sentido quando alguém finalmente olha.',
        tags: ['Python', 'Node · TypeScript', 'Laravel · PHP'],
      },
      {
        id: 'backend',
        label: 'Backend Brain',
        still: 'assets/scenes/scene_2.webp',
        clip: clipFor(2),
        accent: '#0EA5E9',
        scroll: 1.5,
        linger: 0.35,
        eyebrow: '02 · Backend Brain',
        title: 'APIs, workflows, sistemas que rodam quando ninguém tá olhando.',
        body: 'Backend não é só endpoint. É o contrato invisível que segura o produto quando o tráfego cresce, o schema muda, o cliente pede o impossível.',
        tags: ['NestJS · Express', 'PostgreSQL', 'Python', 'RabbitMQ · Redis'],
      },
      {
        id: 'design',
        label: "Designer's Eye",
        still: 'assets/scenes/scene_3.webp',
        clip: clipFor(3),
        accent: '#84CC16',
        scroll: 1.5,
        linger: 0.35,
        eyebrow: "03 · Designer's Eye",
        title: 'Interface não é enfeite. É a superfície de contato do sistema.',
        body: 'Cada botão é uma decisão de produto. Cada espaço em branco resolve uma dúvida antes dela virar ticket.',
        tags: ['React · Next · Vue', 'Tailwind · Vite', 'UI systems'],
      },
      {
        id: 'homelab',
        label: 'The Homelab',
        still: 'assets/scenes/scene_4.webp',
        clip: clipFor(4),
        accent: '#F97316',
        scroll: 1.6,
        linger: 0.4,
        eyebrow: '04 · The Homelab',
        title: 'Meu playground. Onde experimento antes de escrever sobre.',
        body: 'Cluster self-hosted em casa rodando Gitea, Docker Swarm e Traefik em um domínio real e seguro. Cada serviço em produção passou por aqui primeiro.',
        tags: ['Docker Swarm', 'Traefik', 'Gitea CI'],
      },
      {
        id: 'ship',
        label: 'Ship & Share',
        still: 'assets/scenes/scene_5.webp',
        clip: clipFor(5),
        accent: '#F97316',
        scroll: 2.0,
        linger: 0.55,
        eyebrow: '05 · Ship & Share',
        title: 'Vamos construir?',
        body: 'Escrevo sobre o que aprendo. Compartilho código. Se tem uma ideia parada, chama.',
        tags: [],
        cta: {
          primary:   { label: 'LinkedIn', href: 'https://www.linkedin.com/in/erik-figueiredo/' },
          secondary: { label: 'GitHub',   href: 'https://github.com/erikfig' },
          tertiary:  { label: 'Blog',     href: 'https://blog.erikfigueiredo.com.br/' },
        },
      },
    ],
    connectors: [],
  });
})();
