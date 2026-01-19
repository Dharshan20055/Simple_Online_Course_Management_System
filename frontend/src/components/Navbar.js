import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">OCMS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/courses">Courses</Link>
                        </li>
                        {isAuthenticated && user && (
                            <>
                                {user.role === 'STUDENT' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/my-courses">My Courses</Link>
                                    </li>
                                )}
                                {user.role === 'INSTRUCTOR' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/instructor-dashboard">Instructor</Link>
                                    </li>
                                )}
                                {user.role === 'ADMIN' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin-dashboard">Admin</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                <span className="text-light me-3">Welcome, {user?.name || 'User'}</span>
                                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
                                <Link className="btn btn-primary btn-sm" to="/signup">Signup</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
