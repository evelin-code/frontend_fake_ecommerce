import { ApiConfig } from '../utils/ApiConfig';

export const getAcceptanceToken = async () => {
  try {
    const response = await fetch(`${ApiConfig.API_BASE_URL}/pay/getAcceptanceToken`);
    const data = await response.json();

    if (data.acceptance_token) {
      sessionStorage.setItem('acceptance_token', data.acceptance_token);
      return data;
    } else {
      throw new Error(data.message || 'Error fetching acceptance token.');
    }
  } catch (error) {
    console.error('Error fetching acceptance token:', error);
    throw error;
  }
};

export const getStoredAcceptanceToken = () => {
  return sessionStorage.getItem('acceptance_token');
};

export const clearAcceptanceToken = () => {
  sessionStorage.removeItem('acceptance_token');
};

export const createTransaction = async (idOrder) => {
  try {
    const response = await fetch(`${ApiConfig.API_BASE_URL}/pay/createTransaction/${idOrder}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 1) {
      return data;
    } else {
      throw new Error(data.message || 'Error creating transaction.');
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error creating transaction.',
    };
  }
};

export const saveTransactionId = (idTransaction) => {
  try {
    localStorage.setItem('transactionId', idTransaction);
  } catch (error) {
    console.error('Error saving transaction ID to localStorage:', error);
  }
};