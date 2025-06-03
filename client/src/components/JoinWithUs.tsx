import {  ForkKnife } from 'lucide-react';
import joinImg1 from '../assets/joinImg1.avif'
import joinImg2 from '../assets/joinImg2.avif'
import joinImg3 from '../assets/joinImg3.avif'
import joinImg4 from '../assets/joinImg4.avif'
import { Link } from 'react-router-dom';
export default function JoinWithUsPage() {
  return (
    <div className=" bg-white min-h-screen  mx-auto rounded-md mb-9 mt-10  p-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-600 drop-shadow-sm">Partner With Us</h1>
        <p className="text-gray-700 mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
          Expand your culinary business by joining our exclusive food delivery network. Get more orders, gain popularity, and grow your customer base effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-xl border border-orange-100">
          <h2 className="text-2xl font-semibold text-orange-500">Why Join Us?</h2>
          <ul className="text-gray-700  space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">📈</span> Reach thousands of local food lovers daily.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">🛒</span> Seamless in-app ordering and menu management.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">📊</span> Real-time analytics to optimize performance.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">🚚</span> Delivery & pickup integration available.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">⭐</span> Customer reviews to build credibility.
            </li>
            <Link to={"/admin/restaurant"}>
              <li className='flex items-center justify-start mt-10'>
                <button className='bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold p-2 rounded-md  justify-center  items-center flex gap-3'><ForkKnife/>Add Your Restaurant</button>
              </li>
            </Link>
            
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow-xl border border-orange-100">
          <img src={joinImg1} alt="Delicious dish" className="rounded-xl object-cover h-48 w-full" />
          <img src={joinImg2} alt="Happy customers" className="rounded-xl object-cover h-48 w-full" />
          <img src={joinImg3} alt="Restaurant team" className="rounded-xl object-cover h-48 w-full" />
          <img src={joinImg4} alt="Fresh ingredients" className="rounded-xl object-cover h-48 w-full" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center mt-16 bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <h3 className="text-3xl font-bold text-orange-600 mb-4">Let’s grow together!</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our platform is designed to elevate your restaurant's digital presence and drive orders at scale. 
          Join hundreds of other local eateries already thriving with us. 
          Be a part of our mission to connect food lovers with amazing dining experiences.
        </p>
        
      </div>
    </div>
  );
}
