export const metadata = {
  title: 'Returns & Refunds - Art of Kashmir',
  description: 'Our return and refund policy for authentic Kashmiri goods.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Returns & Refunds Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            We take immense pride in the craftsmanship of our products. Due to the delicate and handcrafted nature of Kashmiri goods, we have a strict quality control process before dispatch.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Return Eligibility</h2>
          <p>
            Returns are only accepted in the unlikely event that you receive a damaged or incorrect product. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
          </p>
          <p>
            You must raise a return request within <strong>48 hours</strong> of receiving the delivery by emailing us at F2024-0766@bnu.edu.pk with photographic evidence of the defect.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Non-returnable Items</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Products that show signs of wear, washing, or damage by the customer.</li>
            <li>Custom-made or personalized items.</li>
            <li>Items sold during clearance sales or promotional discounts.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Refunds</h2>
          <p>
            Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, we will initiate a replacement or a prompt refund to your original method of payment. Shipping costs are non-refundable. 
          </p>
          <p>
            Please allow 7-10 business days for the credited amount to reflect in your bank account or credit card statement.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Exchanges</h2>
          <p>
            We only replace items if they are defective or damaged from our end. If you need an exchange for the same item, please send us an email to initiate the review process.
          </p>
        </div>
      </div>
    </div>
  );
}
