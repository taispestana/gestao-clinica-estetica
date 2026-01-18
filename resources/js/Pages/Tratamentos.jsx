import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Tratamentos() {
    const stats = [
        { title: 'Total de Tratamentos', value: '0', icon: 'flower1' },
        { title: 'Tratamentos Semanais', value: '0', icon: 'flower1' },
        { title: 'Tratamentos Mensais', value: '0', icon: 'flower1' },
    ];

    const appointments = [
        { name: 'Limpeza de Pele Deep', duration: '60min', value: '150,00€' },
        { name: 'Massagem Relaxante', duration: '45min', value: '120,00€' },
        { name: 'Drenagem Linfática', duration: '90min', value: '200,00€' },
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
                            <div className="card-body p-2 p-md-4 text-start">
                                {/* Desktop/Tablet Icon */}
                                <div className="d-none d-md-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-flower1" viewBox="0 0 16 16">
                                            <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* Mobile Icon */}
                                <div className="d-md-none mb-2">
                                    <div className="p-2 rounded d-inline-block" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        <i className={`bi bi-${stat.icon} fs-6`}></i>
                                    </div>
                                </div>
                                <div className="stat-card-value">{stat.value}</div>
                                <div className="stat-card-title d-block">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-start mb-4">
                <button className="btn text-white px-4 py-2" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '10px' }}>
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
