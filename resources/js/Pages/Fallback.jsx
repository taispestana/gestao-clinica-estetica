import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function Fallback() {
    return (
        <>
            <Head title="Página Não Encontrada" />
            <div
                className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3"
                style={{
                    background: 'radial-gradient(circle at center, var(--white) 0%, var(--light-gray) 100%)',
                    color: 'var(--main-text)'
                }}
            >
                <div className="mb-2 position-relative">

                    <div className="mb-0">
                        <img src="/images/404error.png" alt="404 Error" className="img-fluid" style={{ maxHeight: '300px' }} />
                    </div>
                    <h4
                        className="display-1 fw-bold"
                        style={{
                            fontSize: '6rem',
                            color: '#31544E',
                            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                    >
                        404
                    </h4>
                </div>

                <h2 className="mb-3 fw-bold display-6">Ups! Página não encontrada!</h2>
                <p className="mb-4 fs-5" style={{ color: 'var(--main-text)' }}>
                    A página que procura não existe ou foi removida.
                </p>

                <Link
                    href="/"
                    className="btn btn-gold btn-lg px-4 py-3 d-inline-flex align-items-center gap-2 shadow-sm"
                    style={{ borderRadius: '8px' }}
                >
                    <i className="bi bi-house-door-fill"></i>
                    <span>Voltar para a Página Inicial</span>
                </Link>


            </div>
            <Footer />
        </>
    );
}
