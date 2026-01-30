import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Mensagens({ aniversariantes = [], lembretes = [] }) {

    //Estatísticas
    const stats = [
        {
            title: 'Aniversariantes do Mês',
            value: aniversariantes.length.toString(),
            icon: 'users',
            color: 'var(--status-green)'
        },
        {
            title: 'Lembrete de Marcação',
            value: lembretes.length.toString(),
            icon: 'calendar-month',
            color: 'var(--status-green)'
        },
    ];

    //Função de envio de mensagem
    const handleWhatsAppMessage = (phone, name, type, additionalData = null) => {
        if (!phone) {
            alert('Este cliente não tem um número de telemóvel registado.');
            return;
        }

        // Limpa o número (remove espaços e garante formato internacional)
        let cleanPhone = phone.replace(/\s+/g, '');
        // Se o número começar com 9, assume-se que é português (+351)
        if (cleanPhone.startsWith('9') && cleanPhone.length === 9) {
            cleanPhone = '351' + cleanPhone;
        }
        //Mensagem de aniversário
        let message = '';

        if (type === 'birthday') {
            message = `Olá ${name}! Hoje você está de Parabéns! Mas quem ganha o presente somos nós por ter uma cliente tão especial como VOCÊ! Para comemorarmos juntas, no mês dos seus anos tens direito a um miminho, um voucher de 10€ para ser utilizado em um dos nossos tratamentos com valor mínimo de 45€.`;
        } else if (type === 'reminder') {
            const dateObj = new Date(additionalData.data);
            const data = dateObj.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit'
            });
            const hora = dateObj.toLocaleTimeString('pt-PT', {
                hour: '2-digit',
                minute: '2-digit'
            });
            //Mensagem de lembrete  marcação
            message = `Olá ${name}! Lembramos que tem uma marcação para "${additionalData.tratamento}" no dia ${data} às ${hora}. Agradecemos que confirme a sua presença. Lembramos que as desmarcações terão de ser feitas com 48 horas de antecedência. Até breve!`;
        }
        //Envia a mensagem
        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
    //Formata a data
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Mensagens" />

            {/* Cabeçalho da Página */}
            <div className="mb-4">
                <h2 className="display-6 mb-2">Mensagens</h2>
                <p className="text-secondary">Envie lembretes e felicitações via WhatsApp para os seus clientes.</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="row g-2 g-md-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-6 col-md-4 px-1 px-md-3">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body p-2 p-md-4 text-start">
                                <div className="d-none d-md-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        {stat.icon === 'users' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
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
                                <div className="d-md-none mb-2">
                                    <div className="p-2 rounded d-inline-block" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        <i className={`bi bi-${stat.icon === 'users' ? 'people' : 'calendar3'} fs-6`}></i>
                                    </div>
                                </div>
                                <div className="stat-card-value">{stat.value}</div>
                                <div className="stat-card-title">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



            {/* Seção de Lembretes */}
            <h2 className="h5 fw-bold text-dark mb-3">Lembrar Marcações </h2>
            <div className="card border-0 shadow-sm p-3 p-md-4 mb-5">
                {lembretes.length === 0 ? (
                    <p className="text-center py-4 text-secondary">Não há agendamentos próximos para lembrar.</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {lembretes.map((agendamento, idx) => (
                            <div key={idx} className="card border-0 shadow-sm p-3 bg-light rounded-4">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-4">
                                        <div className="fw-semibold text-dark">{agendamento.cliente?.name}</div>
                                        <div className="text--secondary small">{agendamento.tratamento?.nome || 'Tratamento'}</div>
                                    </div>
                                    <div className="col-6 col-md-4 text-md-center">
                                        <div className="text-secondary small">
                                            {new Date(agendamento.data_hora_inicio).toLocaleString('pt-PT', {
                                                 day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-4 text-end">
                                        <button
                                            onClick={() => handleWhatsAppMessage(
                                                agendamento.cliente?.telemovel,
                                                agendamento.cliente?.name,
                                                'reminder',
                                                {
                                                    data: agendamento.data_hora_inicio,
                                                    tratamento: agendamento.tratamento?.nome
                                                }
                                            )}
                                            className="btn btn-sm text-white px-3 py-2"
                                            style={{ backgroundColor: 'var(--primary-button)', borderRadius: '8px' }}
                                        >
                                            <i className="bi bi-clock-history me-2"></i> Lembrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Seção de Aniversariantes */}
            <h2 className="h5 fw-bold text-dark mb-3 mt-5">Aniversariantes do Mês</h2>
            <div className="card border-0 shadow-sm p-3 p-md-4 mb-5">
                {aniversariantes.length === 0 ? (
                    <p className="text-center py-4 text-secondary">Nenhum aniversariante encontrado para este mês.</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {aniversariantes.map((cliente, idx) => (
                            <div key={idx} className="card border-0 shadow-sm p-3 bg-light rounded-4">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-4">
                                        <div className="fw-semibold text-dark">{cliente.name}</div>
                                        <div className="text-secondary small">{cliente.telemovel || 'Sem contacto'}</div>
                                    </div>
                                    <div className="col-6 col-md-4 text-md-center">
                                        <span className="badge bg-white text-dark border px-3 py-2">
                                            {formatDate(cliente.data_nascimento)}
                                        </span>
                                    </div>
                                    <div className="col-6 col-md-4 text-end">
                                        <button
                                            onClick={() => handleWhatsAppMessage(cliente.telemovel, cliente.name, 'birthday')}
                                            className="btn btn-sm text-white px-3 py-2"
                                            style={{ backgroundColor: 'var(--primary-button', borderRadius: '8px' }}
                                        >
                                            <i className="bi bi-whatsapp me-2"></i> Parabéns
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
