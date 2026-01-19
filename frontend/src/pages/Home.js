import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <div className="text-center py-5">
            <div className="bg-white p-5 rounded shadow-sm">
                <h1 className="display-4 fw-bold mb-4">Master New Skills Online</h1>
                <p className="lead text-muted mb-5">
                    Access high-quality courses anytime, anywhere. Start your learning journey today!
                </p>
                {(!user || user.role !== 'INSTRUCTOR') && (
                    <Link to="/courses" className="btn btn-primary btn-lg px-5">Browse Courses</Link>
                )}
            </div>

            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5">Expert Instructors</h3>
                        <p className="text-muted">Learn from the best in the industry.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5">Lifetime Access</h3>
                        <p className="text-muted">Learn at your own pace with lifetime access.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5">Secure Payments</h3>
                        <p className="text-muted">Safe and secure transactions via Stripe.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
