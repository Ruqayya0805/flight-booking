
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-br from-red-500 to-red-500 p-4 opacity-90">
            <div className="flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link href="/">
                        <img src="/assets/logo.png" alt="Logo" className="h-16" /> {/* Replace with your logo */}
                    </Link>
                </div>
                <div>
                    <Link href="/about" className="text-white text-2xl hover:underline">About Us</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
