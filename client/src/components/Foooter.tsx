
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">FlavorTrail</h3>
          <p className="text-sm leading-relaxed">
            Discover the flavor of India, one city at a time. <br />
            <span className="italic text-yellow-400">"Follow the flavor, find the culture."</span>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/join"}>
              <a className="hover:text-yellow-400">Join With Us</a>
              </Link>
            </li>
            <li>
              <Link to={"/cities"}>
                <a  className="hover:text-yellow-400">Explore Cities</a>
              </Link>
            </li>
            <li><a href="#about" className="hover:text-yellow-400">About Us</a></li>
           
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Get In Touch</h4>
          <p className="text-sm">Email: hello@flavortrail.app</p>
          <p className="text-sm">Phone: +91 9871233311</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Instagram" className="hover:text-yellow-400">Instagram</a>
            <a href="#" aria-label="Twitter" className="hover:text-yellow-400">Twitter</a>
            <a href="#" aria-label="Facebook" className="hover:text-yellow-400">Facebook</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm mt-10 text-gray-400">
        <p>© 2025  App. All rights reserved.</p>
        <p>Made With ❤️ By Shashwat</p>

      </div>
    </footer>
  );
};

export default Footer;







// const footerStyle: React.CSSProperties = {
//   backgroundColor: '#f8f8f8',
//   color: '#666',
//   padding: '30px 0',
//   fontFamily: 'Arial, sans-serif',
//   fontSize: '14px',

//   borderTop: '1px solid #e0e0e0',
// };

// const containerStyle: React.CSSProperties = {
//   maxWidth: '1200px',
//   margin: '0 auto',
//   padding: '0 20px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   textAlign: 'center',
// };
// const topSectionStyle: React.CSSProperties = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: '2px',
//   marginBottom: '5px'
// }
// const sectionStyle: React.CSSProperties = {
//   marginBottom: '20px',
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   gap: '2px'
// };

// const headingStyle: React.CSSProperties = {
//   fontWeight: 'bold',
//   fontSize: '16px',
//   marginBottom: '10px',
//   color: '#ff6600', // Swiggy orange
// };

// const linkStyle: React.CSSProperties = {
//   color: '#666',
//   textDecoration: 'none',
//   fontSize: '13px',
//   margin: '0 10px',
// };

// const socialIconStyle: React.CSSProperties = {
//   color: '#666',
//   margin: '0 8px',
//   fontSize: '13px',
// };

// const bottomNoteStyle: React.CSSProperties = {
//   marginTop: '20px',
//   fontSize: '13px',
//   color: '#666',
// };

// const Foooter = () => {
//   return (
//     <footer style={footerStyle}>
//       <div style={containerStyle}>
//         {/* App Info */}
//         <div style={topSectionStyle}>
//           <h4 style={headingStyle}>Swiggy , Zomato ke Bade Papa</h4>
//           <p>Delicious meals delivered to your doorstep. Fast, Fresh & Reliable.</p>
//         </div>

//         {/* Quick Links */}
//         <div style={sectionStyle}>
//           <a href="/privacy" style={linkStyle}>Privacy Policy</a>
//           <div className='w-[5px] h-[5px] rounded-full bg-[#666]'></div>
//           <a href="/terms" style={linkStyle}>Terms of Service</a>
//           <div className='w-[5px] h-[5px] rounded-full bg-[#666]'></div>
//           <a href="/contact" style={linkStyle}>Contact Us</a>
//           <div className='w-[5px] h-[5px] rounded-full bg-[#666]'></div>
//           <a href="/faq" style={linkStyle}>FAQs</a>
//         </div>

//         {/* Social Icons (Font Awesome or similar) */}
//         <div style={sectionStyle}>
//           <span style={socialIconStyle}>FaceBoook</span>
//           <span style={socialIconStyle}>Instagram</span>
//           <span style={socialIconStyle}>Twitter</span>
//         </div>

//         {/* Bottom note */}
//         <div style={bottomNoteStyle}>
//           <p>© 2025 Food Ordering App. All rights reserved.</p>
//           <p>Made With ❤️ By Shashwat</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Foooter;