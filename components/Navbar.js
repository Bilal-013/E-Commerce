'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { GiFleurDeLys } from 'react-icons/gi';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart, mounted: cartMounted } = useCart();
  const { isDark, toggleTheme, mounted: themeMounted } = useTheme();

  const isHome = pathname === '/';
  const showSolidNav = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/',       label: 'Home'     },
    { href: '/shop',   label: 'Shop'     },
    { href: '/about',  label: 'About'    },
    { href: '/contact',label: 'Contact'  },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidNav
          ? 'bg-[#1a1410]/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(139,26,45,0.3)]'
          : 'bg-transparent'
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-[#8b1a2d] text-[#ffe082] text-center py-2 text-xs tracking-widest font-body uppercase">
        Free shipping on orders over PKR 40,000 &nbsp;|&nbsp; Authentic Kashmiri Craftsmanship
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <GiFleurDeLys className="text-white text-xl" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-urdu text-4xl font-bold text-[#ffe082] tracking-wide leading-none mb-1">
                کشمیری ورثہ
              </span>
              <p className="text-[10px] text-[#f5a623]/70 tracking-widest uppercase">
                A heritage of Craftsmanship
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className="relative font-body text-[#faf4e8]/80 hover:text-[#f5a623] text-sm tracking-wide uppercase font-medium transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5a623] group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="flex items-center justify-center w-9 h-9 rounded-full text-[#faf4e8]/70 hover:text-[#f5a623] hover:bg-[#f5a623]/10 transition-all duration-300"
            >
              {themeMounted && isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>

            {user?.role !== 'seller' && (
              <Link
                href={user ? "/cart" : "/login"}
                id="nav-cart"
                aria-label="Cart"
                className="relative flex w-9 h-9 items-center justify-center rounded-full text-[#faf4e8]/70 hover:text-[#f5a623] hover:bg-[#f5a623]/10 transition-all duration-300"
              >
                <FiShoppingCart className="text-lg" />
                {user && cartMounted && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8b1a2d] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href={`/${user.role}`}
                  className="px-4 py-2 rounded-full border border-[#f5a623]/40 text-[#f5a623] text-sm font-medium hover:bg-[#f5a623] hover:text-[#1a1410] transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-[#faf4e8]/70 hover:text-[#f5a623] hover:bg-[#f5a623]/10 transition-all duration-300"
                  aria-label="Logout"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                id="nav-login"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[#f5a623]/40 text-[#f5a623] text-sm font-medium hover:bg-[#f5a623] hover:text-[#1a1410] transition-all duration-300"
              >
                <FiUser className="text-sm" />
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              id="nav-mobile-menu"
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-[#faf4e8] hover:bg-[#f5a623]/10 transition-all duration-300"
            >
              {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#2d2218]/95 backdrop-blur-lg rounded-2xl border border-[#f5a623]/10 p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-[#faf4e8]/80 hover:text-[#f5a623] hover:bg-[#f5a623]/10 rounded-xl text-sm font-medium tracking-wide transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[#f5a623]/10 pt-2 mt-2">
              {user ? (
                <>
                  <Link
                    href={`/${user.role}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-[#f5a623] hover:bg-[#f5a623]/10 text-sm font-medium rounded-xl"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10 text-sm font-medium rounded-xl transition-all"
                  >
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-[#f5a623] text-sm font-medium"
                >
                  <FiUser /> Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
