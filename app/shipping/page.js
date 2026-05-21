export const metadata = {
  title: 'Shipping Policy - Art of Kashmir',
  description: 'Learn about our shipping and delivery processes.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Shipping Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            At <strong>Art of Kashmir</strong>, we strive to deliver your orders promptly and safely. Since our products are sourced directly from artisans in the Kashmir Valley, some logistics might take slightly longer depending on weather conditions or production factors.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Order Processing Time</h2>
          <p>
            All ready-to-ship orders are processed within 2 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped safely.
          </p>
          <p>
            Custom or made-to-order items (such as specialized Sozni embroidery) will have specific dispatch timelines discussed at the time of placing the order (typically 2-4 weeks).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Domestic Shipping (India & Pakistan)</h2>
          <p>
            Standard shipping typically takes 5-7 business days post-dispatch. We offer Free Standard Shipping to all domestic regions. Expedited shipping is available at checkout for an additional nominal charge.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">International Shipping</h2>
          <p>
            We offer international shipping worldwide. Delivery times range from 7 to 15 business days depending on customs and local courier capacities. Shipping charges for your order will be calculated and displayed at checkout.
          </p>
          <p>
            Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. We are not responsible for these charges if they are applied and are your responsibility as the customer.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Order Tracking</h2>
          <p>
            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
          </p>
        </div>
      </div>
    </div>
  );
}
