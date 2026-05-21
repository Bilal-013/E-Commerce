export const metadata = {
  title: 'Care Instructions - Art of Kashmir',
  description: 'How to care for Pashmina and Kashmiri textiles.',
};

export default function CareInstructionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Product Care Instructions</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            Your Kashmiri heritage products are heirlooms made from the finest natural fibers. Proper care ensures they last for generations.
          </p>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Pashmina Shawls & Stoles</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Dry Clean Only:</strong> We strongly advise professional dry cleaning to maintain the texture and sheen of your Pashmina.</li>
              <li><strong>Never Wring or Twist:</strong> Natural fibers are delicate. Machine washing will destroy the fabric.</li>
              <li><strong>Storage:</strong> Store folded in a breathable muslin or cotton cloth. Do not use plastic bags which trap moisture.</li>
              <li><strong>Moth Protection:</strong> Store with dried neem leaves, cedar balls, or lavender pouches to protect against moths. Never place naphthalene balls directly on the fabric.</li>
              <li><strong>Air it out:</strong> Periodically air your Pashmina in indirect sunlight to keep it fresh.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Karakul Caps</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Keep Away from Moisture:</strong> If your cap gets wet, let it air dry naturally at room temperature. Never use a heater or hair dryer.</li>
              <li><strong>Brushing:</strong> Use a soft-bristled brush gently to remove dust. Always brush in the direction of the fur.</li>
              <li><strong>Storage:</strong> Store in a cool, dry place inside a hat box to maintain its distinct shape. Avoid crushing it under heavy items.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Embroidered Goods (Sozni / Aari / Tilla)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Avoid Snags:</strong> Be careful when wearing jewelry or carrying bags with sharp edges that can pull the delicate threads.</li>
              <li><strong>Ironing:</strong> Always iron on the reverse side (the unembroidered side) using a low-heat setting. Avoid direct high-heat pressing.</li>
              <li><strong>Cleaning:</strong> Professional dry cleaning is recommended to prevent color bleeding of the embroidery threads.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
