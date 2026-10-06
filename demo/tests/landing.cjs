const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

async function assertChartGeometry(page) {
  const problems=await page.locator('#chart svg').evaluateAll(charts=>charts.flatMap(svg=>{
    const circles=[...svg.querySelectorAll('circle')];
    const failures=[];
    for(let i=0;i<circles.length;i++){
      const a=circles[i];
      for(let j=i+1;j<circles.length;j++){
        const b=circles[j];
        const distance=Math.hypot(a.cx.baseVal.value-b.cx.baseVal.value,a.cy.baseVal.value-b.cy.baseVal.value);
        if(distance<a.r.baseVal.value+b.r.baseVal.value+1.9)failures.push('Overlapping dots');
      }
      const vb=svg.viewBox.baseVal;
      if(a.cx.baseVal.value-a.r.baseVal.value<0||a.cx.baseVal.value+a.r.baseVal.value>vb.width||a.cy.baseVal.value-a.r.baseVal.value<0||a.cy.baseVal.value+a.r.baseVal.value>vb.height)failures.push('Clipped dot');
    }
    return failures;
  }));
  assert.deepEqual(problems, [], 'No graph overlap or clipping');
}

(async () => {
  const file = path.resolve(__dirname, '../index.html');
  const html = fs.readFileSync(file);
  const server = http.createServer((req, res) => {
    const requested = new URL(req.url, 'http://localhost').pathname;
    if (requested === '/styles.css') {
      res.writeHead(200, {'Content-Type':'text/css'});
      res.end(fs.readFileSync(path.join(path.dirname(file), 'styles.css')));
      return;
    }
    if (/^\/fonts\/InterTight-(Medium|SemiBold|Bold|ExtraBold|Black)\.woff2$/.test(requested)) {
      res.writeHead(200, {'Content-Type':'font/woff2'});
      res.end(fs.readFileSync(path.join(path.dirname(file), requested)));
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({
    ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {}),
    headless: true,
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const requests = [];
    page.on('request', request => requests.push(request.url()));
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({width, height: 1000});
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      assert.equal(await page.evaluate(() => document.fonts.check('500 16px "Inter Tight"') && document.fonts.check('900 48px "Inter Tight"')), true, 'Inter Tight loads');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
      assert.equal(await page.locator('#chart circle').count(), 34);
      assert.equal(await page.locator('.call-cell').count(), 40);
      assert.equal(await page.locator('.call-cell.timely').count(), 14);
      assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.evidence')).backgroundColor), 'rgb(255, 255, 255)');
      await assertChartGeometry(page);
      const audit = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      assert.deepEqual(audit.violations.map(v => ({id: v.id, nodes: v.nodes.map(n => n.target)})), [], `Accessibility at ${width}`);
      for (const pod of ['North','East','South','West']) {
        await page.locator(`[data-pick-pod="${pod}"]`).click();
        await assertChartGeometry(page);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${pod} overflow at ${width}`);
      }
      await page.getByRole('button', {name:'Compare pods'}).click();
      await assertChartGeometry(page);
      await page.locator('[data-pick-pod="South"]').click();
      await page.locator('#fixed-view').click();
      await assertChartGeometry(page);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Model overflow at ${width}`);
      await page.locator('#actual-view').click();
      if (process.env.SCREENSHOT_DIR && [1440, 390].includes(width)) {
        fs.mkdirSync(process.env.SCREENSHOT_DIR, {recursive:true});
        await page.evaluate(() => document.activeElement?.blur());
        await page.evaluate(() => scrollTo(0,0));
        await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR, `landing-${width}.png`), fullPage:true});
      }
    }
    await page.locator('#fixed-view').click();
    assert.equal(await page.locator('#hero-rate').textContent(), '80');
    assert.match(await page.locator('#scenario-note').textContent(), /Model only/);
    assert.match(await page.locator('.plot-row').first().getByRole('img').getAttribute('aria-label'), /32 of 40/);
    await page.locator('#rescue-slider').focus();
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#hero-rate').textContent(), '35');
    await page.keyboard.press('End');
    assert.equal(await page.locator('#hero-rate').textContent(), '85');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#hero-rate').textContent(), '82.5');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#hero-rate').textContent(), '80');
    assert.equal(await page.locator('#count-timely').textContent(), '32');
    assert.equal(await page.locator('.call-cell.timely').count(), 32);
    assert.equal(await page.locator('#count-late').textContent(), '2');
    assert.equal(await page.locator('#count-missing').textContent(), '6');
    await assertChartGeometry(page);
    await page.locator('#chart-tools').evaluate(el=>el.open=true);
    await page.locator('[data-outcome="late"]').click();
    assert.equal(await page.locator('#chart circle[data-highlighted="true"]').count(), 2);
    await page.locator('[data-outcome="all"]').click();
    const scenarioAudit = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(scenarioAudit.violations.map(v => v.id), [], 'Slider state accessibility');
    await page.locator('#actual-view').click();
    await page.locator('[data-pick-pod="West"]').click();
    assert.equal(await page.locator('#chart circle').count(), 4);
    assert.equal(await page.locator('#count-missing').textContent(), '26');
    assert.match(await page.locator('#scenario-note').textContent(), /Fix capture first/);
    await page.getByRole('button', {name:'Compare pods'}).click();
    assert.equal(await page.locator('#chart circle').count(), 104);
    await assertChartGeometry(page);
    assert.equal(await page.locator('#hero-rate').textContent(), '35');
    await page.getByRole('button', {name:'Account manager', exact:true}).click();
    assert.equal(await page.locator('#chart circle[data-highlighted="false"]').count(), 59);
    await page.getByRole('button', {name:'Agent', exact:true}).click();
    assert.equal(await page.locator('#chart circle[data-highlighted="false"]').count(), 45);
    await page.locator('[data-pick-pod="South"]').click();
    await page.getByRole('tab', {name:'After', exact:true}).focus();
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#before-tab').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#before-panel').isVisible(), true);
    await page.keyboard.press('End');
    assert.equal(await page.locator('#after-panel').isVisible(), true);
    await page.getByRole('tab', {name:'Biz Ops', exact:true}).focus();
    await page.keyboard.press('End');
    assert.equal(await page.locator('#owner-eng').getAttribute('aria-selected'), 'true');
    assert.match(await page.locator('#owner-title').textContent(), /Remove the system failures/);
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#owner-ops').getAttribute('aria-selected'), 'true');
    await page.getByText('Open the call log', {exact:false}).click();
    await page.locator('#call-rows tr').first().waitFor();
    assert.equal(await page.locator('#call-rows tr').count(), 140);
    await page.getByRole('button', {name:'South', exact:true}).click();
    assert.equal(await page.locator('#call-rows tr').count(), 40);
    assert.equal(await page.locator('#call-rows tr').filter({hasText:'On time'}).count(), 14);
    assert.equal(await page.locator('#call-rows tr').filter({hasText:'Late'}).count(), 20);
    assert.equal(await page.locator('#call-rows tr').filter({hasText:'Missing recap'}).count(), 2);
    await page.locator('#fixed-view').click();
    assert.equal(await page.locator('#call-rows tr').filter({hasText:'On time'}).count(), 14, 'Scenario must not alter source log');
    const audit = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map(v => v.id), [], 'Expanded interactive state');
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    await page.emulateMedia({forcedColors:'active'});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.emulateMedia({forcedColors:'none'});
    // Browser zoom changes the CSS viewport: 1280 physical pixels at 200% gives 640 CSS pixels.
    await page.setViewportSize({width:640,height:500});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, '200% zoom equivalent');
    assert.deepEqual(errors, []);
    assert.equal(requests.some(u => !u.startsWith(url)), false, 'No external requests');
    assert.ok(html.length < 65000, `Page should stay below 65 KB; got ${html.length}`);
    const source = fs.readFileSync(path.resolve(__dirname, '../../calls.csv'), 'utf8').trim().split(/\r?\n/);
    const embedded = JSON.parse(html.toString().match(/const CALLS=(\[.*?\]);/s)[1]);
    assert.equal(embedded.length, source.length - 1);
    for (const [index,line] of source.slice(1).entries()) {
      const [id,date,pod,account,,ended,recorded,posted,by] = line.split(',');
      const minutes = posted ? (new Date(posted) - new Date(ended)) / 60000 : null;
      assert.deepEqual(embedded[index], {id,date,pod,account,recorded:recorded==='yes',by,minutes}, `Source data mismatch: ${id}`);
    }
    console.log(`PASS: five viewports, no graph overlaps or clipping, font loading, WCAG A/AA automated audits, scenario slider, pod comparison, outcome highlights, source data parity, filters, keyboard tabs, reduced motion, forced colors, 200% zoom equivalent, no external requests. HTML: ${html.length} bytes.`);
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => {console.error(error);process.exitCode=1});
