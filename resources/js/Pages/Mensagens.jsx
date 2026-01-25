import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Mensagens() {
    const stats = [
        { title: 'Aniversariantes do Mês', value: '0', icon: 'users', color: 'var(--status-green)' },
        { title: 'Lembrete de Marcação', value: '0', icon: 'calendar-month', color: 'var(--status-green)' },
    ];

    const appointments = [
        { name: 'Nome do Cliente', contacto: '912 345 678', data: '15/05/1990' },
        { name: 'Nome do Cliente', contacto: '912 345 678', data: '20/05/1985' },
        { name: 'Nome do Cliente', contacto: '912 345 678', data: '22/05/1992' },
    ];



    const appointment = [
        { name: 'Limpeza de Pele Deep', duration: '60min', value: '150,00' },
        { name: 'Massagem Relaxante', duration: '45min', value: '120,00' },
        { name: 'Drenagem Linfática', duration: '90min', value: '200,00' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Mensagens" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2">Mensagens</h2>
                <p className="text-secondary">Gerencie todas as mensagens</p>
            </div>

            {/* Cards de Estatísticas */}
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

            {/* Tabela de Marcações */}
            <h2 className="h5 fw-bold text-dark mb-3 mt-5">Lembrar Marcação</h2>
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4">

                        {/* Cabeçalho da Tabela */}
                        <div className="row px-3 mb-3 text-muted fw-semibold d-none d-md-flex">
                            <div className="col-4">Nome</div>
                            <div className="col-3 text-center">Contacto</div>
                            <div className="col-3 text-center">Data</div>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="card border-0 shadow-sm p-4 bg-white rounded-4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-12 d-md-none">
                                            <div className="mb-1">
                                                <span className="text-secondary small">Nome: </span>
                                                <span className="fw-bold text-dark">{appointment.name}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="text-secondary small">Contacto: </span>
                                                <span className="text-dark small">{appointment.contacto}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <div>
                                                    <span className="text-secondary small">Data: </span>
                                                    <span className="fw-bold text-dark small">{appointment.data}</span>
                                                </div>
                                                <button className="btn btn-gold btn-sm px-xl-4" style={{ borderRadius: '8px' }}>Enviar Mensagem</button>
                                            </div>
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
                                                <span className="text-secondary">{appointment.data}</span>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button className="btn btn-gold btn-sm px-xl-4 py-2" style={{ borderRadius: '8px' }}>Enviar Mensagem</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela de Aniversariantes do Mês */}
            <h2 className="h5 fw-bold text-dark mb-3">Aniversariantes do Mês</h2>
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4">
                        {/* Cabeçalho da Tabela */}
                        <div className="row px-3 mb-3 text-muted fw-semibold d-none d-md-flex">
                            <div className="col-4">Nome</div>
                            <div className="col-3 text-center">Contacto</div>
                            <div className="col-3 text-center">Data</div>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="card border-0 shadow-sm p-4 bg-white rounded-4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-12 d-md-none">
                                            <div className="mb-1">
                                                <span className="text-secondary small">Nome: </span>
                                                <span className="fw-bold text-dark">{appointment.name}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="text-secondary small">Contacto: </span>
                                                <span className="text-dark small">{appointment.contacto}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <div>
                                                    <span className="text-secondary small">Data: </span>
                                                    <span className="fw-bold text-dark small">{appointment.data}</span>
                                                </div>
                                                <button className="btn btn-gold btn-sm px-xl-4 py-2" style={{ borderRadius: '8px' }}>Enviar Mensagem</button>
                                            </div>
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
                                                <span className="text-secondary">{appointment.data}</span>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button className="btn btn-gold btn-sm px-xl-4 py-2" style={{ borderRadius: '8px' }}>Enviar Mensagem</button>
                                            </div>
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



