import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Clientes() {
    const stats = [
        { title: 'Clientes Ativos', value: '0', icon: 'users', color: 'var(--status-green)' },
        { title: 'Agendamentos Hoje', value: '0', icon: 'calendar', color: 'var(--status-green)' },
        { title: 'Agendamento Mensal', value: '0', icon: 'calendar-month', color: 'var(--status-green)' },
    ];

    const appointments = [
        { name: 'Nome do Cliente', contacto: '912 345 678', status: 'Ativo', color: 'var(--status-green)' },
        { name: 'Nome do Cliente', contacto: '912 345 678', status: 'Pendente', color: 'var(--status-yellow)' },
        { name: 'Nome do Cliente', contacto: '912 345 678', status: 'Inativo', color: 'var(--status-red)' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Clientes" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2">Clientes</h2>
                <p className="text-secondary">Gerencie todos os clientes</p>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                            </svg>
                                        )}
                                        {stat.icon === 'calendar' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zm-4.5-6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                            </svg>
                                        )}
                                        {stat.icon === 'calendar-month' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className="h3 font-weight-bold mb-1" style={{ color: 'var(--main-text)' }}>{stat.value}</div>
                                <div className="text-muted small fw-medium">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filtros e Ações */}
            <div className="d-flex align-items-center gap-5 mb-4">
                <button className="btn text-white px-4" style={{ backgroundColor: 'var(--primary-button)' }}>+ Novo Cliente</button>

                <div className="flex-grow-1" style={{ maxWidth: '300px' }}>
                    <select className="form-select bg-light border-1 text-muted">
                        <option defaultValue>Pesquisar por nome</option>
                    </select>
                </div>

                <div style={{ width: '150px' }}>
                    <select className="form-select bg-light border-1 text-muted">
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="pendente">Pendente</option>
                    </select>
                </div>
            </div>

            {/* Tabela de Clientes */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4">
                        {/* Cabeçalho da Tabela - Usando Grid para alinhar com o conteúdo */}
                        <div className="row px-3 mb-3 text-dark fw-bold">
                            <div className="col-4">Nome</div>
                            <div className="col-3 text-center">Contacto</div>
                            <div className="col-3 text-center">Status</div>

                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="row align-items-center p-3 bg-light rounded mx-0 transition hover-shadow">
                                    <div className="col-4">
                                        <div className="fw-semibold text-dark">{appointment.name}</div>
                                    </div>

                                    {/* Centralizado */}
                                    <div className="col-3 text-center">
                                        <div className="text-secondary">{appointment.contacto}</div>
                                    </div>

                                    {/* Centralizado */}
                                    <div className="col-3 text-center">
                                        <span className="badge rounded-pill text-dark" style={{
                                            backgroundColor: appointment.color,
                                            fontSize: '0.7rem',
                                            padding: '6px 12px'
                                        }}>
                                            {appointment.status}
                                        </span>
                                    </div>

                                    <div className="col-2 text-end">
                                        <button className="btn btn-sm text-white px-3" style={{ backgroundColor: 'var(--primary-button)' }}>
                                            Ver Mais
                                        </button>
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
