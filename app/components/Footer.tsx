export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm mt-auto z-50">
            <div className="max-w mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        
            {/* Left: Copyright */}
                <p>© {new Date().getFullYear()} Vivacity. All rights reserved.</p>

            {/* Right: Links */}
                <nav className="flex gap-6 ">
                    <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
                    <a href="/about" className="hover:text-white transition-colors">About Us</a>
                    <a href="https://discord.gg/NFUA7PhAcY" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Join Our Discord</a>
                </nav>
            </div>
        </footer>
    )
}