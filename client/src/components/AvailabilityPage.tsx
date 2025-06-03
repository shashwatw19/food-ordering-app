import vadaPav from "../assets/vada pav.jpg"
import kebab from "../assets/kebab.jpg"
import biryani from "../assets/biryani.jpg"
import missal from "../assets/missal.jpg"
import dosa from "../assets/dosa.jpg"
import dalBati from "../assets/dal bati.jpg"

export default function AvailabilityPage() {
const cities = [
  {
    name: "Mumbai",
    image: vadaPav,
    quality: "Fusion of cultures reflected in iconic street foods like Vada Pav."
  },
  {
    name: "Delhi",
    image: kebab,
    quality: "Rich Mughlai influence with legendary dishes like Butter Chicken and Kebabs."
  },
  {
    name: "Bangalore",
    image: dosa,
    quality: "Famous for South Indian breakfasts, especially crispy dosas and filter coffee."
  },
  {
    name: "Hyderabad",
    image: biryani,
    quality: "Royal culinary legacy known for aromatic and spiced Hyderabadi Biryani."
  },
  {
    name: "Pune",
    image: missal,
    quality: "Spicy Maharashtrian street food culture, best seen in Misal Pav."
  },
  {
    name: "Indore",
    image: dalBati,
    quality: "Vibrant night street food scene, especially at Sarafa Bazaar."
  }
];


  return (
    <div className=" bg-white min-h-screen py-12 rounded-md px-6 ">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 drop-shadow-sm">
          Delivering Deliciousness Across India
        </h1>
        <p className="text-gray-700 mt-4 text-lg max-w-2xl  mx-auto">
          We are proud to serve food lovers in every corner of the country. From bustling metros to emerging cities, our network keeps growing stronger every day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100 hover:shadow-lg transition"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-orange-500">
                {city.name}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {city.quality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center mt-16 bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <h3 className="text-3xl font-bold text-orange-600 mb-4">We’re Growing Every Day</h3>
        <p className="text-gray-700 text-lg leading-relaxed ">
          Our mission is to bring delicious food to every doorstep in India. With new restaurants joining and our delivery network expanding rapidly, we’re making food more accessible than ever.
        </p>
        <p className="text-orange-500 font-semibold mt-6">Your city might be next. Stay tuned!</p>
      </div>
    </div>
  );
}
