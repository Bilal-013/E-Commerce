'use client';

import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { GiFleurDeLys } from 'react-icons/gi';

export default function Footer() {
  return (
    <footer className="bg-[#1a1410] text-[#faf4e8]/70 border-t border-[#f5a623]/10">

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-lg">
              <GiFleurDeLys className="text-white text-xl" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-[#ffe082]">Kashmir Luxe</span>
              <p className="text-[10px] text-[#f5a623]/60 tracking-widest uppercase -mt-0.5">Heritage Crafts</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#faf4e8]/50">
            Bringing the timeless artistry of the Kashmir Valley to the world. Every thread tells a story of centuries-old craftsmanship.
          </p>
          {/* Social Links */}
          <div className="flex gap-3 pt-2">
            {[
              { icon: FiInstagram, href: 'https://www.instagram.com/rang_rooh_resham?igsh=ZGViN3VsMTRjMWpn&utm_source=qr', label: 'Instagram' },
              { icon: FiFacebook,  href: '#', label: 'Facebook'  },
              { icon: FiTwitter,   href: '#', label: 'Twitter'   },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[#f5a623]/20 flex items-center justify-center text-[#f5a623]/60 hover:text-[#f5a623] hover:border-[#f5a623] hover:bg-[#f5a623]/10 transition-all duration-300"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-display text-[#ffe082] text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { href: '/shop',    label: 'All Products'       },
              { href: '/shop?category=pashmina',  label: 'Pashmina Shawls'   },
              { href: '/shop?category=karakul',   label: 'Karakul Caps'      },
              { href: '/shop?category=embroidery',label: 'Kashmiri Embroidery'},
              { href: '/contact', label: 'Contact Us'         },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm hover:text-[#f5a623] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#f5a623]/40 group-hover:bg-[#f5a623] transition-colors duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h3 className="font-display text-[#ffe082] text-lg font-semibold">Customer Care</h3>
          <ul className="space-y-2">
            {[
              { href: '/faq',      label: 'FAQ'              },
              { href: '/shipping', label: 'Shipping Policy'  },
              { href: '/returns',  label: 'Returns & Refunds'},
              { href: '/care',     label: 'Care Instructions'},
              { href: '/privacy',  label: 'Privacy Policy'   },
              { href: '/terms',    label: 'Terms of Service' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm hover:text-[#f5a623] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#f5a623]/40 group-hover:bg-[#f5a623] transition-colors duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-display text-[#ffe082] text-lg font-semibold">Get In Touch</h3>
          <div className="space-y-3">
            <a href="mailto:F2024-0766@bnu.edu.pk" className="flex items-start gap-3 group">
              <FiMail className="mt-0.5 text-[#f5a623] shrink-0" />
              <span className="text-sm group-hover:text-[#f5a623] transition-colors">F2024-0766@bnu.edu.pk</span>
            </a>
            <a href="tel:+923213320971" className="flex items-start gap-3 group">
              <FiPhone className="mt-0.5 text-[#f5a623] shrink-0" />
              <span className="text-sm group-hover:text-[#f5a623] transition-colors">+92 321 3320971</span>
            </a>
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 text-[#f5a623] shrink-0" />
              <span className="text-sm">Residency Road, Srinagar,<br />Jammu & Kashmir — 190001</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="pt-2">
            <p className="text-xs text-[#f5a623]/70 uppercase tracking-wider mb-2">Stay updated</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#2d2218] border border-[#f5a623]/20 rounded-lg px-3 py-2 text-sm text-[#faf4e8] placeholder:text-[#faf4e8]/30 focus:outline-none focus:border-[#f5a623]/60 transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#8b1a2d] hover:bg-[#f5a623] text-white hover:text-[#1a1410] rounded-lg text-sm font-medium transition-all duration-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#f5a623]/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#faf4e8]/30">
            © {new Date().getFullYear()} Kashmir Luxe. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#faf4e8]/30">Crafted with</span>
            <span className="text-[#8b1a2d]">♥</span>
            <span className="text-xs text-[#faf4e8]/30">for authentic Kashmiri artisans</span>
          </div>
          <div className="flex items-center gap-3 text-[#faf4e8]/30">
            {['Visa', 'Mastercard', 'UPI', 'PayTM'].map((p) => (
              <span key={p} className="text-xs border border-[#faf4e8]/10 px-2 py-0.5 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
