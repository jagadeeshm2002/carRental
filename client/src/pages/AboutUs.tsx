import React from "react";
import {
  BadgeCheck,
  Building,
  Users,
  Trophy,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import CarImage from "../assets/images/car.png";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen w-full pt-[10vh] md:pt-[5vh] px-[2vw] md:px-[5vw] lg:px-[10vw] xl:px-[15vw] transition-all duration-50 ease-linear overflow-x-hidden relative">
      <div className="w-full h-full bg-white">
        <main className="w-full h-full overflow-ellipsis">
          {/* Hero Section */}
          <div className="flex flex-col justify-center items-center py-10">
            <div className="w-full flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-3">
                <h1 className="text-5xl md:text-7xl font-bold text-black text-center md:text-start">
                  About
                  <span className="text-primary relative inline-flex mx-2">
                    <p className="relative">RENTCARS</p>
                    <div className="absolute bottom-1 left-0 w-full h-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="135"
                        height="20"
                        viewBox="0 0 135 20"
                        fill="none"
                      >
                        <path
                          d="M134.398 2.44549C57.1256 -2.5909 23.8505 5.91274 1.51269 9.4328C1.16554 12.3701 1.29738 14.7861 0.927661 19.4528C60.8229 -0.00283431 100.753 3.19444 134.353 4.43383C134.367 4.06436 134.357 3.5539 134.398 2.44549Z"
                          fill="#1572D3"
                        />
                      </svg>
                    </div>
                  </span>
                </h1>
                <p className="text-xl font-light font-GeraldtonRegular text-gray-600 w-4/5 text-center md:text-start mt-4">
                  Your trusted partner for car rentals, providing exceptional
                  service and quality vehicles since 2020.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative min-h-[300px] h-full overflow-visible -z-0 overflow-y-clip">
                <div className="z-10 w-[500px] h-[40vh] top-[5vw] right-[-5vw] absolute animate-in slide-in-from-right-60 transition-all duration-500">
                  <img
                    src={CarImage}
                    alt="Car image"
                    className="w-full"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="w-full flex-col flex justify-center items-center py-16">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  Our Story
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  How We Started and Where We're Going
                </h2>
              </div>
              <div className="w-full md:w-3/4 text-center">
                <p className="text-lg font-GeraldtonRegular text-gray-600 mb-8">
                  RENTCARS was founded in 2020 with a simple mission: to make
                  car rentals easy, affordable, and enjoyable. What started as a
                  small fleet of just 10 vehicles has grown into a nationwide
                  service with hundreds of premium cars available for rent.
                </p>
                <p className="text-lg font-GeraldtonRegular text-gray-600">
                  Our team is passionate about providing exceptional customer
                  service and ensuring that every rental experience is seamless
                  from start to finish. We continuously invest in new
                  technologies and expand our fleet to meet the evolving needs
                  of our customers.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="w-full flex-col flex justify-center items-center py-10 bg-gray-50">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  Our Values
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  What Drives Us Forward
                </h2>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 px-4 md:px-24">
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[80px] h-[80px] p-5">
                      <BadgeCheck className="w-[40px] h-[40px] stroke-primary" />
                    </div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">Quality</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      We maintain a fleet of well-serviced, clean, and reliable
                      vehicles to ensure your safety and comfort.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[80px] h-[80px] p-5">
                      <Users className="w-[40px] h-[40px] stroke-primary" />
                    </div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">Customer First</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      Your satisfaction is our priority. We go above and beyond
                      to exceed your expectations.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[80px] h-[80px] p-5">
                      <Trophy className="w-[40px] h-[40px] stroke-primary" />
                    </div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">Innovation</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      We continuously improve our services and embrace new
                      technologies to enhance your rental experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="w-full flex-col flex justify-center items-center py-16">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  Our Team
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  Meet the People Behind RENTCARS
                </h2>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 px-4 md:px-24">
                <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="w-[120px] h-[120px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">SATHISH KUMAR S</p>
                    <p className="text-primary font-medium">CEO & Founder</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      With over 15 years in the automotive industry, SATHISH
                      leads our company with passion and vision.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="w-[120px] h-[120px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">SATHISH KUMAR V</p>
                    <p className="text-primary font-medium">
                      Operations Director
                    </p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      SATHISH ensures that our day-to-day operations run
                      smoothly and efficiently.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="w-[120px] h-[120px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">YUVANSHANKAR</p>
                    <p className="text-primary font-medium">Fleet Manager</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      YUVAN oversees our vehicle fleet, ensuring all cars meet
                      our high standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations Section */}
          <div className="w-full flex-col flex justify-center items-center py-16 bg-gray-50">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  Our Locations
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  Find Us
                </h2>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 px-4 md:px-24">
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[80px] h-[80px] p-5">
                      <Building className="w-[40px] h-[40px] stroke-primary" />
                    </div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">Avadi</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      123 Main Street, Avadi, TN 600043
                    </p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center">
                      Phone: +91 9876543210
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
