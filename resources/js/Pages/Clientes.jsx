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

            <div className="row g-2 g-md-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-4 col-md-4 px-1 px-md-3">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body p-2 p-md-4 text-start">
                                {/* Desktop/Tablet Icon */}
                                <div className="d-none d-md-flex align-items-start justify-content-between mb-3">
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
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Icon */}
                                <div className="d-md-none mb-2">
                                    <div className="p-2 rounded d-inline-block" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        <i className={`bi bi-${stat.icon === 'users' ? 'people' : (stat.icon === 'calendar' ? 'calendar-event' : 'calendar3')} fs-6`}></i>
                                    </div>
                                </div>
                                <div className="stat-card-value">{stat.value}</div>
                                <div className="stat-card-title d-block">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filtros e Ações */}
            <div className="row g-3 mb-4 align-items-center">
                <div className="col-12 col-md-auto order-1">
                    <button className="btn btn-gold px-4 py-2" style={{ borderRadius: '10px' }}>
                        <span className="me-2">+</span> Novo Cliente
                    </button>
                </div>
                <div className="col-12 col-md-4 order-2">
                    <div className="input-group">
                        <input type="text" className="form-control border-1 bg-white text-secondary py-2" placeholder="Pesquisar por nome..." style={{ borderRadius: '10px 0 0 10px', fontSize: '0.9rem', paddingLeft: '1rem !important' }} />
                        <button className="btn btn-filter-gold pb-2 border-start-0">
                            <i className="bi bi-funnel-fill"></i>
                        </button>
                    </div>
                </div>
                <div className="col-4 col-md-2 ms-md-auto order-3">
                    <select className="form-select border-1 bg-white text-secondary py-2" style={{ borderRadius: '10px' }}>
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>
                </div>
            </div>

            {/* Tabela de Clientes */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4">
                        {/* Cabeçalho da Tabela - Usando Grid para alinhar com o conteúdo */}
                        <div className="row px-3 mb-3 text-muted fw-semibold d-none d-md-flex">
                            <div className="col-4">Nome</div>
                            <div className="col-3 text-center">Contacto</div>
                            <div className="col-3 text-center">Status</div>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="card border-0 shadow-sm p-4 bg-white rounded-4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-12 mb-3 d-md-none">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <div className="fw-bold fs-5 text-dark">{appointment.name}</div>
                                                <div className="badge rounded-pill text-dark small fw-medium" style={{ backgroundColor: appointment.color }}>{appointment.status || 'Ativo'}</div>
                                            </div>
                                            <div className="text-secondary small">{appointment.contacto}</div>
                                        </div>

                                        {/* Desktop View Row */}
                                        <div className="d-none d-md-flex row align-items-center w-100 mx-0">
                                            <div className="col-md-4">
                                                <div className="fw-semibold text-dark">{appointment.name}</div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="text-secondary">{appointment.contacto}</div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <span className="badge rounded-pill text-dark" style={{ backgroundColor: appointment.color || 'var(--status-green)' }}>
                                                    {appointment.status || 'Ativo'}
                                                </span>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button className="btn btn-gold btn-sm px-2" style={{ borderRadius: '8px' }}>Ver Mais</button>
                                            </div>
                                        </div>
                                        {/* Mobile Button */}
                                        <div className="col-12 text-end d-md-none">
                                            <button className="btn btn-gold btn-sm px-4 py-2" style={{ borderRadius: '8px' }}>Ver Mais</button>
                                        </div>
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
