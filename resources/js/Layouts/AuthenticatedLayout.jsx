import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import HorizontalNav from '@/Components/HorizontalNav';
import BottomNav from '@/Components/BottomNav';


export default function AuthenticatedLayout({ header, children }) {


    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Header />

            <div className="d-flex flex-grow-1 overflow-hidden flex-column flex-lg-row">
                <div className="d-none d-lg-block">
                    <Sidebar />
                </div>
                <HorizontalNav />
                <main className="flex-grow-1 overflow-auto p-3 p-md-4 mb-5 mb-sm-0">
                    {children}
                </main>
            </div>
            <Footer />
            <BottomNav />
        </div>
    );
}
