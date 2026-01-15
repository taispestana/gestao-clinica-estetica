import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
    <>
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100  py-4">
            
            

            {/* Card Branco que envolve o formulário (children) */}
            <div 
                className="w-100 rounded-3 p-4 " 
                style={{ maxWidth: '450px' }}
            >
                {children}
            </div>
            
        </div>
       
    </>
    );
 
}
