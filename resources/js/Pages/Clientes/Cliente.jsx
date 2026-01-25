import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Cliente({ cliente }) {
    const [activeTab, setActiveTab] = useState('agendamentos');
    const [showEditModal, setShowEditModal] = useState(false);

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

    const customer = {
        name: cliente.name,
        since: new Date(cliente.created_at).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }),
        age: calculateAge(cliente.data_nascimento),
        status: 'Ativo',
        phone: cliente.telemovel,
        email: cliente.email,
        nif: cliente.nif,
        address: cliente.endereco,
        occupation: cliente.profissao,
    };

    const stats = {
        totalSessions: 28,
        lastVisit: '15/12/2025',
        nextProcedure: '10/01/2026',
        totalSpent: '3.240 €'
    };

    const appointments = [
        {
            title: 'Massagem Terapêutica',
            therapist: 'Danielle',
            date: '10/01/2026',
            price: '80 €'
        },
        {
            title: 'Limpeza de Pele Profunda',
            therapist: 'Danielle',
            date: '15/01/2026',
            price: '80 €'
        },
        {
            title: 'Peeling Químico',
            therapist: 'Danielle',
            date: '15/02/2026',
            price: '80 €'
        }
    ];

    const procedureHistory = [
        {
            title: 'Limpeza de Pele Profunda',
            date: '15/12/2025',
            professional: 'Danielle',
            notes: 'Procedimento realizado com sucesso. Pele apresentou boa resposta ao tratamento.',
            price: '80 €'
        },
        {
            title: 'Massagem Terapêutica',
            date: '28/11/2025',
            professional: 'Danielle',
            notes: 'Aplicação na região frontal e glabela. Paciente orientada sobre cuidados pós-procedimento.',
            price: '850 €'
        },
        {
            title: 'Peeling Químico',
            date: '10/11/2025',
            professional: 'Danielle',
            notes: 'Peeling com ácido glicólico 30%. Boa tolerância ao procedimento.',
            price: '320 €'
        }
    ];

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
                                    <span className="badge rounded-pill text-dark fw-normal px-3" style={{ backgroundColor: 'var(--status-green)' }}>
                                        {customer.status}
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex flex-column gap-3 mb-4">
                                <div>
                                    <small className="text-secondary d-block">Telefone</small>
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
                                    <span className="text-secondary">Próxima Procedimento</span>
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
                                        <button className="btn btn-gold px-4 py-2" style={{ borderRadius: '8px' }}>
                                            <span className="me-2">+</span> Novo Procedimento
                                        </button>
                                    </div>

                                    <div className="d-flex flex-column gap-3 mb-4">
                                        {appointments.map((apt, idx) => (
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
                                        ))}
                                    </div>

                                    <div className="text-center mt-auto pt-3">
                                        <button className="btn btn-gold px-5 py-2" style={{ borderRadius: '8px' }}>
                                            Ver Mais Agendamentos
                                        </button>
                                    </div>
                                </>
                            )}

                            {activeTab === 'anamnese' && (
                                <div className="anamnese-form">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="mb-0">Ficha de Anamnese</h5>
                                        <button className="btn btn-gold px-4 py-2" style={{ borderRadius: '8px' }}>
                                            <i className="bi bi-pencil-square me-2"></i>
                                            Editar Anamnese
                                        </button>
                                    </div>

                                    {/* Dados Pessoais */}
                                    <div className="mb-5">
                                        <h6 className="fw-bold mb-3">Dados Pessoais</h6>
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <label className="form-label small text-secondary mb-1">Nome Completo</label>
                                                <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer.name} />
                                            </div>
                                            <div className="col-4 col-md-3">
                                                <label className="form-label small text-secondary mb-1">Idade</label>
                                                <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer.age} />
                                            </div>
                                            <div className="col-8 col-md-5">
                                                <label className="form-label small text-secondary mb-1">Data de Nascimento</label>
                                                <input type="text" className="form-control bg-light border-0 py-2" placeholder="27/09/1989" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small text-secondary mb-1">Telemóvel</label>
                                                <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer.phone} />
                                            </div>
                                            <div className="col-md-7">
                                                <label className="form-label small text-secondary mb-1">Email</label>
                                                <input type="email" className="form-control bg-light border-0 py-2" defaultValue={customer.email} />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label small text-secondary mb-1">Profissão</label>
                                                <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer.occupation} />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small text-secondary mb-1">Como nos conheceu?</label>
                                                <div className="d-flex flex-wrap gap-x-4 gap-y-2 mt-1">
                                                    <div className="d-flex flex-wrap gap-3">
                                                        {['Facebook', 'Instagram', 'Indicação de amigos', 'Google/Motor de pesquisa'].map((opt, i) => (
                                                            <div key={i} className="form-check">
                                                                <input className="form-check-input" type="radio" name="origin" id={`opt${i}`} />
                                                                <label className="form-check-label small" htmlFor={`opt${i}`}>
                                                                    {opt}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="origin" id="opt4" />
                                                            <label className="form-check-label small" htmlFor="opt4">Passagem pela clínica</label>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className="form-check mb-0">
                                                                <input className="form-check-input" type="radio" name="origin" id="opt-outro" />
                                                                <label className="form-check-label small text-nowrap" htmlFor="opt-outro">Outro:</label>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '150px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hábitos Diários */}
                                    <div className="mb-5">
                                        <h6 className="fw-bold mb-3">Hábitos Diários</h6>
                                        <div className="d-flex flex-column gap-3">
                                            <div>
                                                <label className="small text-secondary d-block mb-1">Exposição ao sol?</label>
                                                <div className="d-flex flex-wrap gap-4">
                                                    {['Nunca', 'Raramente', 'Frequentemente', 'Diariamente'].map((opt, i) => (
                                                        <div key={i} className="form-check">
                                                            <input className="form-check-input" type="radio" name="sol" id={`sol${i}`} defaultChecked={opt === 'Frequentemente'} />
                                                            <label className="form-check-label small" htmlFor={`sol${i}`}>{opt}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="small text-secondary d-block mb-1">É fumador(a)?</label>
                                                <div className="d-flex flex-wrap gap-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="fuma" id="fuma-sim" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="fuma-sim">Sim (15 cigarros/dia)</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="fuma" id="fuma-nao" />
                                                        <label className="form-check-label small" htmlFor="fuma-nao">Não</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="small text-secondary d-block mb-1">Ingestão de líquidos (Água):</label>
                                                <div className="d-flex flex-wrap gap-4">
                                                    {['Menos de 1 litro/dia', '1 a 2 litros/dia', 'Mais de 2 litros/dia'].map((opt, i) => (
                                                        <div key={i} className="form-check">
                                                            <input className="form-check-input" type="radio" name="agua" id={`agua${i}`} defaultChecked={i === 0} />
                                                            <label className="form-check-label small" htmlFor={`agua${i}`}>{opt}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="small text-secondary d-block mb-1">Alimentação predominante:</label>
                                                <div className="d-flex flex-wrap gap-4">
                                                    {['Equilibrada', 'Rica em açúcares/doces', 'Rica em gorduras/fritos', 'Rica em processados/fast food'].map((opt, i) => (
                                                        <div key={i} className="form-check">
                                                            <input className="form-check-input" type="radio" name="alimento" id={`alim${i}`} defaultChecked={i === 1} />
                                                            <label className="form-check-label small" htmlFor={`alim${i}`}>{opt}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="small text-secondary d-block mb-1">Pratica atividade física?</label>
                                                <div className="d-flex flex-wrap gap-4">
                                                    {['Não (sedentário)', 'Sim (1-2 x /semana)', 'Sim (3 x ou mais/semana)'].map((opt, i) => (
                                                        <div key={i} className="form-check">
                                                            <input className="form-check-input" type="radio" name="treino" id={`treino${i}`} defaultChecked={i === 0} />
                                                            <label className="form-check-label small" htmlFor={`treino${i}`}>{opt}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Histórico Estético e Clínico */}
                                    <div className="mb-5">
                                        <h6 className="fw-bold mb-3">Histórico Estético e Clínico</h6>
                                        <div className="d-flex flex-column gap-3">
                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">Já realizou cirurgia plástica?</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-4 ms-2">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="cirurgia" id="ciru-nao" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="ciru-nao">Não</label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="cirurgia" id="ciru-sim" />
                                                            <label className="form-check-label small text-nowrap" htmlFor="ciru-sim">Sim (Qual(is):</label>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '300px' }} />
                                                        <span className="small">)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">Já fez tratamentos estéticos anteriores?</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-4 ms-2">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="trat-ant" id="trat-nao" />
                                                        <label className="form-check-label small" htmlFor="trat-nao">Não</label>
                                                    </div>
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="trat-ant" id="trat-sim" defaultChecked />
                                                        <label className="form-check-label small text-nowrap" htmlFor="trat-sim">Sim (Qual(is): Limpeza de pele)</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">Faz algum tratamento médico atual?</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-4 ms-2">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="medico" id="med-nao" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="med-nao">Não</label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="medico" id="med-sim" />
                                                            <label className="form-check-label small text-nowrap" htmlFor="med-sim">Sim (Qual(is):</label>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '300px' }} />
                                                        <span className="small">)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">Possui alergias?</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-4 ms-2">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="alergia" id="ale-nao" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="ale-nao">Não</label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="alergia" id="ale-sim" />
                                                            <label className="form-check-label small text-nowrap" htmlFor="ale-sim">Sim (Especifique:</label>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '300px' }} />
                                                        <span className="small">)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">É diabética(o)?</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-4 ms-2">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="diabetes" id="dia-nao" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="dia-nao">Não</label>
                                                    </div>
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="diabetes" id="dia-sim-1" />
                                                        <label className="form-check-label small" htmlFor="dia-sim-1">Sim (Tipo I)</label>
                                                    </div>
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="diabetes" id="dia-sim-2" />
                                                        <label className="form-check-label small" htmlFor="dia-sim-2">Sim (Tipo II)</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">Antecedentes Oncológicos?</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-4 ms-2">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="onco" id="onco-nao" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="onco-nao">Não</label>
                                                    </div>
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="onco" id="onco-sim" />
                                                        <label className="form-check-label small" htmlFor="onco-sim">Sim</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">Anemia recente?</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-4 ms-2">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="anemia" id="ane-nao" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="ane-nao">Não</label>
                                                    </div>
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="radio" name="anemia" id="ane-sim" />
                                                        <label className="form-check-label small" htmlFor="ane-sim">Sim</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row align-items-center g-2">
                                                <div className="col-auto">
                                                    <label className="small text-secondary">Peso atual:</label>
                                                </div>
                                                <div className="col-auto d-flex align-items-center gap-2">
                                                    <input type="text" className="form-control form-control-sm bg-light border-0 text-center" style={{ width: '60px' }} defaultValue="75" />
                                                    <span className="small">Kg</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Observações */}
                                    <div className="mb-5">
                                        <label className="fw-bold mb-2">Observações</label>
                                        <textarea className="form-control bg-light border-0 p-3" rows="4" defaultValue="Pele muito seca com alguns cravos"></textarea>
                                    </div>

                                    {/* Política de Cancelamento */}
                                    <div className="mb-5">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <i className="bi bi-exclamation-triangle-fill text-dark"></i>
                                            <span className="fw-bold fs-6">POLÍTICA DE CANCELAMENTO</span>
                                        </div>
                                        <p className="small text-dark mb-0">
                                            <strong>Nota:</strong> Desmarcações terão de ser feitas com 48h de antecedência. Caso não ocorra, o tratamento em questão será dado como realizado ou será cobrada uma taxa de remarcação no valor de 10€.
                                        </p>
                                    </div>

                                    {/* Assinatura */}
                                    <div className="mb-5">
                                        <label className="small text-secondary mb-2">Assinatura:</label>
                                        <div className="border rounded-3 p-3 bg-white d-flex align-items-center justify-content-center" style={{ minHeight: '100px' }}>
                                            <div className="text-center">
                                                {/* Placeholder for signature image or canvas */}
                                                <p className="mb-0 fs-3" style={{ fontFamily: '"Great Vibes", cursive', color: '#333' }}>Ana Maria Costa Silva</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data e Enviar */}
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <label className="small text-secondary mb-0">Data</label>
                                            <input type="text" className="form-control form-control-sm bg-light border-0" value="27/08/2025" readOnly style={{ width: '150px' }} />
                                        </div>
                                        <button className="btn btn-gold px-5 py-2" style={{ borderRadius: '8px' }}>
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'historico' && (
                                <div className="procedure-history">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="mb-0">Histórico de Procedimentos</h5>
                                        <button className="btn btn-gold px-4 py-2" style={{ borderRadius: '8px' }}>
                                            <span className="me-2">+</span> Novo Procedimento
                                        </button>
                                    </div>

                                    <div className="d-flex flex-column gap-3 mb-4">
                                        {procedureHistory.map((item, idx) => (
                                            <div key={idx} className="card border border-light shadow-sm p-3 rounded-4 bg-white">
                                                <div className="d-flex justify-content-between align-items-start mb-1">
                                                    <h6 className="fw-bold mb-0">{item.title}</h6>
                                                    <span className="small text-dark fw-medium">{item.date}</span>
                                                </div>
                                                <p className="text-secondary small mb-3">{item.professional}</p>
                                                <p className="small mb-3 text-dark">{item.notes}</p>
                                                <div className="fw-medium text-dark small">Valor: {item.price}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-center mt-4">
                                        <button className="btn btn-gold px-5 py-2" style={{ borderRadius: '8px' }}>
                                            Ver Mais Procedimentos
                                        </button>
                                    </div>
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
            </div>
        </AuthenticatedLayout>
    );
}

