export default function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-amber-500 mb-4 font-heading">Roots.ng</h3>
                    <p className="text-sm text-stone-400">
                        Reconnecting the African diaspora with their heritage, history, and identity.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Discover</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/explore" className="hover:text-amber-500">Ethnic Groups</a></li>
                        <li><a href="/towns" className="hover:text-amber-500">Towns & Villages</a></li>
                        <li><a href="/oriki" className="hover:text-amber-500">Oriki Library</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Community</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/forums" className="hover:text-amber-500">Forums</a></li>
                        <li><a href="/events" className="hover:text-amber-500">Events</a></li>
                        <li><a href="/contributors" className="hover:text-amber-500">Contribute</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/privacy" className="hover:text-amber-500">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-amber-500">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-stone-800 text-center text-sm">
                &copy; {new Date().getFullYear()} Roots.ng. All rights reserved.
            </div>
        </footer>
    );
}
