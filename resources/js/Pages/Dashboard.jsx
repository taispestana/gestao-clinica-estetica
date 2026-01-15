import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


export default function Dashboard() {
    const stats = [
        { title: 'Clientes Ativos', value: '0', icon: 'users', color: 'var(--status-green)' },
        { title: 'Agendamentos Hoje', value: '0', icon: 'calendar', color: 'var(--status-green)' },
        { title: 'Agendamento Mensal', value: '0', icon: 'calendar-days', color: 'var(--status-green)' },
    ];

    const appointments = [
        { name: 'Ana Maria', service: 'Limpeza de Pele', time: '00:00', status: 'CONFIRMADO', color: 'var(--status-green)' },
        { name: 'Ana Maria', service: 'Massagem Terapêutica', time: '00:00', status: 'PENDENTE', color: 'var(--status-yellow)' },
        { name: 'Ana Maria', service: 'Preenchimento', time: '00:00', status: 'CANCELADO', color: 'var(--status-red)' },
    ];

    const treatments = [
        { name: 'Limpeza de Pele', percentage: 75 },
        { name: 'Massagem Terapêutica', percentage: 40 },
        { name: 'Preenchimento', percentage: 25 },

    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2"
                >Dashboard</h2>
                <p className="text-secondary">Visão geral da sua clínica de estética</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        {stat.icon === 'users' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                            </svg>
                                        )}
                                        {stat.icon === 'calendar' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zm-4.5-6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                            </svg>
                                        )}
                                        {stat.icon === 'calendar-days' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zm-4.5-6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className="h3 font-weight-bold mb-1" style={{ color: 'var(--main-text' }}>{stat.value}</div>
                                <div className="text-muted small fw-medium">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                {/* Lista de Agendamentos */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="h5 fw-bold text-dark mb-0">Agendamentos de Hoje</h3>
                            <a href="#" className="small fw-medium text-secondary text-decoration-none">Ver todos</a>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="d-flex align-items-center justify-content-between p-3 bg-light rounded hover-shadow transition">
                                    <div>
                                        <div className="fw-semibold text-dark">{appointment.name}</div>
                                        <div className="small text-muted">{appointment.service}</div>
                                    </div>
                                    <div className="text-end d-flex flex-column align-items-end">
                                        <span className="small fw-bold text-secondary mb-1">{appointment.time}</span>
                                        <span className="badge rounded-pill text-dark" style={{
                                            backgroundColor: appointment.color,
                                            fontSize: '0.65rem',
                                            fontWeight: '600'
                                        }}
                                        >
                                            {appointment.status}
                                        </span>
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
                                    <div className="progress" style={{ height: '8px', backgroundColor: 'var(--main-green-light)' }}>
                                        <div
                                            className="progress-bar rounded-pill"
                                            role="progressbar"
                                            style={{ width: `${treatment.percentage}%`, backgroundColor: 'var(--dark-green)', opacity: 0.8 }}
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


