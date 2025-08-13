import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingIcon() {
  return (
    <>
      <Link
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[1000] bottom-6 right-6 bg-green-600  text-white rounded-full shadow-lg p-4 transition-colors duration-200 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </Link>
    </>
  );
}
