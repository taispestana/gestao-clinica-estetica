import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">

                <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 py-4">
                    {/* Card Branco que envolve o formulário (children) */}
                    <div
                        className="w-100 rounded-3 p-4"
                        style={{ maxWidth: '450px' }}
                    >
                        {children}
                    </div>
                </div>

                <div className="py-3">
                    <Footer />
                </div>
            </div>

        </>
    );

}
