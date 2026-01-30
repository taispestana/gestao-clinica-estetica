import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';


export default function Estoque({ produtos = [] }) {
    //Estados
    const [showNewProductModal, setShowNewProductModal] = useState(false);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    //Formulário de Produtos
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: '',
        stock: '',
        data_validade: '',
    });

    //Formulário de Edição de Produtos
    const { data: editData, setData: setEditData, put: editPut, delete: editDelete, processing: editProcessing, errors: editErrors, reset: editReset } = useForm({
        nome: '',
        stock: '',
        data_validade: '',
    });

    //Funções dos Modais
    const openModal = () => setShowNewProductModal(true);
    const closeModal = () => {
        setShowNewProductModal(false);
        reset();
    };

    //Funções de Edição de Produtos
    const openEditModal = (produto) => {
        setEditingProductId(produto.id);
        setEditData({
            nome: produto.nome,
            stock: produto.stock,
            data_validade: produto.data_validade || '',
        });
        setShowEditProductModal(true);
    };

    const closeEditModal = () => {
        setShowEditProductModal(false);
        setEditingProductId(null);
        editReset();
    };

    //Funções de Exclusão de Produtos
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        editDelete(route('estoque.destroy', editingProductId), {
            onSuccess: () => {
                setShowDeleteConfirm(false);
                closeEditModal();
            },
        });
    };

    //Estatísticas
    const stats = [
        { title: 'Total de Produtos', value: produtos.length, icon: 'box' },
        { title: 'Estoque Baixo', value: produtos.filter(p => p.stock <= (p.stock_minimo || 2)).length, icon: 'alert' },
    ];

    //Datas
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    // Alertas de estoque baixo
    const stockAlerts = produtos
        .filter(p => p.stock <= (p.stock_minimo || 2))
        .map(p => ({
            name: p.nome,
            alert: `Apenas ${p.stock} unidade(s) restante(s)`,
            type: 'low_stock'
        }));

    // Alertas de validade
    const expiryAlerts = produtos
        .filter(p => p.data_validade && new Date(p.data_validade) <= thirtyDaysFromNow)
        .map(p => ({
            name: p.nome,
            alert: `Validade expira em ${new Date(p.data_validade).toLocaleDateString('pt-BR')}`,
            type: 'expiry'
        }));

    const alerts = [...stockAlerts, ...expiryAlerts];

    //Função de busca
    const normalizeString = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filteredProdutos = produtos.filter(p =>
        normalizeString(p.nome).includes(normalizeString(searchTerm))
    );

    //Funções de envio de formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('estoque.storeProduto'), {
            onSuccess: () => closeModal(),
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editPut(route('estoque.update', editingProductId), {
            onSuccess: () => closeEditModal(),
        });
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Estoque" />

                {/* Cabeçalho da Página */}
                <div className="mb-4">
                    <h2 className="display-6 mb-2" style={{ color: 'var(--main-text)', fontFamily: 'serif' }}>Controle de Estoque</h2>
                    <p className="text-secondary">Gerencie todos os produtos e prazos</p>
                </div>

                {/* Vista em Linha no Tablet/Mobile: Cards de Estatísticas + Blocos de Alertas lado a lado */}
                <div className="row g-3 mb-4 align-items-stretch d-xl-none">
                    {/* Cards de Estatísticas */}
                    <div className="col-12 col-md-6">
                        <div className="row g-2 h-100">
                            {stats.map((stat, index) => (
                                <div key={index} className="col-6">
                                    <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                                        <div className="card-body p-2 p-md-4 text-start">
                                            {/* Icone do Mobile */}
                                            <div className="mb-2">
                                                <div className="p-2 rounded d-inline-block" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                                    {stat.icon === 'box' ? (
                                                        <i className="bi bi-box fs-6"></i>
                                                    ) : (
                                                        <i className="bi bi-exclamation-triangle fs-6"></i>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="stat-card-value">{stat.value}</div>
                                            <div className="stat-card-title d-block">{stat.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Blocos de Alertas (Visível em linha com os cards de estatísticas no Tablet/Mobile) */}
                    <div className="col-12 col-md-6">
                        <div className="card border-0 shadow-sm p-3 p-md-4 h-100">
                            <h3 className="h6 fw-bold text-dark mb-3">Alertas de Estoque</h3>
                            <div className="d-flex flex-column gap-2">
                                {alerts.length > 0 ? alerts.slice(0, 2).map((item, idx) => {
                                    const isLowStock = item.alert.toLowerCase().includes('restante') || item.alert.toLowerCase().includes('restantes');
                                    const bgColor = isLowStock ? 'var(--status-red)' : 'var(--status-yellow)';
                                    const iconClass = isLowStock ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';
                                    return (
                                        <div key={idx} className="p-2 p-md-3 rounded-3 d-flex align-items-center gap-2 shadow-sm" style={{ backgroundColor: bgColor, color: isLowStock ? 'var(--white)' : 'var(--main-text)' }}>
                                            <i className={`bi ${iconClass} fs-5`}></i>
                                            <div className="text-truncate">
                                                <div className="fw-bold small">{item.name}</div>
                                                <div className="small opacity-85" style={{ fontSize: '0.75rem' }}>{item.alert}</div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="text-center text-muted small py-3">Nenhum alerta</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vista em Linha no  Desktop (XL):  Somente Estatísticas e Alertas no Sidebar */}
                <div className="row g-2 g-md-4 mb-4 d-none d-xl-flex">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-4 col-md-4 px-1 px-md-3">
                            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                                <div className="card-body p-4 text-start">
                                    {/* Icone do Desktop */}
                                    <div className="d-flex align-items-start justify-content-between mb-3">
                                        <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                            {stat.icon === 'box' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3.75h3.75M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="stat-card-value">{stat.value}</div>
                                    <div className="stat-card-title d-block">{stat.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal de Adicionar Produto */}
                <div className="row g-3 mb-4 align-items-center">
                    <div className="col-12 col-md-auto">
                        <button
                            className="btn btn-gold px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                            style={{ borderRadius: '10px' }}
                            onClick={openModal}
                        >
                            <span className="fs-5">+</span> Adicionar Produto
                        </button>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control border-1 bg-white text-secondary py-2"
                                placeholder="Buscar produto..."
                                style={{ borderRadius: '10px', fontSize: '0.9rem' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Layout do conteúdo: Duas colunas no desktop (xl), empilhadas no mobile/tablet */}
                <div className="row g-4 flex-column-reverse flex-xl-row mb-5">
                    {/* Left Column: Products List */}
                    <div className="col-12 col-xl-8">
                        <div className="card border-0 shadow-sm p-3 p-md-4">
                            <div className="mb-4">
                                <h3 className="h5 fw-bold text-dark mb-0">Produtos em Estoque</h3>
                            </div>

                            {/* Header da Tabela no Desktop */}
                            <div className="row align-items-center mb-3 px-4 d-none d-md-flex">
                                <div className="col-4 col-xl-4">
                                    <h3 className="h6 fw-bold text-muted mb-0">Produto</h3>
                                </div>
                                <div className="col-2 d-xl-none"></div>
                                <div className="col-2 col-xl-3 text-center">
                                    <h3 className="h6 fw-bold text-muted mb-0">Quantidade</h3>
                                </div>
                                <div className="col-2 col-xl-2 text-center">
                                    <h3 className="h6 fw-bold text-muted mb-0">Validade</h3>
                                </div>
                                <div className="col-2 col-xl-3"></div>
                            </div>

                            {/* Lista de Produtos como Cards */}
                            <div className="d-flex flex-column gap-3">
                                {filteredProdutos.length > 0 ? filteredProdutos.map((produto) => (
                                    <div key={produto.id} className="card border-0 shadow-sm p-3 p-md-4 bg-white rounded-4 border-bottom">
                                        {/* Layout do Card no Mobile */}
                                        <div className="d-md-none">
                                            <div className="row mb-2">
                                                <div className="col-4 text-muted small fw-bold">SKU:</div>
                                                <div className="col-8 text-secondary small">{produto.sku || '-'}</div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-4 text-muted small fw-bold">Produto:</div>
                                                <div className="col-8 text-dark fw-bold">{produto.nome}</div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-4 text-muted small fw-bold">Quantidade:</div>
                                                <div className="col-8 text-secondary small">{produto.stock} unid.</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center flex-grow-1">
                                                        <span className="text-muted small fw-bold me-2" style={{ width: '33.33%' }}>Validade:</span>
                                                        <span className="text-secondary small">{produto.data_validade ? new Date(produto.data_validade).toLocaleDateString('pt-BR') : '-'}</span>
                                                    </div>
                                                    <button
                                                        className="btn btn-sm text-white px-4 py-2"
                                                        style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}
                                                        onClick={() => openEditModal(produto)}
                                                    >
                                                        <i className="bi bi-pencil-square me-1"></i> Editar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Vista em Linha no Desktop/Tablet */}
                                        <div className="d-none d-md-flex row align-items-center w-100 mx-0">
                                            <div className="col-4 col-xl-4">
                                                <div className="fw-bold text-dark">{produto.nome}</div>
                                                <div className="small text-muted">{produto.sku || 'Sem SKU'}</div>
                                            </div>
                                            <div className="col-2 d-xl-none text-center small text-secondary">
                                                -
                                            </div>
                                            <div className="col-2 col-xl-3 text-center text-secondary small">
                                                {produto.stock} unid.
                                            </div>
                                            <div className="col-2 col-xl-2 text-center text-secondary small">
                                                {produto.data_validade ? new Date(produto.data_validade).toLocaleDateString('pt-BR') : '-'}
                                            </div>
                                            <div className="col-2 col-xl-3 text-end">
                                                <button
                                                    className="btn btn-gold btn-sm px-3 px-xl-4 py-2 d-inline-flex align-items-center gap-2 ms-auto"
                                                    style={{ borderRadius: '8px' }}
                                                    onClick={() => openEditModal(produto)}
                                                >
                                                    <i className="bi bi-pencil-square"></i> Editar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-5 text-muted">Nenhum produto em estoque</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Coluna Direita: Alertas (Sidebar apenas no desktop xl+) */}
                    <div className="col-12 col-xl-4 d-none d-xl-block">
                        <div className="card border-0 shadow-sm p-4">
                            <h3 className="h5 fw-bold text-dark mb-4">Alertas de Estoque</h3>
                            <div className="d-flex flex-column gap-3">
                                {alerts.length > 0 ? alerts.map((item, idx) => {
                                    const isLowStock = item.alert.toLowerCase().includes('restante');
                                    const bgColor = isLowStock ? 'var(--status-red)' : 'var(--status-yellow)';
                                    const iconClass = isLowStock ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';

                                    return (
                                        <div key={idx} className="p-3 rounded-4 d-flex align-items-center gap-3 shadow-sm" style={{ backgroundColor: bgColor, color: isLowStock ? 'var(--white)' : 'var(--main-text)' }}>
                                            <div className="fs-4">
                                                <i className={`bi ${iconClass}`}></i>
                                            </div>
                                            <div>
                                                <div className="fw-bold small">{item.name}</div>
                                                <div className="small opacity-85">{item.alert}</div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="text-center text-muted small py-3">Sem alertas</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            {/* Modal Novo Produto */}
            <Modal show={showNewProductModal} onClose={closeModal} maxWidth="md">
                <div className="p-4 p-md-5 bg-white">
                    <h4 className="fw-bold mb-4" style={{ color: 'var(--main-text)' }}>Novo Produto</h4>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="form-label small text-secondary fw-medium mb-1">Nome</label>
                            <input
                                type="text"
                                className={`form-control bg-light border-0 py-2 rounded-3 ${errors.nome ? 'is-invalid' : ''}`}
                                value={data.nome}
                                onChange={e => setData('nome', e.target.value)}
                            />
                            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                        </div>

                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Quantidade</label>
                                <input
                                    type="number"
                                    className={`form-control bg-light border-0 py-2 rounded-3 ${errors.stock ? 'is-invalid' : ''}`}
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                />
                                {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                            </div>
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Validade</label>
                                <input
                                    type="date"
                                    className={`form-control bg-light border-0 py-2 rounded-3 ${errors.data_validade ? 'is-invalid' : ''}`}
                                    value={data.data_validade}
                                    onChange={e => setData('data_validade', e.target.value)}
                                />
                                {errors.data_validade && <div className="invalid-feedback d-block">{errors.data_validade}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-gold px-5 py-2 fw-medium"
                                style={{ borderRadius: '10px', minWidth: '200px' }}
                                disabled={processing}
                            >
                                {processing ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal Editar Produto */}
            <Modal show={showEditProductModal} onClose={closeEditModal} maxWidth="md">
                <div className="p-4 p-md-5 bg-white">
                    <h4 className="fw-bold mb-4" style={{ color: 'var(--main-text)' }}>Editar Produto</h4>

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
                                <label className="form-label small text-secondary fw-medium mb-1">Quantidade</label>
                                <input
                                    type="number"
                                    className={`form-control bg-light border-0 py-2 rounded-3 ${editErrors.stock ? 'is-invalid' : ''}`}
                                    value={editData.stock}
                                    onChange={e => setEditData('stock', e.target.value)}
                                />
                                {editErrors.stock && <div className="invalid-feedback">{editErrors.stock}</div>}
                            </div>
                            <div className="col-6">
                                <label className="form-label small text-secondary fw-medium mb-1">Validade</label>
                                <input
                                    type="date"
                                    className={`form-control bg-light border-0 py-2 rounded-3 ${editErrors.data_validade ? 'is-invalid' : ''}`}
                                    value={editData.data_validade}
                                    onChange={e => setEditData('data_validade', e.target.value)}
                                />
                                {editErrors.data_validade && <div className="invalid-feedback d-block">{editErrors.data_validade}</div>}
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
                            <button
                                type="submit"
                                className="btn btn-gold px-5 py-2 fw-medium"
                                style={{ borderRadius: '10px', minWidth: '150px' }}
                                disabled={editProcessing}
                            >
                                {editProcessing ? 'Salvando...' : 'Salvar'}
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
                        Tem certeza que deseja apagar o produto?
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
