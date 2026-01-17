import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Estoque() {
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
        <AuthenticatedLayout>
            <Head title="Estoque" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2" style={{ color: 'var(--main-text)', fontFamily: 'serif' }}>Controle de Estoque</h2>
                <p className="text-secondary">Gerencie todos os produtos e prazos</p>
            </div>

            {/* Top Row: Cards and Alerts */}
            <div className="row g-2 mb-4 align-items-stretch">
                {/* Stats Cards - each col-6 takes 50% on mobile */}
                {stats.map((stat, index) => (
                    <div key={index} className="col-6 col-md-3 px-1 px-md-3">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body p-2 p-md-4 d-flex flex-column justify-content-center text-center text-md-start">
                                <div className="mb-2 mb-md-3">
                                    <div className="p-2 p-md-3 rounded-3 d-inline-flex" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-green)' }}>
                                        {stat.icon === 'box' ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                        )}
                                    </div>
                                </div>
                                <div className="h3 fw-bold mb-0 mb-md-1" style={{ color: 'var(--main-text)' }}>{stat.value}</div>
                                <div className="text-secondary" style={{ fontSize: '10px' }}>{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Alerts Section - Full width on mobile */}
            <div className="col-12 mb-4 d-md-none">
                <div className="card border-0 shadow-sm p-4 h-100">
                    <h3 className="h6 fw-bold text-dark mb-3">Alertas de Estoque</h3>
                    <div className="d-flex flex-column gap-3">
                        {alerts.slice(0, 2).map((item, idx) => {
                            const isQuantidade = item.alert.toLowerCase().includes('unidade');
                            const bgColor = isQuantidade ? '#F8D7DA' : '#FFF3CD';
                            const iconColor = isQuantidade ? '#DC3545' : '#856404';
                            const textColor = isQuantidade ? '#721C24' : '#856404';

                            return (
                                <div key={idx} className="p-3 rounded-3 d-flex align-items-center gap-3" style={{ backgroundColor: bgColor }}>
                                    <div style={{ color: iconColor }}>
                                        {isQuantidade ? (
                                            <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                                        ) : (
                                            <i className="bi bi-exclamation-circle-fill fs-5"></i>
                                        )}
                                    </div>
                                    <div>
                                        <div className="fw-bold small" style={{ color: textColor }}>{item.name}</div>
                                        <div className="small opacity-75" style={{ color: textColor }}>{item.alert}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>


            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-3 p-md-4">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                            <h3 className="h5 fw-bold text-dark mb-0">Produtos em Estoque</h3>
                            <div className="d-flex gap-2">
                                <div className="input-group" style={{ maxWidth: '100%' }}>
                                    <input type="text" className="form-control bg-light border-1 py-2" placeholder="Buscar produto..." style={{ borderRadius: '10px 0 0 10px' }} />
                                    <button className="btn btn-light border-1 border-start-0 px-3" style={{ borderRadius: '0 10px 10px 0' }}>
                                        <i className="bi bi-filter"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* List of Products as Cards for Mobile */}
                        <div className="d-flex flex-column gap-3">
                            {stocks.map((stock, idx) => (
                                <div key={idx} className="card border-0 shadow-sm p-4 bg-white rounded-4">
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
                                                <button className="btn btn-sm text-white px-4 py-2" style={{ backgroundColor: '#C5A365', borderRadius: '8px' }}>
                                                    <i className="bi bi-pencil-square me-1"></i> Editar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop/Tablet Row View */}
                                    <div className="d-none d-md-flex row align-items-center w-100 mx-0">
                                        <div className="col-4">
                                            <div className="fw-bold text-dark">{stock.produto}</div>
                                            <div className="small text-muted">{stock.code}</div>
                                        </div>
                                        <div className="col-2 text-center small text-secondary">
                                            {idx === 0 ? 'Séruns' : idx === 1 ? 'Peelings' : idx === 2 ? 'Hidratantes' : idx === 3 ? 'Proteção' : 'Máscaras'}
                                        </div>
                                        <div className="col-2 text-center">{stock.quantidade}</div>
                                        <div className="col-2 text-center">{stock.validade}</div>
                                        <div className="col-2 text-end">
                                            <button className="btn btn-sm text-white px-3 d-flex align-items-center gap-1 ms-auto" style={{ backgroundColor: '#C5A365' }}>
                                                <i className="bi bi-pencil-square"></i> Editar
                                            </button>
                                        </div>
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
