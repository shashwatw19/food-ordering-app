
import React from 'react';

const footerStyle: React.CSSProperties = {
  backgroundColor: '#f8f8f8',
  color: '#666',
  padding: '30px 0',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',

  borderTop: '1px solid #e0e0e0',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};
const topSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  marginBottom: '5px'
}
const sectionStyle: React.CSSProperties = {
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '2px'
};

const headingStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '16px',
  marginBottom: '10px',
  color: '#ff6600', // Swiggy orange
};

const linkStyle: React.CSSProperties = {
  color: '#666',
  textDecoration: 'none',
  fontSize: '13px',
  margin: '0 10px',
};

const socialIconStyle: React.CSSProperties = {
  color: '#666',
  margin: '0 8px',
  fontSize: '13px',
};

const bottomNoteStyle: React.CSSProperties = {
  marginTop: '20px',
  fontSize: '13px',
  color: '#666',
};

const Foooter = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* App Info */}
        <div style={topSectionStyle}>
          <h4 style={headingStyle}>Swiggy , Zomato ke Bade Papa</h4>
          <p>Delicious meals delivered to your doorstep. Fast, Fresh & Reliable.</p>
        </div>

        {/* Quick Links */}
        <div style={sectionStyle}>
          <a href="/privacy" style={linkStyle}>Privacy Policy</a>
          <div className='w-[5px] h-[5px] rounded-full bg-[#666]'></div>
          <a href="/terms" style={linkStyle}>Terms of Service</a>
          <div className='w-[5px] h-[5px] rounded-full bg-[#666]'></div>
          <a href="/contact" style={linkStyle}>Contact Us</a>
          <div className='w-[5px] h-[5px] rounded-full bg-[#666]'></div>
          <a href="/faq" style={linkStyle}>FAQs</a>
        </div>

        {/* Social Icons (Font Awesome or similar) */}
        <div style={sectionStyle}>
          <span style={socialIconStyle}>FaceBoook</span>
          <span style={socialIconStyle}>Instagram</span>
          <span style={socialIconStyle}>Twitter</span>
        </div>

        {/* Bottom note */}
        <div style={bottomNoteStyle}>
          <p>© 2025 Food Ordering App. All rights reserved.</p>
          <p>Made With ❤️ By Shashwat</p>
        </div>
      </div>
    </footer>
  );
}

export default Foooter;
