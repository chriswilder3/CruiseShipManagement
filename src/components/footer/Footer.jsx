import React from 'react'

function Footer() {
  return (
    <footer className=" bg-gradient-to-b from-blue-900 to-gray-900 text-gray-300 py-5  w-full mt-auto ">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Left Section - Branding */}
            <div className="flex flex-col items-center md:items-start ">
                <h2 className="text-3xl text-white playfair-display italic">Celestia</h2>
                <p className="text-sm text-gray-400 mt-2">
                    Experience the ultimate in luxury and relaxation at sea.
                </p>
            </div>

            {/* Center Section - Navigation Links */}
            <div className="flex flex-col items-center">
                <ul className="flex flex-wrap justify-center gap-6">
                    <li>
                        <a href="#about" className="hover:text-white transition duration-300">About</a>
                    </li>
                    <li>
                        <a href="#destinations" className="hover:text-white transition duration-300">Destinations</a>
                    </li>
                    <li>
                        <a href="#services" className="hover:text-white transition duration-300">Services</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-white transition duration-300">Contact</a>
                    </li>
                </ul>
            </div>

            {/* Right Section - Social Media */}
            <div className="flex flex-col items-center md:items-end space-y-2">
                <p className="text-sm">Follow Us:</p>
                <div className="flex gap-4">
                    <a href="#" aria-label="Facebook" className="hover:text-white transition duration-300">
                        <i className="fab fa-facebook-f text-lg"></i>
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-white transition duration-300">
                        <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a href="#" aria-label="Twitter" className="hover:text-white transition duration-300">
                        <i className="fab fa-twitter text-lg"></i>
                    </a>
                </div>
            </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-8 text-center text-sm py-4">
            <p>&copy; {new Date().getFullYear()} Celestia. All Rights Reserved.</p>
        </div>
    </footer>

  

  )
}

export default Footer