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

            {/* Cards de Estatísticas */}
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        {stat.icon === 'box' ? (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
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

            <div className="mb-4">
                <button className="btn text-white px-4 shadow-sm" style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}>
                    + Novo Produto
                </button>
            </div>

            <div className="row g-4">
                {/* Lista de Produtos Centralizada */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        {/* Cabeçalho da Tabela Alinhado */}
                        <div className="row align-items-center mb-3 px-3">
                            <div className="col-5">
                                <h3 className="h6 fw-bold text-muted  mb-0">Produto</h3>
                            </div>
                            <div className="col-3 text-center">
                                <h3 className="h6 fw-bold text-muted e mb-0">Quantidade</h3>
                            </div>
                            <div className="col-2 text-center">
                                <h3 className="h6 fw-bold text-muted  mb-0">Validade</h3>
                            </div>
                            <div className="col-2"></div>
                        </div>

                        <div className="d-flex flex-column gap-2">
                            {stocks.map((stock, idx) => (
                                <div key={idx} className="row align-items-center p-3 bg-light rounded mx-0 transition hover-shadow">
                                    {/* Nome e Código */}
                                    <div className="col-5">
                                        <div className="fw-bold text-dark">{stock.produto}</div>
                                        <div className="small text-muted">{stock.code}</div>
                                    </div>

                                    {/* Quantidade Centralizada */}
                                    <div className="col-3 text-center">
                                        <span className={` ${parseInt(stock.quantidade) <= 1 }`}>
                                            {stock.quantidade}
                                        </span>
                                    </div>

                                    {/* Validade Centralizada */}
                                    <div className="col-2 text-center text-secondary fw-medium">
                                        {stock.validade}
                                    </div>

                                    {/* Ação */}
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

                {/* Coluna de Alertas com Lógica de Cores */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4">
                        <h3 className="h5 fw-bold text-dark mb-4">Alertas de Estoque</h3>
                        <div className="d-flex flex-column gap-3">
                            {alerts.map((item, idx) => {
                                // Lógica para definir a cor de fundo
                                const isQuantidade = item.alert.toLowerCase().includes('unidade');
                                const isValidade = item.alert.toLowerCase().includes('validade');

                                const bgColor = isQuantidade ? '#FEE2E2' : (isValidade ? '#FEF9C3' : '#F3F4F6');
                                const borderColor = isQuantidade ? '#EF4444' : (isValidade ? '#FACC15' : '#D1D5DB');

                                return (
                                    <div key={idx}
                                         className="p-3 rounded  border-4 shadow-sm"
                                         style={{ backgroundColor: bgColor, borderLeftColor: borderColor }}>
                                        <div className="fw-bold text-dark small">{item.name}</div>
                                        <div className="small text-muted">{item.alert}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
