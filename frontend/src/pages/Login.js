import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../redux/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('Attempting login with:', { email });
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            console.log('Login response:', response.data);

            if (response.data && response.data.token) {
                dispatch(login({
                    user: {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        role: response.data.role
                    },
                    token: response.data.token
                }));
                navigate('/');
            } else {
                setError('Invalid response from server');
            }
        } catch (err) {
            console.error('Login error:', err);
            console.error('Error response:', err.response?.data);
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            {error && <div className="alert alert-danger py-2">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                            </form>
                            <p className="text-center mb-0">
                                Don't have an account? <Link to="/signup">Signup</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
