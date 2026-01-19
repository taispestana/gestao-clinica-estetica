import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Estoque() {
    const [showNewProductModal, setShowNewProductModal] = useState(false);

    const openModal = () => setShowNewProductModal(true);
    const closeModal = () => setShowNewProductModal(false);

    const stats = [
        { title: 'Total de Produtos', value: '150', icon: 'box' },
        { title: 'Estoque Baixo', value: '5', icon: 'alert' },
    ];

    const stocks = [
        { produto: 'Sérum Vitamina C', code: 'SKU: SER001', quantidade: '5 unid.', validade: '10/05/2026' },
        { produto: 'Gel Peeling Facial', code: 'SKU: GEL002', quantidade: '0 unid.', validade: '-' },
        { produto: 'Hidratante Facial', code: 'SKU: HID003', quantidade: '4 unid.', validade: '25/12/2025' },
        { produto: 'Protetor Solar FPS 60', code: 'SKU: PRO004', quantidade: '3 unid.', validade: '31/12/2025' },
        { produto: 'Máscara Argila Verde', code: 'SKU: MAS005', quantidade: '1 unid.', validade: '31/12/2025' },
    ];

    const alerts = [
        { name: 'Mascara Argila Verde', alert: 'Apenas 1 unidade(s) restante(s)' },
        { name: 'Hidratante Facial', alert: 'Validade expira em 25/12/2026' },
        { name: 'Gel Peeling Facial', alert: 'Validade expira em 25/12/2026' },
    ];

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Estoque" />

                {/* Cabeçalho da Página */}
                <div className="mb-4">
                    <h2 className="display-6 mb-2" style={{ color: 'var(--main-text)', fontFamily: 'serif' }}>Controle de Estoque</h2>
                    <p className="text-secondary">Gerencie todos os produtos e prazos</p>
                </div>

                {/* Tablet/Mobile Top Row: Stats + Alerts Side-by-Side on Tablet (MD/LG) */}
                <div className="row g-3 mb-4 align-items-stretch d-xl-none">
                    {/* Stats Cards */}
                    <div className="col-12 col-md-6">
                        <div className="row g-2 h-100">
                            {stats.map((stat, index) => (
                                <div key={index} className="col-6">
                                    <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                                        <div className="card-body p-2 p-md-4 text-start">
                                            {/* Mobile Icon */}
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

                    {/* Alerts Block (Visible on Tablet/Mobile top row) */}
                    <div className="col-12 col-md-6">
                        <div className="card border-0 shadow-sm p-3 p-md-4 h-100">
                            <h3 className="h6 fw-bold text-dark mb-3">Alertas de Estoque</h3>
                            <div className="d-flex flex-column gap-2">
                                {alerts.slice(0, 2).map((item, idx) => {
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
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop (XL) Top Row (Just Stats - Alerts are in the sidebar for XL) */}
                <div className="row g-2 g-md-4 mb-4 d-none d-xl-flex">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-4 col-md-4 px-1 px-md-3">
                            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                                <div className="card-body p-4 text-start">
                                    {/* Desktop Icon Container */}
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

                {/* Filtros e Ações (Fora do container) */}
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
                            <input type="text" className="form-control border-1 bg-white text-secondary py-2" placeholder="Buscar produto..." style={{ borderRadius: '10px 0 0 10px', fontSize: '0.9rem' }} />
                            <button className="btn btn-filter-gold pb-2 border-start-0">
                                <i className="bi bi-funnel-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout: Two columns on desktop (xl), stacked on mobile/tablet */}
                <div className="row g-4 flex-column-reverse flex-xl-row mb-5">
                    {/* Left Column: Products List */}
                    <div className="col-12 col-xl-8">
                        <div className="card border-0 shadow-sm p-3 p-md-4">
                            <div className="mb-4">
                                <h3 className="h5 fw-bold text-dark mb-0">Produtos em Estoque</h3>
                            </div>

                            {/* DESKTOP TABLE HEADERS */}
                            <div className="row align-items-center mb-3 px-4 d-none d-md-flex">
                                <div className="col-4 col-xl-4">
                                    <h3 className="h6 fw-bold text-muted mb-0">Produto</h3>
                                </div>
                                <div className="col-2 d-xl-none"></div> {/* Spacer for Category on Tablet */}
                                <div className="col-2 col-xl-4 text-center">
                                    <h3 className="h6 fw-bold text-muted mb-0">Quantidade</h3>
                                </div>
                                <div className="col-2 col-xl-2 text-center">
                                    <h3 className="h6 fw-bold text-muted mb-0">Validade</h3>
                                </div>
                                <div className="col-2 col-xl-2"></div> {/* Spacer for Action column */}
                            </div>

                            {/* List of Products as Cards */}
                            <div className="d-flex flex-column gap-3">
                                {stocks.map((stock, idx) => (
                                    <div key={idx} className="card border-0 shadow-sm p-3 p-md-4 bg-white rounded-4 border-bottom">
                                        {/* Mobile Card Layout */}
                                        <div className="d-md-none">
                                            <div className="row mb-2">
                                                <div className="col-4 text-muted small fw-bold">ID:</div>
                                                <div className="col-8 text-secondary small">{stock.code}</div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-4 text-muted small fw-bold">Produto:</div>
                                                <div className="col-8 text-dark fw-bold">{stock.produto}</div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-4 text-muted small fw-bold">Quantidade:</div>
                                                <div className="col-8 text-secondary small">{stock.quantidade}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-4 text-muted small fw-bold">Validade:</div>
                                                <div className="col-8 text-secondary small">{stock.validade}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-end">
                                                    <button className="btn btn-sm text-white px-4 py-2" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}>
                                                        <i className="bi bi-pencil-square me-1"></i> Editar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop/Tablet Row View */}
                                        <div className="d-none d-md-flex row align-items-center w-100 mx-0">
                                            <div className="col-4 col-xl-4">
                                                <div className="fw-bold text-dark">{stock.produto}</div>
                                                <div className="small text-muted">{stock.code}</div>
                                            </div>
                                            <div className="col-2 d-xl-none text-center small text-secondary">
                                                {idx === 0 ? 'Séruns' : idx === 1 ? 'Peelings' : idx === 2 ? 'Hidratantes' : idx === 3 ? 'Proteção' : 'Máscaras'}
                                            </div>
                                            <div className="col-2 col-xl-4 text-center text-secondary small">
                                                {stock.quantidade}
                                            </div>
                                            <div className="col-2 col-xl-2 text-center text-secondary small">
                                                {stock.validade}
                                            </div>
                                            <div className="col-2 col-xl-2 text-end">
                                                <button className="btn btn-gold btn-sm px-3 px-xl-4 py-2 d-inline-flex align-items-center gap-2 ms-auto" style={{ borderRadius: '8px' }}>
                                                    <i className="bi bi-pencil-square"></i> Editar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Alerts (Sidebar only on desktop xl+) */}
                    <div className="col-12 col-xl-4 d-none d-xl-block">
                        <div className="card border-0 shadow-sm p-4">
                            <h3 className="h5 fw-bold text-dark mb-4">Alertas de Estoque</h3>
                            <div className="d-flex flex-column gap-3">
                                {alerts.map((item, idx) => {
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
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            {/* Modal Novo Produto */}
            <Modal show={showNewProductModal} onClose={closeModal} maxWidth="md">
                <div className="p-4 p-md-5 bg-white">
                    <h4 className="fw-bold mb-4" style={{ color: 'var(--main-text)' }}>Produto</h4>

                    <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                        <div className="mb-4">
                            <label className="form-label small text-secondary fw-medium mb-1">Nome</label>
                            <input type="text" className="form-control bg-light border-0 py-2 rounded-3" />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small text-secondary fw-medium mb-1">Quantidade</label>
                            <div className="position-relative">
                                <select className="form-select bg-light border-0 py-2 rounded-3 pe-5" style={{ maxWidth: '160px', appearance: 'none' }}>
                                    <option value=""></option>
                                    <option value="1">1 unid.</option>
                                    <option value="5">5 unid.</option>
                                    <option value="10">10 unid.</option>
                                </select>
                                <div className="position-absolute end-0 top-50 translate-middle-y me-3 pointer-events-none" style={{ right: 'auto', left: '130px' }}>
                                    <i className="bi bi-chevron-down text-secondary small"></i>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="form-label small text-secondary fw-medium mb-1">Validade</label>
                            <div className="input-group" style={{ maxWidth: '180px' }}>
                                <input type="text" className="form-control bg-light border-0 py-2 rounded-start-3" placeholder="dd/mm/aa" />
                                <span className="input-group-text bg-light border-0 rounded-end-3 text-secondary">
                                    <i className="bi bi-calendar-event"></i>
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-gold px-5 py-2 fw-medium" style={{ borderRadius: '10px', minWidth: '200px' }}>
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
