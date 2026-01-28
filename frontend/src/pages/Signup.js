import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('Attempting signup with:', formData);
            const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
            console.log('Signup response:', response.data);
            alert('Signup successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);
            console.error('Error response:', err.response?.data);
            setError(err.response?.data?.message || 'Signup failed. Email might already be taken.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow border-0">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4">Create Account</h3>
                            {error && <div className="alert alert-danger py-2">{error}</div>}
                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mb-3">Signup</button>
                            </form>
                            <p className="text-center mb-0">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
