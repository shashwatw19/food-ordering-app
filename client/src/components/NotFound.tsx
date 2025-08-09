import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #fff5f5 0%, #fef7e6 100%)',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            textAlign: 'center',

        }}>
            {/* Brand Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #ea580c, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    FlavorTrail.
                </h1>
                <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.9rem',
                    margin: '0'
                }}>
                    Your favorite food delivery platform
                </p>
            </div>

            {/* 404 Content */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ 
                    fontSize: '6rem', 
                    color: '#ea580c',
                    margin: '0',
                    fontWeight: 'bold'
                }}>
                    404
                </h2>
                <h3 style={{ 
                    fontSize: '1.5rem',
                    color: '#374151',
                    marginBottom: '1rem',
                    fontWeight: '600'
                }}>
                    Oops! Page Not Found
                </h3>
                <p style={{ 
                    color: '#6b7280',
                    fontSize: '1rem',
                    maxWidth: '400px',
                    lineHeight: '1.5'
                }}>
                    The page you're looking for doesn't exist or has been moved. 
                    Don't worry, let's get you back to delicious food!
                </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-row gap-2 items-center '>
                <Link 
                    to="/"
                >
                 <p className='bg-orange-600 text-white font-semibold  p-3 rounded-xl w-[150px]'>Back to Home</p>
                </Link>
                
                <button 
                    onClick={() => window.history.back()}
                    className='bg-gray-600 p-3 font-semibold rounded-xl text-white w-[150px]'
                >
                     Go Back
                </button>
            </div>

            {/* Footer Message */}
            <div style={{ 
                marginTop: '3rem',
                padding: '20px',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '10px',
                maxWidth: '500px'
            }}>
                <p style={{ 
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    margin: '0',
                    lineHeight: '1.4'
                }}>
                    <strong>Need help?</strong> Contact our support team or browse our menu to discover amazing restaurants near you!
                </p>
            </div>
        </div>
    );
};

export default NotFound;