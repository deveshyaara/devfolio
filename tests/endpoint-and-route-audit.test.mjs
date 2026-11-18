import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const PORT = 9018;
const BASE = `http://127.0.0.1:${PORT}`;

let serverProc = null;

async function waitForServer(timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/`, { method: 'HEAD' });
      if (res.status > 0) return;
    } catch {
      // Server still starting
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Next.js production server did not become ready on ${BASE} within ${timeoutMs}ms`);
}

describe('DevFolio Complete Endpoint, Route & Data QA Suite', () => {
  before(async () => {
    serverProc = spawn(
      process.execPath,
      ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT), '-H', '127.0.0.1'],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );
    await waitForServer();
  });

  after(async () => {
    if (serverProc && serverProc.pid) {
      serverProc.kill();
      if (process.platform === 'win32') {
        spawn('taskkill', ['/PID', String(serverProc.pid), '/T', '/F'], { stdio: 'ignore' });
      }
    }
  });

  it('serves homepage (/) with all required section anchors and security headers', async () => {
    const res = await fetch(`${BASE}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /text\/html/i);
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(res.headers.get('x-frame-options'), 'SAMEORIGIN');
    assert.equal(res.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
    assert.ok(res.headers.get('permissions-policy'));

    const html = await res.text();
    for (const anchor of ['id="hero"', 'id="about"', 'id="projects"', 'id="expertise"', 'id="approach"', 'id="contact"']) {
      assert.ok(html.includes(anchor), `Homepage missing section anchor ${anchor}`);
    }
    assert.ok(html.includes('Devesh Tiwari'), 'Homepage missing portfolio owner name');
    assert.ok(html.includes('https://github.com/deveshyaara'), 'Homepage missing GitHub URL');
    assert.ok(html.includes('https://www.linkedin.com/in/deveshcodes/'), 'Homepage missing LinkedIn URL');
    assert.ok(html.includes('https://wealthwise.devesh.co.in/'), 'Homepage missing WealthWise URL');
    assert.ok(!/Yogi Suria|Stoik Agency/i.test(html), 'Homepage leaked reference brand strings');
    assert.ok(!/href="#"|href=""/i.test(html), 'Homepage contains empty or placeholder # links');
  });

  it('displays OSCode, SAIT Chapter strictly as completed September 2025 – September 2026 on / and /resume', async () => {
    for (const route of ['/', '/resume']) {
      const res = await fetch(`${BASE}${route}`);
      assert.equal(res.status, 200);
      const html = await res.text();

      assert.ok(html.includes('OSCode, SAIT Chapter'), `${route} missing OSCode, SAIT Chapter`);
      assert.ok(
        html.includes('Creative Lead | September 2025 – September 2026'),
        `${route} missing exact format "Creative Lead | September 2025 – September 2026"`
      );
      assert.ok(
        !/Sep(?:tember)?\s*2025\s*[–-]\s*Present/i.test(html),
        `${route} still describes OSCode as Present`
      );
      assert.ok(
        !/OSCode[^<]{0,200}Present/i.test(html),
        `${route} implies current OSCode association`
      );
    }

    // Verify Schema.org JSON-LD worksFor does not list OSCode
    const homeHtml = await (await fetch(`${BASE}/`)).text();
    const ldMatch = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    assert.ok(ldMatch, 'Homepage missing Person JSON-LD structured data');
    const jsonLd = JSON.parse(ldMatch[1]);
    assert.equal(jsonLd['@type'], 'Person');
    assert.equal(jsonLd.name, 'Devesh Tiwari');
    assert.notEqual(jsonLd.worksFor?.name, 'OSCode, SAIT Chapter');
  });

  it('serves /resume cleanly with back navigation, verified ViT repo link, and zero placeholder hrefs', async () => {
    const res = await fetch(`${BASE}/resume`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /text\/html/i);
    const html = await res.text();

    assert.ok(html.includes('Back to Portfolio'), '/resume missing Back to Portfolio link');
    assert.ok(html.includes('/devesh_resume.pdf'), '/resume missing PDF resume link');
    assert.ok(
      html.includes('https://github.com/deveshyaara/-Vision-Transformer-ViT-'),
      '/resume missing verified ViT repository URL'
    );
    assert.ok(
      !html.includes('Vision-Transformer-ViT-for-Image-Classification'),
      '/resume still contains 404 ViT repository URL'
    );
    assert.ok(!/href="#"|href=""/i.test(html), '/resume contains empty or placeholder # links');
  });

  it('normalizes trailing slash on /resume/ and returns branded 404 on unknown routes', async () => {
    const slashRes = await fetch(`${BASE}/resume/`, { redirect: 'manual' });
    assert.equal(slashRes.status, 308);
    assert.equal(slashRes.headers.get('location'), '/resume');

    const notFoundRes = await fetch(`${BASE}/nonexistent-qa-route-404`);
    assert.equal(notFoundRes.status, 404);
    const body = await notFoundRes.text();
    assert.ok(body.includes('404'), 'Custom 404 page did not render');
    assert.ok(body.includes('Back to Home'), 'Custom 404 page missing Back to Home link');

    const api404 = await fetch(`${BASE}/api/nonexistent`);
    assert.equal(api404.status, 404);
  });

  it('serves SEO metadata routes (/robots.txt, /sitemap.xml, /ads.txt, /favicon.ico)', async () => {
    const robots = await fetch(`${BASE}/robots.txt`);
    assert.equal(robots.status, 200);
    assert.match(robots.headers.get('content-type') || '', /text\/plain/i);
    assert.ok((await robots.text()).includes('Sitemap: https://devesh.co.in/sitemap.xml'));

    const sitemap = await fetch(`${BASE}/sitemap.xml`);
    assert.equal(sitemap.status, 200);
    assert.match(sitemap.headers.get('content-type') || '', /xml/i);
    const smText = await sitemap.text();
    assert.ok(smText.includes('https://devesh.co.in/'));
    assert.ok(smText.includes('https://devesh.co.in/resume'));

    const ads = await fetch(`${BASE}/ads.txt`);
    assert.equal(ads.status, 200);
    assert.ok((await ads.text()).includes('pub-3061580844965201'));

    const ico = await fetch(`${BASE}/favicon.ico`);
    assert.equal(ico.status, 200);
  });

  it('serves static media, resume PDF, 3D Spline scene, Draco WASM, and local fonts with valid payloads', async () => {
    const pdfRes = await fetch(`${BASE}/devesh_resume.pdf`);
    assert.equal(pdfRes.status, 200);
    assert.match(pdfRes.headers.get('content-type') || '', /application\/pdf/i);
    const pdfBuf = Buffer.from(await pdfRes.arrayBuffer());
    assert.equal(pdfBuf.subarray(0, 5).toString('ascii'), '%PDF-');
    assert.ok(pdfBuf.length > 10000);

    const wasmRes = await fetch(`${BASE}/assets/vendor/draco/draco_decoder.wasm`);
    assert.equal(wasmRes.status, 200);
    assert.match(wasmRes.headers.get('content-type') || '', /application\/wasm/i);
    const wasmBuf = Buffer.from(await wasmRes.arrayBuffer());
    assert.deepEqual([...wasmBuf.subarray(0, 4)], [0x00, 0x61, 0x73, 0x6d]);

    const assets = [
      '/assets/scene.splinecode',
      '/assets/vendor/spline-viewer.js',
      '/assets/vendor/draco/draco_wasm_wrapper.js',
      '/assets/fonts/geist.css',
      '/assets/fonts/gyByhwUxId8gMEwcGFWNOITd.woff2',
      '/assets/fonts/or3nQ6H-1_WfwkMZI_qYFrcdmhHkjko.woff2',
      '/profile-photo.jpg',
      '/hacktv.svg',
      '/hacktv-control.svg',
      '/hacktv-architecture.svg',
      '/ai-finance-platform-image.png',
      '/portfolio.png',
      '/project_1.png',
      '/project-5.png',
      '/ai-showcase.jpeg',
      '/healthlink.png',
      '/proctored.jpeg',
      '/guruos.png',
    ];

    for (const asset of assets) {
      const res = await fetch(`${BASE}${asset}`, { method: 'HEAD' });
      assert.equal(res.status, 200, `Asset ${asset} returned ${res.status}`);
      assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    }
  });

  it('enforces safe HTTP methods across all routes and static assets with zero 5xx errors', async () => {
    const methods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

    for (const route of ['/', '/resume']) {
      for (const method of methods) {
        const opts = { method, redirect: 'manual' };
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
          opts.headers = { 'content-type': 'application/json' };
          opts.body = '{malformed-json';
        }
        const res = await fetch(`${BASE}${route}`, opts);
        assert.ok(res.status < 500, `${method} ${route} triggered unexpected 5xx (${res.status})`);
        if (method === 'GET' || method === 'HEAD') {
          assert.equal(res.status, 200);
        } else {
          assert.equal(res.status, 405, `Expected 405 for ${method} ${route}, got ${res.status}`);
        }
      }
    }

    for (const staticAsset of ['/devesh_resume.pdf', '/ads.txt', '/hacktv.svg']) {
      for (const method of methods) {
        const opts = { method, redirect: 'manual' };
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
          opts.headers = { 'content-type': 'application/xml' };
          opts.body = '<invalid/>';
        }
        const res = await fetch(`${BASE}${staticAsset}`, opts);
        assert.ok(res.status < 500, `${method} ${staticAsset} triggered unexpected 5xx (${res.status})`);
        if (method === 'GET' || method === 'HEAD') {
          assert.equal(res.status, 200);
        } else if (method === 'OPTIONS') {
          assert.equal(res.status, 204);
          assert.match(res.headers.get('allow') || '', /GET/);
        } else {
          assert.equal(res.status, 405);
          assert.match(res.headers.get('allow') || '', /GET/);
        }
      }
    }
  });

  it('handles unexpected query parameters safely without reflected XSS or server errors', async () => {
    const payload = '<script>alert(1)</script>';
    const res = await fetch(`${BASE}/?q=${encodeURIComponent(payload)}&page=-1`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(!html.includes(payload), 'Query payload was reflected unescaped into HTML');
  });

  it('ensures every target="_blank" link in rendered HTML has rel="noopener noreferrer"', async () => {
    for (const route of ['/', '/resume']) {
      const html = await (await fetch(`${BASE}${route}`)).text();
      const anchorTags = html.match(/<a\b[^>]*>/gi) || [];
      for (const tag of anchorTags) {
        if (/target="_blank"/i.test(tag)) {
          assert.ok(
            /rel="[^"]*noopener[^"]*noreferrer[^"]*"|rel="[^"]*noreferrer[^"]*noopener[^"]*"/i.test(tag),
            `Missing rel="noopener noreferrer" on external link in ${route}: ${tag}`
          );
        }
      }
    }
  });

  it('handles 24 concurrent read requests reliably without errors', async () => {
    const targets = ['/', '/resume', '/robots.txt', '/sitemap.xml', '/devesh_resume.pdf', '/ads.txt'];
    const t0 = performance.now();
    const statuses = await Promise.all(
      Array.from({ length: 24 }, (_, i) =>
        fetch(`${BASE}${targets[i % targets.length]}`).then((r) => {
          r.body?.cancel().catch(() => {});
          return r.status;
        })
      )
    );
    const elapsedMs = performance.now() - t0;
    assert.ok(statuses.every((s) => s === 200), `Non-200 status in concurrent batch: ${statuses}`);
    assert.ok(elapsedMs < 5000, `Concurrent read batch too slow: ${elapsedMs.toFixed(1)}ms`);
  });
});
