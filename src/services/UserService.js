import { ApiConfig } from '../utils/ApiConfig';

export const createUser = async (email) => {
  try {
    const response = await fetch(`${ApiConfig.API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const saveUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

