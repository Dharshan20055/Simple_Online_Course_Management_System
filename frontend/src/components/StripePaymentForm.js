import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripePaymentForm = ({ course, user, token, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // 1. Create Payment Intent on backend
            const response = await axios.post(
                `http://localhost:8080/api/payments/create-payment-intent?courseId=${course.id}&userId=${user.id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { clientSecret } = response.data;

            // 2. Confirm payment on frontend
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.username || user.email || 'Customer',
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // 3. Confirm payment on backend
                    await axios.post(
                        `http://localhost:8080/api/payments/confirm?paymentIntentId=${result.paymentIntent.id}&status=SUCCESS`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    onSuccess();
                }
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err.response?.data?.message || 'An error occurred during payment.');
            setProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4 p-3 border rounded">
                <CardElement options={cardElementOptions} />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button
                className="btn btn-primary w-100 py-2 fw-bold"
                type="submit"
                disabled={!stripe || processing}
            >
                {processing ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : null}
                {processing ? 'Processing...' : `Pay $${course.price}`}
            </button>
            <button
                className="btn btn-outline-secondary w-100 mt-2"
                type="button"
                onClick={onCancel}
                disabled={processing}
            >
                Cancel
            </button>
        </form>
    );
};

export default StripePaymentForm;
