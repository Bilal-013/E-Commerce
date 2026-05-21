export const metadata = {
  title: 'Privacy Policy - Art of Kashmir',
  description: 'Our Privacy Policy and data management practices.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            At Art of Kashmir, we are committed to protecting the privacy and security of our customers and visitors. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our platform.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Personal Information We Collect</h2>
          <p>
            When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We use this to help us screen for potential risk and fraud, and to improve our platform.
          </p>
          <p>
            Additionally, when you make a purchase or attempt to make a purchase, we collect certain information from you, including your name, billing address, shipping address, email address, and phone number. (Note: Payment details are processed securely by our trusted gateway providers; we do not store full credit card numbers.)
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">How Do We Use Your Information?</h2>
          <p>
            We use the Order Information that we collect generally to fulfill any orders placed through the Site (including arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Communicate with you</li>
            <li>Screen our orders for potential risk or fraud</li>
            <li>Provide you with information or advertising relating to our products or services (if aligned with your preferences)</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Data Sharing</h2>
          <p>
            We share your Personal Information with carefully selected third parties to help us use your Personal Information as described above. For example, we use Firebase for our database and authentication framework. We may also share your Personal Information to comply with applicable laws and regulations, in response to a subpoena, or to otherwise protect our rights.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Data Retention</h2>
          <p>
            When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
          </p>
        </div>
      </div>
    </div>
  );
}
