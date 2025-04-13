import './globals.css';
import { Roboto } from 'next/font/google';

// Ініціалізація шрифту Roboto
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

// Метадані для сторінки
export const metadata = {
  title: 'Щоденний космос',
};

// Типізація пропсів (потрібно для TypeScript, можна видалити для JavaScript)
type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
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