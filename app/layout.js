import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: {
    default: 'Kashmir Luxe — Authentic Kashmiri Heritage Crafts',
    template: '%s | Kashmir Luxe',
  },
  description:
    'Discover authentic Pashmina shawls, Karakul caps, and intricate Kashmiri embroidery. Handcrafted by master artisans in the Kashmir Valley.',
  keywords: ['Pashmina', 'Kashmiri shawls', 'Karakul', 'Kashmir embroidery', 'handcrafted'],
  openGraph: {
    siteName: 'Kashmir Luxe',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-[#fdfaf5]">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
