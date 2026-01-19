import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, courses: 0, revenue: 0 });
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        // In a real app, this would be a single stats endpoint
        axios.get('http://localhost:8080/api/courses', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setStats(prev => ({ ...prev, courses: res.data.length })));
    }, [token]);

    return (
        <div>
            <h2 className="fw-bold mb-4">Admin Dashboard</h2>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-primary text-white">
                        <div className="card-body p-4 text-center">
                            <h5 className="mb-0">Total Courses</h5>
                            <p className="display-4 fw-bold mb-0">{stats.courses}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-success text-white">
                        <div className="card-body p-4 text-center">
                            <h5 className="mb-0">Active Users</h5>
                            <p className="display-4 fw-bold mb-0">-</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-info text-white">
                        <div className="card-body p-4 text-center">
                            <h5 className="mb-0">Total Revenue</h5>
                            <p className="display-4 fw-bold mb-0">$0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="fw-bold mb-3">Recent Activities</h4>
                <div className="bg-white p-5 rounded text-center text-muted shadow-sm">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
