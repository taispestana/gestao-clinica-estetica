import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Tratamentos({ tratamentos = [] }) {
    const [showNewTreatmentModal, setShowNewTreatmentModal] = useState(false);
    const [showEditTreatmentModal, setShowEditTreatmentModal] = useState(false);
    const [editingTreatmentId, setEditingTreatmentId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const { data: newData, setData: setNewData, post: newPost, processing: newProcessing, errors: newErrors, reset: newReset } = useForm({
        nome: '',
        duracao: '',
        preco: '',
    });

    const { data: editData, setData: setEditData, put: editPut, delete: editDelete, processing: editProcessing, errors: editErrors, reset: editReset } = useForm({
        nome: '',
        duracao: '',
        preco: '',
    });

    const openModal = () => setShowNewTreatmentModal(true);
    const closeModal = () => {
        setShowNewTreatmentModal(false);
        newReset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        newPost(route('tratamentos.store'), {
            onSuccess: () => closeModal(),
        });
    };

    const openEditModal = (tratamento) => {
        setEditingTreatmentId(tratamento.id);
        setEditData({
            nome: tratamento.nome,
            duracao: tratamento.duracao,
            preco: tratamento.preco,
        });
        setShowEditTreatmentModal(true);
    };

    const closeEditModal = () => {
        setShowEditTreatmentModal(false);
        setEditingTreatmentId(null);
        editReset();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editPut(route('tratamentos.update', editingTreatmentId), {
            onSuccess: () => closeEditModal(),
        });
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        editDelete(route('tratamentos.destroy', editingTreatmentId), {
            onSuccess: () => {
                setShowDeleteConfirm(false);
                closeEditModal();
            },
        });
    };

    const normalizeString = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filteredTratamentos = tratamentos.filter(t =>
        normalizeString(t.nome).includes(normalizeString(searchTerm))
    );

    const formatDuration = (minutes) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        if (h > 0) {
            return `${h}h${m > 0 ? ` ${m}min` : ''}`;
        }
        return `${m}min`;
    };

    const stats = [
        { title: 'Total de Tratamentos', value: tratamentos.length, icon: 'flower1' },
        { title: 'Tratamentos Semanais', value: '8', icon: 'flower1' },
        { title: 'Tratamentos Mensais', value: '32', icon: 'flower1' },
    ];

    const popularTreatments = [
        { name: 'Limpeza de Pele', percentage: 45 },
        { name: 'Massagem', percentage: 30 },
        { name: 'Drenagem', percentage: 25 },
    ];

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Tratamentos" />

                <div className="mb-4">
                    <h2 className="display-6 mb-2">Tratamentos</h2>
                    <p className="text-secondary">Gerencie todos os tratamentos disponíveis</p>
                </div>

                <div className="row g-2 g-md-4 mb-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-4 px-1 px-md-3">
                            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                                <div className="card-body p-2 p-md-4 text-start">
                                    <div className="d-none d-md-flex align-items-start justify-content-between mb-3">
                                        <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)', width: 'fit-content' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-flower1" viewBox="0 0 16 16">
                                                <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Mobile Icon View */}
                                    <div className="d-md-none mb-2">
                                        <div className="p-2 rounded d-inline-block" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-flower1" viewBox="0 0 16 16">
                                                <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="stat-card-value">{stat.value}</div>
                                    <div className="stat-card-title d-block">{stat.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row g-3 mb-4 align-items-center">
                    <div className="col-12 col-md-auto">
                        <button
                            className="btn text-white px-4 py-2"
                            style={{ backgroundColor: 'var(--primary-button)', borderRadius: '10px' }}
                            onClick={openModal}
                        >
                            <span className="me-2">+</span> Novo Tratamento
                        </button>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control border-1 bg-white text-secondary py-2"
                                placeholder="Buscar tratamento..."
                                style={{ borderRadius: '10px', fontSize: '0.9rem' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm p-4">
                            <div className="row align-items-center mb-3 px-3 d-none d-md-flex">
                                <div className="col-5"><h3 className="h6 fw-bold text-muted mb-0">Nome</h3></div>
                                <div className="col-3 text-center"><h3 className="h6 fw-bold text-muted mb-0">Duração</h3></div>
                                <div className="col-2 text-center ps-0 pe-5"><h3 className="h6 fw-bold text-muted mb-0">Valor</h3></div>
                                <div className="col-2"></div>
                            </div>

                            <div className="d-flex flex-column gap-3">
                                {filteredTratamentos.length > 0 ? filteredTratamentos.map((tratamento) => (
                                    <div key={tratamento.id} className="card border-0 shadow-sm p-4 bg-white rounded-4">
                                        <div className="d-none d-md-flex row align-items-center w-100 mx-0">
                                            <div className="col-md-5"><div className="fw-semibold text-dark">{tratamento.nome}</div></div>
                                            <div className="col-md-3 text-center"><div className="text-secondary">{formatDuration(tratamento.duracao)}</div></div>
                                            <div className="col-md-2 text-center text-dark fw-bold ps-0 pe-5">{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(tratamento.preco)}</div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    className="btn btn-sm text-white  px-3 py-2"
                                                    style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}
                                                    onClick={() => openEditModal(tratamento)}
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i> Editar
                                                </button>
                                            </div>
                                        </div>
                                        <div className="d-md-none">
                                            <div className="mb-1">
                                                <span className="text-secondary small">Nome: </span>
                                                <span className="fw-bold text-dark">{tratamento.nome}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="text-secondary small">Duração: </span>
                                                <span className="text-dark small">{formatDuration(tratamento.duracao)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <div>
                                                    <span className="text-secondary small">Valor: </span>
                                                    <span className="fw-bold text-dark small">{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(tratamento.preco)}</span>
                                                </div>
                                                <button
                                                    className="btn btn-sm text-white px-xl-4"
                                                    style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}
                                                    onClick={() => openEditModal(tratamento)}
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i> Editar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-5 text-muted">Nenhum tratamento cadastrado</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm p-4 h-100">
                            <h3 className="h5 fw-bold text-dark mb-4">Tratamentos Populares</h3>
                            <div className="d-flex flex-column gap-3">
                                {popularTreatments.map((treatment, idx) => (
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

            <Modal show={showNewTreatmentModal} onClose={closeModal} maxWidth="md">
                <div className="p-4 p-md-5">
                    <h4 className="fw-bold mb-4" style={{ color: 'var(--main-text)' }}>Novo Tratamento</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label small text-secondary fw-medium mb-1">Nome</label>
                            <input
                                type="text"
                                className={`form-control bg-light border-0 py-2 rounded-3 ${newErrors.nome ? 'is-invalid' : ''}`}
                                value={newData.nome}
                                onChange={e => setNewData('nome', e.target.value)}
                            />
                            {newErrors.nome && <div className="invalid-feedback">{newErrors.nome}</div>}
                        </div>

                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Duração (minutos)</label>
                                <input
                                    type="number"
                                    className={`form-control bg-light border-0 py-2 rounded-3 ${newErrors.duracao ? 'is-invalid' : ''}`}
                                    value={newData.duracao}
                                    onChange={e => setNewData('duracao', e.target.value)}
                                    placeholder="Ex: 60"
                                />
                                {newErrors.duracao && <div className="invalid-feedback">{newErrors.duracao}</div>}
                            </div>
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Valor (€)</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control bg-light border-0 py-2 rounded-3 ${newErrors.preco ? 'is-invalid' : ''}`}
                                        value={newData.preco}
                                        onChange={e => setNewData('preco', e.target.value)}
                                        placeholder="0.00"
                                    />
                                    <span className="input-group-text bg-light border-0">€</span>
                                </div>
                                {newErrors.preco && <div className="invalid-feedback d-block">{newErrors.preco}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-gold px-5 py-2 fw-medium" style={{ borderRadius: '10px', minWidth: '200px' }} disabled={newProcessing}>
                                {newProcessing ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal Editar Tratamento */}
            <Modal show={showEditTreatmentModal} onClose={closeEditModal} maxWidth="md">
                <div className="p-4 p-md-5">
                    <h4 className="fw-bold mb-4" style={{ color: 'var(--main-text)' }}>Editar Tratamento</h4>

                    <form onSubmit={handleEditSubmit}>
                        <div className="mb-4">
                            <label className="form-label small text-secondary fw-medium mb-1">Nome</label>
                            <input
                                type="text"
                                className={`form-control bg-light border-0 py-2 rounded-3 ${editErrors.nome ? 'is-invalid' : ''}`}
                                value={editData.nome}
                                onChange={e => setEditData('nome', e.target.value)}
                            />
                            {editErrors.nome && <div className="invalid-feedback">{editErrors.nome}</div>}
                        </div>

                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Duração (minutos)</label>
                                <input
                                    type="number"
                                    className={`form-control bg-light border-0 py-2 rounded-3 ${editErrors.duracao ? 'is-invalid' : ''}`}
                                    value={editData.duracao}
                                    onChange={e => setEditData('duracao', e.target.value)}
                                />
                                {editErrors.duracao && <div className="invalid-feedback">{editErrors.duracao}</div>}
                            </div>
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Valor (€)</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control bg-light border-0 py-2 rounded-3 ${editErrors.preco ? 'is-invalid' : ''}`}
                                        value={editData.preco}
                                        onChange={e => setEditData('preco', e.target.value)}
                                    />
                                    <span className="input-group-text bg-light border-0">€</span>
                                </div>
                                {editErrors.preco && <div className="invalid-feedback d-block">{editErrors.preco}</div>}
                            </div>
                        </div>

                        <div className="text-center d-flex align-items-center justify-content-center gap-3">
                            <button
                                type="button"
                                className="btn btn-outline-danger px-4 py-2 fw-medium"
                                style={{ borderRadius: '10px', minWidth: '150px' }}
                                onClick={handleDelete}
                                disabled={editProcessing}
                            >
                                <i className="bi bi-trash me-2"></i> Apagar
                            </button>
                            <button type="submit" className="btn btn-gold px-5 py-2 fw-medium" style={{ borderRadius: '10px', minWidth: '200px' }} disabled={editProcessing}>
                                {editProcessing ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal de Confirmação de Exclusão */}
            <Modal
                show={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                maxWidth="md"
                style={{ boxShadow: 'none', height: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
                <div className="p-4 p-md-5 text-center">
                    <div className="mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle border border-warning" style={{ width: '80px', height: '80px', borderSize: '2px !important' }}>
                            <i className="bi bi-exclamation-lg text-warning" style={{ fontSize: '3rem' }}></i>
                        </div>
                    </div>

                    <h4 className="fw-bold mb-4 px-md-4" style={{ color: 'var(--main-text)', lineHeight: '1.4' }}>
                        Tem certeza que deseja apagar o tratamento?
                    </h4>

                    <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                        <button
                            type="button"
                            className="btn btn-gold px-4 py-2 fw-medium"
                            style={{ borderRadius: '10px', minWidth: '120px' }}
                            onClick={confirmDelete}
                            disabled={editProcessing}
                        >
                            Sim
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger px-4 py-2 fw-medium"
                            style={{ borderRadius: '10px', minWidth: '120px' }}
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={editProcessing}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
