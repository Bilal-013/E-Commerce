import Link from 'next/link';
import { FiArrowRight, FiStar, FiShield, FiTruck, FiAward } from 'react-icons/fi';
import { GiWool, GiNeedleJaws, GiCrown } from 'react-icons/gi';

/* ── Data ── */
const categories = [
  {
    id: 'pashmina',
    title: 'Pashmina Shawls',
    subtitle: 'Woven from the finest Changthangi goat wool',
    emoji: '🧣',
    Icon: GiWool,
    description:
      'Pure Pashmina, hand-spun and hand-woven in the Himalayan tradition. Each shawl takes 72+ hours of artisan labour.',
    badge: 'Best Seller',
    priceFrom: 'PKR 8,500',
    color: '#8b1a2d',
  },
  {
    id: 'karakul',
    title: 'Karakul Caps',
    subtitle: 'Symbol of Kashmiri royalty for centuries',
    emoji: '🎩',
    Icon: GiCrown,
    description:
      'The iconic Karakul — worn by rulers and statesmen alike. Crafted from premium lambskin with intricate finishing.',
    badge: 'Heritage Piece',
    priceFrom: 'PKR 4,200',
    color: '#3e0611',
  },
  {
    id: 'embroidery',
    title: 'Kashmiri Embroidery',
    subtitle: 'Sozni & Aari needlework masterpieces',
    emoji: '🪡',
    Icon: GiNeedleJaws,
    description:
      'Delicate Sozni and bold Aari embroidery on silk and wool. Each piece carries the legacy of Kashmir\'s master craftsmen.',
    badge: 'Artisan Pick',
    priceFrom: 'PKR 3,800',
    color: '#7a4800',
  },
];

import { staticDummyProducts } from '@/lib/dummyData';

const testimonials = [
  {
    name: 'Priya Mehta', location: 'Mumbai',
    quote: 'The Pashmina shawl I ordered is absolutely breathtaking. The softness is unlike anything I\'ve touched before. True heirloom quality.',
    stars: 5,
  },
  {
    name: 'James Crawford', location: 'London',
    quote: 'Ordered the Karakul cap as a gift. The craftsmanship is extraordinary — my father was speechless. Excellent packaging and delivery too.',
    stars: 5,
  },
  {
    name: 'Aisha Rahman', location: 'Dubai',
    quote: 'The Sozni embroidery work on my shawl is stunning. Each time I wear it, someone asks about it. Proud to own authentic Kashmiri art.',
    stars: 5,
  },
];

const trustBadges = [
  { Icon: FiShield, title: '100% Authentic',    desc: 'GI-tagged and certified' },
  { Icon: FiTruck,  title: 'Free Shipping',      desc: 'On orders above PKR 5,000'  },
  { Icon: FiAward,  title: 'Master Artisans',    desc: '3rd generation craftsmen'  },
  { Icon: FiStar,   title: '4.9★ Rating',        desc: 'From 500+ happy customers' },
];

