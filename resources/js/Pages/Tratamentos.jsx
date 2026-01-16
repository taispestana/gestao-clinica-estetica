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
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.82288 8.80173C9.2627 9.69792 10.5103 10.8842 11.4886 12.2869C11.7877 12.7155 12.0612 13.1658 12.3047 13.629C12.5482 13.1615 12.8217 12.7155 13.1207 12.2869C14.0991 10.8842 15.3467 9.69792 16.7865 8.80173C18.6963 7.61113 20.9393 6.92708 23.3276 6.92708H23.7506C24.2249 6.92708 24.6094 7.31673 24.6094 7.7973C24.6094 14.2049 19.4867 19.3958 13.1635 19.3958H12.3047H11.4459C5.12268 19.3958 0 14.2049 0 7.7973C0 7.31673 0.384521 6.92708 0.858765 6.92708H1.28174C3.67004 6.92708 5.91309 7.61113 7.82288 8.80173ZM12.8815 0.242448C13.5522 0.974121 15.4919 3.35098 16.4874 7.36869C14.8639 8.30384 13.4369 9.56803 12.3047 11.0747C11.1725 9.56803 9.74548 8.30817 8.12195 7.36869C9.11316 3.35098 11.0529 0.974121 11.7279 0.242448C11.8774 0.0822591 12.0868 0 12.3047 0C12.5226 0 12.7319 0.0822591 12.8815 0.242448Z" fill="#1A2B22"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="h3 font-weight-bold mb-1" style={{ color: 'var(--main-text)' }}>{stat.value}</div>
                                <div className="text-muted small fw-medium">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <button className="btn text-white px-4 shadow-sm" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}>
                    + Novo Tratamento
                </button>
            </div>

            <div className="row g-4 mb-5">
                {/* Lista de Agendamentos (Tratamentos) */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        {/* Cabeçalho da Tabela */}
                        <div className="row align-items-center mb-3 px-3">
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
                                <div key={idx} className="row align-items-center p-3 bg-light rounded mx-0 transition hover-shadow border-0">
                                    {/* Nome - Alinhado à Esquerda */}
                                    <div className="col-5">
                                        <div className="fw-semibold text-dark">{appointment.name}</div>
                                    </div>

                                    {/* Duração - Centralizada */}
                                    <div className="col-3 text-center">
                                        <div className="text-secondary fw-medium">{appointment.duration}</div>
                                    </div>

                                    {/* Valor - Centralizado */}
                                    <div className="col-2 text-center">
                                        <div className="text-secondary fw-medium">{appointment.value} €</div>
                                    </div>

                                    {/* Ação - Alinhada à Direita */}
                                    <div className="col-2 text-end">
                                        <button className="btn btn-sm text-white px-3" style={{ backgroundColor: 'var(--primary-button)' }}>
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tratamentos Populares */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <h3 className="h5 fw-bold text-dark mb-4">Tratamentos Populares</h3>
                        <div className="d-flex flex-column gap-4">
                            {treatments.map((treatment, idx) => (
                                <div key={idx}>
                                    <div className="d-flex justify-content-between small fw-medium text-secondary mb-2">
                                        <span>{treatment.name}</span>
                                        <span className="fw-bold text-dark">{treatment.percentage}%</span>
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
