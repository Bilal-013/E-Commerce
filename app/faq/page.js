export const metadata = {
  title: 'FAQ - Art of Kashmir',
  description: 'Frequently asked questions about our authentic Kashmiri products.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">1. Are your products 100% authentic?</h3>
            <p className="text-gray-600 leading-relaxed">
              Yes, we work directly with artisans in Kashmir. Our Pashmina shawls, Karakul caps, and embroidered products are 100% authentic and hand-crafted using traditional methods passed down through generations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">2. How can I verify the authenticity of Pashmina?</h3>
            <p className="text-gray-600 leading-relaxed">
              Authentic Pashmina is extremely soft, lightweight, and warm. You can often notice slight irregularities in the weave due to it being hand-loomed. Many of our premium pieces also come with government-backed GI (Geographical Indication) tags.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">3. Do you ship internationally?</h3>
            <p className="text-gray-600 leading-relaxed">
              Yes, we ship globally. However, custom duties and import taxes depending on your region will be borne by you at the time of delivery.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">4. How do I care for my Pashmina shawl?</h3>
            <p className="text-gray-600 leading-relaxed">
              Pashmina requires delicate care. We strongly recommend professional dry cleaning only. Never machine wash or wring your pashmina, as it will damage the delicate natural fibers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">5. Can I customize or place a bulk order?</h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! For custom embroidery designs, bridal pieces, or corporate gifting, please reach out to us at F2024-0766@bnu.edu.pk or give us a call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
