import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Щоденний космос',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={`${roboto.className} bg-[#1a1a2e] text-white min-h-screen`}>
        <main className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Щоденний космос</h1>
          {children}
        </main>
      </body>
    </html>
  );
}