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
 
    return (
        <AuthenticatedLayout>
            <Head title="Mensagens" />
 
            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2">Mensagens</h2>
                <p className="text-secondary">Gerencie todas as mensagens</p>
            </div>
 
            {/* Cards de Estatísticas */}
            <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: '#F0FDF4' }}>
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: '#D1E7DD', color: '#1F3A2F' }}>
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
                                <div className="h3 font-weight-bold mb-1" style={{ color: '#1F3A2F' }}>{stat.value}</div>
                                <div className="text-muted small fw-medium">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
 
            {/* Seção Aniversariantes */}
            <div className="mb-5">
                <h2 className="h5 fw-bold text-dark mb-3">Aniversariantes do Mês</h2>
                <div className="row">
                    <div className="col-lg-10">
                        <div className="card border-0 shadow-sm p-4">
                            {/* Cabeçalho da Tabela */}
                            <div className="row align-items-center mb-3 px-3">
                                <div className="col-4"><h3 className="h6 fw-bold text-muted mb-0">Nome</h3></div>
                                <div className="col-3 text-center"><h3 className="h6 fw-bold text-muted mb-0">Contacto</h3></div>
                                <div className="col-2 text-center"><h3 className="h6 fw-bold text-muted mb-0">Data</h3></div>
                                <div className="col-3"></div>
                            </div>
 
                            {/* Conteúdo da Tabela */}
                            <div className="d-flex flex-column gap-2">
                                {appointments.map((appointment, idx) => (
                                    <div key={idx} className="row align-items-center p-3 bg-light rounded mx-0 transition hover-shadow border-0">
                                        <div className="col-4">
                                            <div className="fw-semibold text-dark">{appointment.name}</div>
                                        </div>
                                        <div className="col-3 text-center">
                                            <div className="text-secondary">{appointment.contacto}</div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <div className="text-secondary">{appointment.data}</div>
                                        </div>
                                        <div className="col-3 text-end">
                                            <button className="btn btn-sm text-white px-3" style={{ backgroundColor: 'var(--primary-button)' }}>
                                                Enviar Mensagem
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            {/* Seção Lembrar Marcação */}
            <div className="mb-5">
                <h2 className="h5 fw-bold text-dark mb-3">Lembrar Marcação</h2>
                <div className="row">
                    <div className="col-lg-10">
                        <div className="card border-0 shadow-sm p-4">
                            {/* Cabeçalho da Tabela */}
                            <div className="row align-items-center mb-3 px-3">
                                <div className="col-4"><h3 className="h6 fw-bold text-muted mb-0">Nome</h3></div>
                                <div className="col-3 text-center"><h3 className="h6 fw-bold text-muted mb-0">Contacto</h3></div>
                                <div className="col-2 text-center"><h3 className="h6 fw-bold text-muted mb-0">Data</h3></div>
                                <div className="col-3"></div>
                            </div>
 
                            <div className="d-flex flex-column gap-2">
                                {appointments.map((appointment, idx) => (
                                    <div key={idx} className="row align-items-center p-3 bg-light rounded mx-0 transition hover-shadow border-0">
                                        <div className="col-4">
                                            <div className="fw-semibold text-dark">{appointment.name}</div>
                                        </div>
                                        <div className="col-3 text-center">
                                            <div className="text-secondary">{appointment.contacto}</div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <div className="text-secondary">{appointment.data}</div>
                                        </div>
                                        <div className="col-3 text-end">
                                            <button className="btn btn-sm text-white px-3" style={{ backgroundColor: 'var(--primary-button)' }}>
                                                Enviar Mensagem
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}