import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';


const SearchableSelect = ({ label, options, value, onChange, placeholder, error, displayKey = 'name' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Encontrar o item selecionado para mostrar o nome quando fechar ou carregar
    useEffect(() => {
        if (value) {
            const selected = options.find(opt => opt.id == value);
            if (selected) {
                setSearchTerm(selected[displayKey]);
            }
        } else {
            setSearchTerm('');
        }
    }, [value, options, displayKey]);

    const filteredOptions = options.filter(opt =>
        opt[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        onChange(option.id);
        setSearchTerm(option[displayKey]);
        setIsOpen(false);
    };

    return (
        <div className="mb-3 position-relative">
            <label className="form-label small text-muted">{label}</label>
            <input
                type="text"
                className={`form-control bg-light border-0 ${error ? 'is-invalid' : ''}`}
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => {
                    const val = e.target.value;
                    setSearchTerm(val);
                    if (val.length > 0) {
                        setIsOpen(true);
                    } else {
                        setIsOpen(false);
                        onChange('');
                    }
                }}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay para permitir o click na lista
            />
            {error && <div className="invalid-feedback">{error}</div>}

            {isOpen && searchTerm.length > 0 && filteredOptions.length > 0 && (
                <div className="position-absolute w-100 bg-white border shadow-sm rounded-bottom" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                    {filteredOptions.map(opt => (
                        <div
                            key={opt.id}
                            className="p-2 border-bottom small cursor-pointer hover-bg-light"
                            style={{ cursor: 'pointer' }}
                            onMouseDown={(e) => {
                                e.preventDefault(); // Evita que o onBlur dispare antes do click
                                handleSelect(opt);
                            }}
                        >
                            {opt[displayKey]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Agendamentos({ clientes = [], tratamentos = [], agendamentos = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'mês', 'semana', 'dia'
    const [isVoucher, setIsVoucher] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [agendamentoToDelete, setAgendamentoToDelete] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        tratamento_id: '',
        cliente_id: '',
        voucher: '',
        data: new Date().toISOString().split('T')[0],
        inicio: '09:00',
        fim: '10:00',
        observacoes: '',
    });

    const { data: absenceData, setData: setAbsenceData, post: postAbsence, processing: absenceProcessing, errors: absenceErrors, reset: resetAbsence } = useForm({
        is_absence: true,
        motivo: '',
        data: new Date().toISOString().split('T')[0],
        inicio: '09:00',
        fim: '10:00',
    });

    // Atualiza a data do agendamento quando a data selecionada muda
    useEffect(() => {
        if (selectedDate) {
            setData('data', formatDateForInput(selectedDate));
        }
    }, [selectedDate]);

    // Preenche o cliente selecionado a partir do parâmetro de consulta
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const clienteId = urlParams.get('cliente_id');
        if (clienteId && clientes.some(c => c.id == clienteId)) {
            setData('cliente_id', clienteId);
        }
    }, [clientes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('agendamentos.store'), {
            onSuccess: () => {
                reset();
                setIsVoucher(false);
            },
        });
    };

    const handleAbsenceSubmit = (e) => {
        e.preventDefault();
        postAbsence(route('agendamentos.store'), {
            onSuccess: () => {
                resetAbsence();
            },
        });
    };

    const confirmDeletion = (agendamento) => {
        setAgendamentoToDelete(agendamento);
        setConfirmingDeletion(true);
    };

    const deleteAgendamento = () => {
        if (!agendamentoToDelete) return;

        router.delete(route('agendamentos.destroy', agendamentoToDelete.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setAgendamentoToDelete(null);
            },
        });
    };

    const totalHoje = agendamentos.filter(apt => {
        const d = new Date(apt.data_hora_inicio);
        const today = new Date();
        return d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear() &&
            apt.estado_agendamento !== 5;
    }).length;

    const totalSemana = agendamentos.filter(apt => {
        const d = new Date(apt.data_hora_inicio);
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        return d >= startOfWeek && d <= endOfWeek && apt.estado_agendamento !== 5;
    }).length;

    const totalMes = agendamentos.filter(apt => {
        const d = new Date(apt.data_hora_inicio);
        const now = new Date();
        return d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear() &&
            apt.estado_agendamento !== 5;
    }).length;

    const stats = [
        { title: 'Agendamentos de Hoje', value: totalHoje.toString(), icon: 'calendar', color: 'var(--status-green)' },
        { title: 'Agendamentos da Semana', value: totalSemana.toString(), icon: 'calendar-week', color: 'var(--status-green)' },
        { title: 'Agendamentos do Mês', value: totalMes.toString(), icon: 'calendar-month', color: 'var(--status-green)' },
    ];


    // Funções auxiliares
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    // Feriados em Portugal
    const getPortugueseHolidays = (year) => {
        const holidays = {
            [`${year}-01-01`]: 'Ano Novo',
            [`${year}-04-25`]: 'Dia da Liberdade',
            [`${year}-05-01`]: 'Dia do Trabalhador',
            [`${year}-06-10`]: 'Dia de Portugal',
            [`${year}-08-15`]: 'Assunção de N. Sra.',
            [`${year}-10-05`]: 'Implantação da República',
            [`${year}-11-01`]: 'Dia de Todos os Santos',
            [`${year}-12-01`]: 'Restauração da Independência',
            [`${year}-12-08`]: 'Imaculada Conceição',
            [`${year}-12-25`]: 'Natal',
        };

        // Calcular os dias de Páscoa
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;

        const easterDate = new Date(year, month - 1, day);

        // Formatar chave de data
        const formatDateKey = (date) => {
            const y = date.getFullYear();
            const mo = String(date.getMonth() + 1).padStart(2, '0');// 'padStart' adiciona zeros à esquerda se necessário
            const da = String(date.getDate()).padStart(2, '0');
            return `${y}-${mo}-${da}`;
        };

        // Adicionar feriados relacionados à Páscoa
        holidays[formatDateKey(easterDate)] = 'Páscoa';

        const goodFriday = new Date(easterDate);
        goodFriday.setDate(easterDate.getDate() - 2);
        holidays[formatDateKey(goodFriday)] = 'Sexta-feira Santa';

        const corpusChristi = new Date(easterDate);
        corpusChristi.setDate(easterDate.getDate() + 60);
        holidays[formatDateKey(corpusChristi)] = 'Corpo de Deus';

        const carnaval = new Date(easterDate);
        carnaval.setDate(easterDate.getDate() - 47);
        holidays[formatDateKey(carnaval)] = 'Carnaval';

        return holidays;
    };

    // Obter nome do feriado
    const getHolidayName = (date) => {
        const year = date.getFullYear();
        const holidays = getPortugueseHolidays(year);
        const key = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return holidays[key];
    };

    // Menu navegação
    const handlePrev = () => {
        if (view === 'month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        } else if (view === 'day') {
            const newDate = addDays(currentDate, -1);
            setCurrentDate(newDate);
            setSelectedDate(newDate);
        }
    };

    // Próximo dia ou mês
    const handleNext = () => {
        if (view === 'month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        } else if (view === 'day') {
            const newDate = addDays(currentDate, 1);
            setCurrentDate(newDate);
            setSelectedDate(newDate);
        }
    };

    // Formatar data para input
    const formatDateForInput = (date) => {
        if (!date) return '';
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };

    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    // Texto de cabeçalho dinâmico
    const getHeaderText = () => {
        if (view === 'day') {
            return `${currentDate.getDate()} de ${months[currentDate.getMonth()]} de ${currentDate.getFullYear()}`;
        }
        return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    };

    // Verificar se é a data de hoje
    const isToday = (d) => {
        const today = new Date();
        return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    };

    // Verificar se é o mesmo dia
    const isSameDay = (d1, d2) => {
        return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    };

    // Obter agendamentos para uma data
    const getAgendamentosForDate = (date) => {
        return agendamentos.filter(apt => {
            const aptDate = new Date(apt.data_hora_inicio);
            return isSameDay(aptDate, date);
        });
    };

    // Geradores de renderização
    const renderMonthGrid = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const slots = [];
        for (let i = 0; i < firstDay; i++) slots.push(null);
        for (let i = 1; i <= daysInMonth; i++) slots.push(i);

        return (
            <div className="d-flex flex-wrap text-center">
                {slots.map((dayNum, i) => {
                    if (!dayNum) return <div key={i} style={{ width: '14.28%', padding: '4px' }}><div style={{ height: '90px' }}></div></div>;

                    const slotDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum);
                    const selected = isSameDay(slotDate, selectedDate);
                    const today = isToday(slotDate);
                    const holidayName = getHolidayName(slotDate);

                    return (
                        <div key={i} style={{ width: '14.28%', padding: '4px' }}>
                            <div
                                onClick={() => {
                                    setSelectedDate(slotDate);
                                    setCurrentDate(slotDate);
                                    setView('day');
                                }}
                                className={`p-1 border rounded-3 d-flex flex-column align-items-center justify-content-center position-relative`}
                                title={holidayName}
                                style={{
                                    height: '90px',
                                    cursor: 'pointer',
                                    backgroundColor: selected ? 'var(--primary-button)' : 'var(--white)',
                                    borderColor: selected ? 'var(--primary-button)' : (today ? 'var(--primary-button)' : '#eaecf0'),
                                    borderWidth: today && !selected ? '2px' : '1px',
                                    color: selected ? 'var(--white)' : 'var(--main-green)'
                                }}
                            >
                                <span className={`${selected ? 'h4 fw-bold mb-0' : 'fw-medium'}`}>{dayNum}</span>
                                {holidayName && (
                                    <div className="d-flex gap-1 mt-2">
                                        <div className="rounded-circle bg-danger" style={{ width: '6px', height: '6px' }} title={holidayName}></div>
                                    </div>
                                )}
                                {getAgendamentosForDate(slotDate).length > 0 && !holidayName && (
                                    <div className="d-flex gap-1 mt-2">
                                        {getAgendamentosForDate(slotDate).slice(0, 3).map((apt, idx) => (
                                            <div key={idx} className="rounded-circle" style={{
                                                width: '6px',
                                                height: '6px',
                                                backgroundColor: selected ? 'var(--white)' : (apt.estado_agendamento === 5 ? 'var(--status-red)' : 'var(--primary-button)')
                                            }}></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Renderizar visualização de dia
    const renderDayView = () => {
        const hours = Array.from({ length: 11 }, (_, i) => i + 9); // 09:00 às 19:00
        const dayAgendamentos = getAgendamentosForDate(currentDate);

        return (
            <div className="day-view-timeline p-2" style={{ maxHeight: '1000px', overflowY: 'auto' }}>
                {getHolidayName(currentDate) && (
                    <div className="alert alert-danger py-2 mb-3 text-center small fw-bold">
                        Feriado: {getHolidayName(currentDate)}
                    </div>
                )}
                {hours.map(hour => {
                    const apts = dayAgendamentos.filter(apt => {
                        const start = new Date(apt.data_hora_inicio);
                        return start.getHours() === hour;
                    });

                    return (
                        <div key={hour} className="d-flex mb-3 align-items-center">
                            <div className="fw-bold text-muted small me-3" style={{ width: '50px' }}>{hour.toString().padStart(2, '0')}:00</div>
                            <div className="flex-grow-1">
                                {apts.length > 0 ? (
                                    apts.map((apt, idx) => (
                                        <div key={idx} className="p-3 mb-2 rounded border-start border-4 shadow-sm animate-fade-in" style={{
                                            backgroundColor: apt.estado_agendamento === 5 ? 'rgba(240, 131, 131, 0.1)' : 'rgba(197, 161, 87, 0.1)',
                                            borderColor: apt.estado_agendamento === 5 ? 'var(--status-red)' : 'var(--warning)'
                                        }}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="flex-grow-1">
                                                    <div className="d-flex flex-column flex-md-row align-items-md-center gap-1 gap-md-2 mb-1">
                                                        <h6 className="mb-0 fw-bold text-dark">
                                                            {apt.estado_agendamento === 5 ? `AUSÊNCIA: ${apt.motivo}` : apt.tratamento?.nome}
                                                        </h6>
                                                        {apt.voucher && (
                                                            <div className="mt-1 mt-md-0">
                                                                <span className="badge bg-white text-warning border border-warning px-2 py-1 fw-normal" style={{ fontSize: '0.7rem' }}>Voucher: {apt.voucher}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {!apt.motivo && <small className="text-secondary d-block">Cliente: <span className="text-dark">{apt.cliente?.name}</span></small>}
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); confirmDeletion(apt); }}
                                                    className="btn btn-link link-danger p-0 border-0 shadow-none hover-scale transition-all ms-3"
                                                    title="Remover"
                                                    style={{ marginTop: '-2px' }}
                                                >
                                                    <i className="bi bi-trash3 fs-6"></i>
                                                </button>
                                            </div>
                                            {apt.observacoes && (
                                                <div className="mt-2 p-2 bg-white rounded border border-light small text-secondary fst-italic">
                                                    <i className="bi bi-info-circle me-1"></i>
                                                    {apt.observacoes}
                                                </div>
                                            )}
                                            <small className="text-secondary mt-1 d-block">
                                                {new Date(apt.data_hora_inicio).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })} - {new Date(apt.data_hora_fim).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                                            </small>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2 rounded bg-light border-start border-4 border-success opacity-50">
                                        <small className="text-muted d-block small">Livre</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Agendamentos" />

            {/* Cabeçalho */}
            <div className="mb-4">
                <h2 className="display-6 mb-2" style={{ color: 'var(--main-text)' }}>Agendamentos</h2>
                <p className="text-secondary">Gerencie todos as sessões</p>
            </div>


            {/* Cards de Estatísticas */}
            <div className="row g-2 g-md-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-4 col-md-4 px-1 px-md-3">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body p-2 p-md-4 text-start">
                                {/* Ícone Desktop/Tablet */}
                                <div className="d-none d-md-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        {/* Ícone de Hoje */}
                                        {stat.icon === 'calendar' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zm-4.5-6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                            </svg>
                                        )}

                                        {/* Ícone Semanal */}
                                        {stat.icon === 'calendar-week' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-week-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zM11 7.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5h-1zm-3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5h-1zm-5 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                                            </svg>
                                        )}

                                        {/* Ícone Mensal */}
                                        {stat.icon === 'calendar-month' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                {/* Ícones no Mobile */}
                                <div className="d-md-none mb-2">
                                    <div className="p-2 rounded d-inline-block" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>
                                        {stat.icon === 'calendar' && (<i className="bi bi-calendar-event-fill fs-6"></i>)}
                                        {stat.icon === 'calendar-week' && (<i className="bi bi-calendar-week-fill fs-6"></i>)}
                                        {stat.icon === 'calendar-month' && (<i className="bi bi-calendar3 fs-6"></i>)}
                                    </div>
                                </div>
                                <div className="stat-card-value">{stat.value}</div>
                                <div className="stat-card-title d-block">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Layout do conteúdo principal */}
            <div className="row g-4 mb-5">
                {/* Calendário - Ocupa col-12 no mobile e col-xl-8 no desktop */}
                <div className="col-12 col-xl-8">
                    <div className="card border-0 shadow-sm p-4">
                        {/* Header do calendário com alternador de visualização */}
                        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
                            <h5 className="mb-0 fw-bold text-dark">Calendário</h5>

                            <div className="d-flex align-items-center justify-content-between w-100 w-md-auto gap-3">
                                <div className="d-flex align-items-center gap-2">
                                    <button onClick={handlePrev} className="btn btn-link text-dark p-0" style={{ textDecoration: 'none' }}>❮</button>
                                    <span className="fw-medium text-capitalize text-nowrap small">{getHeaderText()}</span>
                                    <button onClick={handleNext} className="btn btn-link text-dark p-0" style={{ textDecoration: 'none' }}>❯</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className={`btn btn-sm ${view === 'day' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setView('day')}>Dia</button>
                                    <button type="button" className={`btn btn-sm ${view === 'month' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setView('month')}>Mês</button>
                                </div>
                            </div>
                        </div>

                        {/* Grid do calendário */}
                        <div className="calendar-grid">
                            {/* Cabeçalho de dias - Somente mostra para Mês e Semana */}
                            {view !== 'day' && (
                                <div className="d-flex text-center mb-2 text-muted small fw-bold">
                                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                                        <div key={day} style={{ width: '14.28%' }}>{day}</div>
                                    ))}
                                </div>
                            )}

                            {/* Conteúdo do calendário */}
                            {view === 'month' && renderMonthGrid()}
                            {view === 'day' && renderDayView()}

                        </div>
                    </div>
                </div>

                {/* Coluna direita: Formulários */}
                <div className="col-12 col-xl-4">
                    <div className="row g-4">
                        {/* Formulário de Marcação */}
                        <div className="col-12 col-md-6 col-xl-12">
                            <div className="card border-0 shadow-sm p-4 h-100">
                                <h5 className="card-title fw-bold mb-3">Adicionar Marcação</h5>
                                <form onSubmit={handleSubmit}>
                                    <SearchableSelect
                                        label="Tratamento"
                                        options={tratamentos}
                                        value={data.tratamento_id}
                                        onChange={(val) => setData('tratamento_id', val)}
                                        placeholder="Pesquisar tratamento..."
                                        error={errors.tratamento_id}
                                        displayKey="nome"
                                    />

                                    <SearchableSelect
                                        label="Cliente"
                                        options={clientes}
                                        value={data.cliente_id}
                                        onChange={(val) => setData('cliente_id', val)}
                                        placeholder="Pesquisar cliente..."
                                        error={errors.cliente_id}
                                        displayKey="name"
                                    />
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="voucherCheck"
                                                checked={isVoucher}
                                                onChange={(e) => setIsVoucher(e.target.checked)}
                                            />
                                            <label className="form-check-label small" htmlFor="voucherCheck">Voucher</label>
                                        </div>
                                        {isVoucher && (
                                            <div className="mt-2 animate-fade-in">
                                                <input
                                                    type="text"
                                                    className="form-control bg-light border-0 py-2 small"
                                                    placeholder="Código ou detalhes do voucher"
                                                    value={data.voucher}
                                                    onChange={e => setData('voucher', e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Data</label>
                                        <input
                                            type="date"
                                            className="form-date bg-light border-0 text-muted small w-100"
                                            value={data.data}
                                            onChange={e => setData('data', e.target.value)}
                                        />
                                        {errors.data && <div className="text-danger small">{errors.data}</div>}
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label className="form-label small text-muted">Início</label>
                                            <input
                                                type="time"
                                                className="form-control bg-light border-0 text-muted small w-100"
                                                value={data.inicio}
                                                onChange={e => setData('inicio', e.target.value)}
                                            />
                                            {errors.inicio && <div className="text-danger small">{errors.inicio}</div>}
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label small text-muted">Fim</label>
                                            <input
                                                type="time"
                                                className="form-control bg-light border-0 text-muted small w-100"
                                                value={data.fim}
                                                onChange={e => setData('fim', e.target.value)}
                                            />
                                            {errors.fim && <div className="text-danger small">{errors.fim}</div>}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label small text-muted">Observações</label>
                                        <textarea
                                            className="form-control bg-light border-0 small"
                                            rows="2"
                                            placeholder="Notas adicionais sobre o agendamento..."
                                            value={data.observacoes}
                                            onChange={e => setData('observacoes', e.target.value)}
                                        ></textarea>
                                        {errors.observacoes && <div className="text-danger small">{errors.observacoes}</div>}
                                    </div>
                                    <button type="submit" disabled={processing} className="btn w-100 text-white fw-medium" style={{ backgroundColor: 'var(--primary-button)' }}>
                                        {processing ? 'Agendando...' : '+ Agendar'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Formulário de Ausência */}
                        <div className="col-12 col-md-6 col-xl-12">
                            <div className="card border-0 shadow-sm p-4 h-100">
                                <h5 className="card-title fw-bold mb-3">Adicionar Ausência</h5>
                                <form onSubmit={handleAbsenceSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Motivo</label>
                                        <input
                                            type="text"
                                            className={`form-control bg-light border-0 ${absenceErrors.motivo ? 'is-invalid' : ''}`}
                                            value={absenceData.motivo}
                                            onChange={e => setAbsenceData('motivo', e.target.value)}
                                        />
                                        {absenceErrors.motivo && <div className="invalid-feedback">{absenceErrors.motivo}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Data</label>
                                        <input
                                            type="date"
                                            className={`form-date bg-light border-0 text-muted small w-100 ${absenceErrors.data ? 'is-invalid' : ''}`}
                                            value={absenceData.data}
                                            onChange={e => setAbsenceData('data', e.target.value)}
                                        />
                                        {absenceErrors.data && <div className="text-danger small">{absenceErrors.data}</div>}
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <label className="form-label small text-muted">Início</label>
                                            <input
                                                type="time"
                                                className={`form-control bg-light border-0 text-muted small w-100 ${absenceErrors.inicio ? 'is-invalid' : ''}`}
                                                value={absenceData.inicio}
                                                onChange={e => setAbsenceData('inicio', e.target.value)}
                                            />
                                            {absenceErrors.inicio && <div className="text-danger small">{absenceErrors.inicio}</div>}
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label small text-muted">Fim</label>
                                            <input
                                                type="time"
                                                className={`form-control bg-light border-0 text-muted small w-100 ${absenceErrors.fim ? 'is-invalid' : ''}`}
                                                value={absenceData.fim}
                                                onChange={e => setAbsenceData('fim', e.target.value)}
                                            />
                                            {absenceErrors.fim && <div className="text-danger small">{absenceErrors.fim}</div>}
                                        </div>
                                    </div>
                                    <button type="submit" disabled={absenceProcessing} className="btn w-100 text-white fw-medium" style={{ backgroundColor: 'var(--primary-button)' }}>
                                        {absenceProcessing ? 'Agendando...' : '+ Agendar'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Modal de Confirmação de Exclusão */}
            <Modal show={confirmingDeletion} onClose={() => setConfirmingDeletion(false)} style={{ maxWidth: '25rem' }}>
                <div className="p-5 text-center">
                    {/* Icone de Alerta */}
                    <div className="d-flex justify-content-center mb-4 animate-fade-in">
                        <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '100px', height: '100px', border: '1px solid var(--primary-button)', color: 'var(--primary-button)', backgroundColor: 'var(--white' }}>
                            <span style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>!</span>
                        </div>
                    </div>

                    <h3 className="fw-bold mb-5 px-3" style={{ color: 'var(--main-text)', lineHeight: '1.2' }}>
                        Tem certeza que deseja apagar o {agendamentoToDelete?.estado_agendamento === 5 ? 'bloqueio' : 'agendamento'}?
                    </h3>

                    <div className="d-flex justify-content-center gap-3">
                        <button
                            onClick={deleteAgendamento}
                            className="btn px-5 py-2 text-white fw-bold rounded-3 shadow-sm hover-scale transition-all"
                            style={{ backgroundColor: 'var(--primary-button)', minWidth: '140px', border: 'none' }}
                        >
                            Sim
                        </button>
                        <button
                            onClick={() => setConfirmingDeletion(false)}
                            className="btn px-5 py-2 text-white fw-bold rounded-3 shadow-sm hover-scale transition-all"
                            style={{ backgroundColor: '#E1424C', minWidth: '140px', border: 'none' }}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout >
    );
}

