import poha from "../assets/pohe.jpg"
import pavBhaji from "../assets/pav bhaji.jpg"
import kebab from "../assets/kebab.jpg"
import dosa2 from "../assets/dosa2.jpg"
import biryani from "../assets/biryani.jpg"
import vadaPav from "../assets/vada pav.jpg"
const cities = [
  {
    name: "Indore",
    image: poha,
    description:
      "Indore is a food lover's paradise, especially known for its vibrant street food scene. Sarafa Bazaar and Chappan Dukan serve iconic dishes like poha, jalebi, and bhutte ka kees."
  },
  {
    name: "Delhi",
    image: kebab,
    description:
      "Delhi is a melting pot of cultures, reflected in its diverse culinary offerings. From spicy chole bhature to kebabs of Old Delhi, every bite tells a story."
  },
  {
    name: "Mumbai",
    image: vadaPav,
    description:
      "Mumbai’s food culture is a mix of street-side treasures and regional flavors. Must-tries include vada pav, pav bhaji, and Bombay sandwiches."
  },
  {
    name: "Hyderabad",
    image: biryani,
    description:
      "Hyderabad offers rich Mughlai cuisine with iconic dishes like Hyderabadi Biryani and Haleem. Its royal food heritage remains unmatched."
  },
  {
    name: "Pune",
    image: pavBhaji,
    description:
      "Pune blends Maharashtrian staples with modern cafés. Enjoy dishes like misal pav, sabudana khichdi, and Pune’s unique street eats."
  },
  {
    name: "Bangalore",
    image: dosa2,
    description:
      "Bangalore’s food ranges from traditional dosas to global cuisines. Street food hubs and filter coffee define its food identity."
  }
];

const CityFoodCulture = () => {
  return (
    <div className="bg-white text-gray-800 px-6 py-10">
      <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
        Explore Food Culture Across Indian Cities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cities.map((city) => (
          <div key={city.name} className="rounded-xl overflow-hidden shadow-lg border border-orange-100">
            <img
              src={city.image}
              alt={city.name + " food"}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {city.name}
              </h3>
              <p className="text-sm leading-relaxed">
                {city.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityFoodCulture;
