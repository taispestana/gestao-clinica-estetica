import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
    //     <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
    //         <div>
    //             <Link href="/">
    //                 <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
    //             </Link>
    //         </div>

    //         <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
    //             {children}
    //         </div>
            
    //     </div>
        
    // );
    /* Container principal: Ocupa a altura toda, centraliza conteúdo e define fundo cinza claro */
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100  py-4">
            
            

            {/* Card Branco que envolve o formulário (children) */}
            <div 
                className="w-100 rounded-3 p-4 overflow-hidden" 
                style={{ maxWidth: '450px' }}
            >
                {children}
            </div>
            
        </div>
    );
 
}
