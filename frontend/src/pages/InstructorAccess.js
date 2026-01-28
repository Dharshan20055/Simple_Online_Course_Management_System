import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const InstructorAccess = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password === '1234') {
            try {
                // We use the default instructor credentials from DataInitializer
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    email: 'instructor@test.com',
                    password: 'inst123'
                });

                dispatch(login({
                    user: {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        role: response.data.role
                    },
                    token: response.data.token
                }));
                navigate('/instructor-dashboard');
            } catch (err) {
                setError('Failed to log in as instructor. Ensure backend is running.');
            }
        } else {
            setError('Invalid master password.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                        <div className="card-header bg-dark text-white text-center py-4">
                            <h3 className="mb-0">Instructor Access</h3>
                            <p className="text-light opacity-75 small mb-0">Enter master password to continue</p>
                        </div>
                        <div className="card-body p-4">
                            {error && <div className="alert alert-danger py-2">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label text-muted small fw-bold">MASTER PASSWORD</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg border-2"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••"
                                        style={{ textAlign: 'center', letterSpacing: '0.5rem' }}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark btn-lg w-100 shadow-sm" style={{ borderRadius: '10px' }}>
                                    Verify & Enter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorAccess;
