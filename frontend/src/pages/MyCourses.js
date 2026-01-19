import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const { user, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8080/api/enrollments/user/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setEnrollments(res.data));
        }
    }, [user, token]);

    return (
        <div>
            <h2 className="mb-4 fw-bold">My Learning</h2>
            {enrollments.length === 0 ? (
                <div className="bg-white p-5 rounded text-center shadow-sm">
                    <p className="lead text-muted">You are not enrolled in any courses yet.</p>
                    <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                </div>
            ) : (
                <div className="row g-4">
                    {enrollments.map(enrol => (
                        <div key={enrol.id} className="col-md-4">
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={enrol.course.thumbnailUrl || 'https://via.placeholder.com/300x200?text=Course'}
                                    className="card-img-top"
                                    alt={enrol.course.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{enrol.course.title}</h5>
                                    <p className="small text-muted mb-3">Enrolled on: {new Date(enrol.enrolledDate).toLocaleDateString()}</p>
                                    <button className="btn btn-primary btn-sm w-100">Go to Course</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
