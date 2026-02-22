const API_BASE = 'https://api-challenge.agilefreaks.com/v1';

export async function getToken() {
  const response = await fetch(`${API_BASE}/tokens`, {
    method: 'POST'
  });
  const data = await response.json();
  return data.token;
}

export async function getCoffeeShops(token) {
  const response = await fetch(`${API_BASE}/coffee_shops?token=${token}`);
  return response.json();
}
