import React, { useState, useEffect } from 'react';
import { createUser, saveUserId } from '../../services/UserService';
import { getAcceptanceToken, createTransaction, saveTransactionId } from '../../services/PaymentService';
import { createOrder } from '../../services/OrderService';
import { toast } from 'react-toastify';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSubmitEmail }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [acceptanceToken, setAcceptanceToken] = useState('');
  const [acceptanceUrl, setAcceptanceUrl] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    cvc: '',
    exp_month: '',
    exp_year: '',
    card_holder: '',
    cuotas: ''
  });

  useEffect(() => {
    if (showPaymentForm) {
      const fetchAcceptanceToken = async () => {
        try {
          const data = await getAcceptanceToken();
          setAcceptanceToken(data.acceptance_token);
        } catch (error) {
          setError('Error fetching acceptance token.');
        }
      };
  
      fetchAcceptanceToken();
    }
  }, [showPaymentForm]);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setError('');
      setLoading(false);
      setShowPaymentForm(false);
      setAcceptanceToken('');
      setAcceptanceUrl('');
      setTermsAccepted(false);
      setCardDetails({
        number: '',
        cvc: '',
        exp_month: '',
        exp_year: '',
        card_holder: '',
        cuotas: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const result = await createUser(email);
      if (![1, 2].includes(result.status)) {
        throw new Error(result.message || 'Error al crear el usuario.');
      }
      
      saveUserId(result.id);
  
      const dataOrder = await createOrder();
      if (dataOrder.status !== 1) {
        throw new Error(dataOrder.message || 'No se pudo crear la orden.');
      }
  
      const dataTransaction = await createTransaction(dataOrder.id);
      if (dataTransaction.status !== 1) {
        throw new Error(dataTransaction.message || 'No se pudo crear la transacción.');
      }
      
      saveTransactionId(dataTransaction.idTransaction);
      setShowPaymentForm(true);
      onSubmitEmail(email);
  
    } catch (error) {
      toast.error(error.message || 'Ocurrió un error al procesar la solicitud.');
      setError(error.message || 'Ocurrió un error al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardDetailChange = (event) => {
    const { name, value } = event.target;
    setCardDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      setError('Debe aceptar los términos y condiciones para proceder.');
      return;
    }
    try {
    } catch (error) {
      setError('Ocurrió un error al procesar el pago.');
    }
  };

  return (
    <div className="email-modal-overlay">
      <div className="email-modal-content">
        <button className="email-modal-close-btn" onClick={onClose}>×</button>
        {showPaymentForm ? (
          <>
          <h3>Información de Pago</h3>
          <p className="email-modal-description">
            Complete los detalles de su tarjeta para proceder con el pago.
          </p>
          <form onSubmit={handlePaymentSubmit}>
            <input
              type="text"
              name="number"
              value={cardDetails.number}
              onChange={handleCardDetailChange}
              placeholder="Número de tarjeta"
              required
            />
            <input
              type="text"
              name="cvc"
              value={cardDetails.cvc}
              onChange={handleCardDetailChange}
              placeholder="CVC"
              required
            />
            <input
              type="text"
              name="exp_month"
              value={cardDetails.exp_month}
              onChange={handleCardDetailChange}
              placeholder="Mes de expiración"
              required
            />
            <input
              type="text"
              name="exp_year"
              value={cardDetails.exp_year}
              onChange={handleCardDetailChange}
              placeholder="Año de expiración"
              required
            />
            <input
              type="text"
              name="card_holder"
              value={cardDetails.card_holder}
              onChange={handleCardDetailChange}
              placeholder="Titular de la tarjeta"
              required
            />
            <input
              type="text"
              name="cuotas"
              value={cardDetails.cuotas}
              onChange={handleCardDetailChange}
              placeholder="Cuotas"
              required
            />
            {acceptanceUrl && (
              <p className="email-modal-terms">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <label htmlFor="terms">
                  Acepto haber leído los <a href={acceptanceUrl} target="_blank" rel="noopener noreferrer">términos y condiciones</a> y la <a href={acceptanceUrl} target="_blank" rel="noopener noreferrer">política de privacidad</a>.
                </label>
              </p>
            )}
            <button type="submit" className="email-modal-submit-btn" disabled={!termsAccepted}>
              Pagar
            </button>
          </form>
        </>
        
        ) : (
          <>
            <h3>Ingrese su correo electrónico</h3>
            <p className="email-modal-description">
              Para proceder con el pago, necesitamos que proporcione su correo electrónico. Esto es necesario para enviarle la confirmación y recibo de su compra.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Correo electrónico"
                required
              />
              <button type="submit" className="email-modal-submit-btn" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
              {error && <p className="email-modal-error">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
