import Link from 'next/link';
import { GiWool, GiNeedleJaws } from 'react-icons/gi';

export const metadata = {
  title: 'About Us | Rang, Resham aur Rooh',
  description: 'Our story and mission to preserve the art of Kashmir.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf4e8] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4a2e24] font-heading font-display">
            About Rang, Resham & Rooh
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the heritage, the craftsmanship, and the soul of Kashmir woven into every thread.
          </p>
        </div>

        {/* Story Section */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#f5a623]/10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#8b1a2d] mb-6 font-display">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            <p>
              Born from a deep love for the breathtaking valleys of Kashmir, <strong>Rang, Resham & Rooh</strong> is a tribute to the timeless artistry that has flourished in the region for centuries. 
            </p>
            <p>
              &quot;Rang&quot; (Color), &quot;Resham&quot; (Silk), and &quot;Rooh&quot; (Soul)—these three elements form the essence of everything we create. We believe that a true masterpiece is not just about the finest materials, but the passion and spirit infused into it by the artisan.
            </p>
            <p>
              For generations, the master craftsmen of Srinagar and beyond have been spinning magic out of raw Pashmina and adorning it with meticulous Sozni and Aari embroidery. We work directly with these artisans, cutting out the middlemen, to ensure that they receive the recognition and reward they truly deserve.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#4a2e24] text-[#faf4e8] rounded-2xl p-8 md:p-10 flex flex-col justify-center shadow-lg">
            <GiWool className="text-[#f5a623] text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-4 font-display">Our Promise</h3>
            <p className="text-[#faf4e8]/80 leading-relaxed">
              We pledge to deliver 100% authentic, GI-tagged quality products. We source ethically, ensuring every piece you purchase preserves a stitch of our ancient heritage.
            </p>
          </div>
          <div className="bg-[#8b1a2d] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-center shadow-lg">
            <GiNeedleJaws className="text-[#f5a623] text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-4 font-display">The Art</h3>
            <p className="text-white/80 leading-relaxed">
              It can take anywhere from a few weeks to several years to complete a single hand-embroidered shawl. When you drape our creations, you are enveloped in a labor of pure love.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/shop" 
            className="inline-block bg-[#f5a623] hover:bg-[#d48c1a] text-[#1a1410] font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Explore Our Collection
          </Link>
        </div>

      </div>
    </div>
  );
}