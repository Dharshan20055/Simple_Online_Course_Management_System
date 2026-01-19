import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckoutForm = ({ clientSecret, courseId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
            // Notify backend of failure
            axios.post(`http://localhost:8080/api/payments/confirm?paymentIntentId=${payload.error.payment_intent?.id || ''}&status=FAILED`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } else {
            setError(null);
            setProcessing(false);
            // Notify backend of success
            await axios.post(`http://localhost:8080/api/payments/confirm?paymentIntentId=${payload.paymentIntent.id}&status=SUCCESS`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/my-courses');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="form-label small text-muted">Card Details</label>
                <div className="p-3 border rounded">
                    <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                </div>
            </div>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <button
                className="btn btn-primary w-100 btn-lg"
                disabled={processing || !stripe || !elements}
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm;
