import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Tratamentos() {
    const stats = [
        { title: 'Total de Tratamentos', value: '0', icon: 'flower1' },
        { title: 'Tratamentos Semanais', value: '0', icon: 'flower2' },
        { title: 'Tratamentos Mensais', value: '0', icon: 'flower3' },
    ];

    const appointments = [
        { name: 'Limpeza de Pele Deep', duration: '60min', value: '150,00' },
        { name: 'Massagem Relaxante', duration: '45min', value: '120,00' },
        { name: 'Drenagem Linfática', duration: '90min', value: '200,00' },
    ];

    const treatments = [
        { name: 'Limpeza de Pele', percentage: 45 },
        { name: 'Massagem', percentage: 30 },
        { name: 'Drenagem', percentage: 25 },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Tratamentos" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2">Tratamentos</h2>
                <p className="text-secondary">Gerencie todos os tratamentos disponíveis</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="row g-2 g-md-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-4 col-md-4 px-1 px-md-3">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body p-2 p-md-4 text-center text-md-start">
                                {/* Desktop/Tablet Icon */}
                                <div className="d-none d-md-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        <i className="bi bi-flower1 fs-4"></i>
                                    </div>
                                </div>
                                {/* Mobile Icon */}
                                <div className="d-md-none mb-2">
                                    <div className="p-2 rounded d-inline-block" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        <i className="bi bi-flower1 fs-6"></i>
                                    </div>
                                </div>
                                <div className="h4 fw-bold mb-1" style={{ color: 'var(--main-text)' }}>{stat.value}</div>
                                <div className="text-muted d-block" style={{ fontSize: '10px', lineHeight: '1.2' }}>{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-start mb-4">
                <button className="btn text-white px-4 py-2" style={{ backgroundColor: '#C5A365', borderRadius: '10px' }}>
                    <span className="me-2">+</span> Novo Tratamento
                </button>
            </div>

            <div className="row g-4 mb-5">
                {/* Lista de Agendamentos (Tratamentos) */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        {/* Cabeçalho da Tabela */}
                        <div className="row align-items-center mb-3 px-3 d-none d-md-flex"> {/* Hidden on mobile */}
                            <div className="col-5">
                                <h3 className="h6 fw-bold text-muted mb-0">Nome</h3>
                            </div>
                            <div className="col-3 text-center">
                                <h3 className="h6 fw-bold text-muted mb-0">Duração</h3>
                            </div>
                            <div className="col-2 text-center">
                                <h3 className="h6 fw-bold text-muted mb-0">Valor</h3>
                            </div>
                            <div className="col-2"></div>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appointment, idx) => (
                                <div key={idx} className="card border-0 shadow-sm p-4 bg-white rounded-4">
                                    <div className="d-flex flex-column gap-3">
                                        {/* Mobile Header */}
                                        <div className="d-md-none">
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="fw-bold fs-6 text-dark">{appointment.name}</div>
                                                </div>
                                                <div className="col-4 text-end">
                                                    <div className="text-secondary small">{appointment.duration}</div>
                                                    <div className="fw-bold text-dark mt-1">{appointment.value}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop View Row */}
                                        <div className="d-none d-md-flex row align-items-center w-100 mx-0">
                                            <div className="col-md-5">
                                                <div className="fw-semibold text-dark">{appointment.name}</div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="text-secondary">{appointment.duration}</div>
                                            </div>
                                            <div className="col-md-2 text-center text-dark fw-bold">
                                                {appointment.value}
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button className="btn btn-sm text-white px-2" style={{ backgroundColor: 'var(--primary-button)' }}>
                                                    <i className="bi bi-pencil-square me-1"></i> Editar
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile Button */}
                                        <div className="col-12 text-end d-md-none mt-2">
                                            <button className="btn btn-sm text-white px-4 py-2" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}>
                                                <i className="bi bi-pencil-square me-1"></i> Editar
                                            </button>
                                        </div>
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
