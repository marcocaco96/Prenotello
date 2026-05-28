exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      email,
      listIds: [3],
      updateEnabled: true
    })
  });

  if (res.ok || res.status === 204) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  const err = await res.json();
  return { statusCode: 400, body: JSON.stringify({ error: err.message }) };
};
