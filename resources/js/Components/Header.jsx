import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Header() {
    const user = usePage().props.auth.user;

    return (
        <header className="header d-flex align-items-center justify-content-between px-4 shadow-sm">
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <div className="header-logo-container">
                        <ApplicationLogo className="logo-white" />
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center gap-4">
                <span className="small fw-light">Olá, {user.name}</span>
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


    );
}