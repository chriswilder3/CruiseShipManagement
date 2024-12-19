import React from 'react';

function About() {
  return (
    <div className="bg-slate-100 text-gray-800 py-12 px-6 lg:px-20">
      <h1 className="text-4xl font-bold text-center mb-8 poppins">About Celestia</h1>
      <p className="text-lg leading-relaxed mb-6 text-center  lg:text-left">
        At <strong>Celestia</strong>, we redefine the meaning of luxury on the high seas. Our voyages are more than just trips—they're extraordinary experiences crafted for those who seek the perfect harmony of adventure, relaxation, and elegance. From the moment you step aboard, you'll be immersed in an atmosphere designed to pamper and inspire.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-center lg:text-left">
        Indulge in <strong>gourmet dining</strong>, enjoy <strong>resort-style entertainment</strong>, and rejuvenate at our state-of-the-art <strong>wellness centers</strong>. Whether you’re celebrating milestones, exploring the world, or simply escaping the everyday, Celestia ensures every journey is tailored to your desires.
      </p>
      <p className="text-lg leading-relaxed text-center lg:text-left">
        Inspired by the celestial beauty of the stars, Celestia’s mission is to bring the magic of the heavens down to Earth—or rather, the sea. With world-class amenities and impeccable service, we invite you to experience the ultimate fusion of royalty, serenity, and adventure.
      </p>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Highlights</h2>
        <ul className="flex flex-wrap justify-center lg:justify-start gap-4">
          <li className="bg-blue-100 text-blue-900 py-2 px-4 rounded-lg shadow-sm">🚢 Luxury Cruise Ships</li>
          <li className="bg-blue-100 text-blue-900 py-2 px-4 rounded-lg shadow-sm">🍽️ Gourmet Catering</li>
          <li className="bg-blue-100 text-blue-900 py-2 px-4 rounded-lg shadow-sm">🎥 Resort Movies</li>
          <li className="bg-blue-100 text-blue-900 py-2 px-4 rounded-lg shadow-sm">🎉 Exclusive Party Halls</li>
          <li className="bg-blue-100 text-blue-900 py-2 px-4 rounded-lg shadow-sm">💆 Beauty & Wellness</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
