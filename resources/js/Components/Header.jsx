import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
 
export default function Header() {
    const user = usePage().props.auth.user;
 
    return (
        <header className="header d-flex align-items-center justify-content-between px-4 shadow-sm">
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <div className="header-logo-container">
                        <ApplicationLogo className="w-100 h-100 fill-current text-white" />
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center gap-4">
                <span className="small fw-light d-none d-sm-block">Olá, {user.name}</span>
                <Link
                    method="post"
                    href={route('logout')}
                    as="button"
                    className="btn btn-logout d-flex align-items-center gap-2 border-0 text-white"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="icon-logout"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span>Sair</span>
                    
                </Link>
            </div>
        </header>

        // <header className="flex h-20 items-center justify-between bg-[#1F3A2F] px-8 text-white shadow-md">
        //     <div className="flex items-center gap-4">
        //         {/* Logo Placeholder */}
        //         <div className="flex items-center gap-2">
        //             <div className="h-10 w-10">
        //                 <ApplicationLogo className="h-10 w-10 fill-current text-white" />
        //             </div>
        //             <div className="flex flex-col">
        //                 <span className="text-xl font-serif tracking-wide">Templo de Gaya</span>
        //                 <span className="text-xs uppercase tracking-widest text-gray-300">Aveiro</span>
        //             </div>
        //         </div>
        //     </div>
 
        //     <div className="flex items-center gap-6">
        //         <span className="text-sm font-light">Olá, {user.name}</span>
        //         <Link
        //             method="post"
        //             href={route('logout')}
        //             as="button"
        //             className="flex items-center gap-2 rounded bg-[#C5A365] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#b08e55]"
        //         >
        //             <span>Sair</span>
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        //                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        //             </svg>
        //         </Link>
        //     </div>
        // </header>
    );
}