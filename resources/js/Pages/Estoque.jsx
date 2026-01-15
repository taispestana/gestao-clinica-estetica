import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Estoque() {


    const stats = [
        { title: 'Total de Produtos', value: '0', icon: 'users', color: 'var(--status-green)' },
        { title: 'Estoque Baixo', value: '0', icon: 'calendar', color: 'var(--status-green)' },
    ];

    const appointments = [
        { produto: 'Sérum Vitamina C', code: 'SKU: SER001', categoria: 'Séruns', quantidade: '5 unid.', value: '10/05/2026' },
        { produto: 'Gel Peeling Facial', code: 'SKU: GEL002', categoria: 'Peelings', quantidade: '0 unid.', value: '-' },
        { produto: 'Hidratante Facial', code: 'SKU: HID003', categoria: 'Hidratantes', quantidade: '4 unid.', value: '25/12/2025' },
        { produto: 'Protetor Solar FPS 60', code: 'SKU: PRO004', categoria: 'Proteção', quantidade: '3 unid.', value: '31/12/2025' },
        { produto: 'Máscara Argila Verde', code: 'SKU: MAS005', categoria: 'Máscaras', quantidade: '1 unid.', value: '31/12/2025' },
    ];


    const treatments = [
        { name: 'Mascara Argila Verde', alert: 'Apenas 1 unidade(s) restante(s)' },
        { name: 'Gel Peeling Facial', alert: 'Validade expira em 25/12/2026' },
    ];

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Estoque" />
                {/* Cabeçalho da Página */}
                <div className="mb-4">
                    <h2 className="display-6 mb-2"
                    >Controle de Estoque</h2>
                    <p className="text-secondary">Gerencie todos os produtos</p>
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
                                        </div>
                                    </div>
                                    <div className="h3 font-weight-bold mb-1" style={{ color: 'var(--main-text)' }}>{stat.value}</div>
                                    <div className="text-muted small fw-medium">{stat.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex align-items-center gap-5 mb-4">
                    <button className="btn text-white" style={{ backgroundColor: '#C5A365' }}>+ Novo Produto</button>
                </div>

                <div className="row g-4">
                    {/* Lista de Agendamentos */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm p-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h3 className="h5 fw-bold text-dark mb-0">Produto</h3>
                                <h3 className="h5 fw-bold text-dark mb-0">Categoria</h3>
                                <h3 className="h5 fw-bold text-dark mb-0">Quantidade</h3>
                                <h3 className="h5 fw-bold text-dark mb-0">Validade</h3>
                                <h3 className="h5 fw-bold text-dark mb-0"></h3>
                                <h3 className="h5 fw-bold text-dark mb-0"></h3>
                            </div>

                            <div className="d-flex flex-column gap-3">
                                {appointments.map((appointment, idx) => (
                                    <div key={idx} className="d-flex align-items-center justify-content-between p-3 bg-light rounded hover-shadow transition">
                                        <div>
                                            <div className="fw-semibold text-dark">{appointment.produto}</div>
                                            <div className="small text-muted">{appointment.code}</div>
                                        </div>
                                        <div>
                                            <div className="fw-semibold text-dark">{appointment.categoria}</div>
                                        </div>
                                        <div>
                                            <div className="fw-semibold text-dark">{appointment.quantidade}</div>
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

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm p-4">
                            <h3 className="h5 fw-bold text-dark mb-4">Alertas de Estoque</h3>
                            <div className="d-flex flex-column gap-3">
                                {treatments.map((treatment, idx) => (
                                    <div key={idx}>
                                        <br />
                                        <div className="d-flex justify-content-between small fw-medium text-secondary mb-1">
                                        <span >{treatment.name}</span>
                                        </div>
                                        <span>{treatment.alert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                
                </div>
            </AuthenticatedLayout>
        </>
    );

}
