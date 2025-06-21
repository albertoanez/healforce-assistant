export default async function handler(req, res) {
  const { messages } = req.body;
  const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'gpt-3.5-turbo', messages }),
  });

  const json = await apiRes.json();
  res.status(200).json({ reply: json.choices?.[0]?.message?.content });
}
