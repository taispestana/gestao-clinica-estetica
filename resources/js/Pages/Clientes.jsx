import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Clientes({ clientes }) {
    const [showNewClientModal, setShowNewClientModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        telemovel: '',
        email: '',
        data_nascimento: '',
        profissao: '',
    });

    const openModal = () => setShowNewClientModal(true);
    const closeModal = () => {
        setShowNewClientModal(false);
        reset();
    };

    const stats = [
        { title: 'Clientes Ativos', value: clientes.length.toString(), icon: 'users', color: 'var(--status-green)' },
        { title: 'Agendamentos Hoje', value: '0', icon: 'calendar', color: 'var(--status-green)' },
        { title: 'Agendamento Mensal', value: '0', icon: 'calendar-month', color: 'var(--status-green)' },
    ];

    const appointments = clientes
        .filter(cliente => {
            const matchesName = cliente.name.toLowerCase().includes(searchTerm.toLowerCase());
            // Para o status, como não temos na DB ainda, vamos considerar todos como 'Ativo'
            // Mas permitimos filtrar se o filtro for 'Todos' ou 'Ativo'
            const clientStatus = 'Ativo';
            const matchesStatus = statusFilter === 'Todos' || clientStatus === statusFilter;
            return matchesName && matchesStatus;
        })
        .map(cliente => ({
            id: cliente.id,
            name: cliente.name,
            contacto: cliente.telemovel || 'N/A',
            status: 'Ativo',
            color: 'var(--status-green)'
        }));

    return (
        <>
            <AuthenticatedLayout>
                <div style={{ paddingBottom: '80px' }}>
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
                                    <div className="card-body p-2 p-md-4 text-md-start">
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
                            <button
                                className="btn text-white px-4 py-2"
                                style={{ backgroundColor: 'var(--primary-button)', borderRadius: '10px' }}
                                onClick={openModal}
                            >
                                <span className="me-2">+</span> Novo Cliente
                            </button>
                        </div>
                        <div className="col-8 col-md-4 order-2">
                            <input
                                type="text"
                                className="form-control border-1 bg-white text-secondary py-2"
                                style={{ borderRadius: '10px' }}
                                placeholder="Pesquisar por nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-4 col-md-2 ms-md-auto order-3">
                            <select
                                className="form-select border-1 bg-white text-secondary py-2"
                                style={{ borderRadius: '10px' }}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                                <option value="Pendente">Pendente</option>
                            </select>
                        </div>
                    </div>

                    {/* Tabela de Clientes */}
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm p-4">
                                {/* Cabeçalho da Tabela - Usando Grid para alinhar com o conteúdo */}
                                <div className="row px-4 mb-3 text-muted fw-semibold d-none d-md-flex">
                                    <div className="col-4">Nome</div>
                                    <div className="col-3 text-center">Contacto</div>
                                    <div className="col-3 text-center">Status</div>
                                    <div className="col-2"></div>
                                </div>

                                <div className="d-flex flex-column gap-4
                        ">
                                    {appointments.length > 0 ? (
                                        appointments.map((appointment, idx) => (
                                            <div key={idx} className="card border-0 shadow-sm py-3 px-4 py-md-4 bg-white rounded-4">
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-12 mb-2 d-md-none">
                                                        <div className="d-flex justify-content-between align-items-start mb-1">
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
                                                            <Link href={route('clientes.show', appointment.id)} className="btn btn-sm text-white px-xl-4 py-2" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}>Ver Mais</Link>
                                                        </div>
                                                    </div>
                                                    {/* Mobile Button */}
                                                    <div className="col-12 text-end d-md-none">
                                                        <Link href={route('clientes.show', appointment.id)} className="btn btn-sm text-white px-xl-4 py-2" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}>Ver Mais</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-5 text-muted">
                                            Não existe status {statusFilter}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            {/* Modal Novo Cliente */}
            <Modal show={showNewClientModal} onClose={closeModal} maxWidth="md" >
                <div className="p-4 p-md-5 bg-white">

                    <h4 className="fw-bold mb-4" style={{ color: 'var(--main-text)' }}>Dados Pessoais</h4>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        post(route('users.storeUser'), {
                            onSuccess: () => closeModal(),
                        });
                    }}>
                        <div className="mb-4">
                            <label className="form-label small text-secondary fw-medium mb-1">Nome Completo</label>
                            <input
                                type="text"
                                className="form-control bg-light border-0 py-2 rounded-3"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="text-danger small">{errors.name}</div>}
                        </div>

                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Telemóvel</label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 py-2 rounded-3"
                                    placeholder="(__) ______________"
                                    value={data.telemovel}
                                    onChange={(e) => setData('telemovel', e.target.value)}
                                />
                                {errors.telemovel && <div className="text-danger small">{errors.telemovel}</div>}
                            </div>
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Data de Nascimento</label>
                                <input
                                    type="date"
                                    className="form-date bg-light border-0 text-muted small w-100"
                                    value={data.data_nascimento}
                                    onChange={(e) => setData('data_nascimento', e.target.value)}
                                />
                                {errors.data_nascimento && <div className="text-danger small">{errors.data_nascimento}</div>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small text-secondary fw-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="form-control bg-light border-0 py-2 rounded-3"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <div className="text-danger small">{errors.email}</div>}
                        </div>

                        <div className="mb-5">
                            <label className="form-label small text-secondary fw-medium mb-1">Profissão</label>
                            <input
                                type="text"
                                className="form-control bg-light border-0 py-2 rounded-3"
                                value={data.profissao}
                                onChange={(e) => setData('profissao', e.target.value)}
                            />
                            {errors.profissao && <div className="text-danger small">{errors.profissao}</div>}
                        </div>

                        <div className="text-center">
                            <button type="submit" disabled={processing} className="btn text-white px-5 py-2 fw-medium" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '10px', minWidth: '200px' }}>
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
