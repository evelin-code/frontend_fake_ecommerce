import { ApiConfig } from '../utils/ApiConfig';
import axios from 'axios';

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

export const setAcceptanceToken = (acceptance_token) => {
  sessionStorage.setItem('acceptance_token', acceptance_token);
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

export const saveReference = (reference) => {
  try {
    localStorage.setItem('reference', reference);
  } catch (error) {
    console.error('Error saving reference to localStorage:', error);
  }
};

export const saveTransactionId = (transactionGatewayId) => {
  try {
    localStorage.setItem('transactionGatewayId', transactionGatewayId);
  } catch (error) {
    console.error('Error saving transaction gateway id to localStorage:', error);
  }
};

export const deleteReference = () => {
  localStorage.removeItem('reference');
};

export const tokenizeCard = async (cardDetails) => {
  try {
    const response = await fetch(`${ApiConfig.API_BASE_URL}/pay/tokenizeCard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardDetails),
    });

    const data = await response.json();

    if ((data.status && data.status !== 1)) {
      throw new Error(data.message || 'Error tokenizing card.');
    }

    return data;
  } catch (error) {
    console.error('Error tokenizing card:', error);
    throw error;
  }
};

export const createGatewayTransaction = async (idTokenizacion, cuotas) => {
  try {
    const acceptanceToken = getStoredAcceptanceToken();
    const reference = localStorage.getItem('reference');
    
    if (!acceptanceToken || !reference) {
      throw new Error('Faltan datos para crear la transacción.');
    }

    const response = await fetch(`${ApiConfig.API_BASE_URL}/pay/createGatewayTransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference,
        installments: cuotas,
        acceptance_token: acceptanceToken,
        id_tokenizacion: idTokenizacion,
      }),
    });

    const data = await response.json();

    if (data.status === 422) {
      throw new Error(data.message || 'Validation error occurred.');
    } else if (data.id) {
      return data;
    } else {
      throw new Error('Error creating gateway transaction.');
    }
  } catch (error) {
    console.error('Error creating gateway transaction:', error);
    throw error;
  }
};

export const getTransactionDetails = async (idTransaction) => {
  try {
    if (!idTransaction) {
      throw new Error('ID de transacción no proporcionado.');
    }

    const urlFetch = ApiConfig.API_WOMPI_URL + idTransaction;

    const response = await fetch(urlFetch, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ApiConfig.PRV_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los detalles de la transacción');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error al obtener los detalles de la transacción:', error);
    throw error;
  }
};

export const updateTransactionDetails = async (transactionDetails) => {
  try {
    const response = await fetch(`${ApiConfig.API_BASE_URL}/pay/updateTransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionDetails),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar la transacción.');
    }
    return data;
  } catch (error) {
    console.error('Error updating transaction details:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId) => {
  try {
    const response = await axios.patch(`${ApiConfig.API_BASE_URL}/order/${orderId}/status`);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado de la orden:', error);
    throw new Error('Error al actualizar el estado de la orden.');
  }
};