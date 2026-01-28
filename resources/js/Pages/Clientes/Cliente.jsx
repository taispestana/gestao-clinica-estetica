import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import FichaAnamnese from '@/Components/FichaAnamnese';

export default function Cliente({ cliente }) {
    const [activeTab, setActiveTab] = useState('agendamentos');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAnamneseModal, setShowAnamneseModal] = useState(false);
    const [isEditingAnamnese, setIsEditingAnamnese] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: cliente.name || '',
        telemovel: cliente.telemovel || '',
        email: cliente.email || '',
        data_nascimento: cliente.data_nascimento || '',
        nif: cliente.nif || '',
        endereco: cliente.endereco || '',
        profissao: cliente.profissao || '',
    });

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => {
        setShowEditModal(false);
        reset();
    };

    const openAnamneseModal = () => setShowAnamneseModal(true);
    const closeAnamneseModal = () => setShowAnamneseModal(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('clientes.update', cliente.id), {
            onSuccess: () => setShowEditModal(false),
        });
    };

    const calculateAge = (birthday) => {
        if (!birthday) return 'N/A';
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const calculateStatus = () => {
        const fifteenMonthsAgo = new Date();
        fifteenMonthsAgo.setMonth(fifteenMonthsAgo.getMonth() - 15);

        if (cliente.ultima_marcacao) {
            return new Date(cliente.ultima_marcacao) < fifteenMonthsAgo ? 'Inativo' : 'Ativo';
        }

        // Se nunca teve marcação, usa data de criação
        return new Date(cliente.created_at) < fifteenMonthsAgo ? 'Inativo' : 'Ativo';
    };

    const currentStatus = calculateStatus();

    const customer = {
        id: cliente.id,
        name: cliente.name,
        since: new Date(cliente.created_at).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }),
        age: calculateAge(cliente.data_nascimento),
        data_nascimento: cliente.data_nascimento,
        status: currentStatus,
        color: currentStatus === 'Ativo' ? 'var(--status-green)' : 'var(--status-red)',
        phone: cliente.telemovel,
        email: cliente.email,
        nif: cliente.nif,
        address: cliente.endereco,
        occupation: cliente.profissao,
    };

    const now = new Date();
    const pastAppointments = (cliente.agendamentos || []).filter(a => new Date(a.data_hora_fim) < now && a.estado_agendamento !== 5 && a.estado_agendamento !== 4);
    const futureAppointments = (cliente.agendamentos || []).filter(a => new Date(a.data_hora_inicio) > now && a.estado_agendamento !== 5 && a.estado_agendamento <= 2);

    const stats = {
        totalSessions: pastAppointments.length,
        lastVisit: pastAppointments.length > 0
            ? new Date(Math.max(...pastAppointments.map(a => new Date(a.data_hora_inicio))))
                .toLocaleDateString('pt-PT')
            : 'N/A',
        nextProcedure: futureAppointments.length > 0
            ? new Date(Math.min(...futureAppointments.map(a => new Date(a.data_hora_inicio))))
                .toLocaleDateString('pt-PT')
            : 'NENHUM',
        totalSpent: new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' })
            .format(pastAppointments.reduce((acc, a) => acc + parseFloat(a.tratamento?.preco || 0), 0))
    };

    const appointments = cliente.agendamentos
        ?.filter(apt => new Date(apt.data_hora_inicio) >= new Date() && apt.estado_agendamento <= 2)
        .map(apt => ({
            title: apt.tratamento?.nome || 'Tratamento',
            therapist: apt.profissional?.name || 'Profissional',
            date: new Date(apt.data_hora_inicio).toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            price: new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(apt.tratamento?.preco || 0)
        })) || [];

    const procedureHistory = pastAppointments
        .sort((a, b) => new Date(b.data_hora_inicio) - new Date(a.data_hora_inicio))
        .map(apt => ({
            title: apt.tratamento?.nome || 'Tratamento',
            date: new Date(apt.data_hora_inicio).toLocaleDateString('pt-PT'),
            professional: apt.profissional?.name || 'Profissional',
            notes: apt.observacoes || 'Sem observações registadas.',
            price: new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(apt.tratamento?.preco || 0)
        }));

    return (
        <AuthenticatedLayout>
            <div style={{ paddingBottom: '80px' }}>
                <Head title={`${customer.name} - Detalhes`} />

                {/* Header / Navigation */}
                <div className="d-flex align-items-center mb-4">
                    <Link href={route('clientes')} className="text-decoration-none text-dark me-3">
                        <i className="bi bi-arrow-left fs-4"></i>
                    </Link>
                    <div>
                        <h2 className="display-6 mb-0">{customer.name}</h2>
                        <p className="text-secondary mb-0">Cliente desde {customer.since}</p>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Left Column - Profile & Stats */}
                    <div className="col-12 col-lg-4">
                        {/* Profile Card */}
                        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
                            <h4 className="fw-normal mb-1">{customer.name}</h4>
                            <div className="mb-3">
                                <span className="text-secondary">{customer.age} anos</span>
                                <div className="mt-1">
                                    <span className="badge rounded-pill text-dark fw-normal px-3" style={{ backgroundColor: customer.color }}>
                                        {customer.status}
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex flex-column gap-3 mb-4">
                                <div>
                                    <small className="text-secondary d-block">Telemóvel</small>
                                    <span className="fw-medium">{customer.phone}</span>
                                </div>
                                <div>
                                    <small className="text-secondary d-block">Email</small>
                                    <span className="fw-medium">{customer.email}</span>
                                </div>
                                <div>
                                    <small className="text-secondary d-block">NIF</small>
                                    <span className="fw-medium">{customer.nif}</span>
                                </div>
                                <div>
                                    <small className="text-secondary d-block">Endereço</small>
                                    <span className="fw-medium text-wrap" style={{ whiteSpace: 'pre-line' }}>{customer.address}</span>
                                </div>
                                <div>
                                    <small className="text-secondary d-block">Profissão</small>
                                    <span className="fw-medium">{customer.occupation}</span>
                                </div>
                            </div>

                            <button
                                className="btn btn-gold w-100 py-2"
                                style={{ borderRadius: '8px' }}
                                onClick={openEditModal}
                            >
                                <i className="bi bi-pencil-square me-2"></i>
                                Editar Perfil
                            </button>
                        </div>

                        {/* Stats Card */}
                        <div className="card border-0 shadow-sm p-4 rounded-4">
                            <h5 className="mb-4">Estatísticas</h5>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-secondary">Total de Sessões</span>
                                    <span className="fw-medium fs-5">{stats.totalSessions}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-secondary">Última Visita</span>
                                    <span className="fw-medium">{stats.lastVisit}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-secondary">Próximo Procedimento</span>
                                    <span className="fw-medium">{stats.nextProcedure}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <span className="text-secondary">Total Gasto</span>
                                    <span className="fw-bold fs-4">{stats.totalSpent}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Tabs & Content */}
                    <div className="col-12 col-lg-8">
                        {/* Tabs navigation */}
                        <ul className="nav nav-tabs border-bottom-0 mb-4 gap-4">
                            <li className="nav-item">
                                <button
                                    onClick={() => setActiveTab('historico')}
                                    className={`nav-link border-0 px-0 bg-transparent ${activeTab === 'historico' ? 'active border-bottom border-2 border-warning fw-medium text-dark' : 'text-secondary'}`}
                                >
                                    Histórico de Procedimentos
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    onClick={() => setActiveTab('agendamentos')}
                                    className={`nav-link border-0 px-0 bg-transparent ${activeTab === 'agendamentos' ? 'active border-bottom border-2 border-warning fw-medium text-dark' : 'text-secondary'}`}
                                >
                                    Agendamentos
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    onClick={() => setActiveTab('anamnese')}
                                    className={`nav-link border-0 px-0 bg-transparent ${activeTab === 'anamnese' ? 'active border-bottom border-2 border-warning fw-medium text-dark' : 'text-secondary'}`}
                                >
                                    Anamnese
                                </button>
                            </li>
                        </ul>

                        {/* Content Card */}
                        <div className="card border-0 shadow-sm p-4 rounded-4 min-vh-50">
                            {activeTab === 'agendamentos' && (
                                <>
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                                        <h5 className="mb-0">Agendamentos</h5>
                                        <Link href={route('agendamentos', { cliente_id: cliente.id })} className="btn btn-gold px-4 py-2" style={{ borderRadius: '8px' }}>
                                            <span className="me-2" >+</span> Novo Procedimento
                                        </Link>
                                    </div>

                                    <div className="d-flex flex-column gap-3 mb-4">
                                        {appointments.length > 0 ? (
                                            appointments.map((apt, idx) => (
                                                <div key={idx} className="card border border-light shadow-sm p-3 rounded-3">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <div>
                                                            <h6 className="mb-1 fw-bold">{apt.title}</h6>
                                                            <p className="text-secondary small mb-2">{apt.therapist}</p>
                                                            <p className="text-secondary small mb-0">Valor: {apt.price}</p>
                                                        </div>
                                                        <div className="text-end">
                                                            <div className="text-muted small mb-1">{apt.date}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-5">
                                                <i className="bi bi-calendar-event fs-1 text-light mb-3 d-block"></i>
                                                <p className="text-secondary">Não existem agendamentos futuros para este cliente.</p>
                                            </div>
                                        )}
                                    </div>

                                    {appointments.length > 5 && (
                                        <div className="text-center mt-auto pt-3">
                                            <button className="btn btn-gold px-5 px-md-5 py-2" style={{ borderRadius: '8px', paddingLeft: '3rem !important', paddingRight: '3rem !important' }}>
                                                Ver Mais Agendamentos
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                            {activeTab === 'anamnese' && (
                                <div className="mt-2">
                                    {cliente.anamnese ? (
                                        <div className="d-flex flex-column gap-4">
                                            {!isEditingAnamnese && (
                                                <div className="d-flex justify-content-end">
                                                    <button
                                                        className="btn btn-gold px-4 py-2"
                                                        style={{ borderRadius: '8px' }}
                                                        onClick={() => setIsEditingAnamnese(true)}
                                                    >
                                                        <i className="bi bi-pencil-square me-2"></i>
                                                        Editar Anamnese
                                                    </button>
                                                </div>
                                            )}
                                            <FichaAnamnese
                                                customer={customer}
                                                anamnese={cliente.anamnese}
                                                readOnly={!isEditingAnamnese}
                                                onSuccess={() => setIsEditingAnamnese(false)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center mt-auto pt-3">
                                            <button
                                                className="btn btn-gold px-5 px-md-5 py-2"
                                                style={{ borderRadius: '8px', paddingLeft: '3rem !important', paddingRight: '3rem !important' }}
                                                onClick={openAnamneseModal}
                                            >
                                                + Criar Anamnese
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'historico' && (
                                <div className="procedure-history">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="mb-0">Histórico de Procedimentos</h5>
                                        {/* <button className="btn btn-gold px-4 py-2" style={{ borderRadius: '8px' }}>
                                            <span className="me-2">+</span> Novo Procedimento
                                        </button> */}
                                    </div>

                                    <div className="d-flex flex-column gap-3 mb-4">
                                        {procedureHistory.length > 0 ? (
                                            procedureHistory.map((item, idx) => (
                                                <div key={idx} className="card border border-light shadow-sm p-3 rounded-4 bg-white">
                                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                                        <h6 className="fw-bold mb-0">{item.title}</h6>
                                                        <span className="small text-dark fw-medium">{item.date}</span>
                                                    </div>
                                                    <p className="text-secondary small mb-3">{item.professional}</p>
                                                    <p className="small mb-3 text-dark">{item.notes}</p>
                                                    <div className="fw-medium text-dark small">Valor: {item.price}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-5">
                                                <i className="bi bi-clock-history fs-1 text-light mb-3 d-block"></i>
                                                <p className="text-secondary">Ainda não existem procedimentos registados para este cliente.</p>
                                            </div>
                                        )}
                                    </div>

                                    {procedureHistory.length > 5 && (
                                        <div className="text-center mt-4">
                                            <button className="btn btn-gold px-5 px-md-5 py-2" style={{ borderRadius: '8px', paddingLeft: '3rem !important', paddingRight: '3rem !important' }}>
                                                Ver Mais Procedimentos
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Edit Profile Modal */}
                <Modal show={showEditModal} onClose={closeEditModal}>
                    <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Editar Perfil</h4>
                            <button type="button" className="btn-close" onClick={closeEditModal}></button>
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label small text-secondary">Nome Completo</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-2 rounded-3"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <div className="text-danger small">{errors.name}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label small text-secondary">Telemóvel</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-2 rounded-3"
                                        value={data.telemovel}
                                        onChange={(e) => setData('telemovel', e.target.value)}
                                        required
                                    />
                                    {errors.telemovel && <div className="text-danger small">{errors.telemovel}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label small text-secondary">Email</label>
                                    <input
                                        type="email"
                                        className="form-control bg-light border-0 py-2 rounded-3"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label small text-secondary">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        className="form-control bg-light border-0 py-2 rounded-3"
                                        value={data.data_nascimento}
                                        onChange={(e) => setData('data_nascimento', e.target.value)}
                                    />
                                    {errors.data_nascimento && <div className="text-danger small">{errors.data_nascimento}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label small text-secondary">NIF</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-2 rounded-3"
                                        value={data.nif}
                                        onChange={(e) => setData('nif', e.target.value)}
                                    />
                                    {errors.nif && <div className="text-danger small">{errors.nif}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label small text-secondary">Endereço</label>
                                    <textarea
                                        className="form-control bg-light border-0 py-2 rounded-3"
                                        rows="2"
                                        value={data.endereco}
                                        onChange={(e) => setData('endereco', e.target.value)}
                                    ></textarea>
                                    {errors.endereco && <div className="text-danger small">{errors.endereco}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label small text-secondary">Profissão</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-2 rounded-3"
                                        value={data.profissao}
                                        onChange={(e) => setData('profissao', e.target.value)}
                                    />
                                    {errors.profissao && <div className="text-danger small">{errors.profissao}</div>}
                                </div>
                            </div>

                            <div className="mt-4 d-flex gap-2 justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-light px-4 py-2 rounded-3"
                                    onClick={closeEditModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-gold px-4 py-2 rounded-3"
                                    disabled={processing}
                                >
                                    {processing ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>

                {/* Anamnese Modal */}
                <Modal show={showAnamneseModal} onClose={closeAnamneseModal} style={{ maxWidth: '43.75rem' }}>
                    <div className="p-4">
                        <div className="d-flex justify-content-end mb-2">
                            <button type="button" className="btn-close" onClick={closeAnamneseModal}></button>
                        </div>
                        <FichaAnamnese customer={customer} onSuccess={closeAnamneseModal} />
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}

