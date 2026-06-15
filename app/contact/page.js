import { FiMail, FiPhone, FiMapPin, FiInstagram } from 'react-icons/fi';

export const metadata = {
  title: 'Contact Us | کشمیری ورثہ',
  description: 'Get in touch with us for inquiries, orders, or support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf4e8] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4a2e24] font-heading font-display">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question about a product, bulk orders, or your recent purchase? We&apos;re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-[#f5a623]/10">
          
          {/* Contact Information */}
          <div className="bg-[#4a2e24] text-[#faf4e8] p-10 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-8 font-display text-[#f5a623]">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <FiMapPin className="text-2xl text-[#f5a623] mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Address</h3>
                    <p className="text-[#faf4e8]/70 mt-1">
                      Artisan Valley Marketplace<br />
                      Srinagar, Jammu &amp; Kashmir 190001<br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiPhone className="text-2xl text-[#f5a623] mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="text-[#faf4e8]/70 mt-1">
                      +92 321 3320971<br />
                      Mon - Sat, 9:00 AM - 6:00 PM (IST)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiMail className="text-2xl text-[#f5a623] mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-[#faf4e8]/70 mt-1">
                      F2024-0766@bnu.edu.pk<br />
                      2024cs657@student.uet.edu.pk
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f5a623] hover:text-[#1a1410] transition-colors">
                  <FiInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 md:p-12">
            <h2 className="text-2xl font-bold text-[#8b1a2d] mb-6 font-display">Send us a message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8b1a2d] focus:border-[#8b1a2d] outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8b1a2d] focus:border-[#8b1a2d] outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8b1a2d] focus:border-[#8b1a2d] outline-none transition-colors"
                  placeholder="Product Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8b1a2d] focus:border-[#8b1a2d] outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-[#8b1a2d] hover:bg-[#6b1422] text-white font-bold py-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}