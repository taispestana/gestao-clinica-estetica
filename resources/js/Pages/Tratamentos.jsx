import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Tratamentos() {
    const stats = [
        { title: 'Total de Tratamentos', value: '0', icon: 'users', color: 'bg-teal-50 text-teal-700' },
        { title: 'Tratamentos Semanal', value: '0', icon: 'calendar', color: 'bg-emerald-50 text-emerald-700' },
        { title: 'Tratamentos Mensal', value: '0', icon: 'calendar-days', color: 'bg-emerald-50 text-emerald-700' },
    ];

    const appointments = [
        { name: 'Nome do Tratamento', duration: '0min', value: '0' },
        { name: 'Nome do Tratamento', duration: '0min', value: '0' },
        { name: 'Nome do Tratamento', duration: '0min', value: '0' },
    ];

    const treatments = [
        { name: 'Nome do Tratamento', percentage: 0 },
        { name: 'Nome do Tratamento', percentage: 0 },
        { name: 'Nome do Tratamento', percentage: 0 },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Tratamentos" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2" style={{ color: '#000000ff', fontFamily: 'serif' }}>Tratamentos</h2>
                <p className="text-secondary">Gerencie todos os tratamentos</p>
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
            <div className="d-flex align-items-center gap-5 mb-4">
                <button className="btn text-white" style={{ backgroundColor: '#C5A365' }}>+ Novo Tratamento</button>
            </div>
            <div className="row g-4">
                {/* Lista de Agendamentos */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                                <h3 className="h5 fw-bold text-dark mb-0">Nome</h3>
                                <h3 className="h5 fw-bold text-dark mb-0">Duração</h3>
                                <h3 className="h5 fw-bold text-dark mb-0">Valor</h3>
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
                                            <div className="fw-semibold text-dark">{appointment.duration}</div>
                                        </div>
                                        <div>
                                            <div className="fw-semibold text-dark">{appointment.value}</div>
                                        </div>
                                        <div className="text-end d-flex flex-column align-items-end">
                                            <button href="#" className="btn-gold">Editar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tratamentos Populares */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm p-4">
                            <h3 className="h5 fw-bold text-dark mb-4">Tratamentos Populares</h3>
                            <div className="d-flex flex-column gap-3">
                                {treatments.map((treatment, idx) => (
                                    <div key={idx}>
                                        <div className="d-flex justify-content-between small fw-medium text-secondary mb-1">
                                            <span>{treatment.name}</span>
                                            <span>{treatment.percentage}%</span>
                                        </div>
                                        <div className="progress" style={{ height: '8px' }}>
                                            <div
                                                className="progress-bar rounded-pill"
                                                role="progressbar"
                                                style={{ width: `${treatment.percentage}%`, backgroundColor: '#1F3A2F', opacity: 0.8 }}
                                            ></div>
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


