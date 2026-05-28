exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
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
      listIds: [parseInt(process.env.BREVO_LIST_ID)],
      updateEnabled: true,
      attributes: { SORGENTE: 'Prenotello Landing' }
    })
  });

  if (res.ok || res.status === 204) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  const data = await res.json();
  return { statusCode: 400, body: JSON.stringify({ error: data.message }) };
};
