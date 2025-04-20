import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, Building } from "lucide-react";
import CarImage from "../assets/images/car.png";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen w-full pt-[10vh] md:pt-[5vh] px-[2vw] md:px-[5vw] lg:px-[10vw] xl:px-[15vw] transition-all duration-50 ease-linear overflow-x-hidden relative">
      <div className="w-full h-full bg-white">
        <main className="w-full h-full overflow-ellipsis">
          {/* Hero Section */}
          <div className="flex flex-col justify-center items-center py-10">
            <div className="w-full flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-3">
                <h1 className="text-5xl md:text-7xl font-bold text-black text-center md:text-start">
                  Contact
                  <span className="text-primary relative inline-flex mx-2">
                    <p className="relative">Us</p>
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
                  We're here to help! Reach out to us with any questions,
                  feedback, or support needs.
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

          {/* Contact Information Section */}
          <div className="w-full flex-col flex justify-center items-center py-10">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  Get in Touch
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  How to Reach Us
                </h2>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 px-4 md:px-24">
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[80px] h-[80px] p-5">
                      <Phone className="w-[40px] h-[40px] stroke-primary" />
                    </div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">Phone</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      Customer Service: (800) 123-4567
                    </p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center">
                      Technical Support: (800) 765-4321
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[80px] h-[80px] p-5">
                      <Mail className="w-[40px] h-[40px] stroke-primary" />
                    </div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">Email</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      General Inquiries: info@rentcars.com
                    </p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center">
                      Support: support@rentcars.com
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex justify-center items-center bg-primary/15 rounded-xl w-[80px] h-[80px] p-5">
                      <Clock className="w-[40px] h-[40px] stroke-primary" />
                    </div>
                  </div>
                  <div className="justify-center items-center flex flex-col">
                    <p className="font-bold text-xl">Hours</p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center mt-2">
                      Monday - Friday: 8:00 AM - 8:00 PM
                    </p>
                    <p className="font-GeraldtonRegular text-gray-600 text-center">
                      Saturday - Sunday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-full flex-col flex justify-center items-center py-16 bg-gray-50">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  Send a Message
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  We'd Love to Hear From You
                </h2>
              </div>
              <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-sm">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <div>
                    <Button variant="default" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Office Locations Section */}
          <div className="w-full flex-col flex justify-center items-center py-16">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  Our Offices
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  Visit Us in Person
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

          {/* FAQ Section */}
          <div className="w-full flex-col flex justify-center items-center py-16 bg-gray-50">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center bg-primary/15 rounded-xl py-2 px-4">
                <p className="text-primary font-GeraldtonRegular text-xl">
                  FAQs
                </p>
              </div>
              <div className="w-full text-center">
                <h2 className="font-Geraldton text-3xl md:text-4xl py-10 px-2">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold">
                    How do I make a reservation?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    You can make a reservation through our website by selecting
                    your desired pickup and return dates, choosing a vehicle,
                    and completing the booking process. You can also call our
                    customer service line for assistance.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold">
                    What documents do I need to rent a car?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    You'll need a valid driver's license, a credit card in your
                    name, and proof of insurance. International customers may
                    need additional documentation.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold">
                    Can I modify or cancel my reservation?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Yes, you can modify or cancel your reservation through your
                    account on our website or by contacting our customer
                    service. Please note that cancellation policies may apply
                    depending on how close to the pickup date you make changes.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold">
                    Is there a fee for additional drivers?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Yes, there is typically a fee for adding additional drivers
                    to your rental agreement. The exact amount varies by
                    location and rental duration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
