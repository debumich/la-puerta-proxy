export default async function handler(req, res) {
const targetUrl = 'https://script.google.com/macros/s/AKfycbxyybXqtVcpuKnmbbgXG_fRldZ3cO1GiIZtt_G8P3VENIdyoT3_jHNRbyokfjfvtzBn/exec';
  
  // Обработка preflight (OPTIONS) запроса
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Expires');
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(targetUrl + '?' + new URLSearchParams(req.query).toString(), {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    const data = await response.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
