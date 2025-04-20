import React from "react";
import BackgroundImage from "../assets/images/watchman logo.png";
import { Shield, Lock, Eye, Database, Server, FileText } from "lucide-react";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen w-full pt-[10vh] md:pt-[5vh] px-[2vw] md:px-[5vw] lg:px-[10vw] xl:px-[15vw] transition-all duration-50 ease-linear overflow-x-hidden relative">
      <div className="w-full h-full bg-white">
        <main className="w-full h-full overflow-ellipsis">
          {/* Hero Section */}
          <div className="flex flex-col justify-center items-center py-10">
            <div className="w-full flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-3">
                <h1 className="text-5xl md:text-7xl font-bold text-black text-center md:text-start">
                  Privacy 
                  <span className="text-primary relative inline-flex mx-2">
                    <p className="relative">Policy</p>
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
                  Your privacy is important to us. Learn how we collect, use, and protect your personal information.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative min-h-[300px] h-full overflow-visible -z-0 overflow-y-clip">
                <div className="absolute md:w-[60vw] w-[80vw] h-[60vh] md:h-[70vh] top-[-0vw] md:top-[-10vw] right-[-20vw] md:right-[-40vw] rotate-45 select-none">
                  <img
                    src={BackgroundImage}
                    alt="logo background"
                    className="w-[80vw] select-none"
                    draggable={"false"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated Section */}
          <div className="w-full flex-col flex justify-center items-center py-6">
            <div className="w-full md:w-3/4 bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600 font-GeraldtonRegular">
                <strong>Last Updated:</strong> June 15, 2024
              </p>
            </div>
          </div>

          {/* Privacy Content */}
          <div className="w-full flex-col flex justify-center items-center py-10">
            <div className="w-full md:w-3/4 space-y-10">
              {/* Introduction */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Shield className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">1. Introduction</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    RENTCARS ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application (collectively, the "Platform") or use our services.
                  </p>
                  <p className="text-gray-600">
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Platform or use our services.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Database className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">2. Information We Collect</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    <strong>2.1 Personal Information</strong>
                  </p>
                  <p className="text-gray-600">
                    We may collect personal information that you provide to us, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Date of birth and driver's license information</li>
                    <li>Payment information, such as credit card details</li>
                    <li>Account login credentials</li>
                    <li>Profile information, such as profile pictures and preferences</li>
                    <li>Communication between you and RENTCARS</li>
                  </ul>
                  
                  <p className="text-gray-600">
                    <strong>2.2 Automatically Collected Information</strong>
                  </p>
                  <p className="text-gray-600">
                    When you access our Platform, we may automatically collect certain information, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Device information (e.g., device type, operating system, browser type)</li>
                    <li>IP address and location information</li>
                    <li>Usage data (e.g., pages visited, time spent on the Platform)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Eye className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    We may use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Providing, maintaining, and improving our Platform and services</li>
                    <li>Processing and completing transactions</li>
                    <li>Verifying your identity and eligibility to use our services</li>
                    <li>Communicating with you about your account, our services, and promotional offers</li>
                    <li>Responding to your inquiries and providing customer support</li>
                    <li>Monitoring and analyzing usage patterns and trends</li>
                    <li>Protecting against fraudulent, unauthorized, or illegal activity</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Sharing Your Information */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Server className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">4. Sharing Your Information</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    We may share your information with third parties in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
                    <li><strong>Car Owners and Renters:</strong> If you are a renter, we may share your information with car owners to facilitate the rental process. If you are a car owner, we may share your information with renters who book your vehicle.</li>
                    <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                    <li><strong>Protection of Rights:</strong> We may disclose your information to protect the rights, property, or safety of RENTCARS, our users, or others.</li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Lock className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">5. Data Security</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                  </p>
                </div>
              </div>

              {/* Your Choices */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <FileText className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">6. Your Choices</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    <strong>6.1 Account Information</strong>
                  </p>
                  <p className="text-gray-600">
                    You can review and update your account information by logging into your account on our Platform. If you would like to delete your account, please contact us at privacy@rentcars.com.
                  </p>
                  
                  <p className="text-gray-600">
                    <strong>6.2 Marketing Communications</strong>
                  </p>
                  <p className="text-gray-600">
                    You can opt out of receiving promotional emails from us by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
                  </p>
                  
                  <p className="text-gray-600">
                    <strong>6.3 Cookies</strong>
                  </p>
                  <p className="text-gray-600">
                    Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Platform.
                  </p>
                </div>
              </div>

              {/* Children's Privacy */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Shield className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">7. Children's Privacy</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    Our Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us at privacy@rentcars.com.
                  </p>
                </div>
              </div>

              {/* Changes to This Privacy Policy */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <FileText className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">8. Changes to This Privacy Policy</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </div>
              </div>

              {/* Contact Us */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <FileText className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">9. Contact Us</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="text-gray-600">
                    Email: privacy@rentcars.com<br />
                    Phone: (800) 123-4567<br />
                    Address: 123 Main Street, Avadi, TN 600043
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

export default Privacy;
