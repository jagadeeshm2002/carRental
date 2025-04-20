import React from "react";
import BackgroundImage from "../assets/images/watchman logo.png";
import { Shield, FileText, CheckCircle } from "lucide-react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen w-full pt-[10vh] md:pt-[5vh] px-[2vw] md:px-[5vw] lg:px-[10vw] xl:px-[15vw] transition-all duration-50 ease-linear overflow-x-hidden relative">
      <div className="w-full h-full bg-white">
        <main className="w-full h-full overflow-ellipsis">
          {/* Hero Section */}
          <div className="flex flex-col justify-center items-center py-10">
            <div className="w-full flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-3">
                <h1 className="text-5xl md:text-7xl font-bold text-black text-center md:text-start">
                  Terms of 
                  <span className="text-primary relative inline-flex mx-2">
                    <p className="relative">Service</p>
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
                  Please read these terms carefully before using our car rental services.
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

          {/* Terms Content */}
          <div className="w-full flex-col flex justify-center items-center py-10">
            <div className="w-full md:w-3/4 space-y-10">
              {/* Introduction */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <FileText className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">1. Introduction</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    Welcome to RENTCARS. These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
                  </p>
                  <p className="text-gray-600">
                    RENTCARS provides a platform for users to rent vehicles from car owners. We facilitate the connection between renters and owners but are not responsible for the actions or omissions of either party.
                  </p>
                </div>
              </div>

              {/* Account Registration */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Shield className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">2. Account Registration</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    To use certain features of our Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                  </p>
                  <p className="text-gray-600">
                    You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                  <p className="text-gray-600">
                    We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with any provision of these Terms.
                  </p>
                </div>
              </div>

              {/* Rental Terms */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <CheckCircle className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">3. Rental Terms</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    <strong>3.1 Booking and Payments</strong>
                  </p>
                  <p className="text-gray-600">
                    When you book a vehicle through our Services, you agree to pay all fees and applicable taxes associated with the rental. Payments are processed through our secure payment system. All fees are non-refundable unless otherwise specified in our Cancellation Policy.
                  </p>
                  
                  <p className="text-gray-600">
                    <strong>3.2 Driver Requirements</strong>
                  </p>
                  <p className="text-gray-600">
                    To rent a vehicle, you must be at least 21 years old and possess a valid driver's license. You may be required to provide proof of insurance. International renters may need to provide additional documentation.
                  </p>
                  
                  <p className="text-gray-600">
                    <strong>3.3 Vehicle Use</strong>
                  </p>
                  <p className="text-gray-600">
                    You agree to use the rented vehicle only for lawful purposes and in accordance with all applicable laws and regulations. You are responsible for any damage to the vehicle during the rental period, regardless of fault.
                  </p>
                  
                  <p className="text-gray-600">
                    <strong>3.4 Cancellation Policy</strong>
                  </p>
                  <p className="text-gray-600">
                    Cancellations made more than 48 hours before the scheduled pickup time will receive a full refund. Cancellations made within 48 hours of the scheduled pickup time will be charged a cancellation fee equal to one day's rental.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Shield className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    To the maximum extent permitted by law, RENTCARS and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Your access to or use of or inability to access or use the Services;</li>
                    <li>Any conduct or content of any third party on the Services;</li>
                    <li>Any content obtained from the Services; and</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                  </ul>
                </div>
              </div>

              {/* Indemnification */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <Shield className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">5. Indemnification</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    You agree to defend, indemnify, and hold harmless RENTCARS and its affiliates, officers, employees, agents, partners, and licensors from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable legal and accounting fees, arising out of or in any way connected with:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Your access to or use of the Services;</li>
                    <li>Your violation of these Terms;</li>
                    <li>Your violation of any third-party right, including without limitation any intellectual property right, publicity, confidentiality, property, or privacy right; or</li>
                    <li>Any claim that your content caused damage to a third party.</li>
                  </ul>
                </div>
              </div>

              {/* Modifications to Terms */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <FileText className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">6. Modifications to Terms</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    We reserve the right to modify these Terms at any time. If we make changes to these Terms, we will provide notice of such changes, such as by sending an email notification, providing notice through the Services, or updating the "Last Updated" date at the beginning of these Terms. By continuing to access or use the Services after the revisions become effective, you agree to be bound by the revised Terms.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <FileText className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">7. Governing Law</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within the United States for the resolution of any disputes.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/15 p-2 rounded-md">
                    <FileText className="w-[30px] h-[30px] stroke-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">8. Contact Information</h2>
                </div>
                <div className="pl-12 space-y-4">
                  <p className="text-gray-600">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <p className="text-gray-600">
                    Email: legal@rentcars.com<br />
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

export default Terms;