/* ── Component ── */
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-hero-pattern">
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#8b1a2d]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#f5a623]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
          {/* Overline badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f5a623]/30 bg-[#f5a623]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" />
            <span className="text-[#f5a623] text-xs tracking-widest uppercase font-medium">
              Est. in the Valley of Kashmir
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display animate-fade-up-delay-1 text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="text-[#faf4e8]">Art of</span>
            <br />
            <span className="text-shimmer">Kashmir</span>
          </h1>

          <p className="animate-fade-up-delay-2 font-body text-[#faf4e8]/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            We connect buyers directly with authentic Kashmiri artisans and producers, eliminating middlemen to ensure fair prices, genuine products, and better opportunities for local craftsmen. Our mission is to make Kashmiri products more accessible while empowering the people who create them.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              id="hero-shop-now"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-saffron-gradient text-[#1a1410] font-semibold rounded-full hover:shadow-[0_8px_30px_rgba(245,166,35,0.4)] transition-all duration-300 hover:scale-105"
            >
              Explore Collection
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/about"
              id="hero-our-story"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#faf4e8]/20 text-[#faf4e8] hover:border-[#f5a623]/50 hover:bg-[#f5a623]/10 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up-delay-4 grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-10 border-t border-[#faf4e8]/10">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '50+',  label: 'Artisan Families' },
              { value: '100%', label: 'Authentic GI' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#f5a623]">{value}</div>
                <div className="text-xs text-[#faf4e8]/40 mt-1 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#f5a623]/40 flex items-start justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-[#f5a623]/60 animate-float" />
          </div>
        </div>
      </section>

      {/* ══════════════ TRUST BADGES ══════════════ */}
      <section className="bg-[#8b1a2d] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Icon className="text-[#ffe082]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#ffe082]">{title}</p>
                <p className="text-xs text-white/60">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ CATEGORY SHOWCASE ══════════════ */}
      <section className="bg-[#fdfaf5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#f5a623] text-sm tracking-widest uppercase font-medium mb-3">Our Collections</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1410] mb-4">
              Treasures of Kashmir
            </h2>
            <div className="ornament-divider max-w-xs mx-auto">
              <span className="text-[#f5a623] text-lg">❋</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                id={`category-${cat.id}`}
                className="card-hover group relative rounded-2xl overflow-hidden border border-[#eddcb8] bg-white"
              >
                {/* Color block top */}
                <div
                  className="relative h-48 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${cat.color}ee, ${cat.color}99)` }}
                >
                  <cat.Icon className="text-white/20 text-[8rem] absolute" />
                  <span className="text-7xl relative z-10 animate-float">{cat.emoji}</span>
                  {/* Badge */}
                  <span className="absolute top-4 right-4 bg-[#f5a623] text-[#1a1410] text-xs font-bold px-3 py-1 rounded-full">
                    {cat.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#1a1410] mb-1">{cat.title}</h3>
                  <p className="text-[#f5a623] text-xs uppercase tracking-wider mb-3">{cat.subtitle}</p>
                  <p className="text-[#3f3024]/70 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1a1410] font-semibold">From {cat.priceFrom}</span>
                    <span className="flex items-center gap-1 text-[#8b1a2d] text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Shop Now <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURED PRODUCTS ══════════════ */}
      <section className="bg-[#1a1410] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#f5a623] text-sm tracking-widest uppercase font-medium mb-3">Handpicked for You</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#ffe082] mb-4">
              Featured Pieces
            </h2>
            <div className="ornament-divider max-w-xs mx-auto">
              <span className="text-[#f5a623] text-lg">❋</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticDummyProducts.map((product) => (
                <div
                  key={product._id}
id={`product-${product._id}`}
                  className="card-hover group bg-[#2d2218] rounded-2xl overflow-hidden border border-[#f5a623]/10 hover:border-[#f5a623]/30"
                >
                  <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gray-900 border-b border-[#f5a623]/10">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-[#8b1a2d] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {product.tag}
                      </span>
                    )}
                    <button
                      aria-label={`Quick add ${product.title} to cart`}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#f5a623] text-[#1a1410] text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap"
                    >
                      + Add to Cart
                    </button>
                  </div>
  
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-[#faf4e8] text-sm mb-1 line-clamp-2">
                      {product.title}
                    </h3>
  
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} className="text-[#f5a623] text-xs fill-current" style={{ fill: '#f5a623' }} />
                      ))}
                      <span className="text-[#faf4e8]/40 text-xs ml-1">(24)</span>
                    </div>
  
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#f5a623] font-bold">PKR {product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              id="featured-view-all"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#f5a623]/40 text-[#f5a623] hover:bg-[#f5a623] hover:text-[#1a1410] font-semibold transition-all duration-300 group"
            >
              View All Products
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ CRAFTSMANSHIP STORY ══════════════ */}
      <section className="bg-[#fdfaf5] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: decorative block */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-kashmiri-gradient overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <GiNeedleJaws className="text-[#f5a623] text-8xl mx-auto mb-4 opacity-80" />
                <p className="font-display text-white/60 text-lg italic px-8">
                  Every stitch is a prayer, every thread a poem
                </p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#f5a623] text-[#1a1410] rounded-2xl p-4 shadow-xl">
              <div className="font-display text-3xl font-bold">300+</div>
              <div className="text-xs font-semibold uppercase tracking-wide">Years of Tradition</div>
            </div>
          </div>

          {/* Right: text */}
          <div className="space-y-6">
            <p className="text-[#f5a623] text-sm tracking-widest uppercase font-medium">Our Heritage</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1410] leading-tight">
              The Art of
              <span className="block text-[#8b1a2d]">Kashmir Valley</span>
            </h2>
            <p className="text-[#3f3024]/70 text-base leading-relaxed">
              For over three centuries, Kashmiri artisans have passed down the secrets of Pashmina weaving, 
              Sozni embroidery, and Karakul crafting through generations. Every piece we offer is a living 
              testament to this unbroken chain of mastery.
            </p>
            <p className="text-[#3f3024]/70 text-base leading-relaxed">
              We work directly with artisan families in Srinagar, Anantnag, and the Changthang plateau — 
              ensuring fair wages, preserving techniques, and bringing these treasures to discerning collectors worldwide.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { label: 'Artisan Families', value: '50+' },
                { label: 'Products',         value: '200+' },
                { label: 'Countries Served', value: '15+'  },
                { label: 'GI Certified',     value: '100%' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#faf4e8] rounded-xl p-4 border border-[#eddcb8]">
                  <div className="font-display text-2xl font-bold text-[#8b1a2d]">{value}</div>
                  <div className="text-xs text-[#3f3024]/60 mt-1">{label}</div>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              id="story-learn-more"
              className="inline-flex items-center gap-2 text-[#8b1a2d] font-semibold hover:gap-3 transition-all duration-300 group"
            >
              Learn More About Us <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="bg-[#2d2218] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#f5a623] text-sm tracking-widest uppercase font-medium mb-3">What Customers Say</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#ffe082]">
              Voices of Delight
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, quote, stars }) => (
              <div
                key={name}
                className="bg-[#1a1410] rounded-2xl p-6 border border-[#f5a623]/10 hover:border-[#f5a623]/30 transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <FiStar key={i} className="text-[#f5a623] text-sm" style={{ fill: '#f5a623' }} />
                  ))}
                </div>
                <p className="text-[#faf4e8]/70 text-sm leading-relaxed mb-6 italic">{quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8b1a2d] flex items-center justify-center font-display text-[#ffe082] font-bold text-lg">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-[#faf4e8] font-semibold text-sm">{name}</p>
                    <p className="text-[#faf4e8]/40 text-xs">{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="bg-kashmiri-gradient py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f5a623 0, #f5a623 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <GiCrown className="text-[#f5a623]/40 text-6xl mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#ffe082] mb-4">
            Own a Piece of Kashmir
          </h2>
          <p className="text-[#faf4e8]/70 text-lg leading-relaxed mb-8">
            Each purchase supports artisan families and helps preserve centuries-old craft traditions 
            for future generations.
          </p>
          <Link
            href="/shop"
            id="cta-shop-now"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#f5a623] text-[#1a1410] font-bold rounded-full hover:bg-[#ffe082] hover:shadow-[0_8px_30px_rgba(245,166,35,0.5)] transition-all duration-300 hover:scale-105 text-lg"
          >
            Shop the Collection <FiArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}
