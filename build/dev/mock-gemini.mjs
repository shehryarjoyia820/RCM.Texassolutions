// Local stand-in for the Gemini generateContent API, for testing the chat without a real key.
// Run: node build/dev/mock-gemini.mjs   (listens on 127.0.0.1:3999)
// Start WordPress with RCM_GEMINI_API_BASE=http://127.0.0.1:3999 (dev-wp.cmd does this).
import { createServer } from 'node:http';

const port = Number(process.env.MOCK_GEMINI_PORT || 3999);
const log = [];

createServer((req, res) => {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/__log') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(log.slice(-20)));
    }
    if (req.method !== 'POST' || !/:generateContent$/.test(req.url || '')) {
      res.writeHead(404);
      return res.end('not found');
    }
    let payload = {};
    try {
      payload = JSON.parse(body);
    } catch {
      /* ignore */
    }
    const system = payload.systemInstruction?.parts?.[0]?.text ?? '';
    const contents = payload.contents ?? [];
    const last = contents.filter((c) => c.role === 'user').pop()?.parts?.[0]?.text ?? '';
    log.push({ at: new Date().toISOString(), key: req.headers['x-goog-api-key'], systemChars: system.length, hasKnowledge: system.includes('KNOWLEDGE'), turns: contents.length, last });

    const wantsPerson = /person|call|quote|human/i.test(last);
    const reply = {
      reply: wantsPerson
        ? 'I will pass this to the team and they will follow up by email. You can also book a free consultation.'
        : `Thanks for the question. Denial management covers tracking denials by reason code, correcting and resubmitting claims, and filing appeals. (mock reply to: "${last.slice(0, 60)}")`,
      links: [
        { label: 'Denial management', href: '/services/denial-management/' },
        { label: 'Denial rate calculator', href: '/tools/denial-rate-calculator/' },
        { label: 'Not allowed', href: 'https://evil.example/phish' },
      ],
      suggestions: ['How does pricing work?', 'Book a consultation'],
      profile: { specialty: /cardio/i.test(last) ? 'Cardiology' : '', providers: /(\d+)\s+providers?/i.exec(last)?.[1] ?? '', services: ['Denial management'] },
      needs_human: wantsPerson,
      unanswered_question: /pricing|price|cost/i.test(last) ? last : '',
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ candidates: [{ content: { role: 'model', parts: [{ text: JSON.stringify(reply) }] } }] }));
  });
}).listen(port, '127.0.0.1', () => console.log(`mock gemini on http://127.0.0.1:${port}`));
