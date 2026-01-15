import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Mensagens() {
    const stats = [
        { title: 'Aniversariantes do Mês', value: '0', icon: 'users', color: 'bg-teal-50 text-teal-700' },
        { title: 'Lembrete de Marcação', value: '0', icon: 'calendar', color: 'bg-emerald-50 text-emerald-700' },
    ];

    const appointments = [
        { name: 'Nome do Cliente', contacto: 'contacto', data: '00/00/0000' },
        { name: 'Nome do Cliente', contacto: 'contacto', data: '00/00/0000' },
        { name: 'Nome do Cliente', contacto: 'contacto', data: '00/00/0000' },
    ];


    return (
        <AuthenticatedLayout>
            <Head title="Mensagens" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2" style={{ color: '#000000ff', fontFamily: 'serif' }}>Mensagens</h2>
                <p className="text-secondary">Gerencie todas as mensagens</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: '#F0FDF4' }}>
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: '#D1E7DD', color: '#1F3A2F' }}>
                                        {stat.icon === 'users' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                            </svg>
                                        )}
                                        {stat.icon === 'calendar' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0117.25 3v1.5h1.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-13.5A1.125 1.125 0 014.5 15.375V5.625c0-.621.504-1.125 1.125-1.125h1.375V3a.75.75 0 01.75-.75zM4.5 12a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25A.75.75 0 014.5 12zM5.25 16.5a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {stat.icon === 'calendar-days' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0117.25 3v1.5h1.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-13.5A1.125 1.125 0 014.5 15.375V5.625c0-.621.504-1.125 1.125-1.125h1.375V3a.75.75 0 01.75-.75zM4.5 12a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25A.75.75 0 014.5 12z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className="h3 font-weight-bold mb-1" style={{ color: '#1F3A2F' }}>{stat.value}</div>
                                <div className="text-muted small fw-medium">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                {/* Lista de Aniversariantes */}
                <h2 className="h5 fw-bold text-dark mb-0">Aniversariantes do Mês</h2>
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="h5 fw-bold text-dark mb-0">Nome</h3>
                            <h3 className="h5 fw-bold text-dark mb-0">Contacto</h3>
                            <h3 className="h5 fw-bold text-dark mb-0">Data</h3>
                            <h3 className="h5 fw-bold text-dark mb-0"></h3>
                            <h3 className="h5 fw-bold text-dark mb-0"></h3>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="d-flex align-items-center justify-content-between p-3 bg-light rounded hover-shadow transition">
                                    <div>
                                        <div className="fw-semibold text-dark">{appointment.name}</div>
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-dark">{appointment.contacto}</div>
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-dark">{appointment.data}</div>
                                    </div>
                                    <div className="text-end d-flex flex-column align-items-end">
                                        <button href="#" className="btn-gold">Enviar Mensagem</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row g-4">
                {/* Lista de marcacoes */}
                <h2 className="h5 fw-bold text-dark mb-0">Lembrar Marcação</h2>
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="h5 fw-bold text-dark mb-0">Nome</h3>
                            <h3 className="h5 fw-bold text-dark mb-0">Contacto</h3>
                            <h3 className="h5 fw-bold text-dark mb-0">Data</h3>
                            <h3 className="h5 fw-bold text-dark mb-0"></h3>
                            <h3 className="h5 fw-bold text-dark mb-0"></h3>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="d-flex align-items-center justify-content-between p-3 bg-light rounded hover-shadow transition">
                                    <div>
                                        <div className="fw-semibold text-dark">{appointment.name}</div>
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-dark">{appointment.contacto}</div>
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-dark">{appointment.data}</div>
                                    </div>
                                    <div className="text-end d-flex flex-column align-items-end">
                                        <button href="#" className="btn-gold">Enviar Mensagem</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
