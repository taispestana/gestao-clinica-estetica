import React from 'react';
import { Link, usePage } from '@inertiajs/react';
// Itens do menu
const BottomNav = () => {
    const { url } = usePage();
    const navItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: 'bi bi-house-door-fill' },
        { name: 'Clientes', href: route('clientes'), icon: 'bi bi-people-fill' },
        { name: 'Agendamentos', href: route('agendamentos'), icon: 'bi bi-calendar-event-fill' },
        { name: 'Tratamentos', href: route('tratamentos'), icon: 'bi bi-flower1' },
        { name: 'Estoque', href: route('estoque'), icon: 'bi bi-box-seam-fill' },
        { name: 'Mensagens', href: route('mensagens'), icon: 'bi bi-whatsapp' },
    ];

    const isActive = (href) => {
        try {
            const currentPath = url.split('?')[0];
            const itemPath = new URL(href).pathname;

            // Para o painel, verifica se há uma correspondência exata
            if (itemPath === '/dashboard' || itemPath === '/') {
                return currentPath === itemPath;
            }

            // Para outras rotas (como /clientes), verifica se começa com o caminho do item
            return currentPath.startsWith(itemPath);
        } catch (e) {
            return false;
        }
    };
// Renderização do menu
    return (
        <nav className="d-lg-none fixed-bottom bg-white border-top shadow-lg" style={{ zIndex: 1030 }}>
            <div className="d-flex justify-content-around align-items-center py-2 px-1">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-decoration-none d-flex flex-column align-items-center flex-grow-1"
                        style={{ color: isActive(item.href) ? 'var(--white)' : '#6c757d' }}
                    >
                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center mb-1"
                            style={{
                                width: '45px',
                                height: '35px',
                                backgroundColor: isActive(item.href) ? 'var(--primary-button)' : 'transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            <i className={`${item.icon} fs-5`}></i>
                        </div>
                        <span style={{
                            fontSize: '10px',
                            fontWeight: isActive(item.href) ? '600' : '400',
                            color: isActive(item.href) ? 'var(--primary-button)' : '#6c757d'
                        }}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
