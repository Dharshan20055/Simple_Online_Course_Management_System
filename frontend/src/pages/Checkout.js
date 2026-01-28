import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe('pk_test_51Sr9lTRvNzgBPCawQsgj6zBI5Oqb5mjO00CaDYA3qphOVlsUPNzFMLTb4X47CawVJa2ls12lIJZVpH7goaqgMyCZ00zfgzXcBb');

const Checkout = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const { user, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/courses/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setCourse(res.data))
            .catch(err => console.error('Error fetching course:', err));
    }, [courseId, token]);

    const handlePaymentSuccess = () => {
        alert('Payment successful! You are now enrolled.');
        navigate('/my-courses');
    };

    if (!course) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="bg-primary p-4 text-white text-center">
                            <h3 className="mb-0 fw-bold">Checkout</h3>
                            <p className="opacity-75 mb-0">Secure Payment for Your Course</p>
                        </div>
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <h5 className="fw-bold mb-2">Order Summary</h5>
                                <div className="p-3 bg-light rounded-3 mb-3">
                                    <h6 className="mb-1">{course.title}</h6>
                                    <p className="small text-muted mb-0">{course.category}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2 px-1">
                                    <span className="text-muted">Course Price:</span>
                                    <span className="fw-bold fs-5 text-success">${course.price}</span>
                                </div>
                                <div className="border-top mt-2 pt-2 d-flex justify-content-between align-items-center px-1">
                                    <span className="fw-bold">Total:</span>
                                    <span className="fw-bold fs-4 text-primary">${course.price}</span>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h5 className="fw-bold mb-4">Payment Details</h5>
                            <Elements stripe={stripePromise}>
                                <StripePaymentForm
                                    course={course}
                                    user={user}
                                    token={token}
                                    onSuccess={handlePaymentSuccess}
                                    onCancel={() => navigate(-1)}
                                />
                            </Elements>

                            <div className="mt-4 text-center">
                                <p className="small text-muted">
                                    <i className="bi bi-shield-check me-2"></i>
                                    Payments are secure and encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
