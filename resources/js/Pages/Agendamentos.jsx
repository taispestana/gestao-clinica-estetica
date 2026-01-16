import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Agendamentos() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'mês', 'semana', 'dia'

    const stats = [
        { title: 'Agendamentos Hoje', value: '0', icon: 'calendar', color: 'var(--status-green)' },
        { title: 'Agendamentos Semanal', value: '0', icon: 'calendar-week', color: 'var(--status-green)' },
        { title: 'Agendamento Mensal', value: '0', icon: 'calendar-month', color: 'var(--status-green)' },
    ];

    // Helpers
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const getStartOfWeek = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day; // ajustar quando o dia for domingo
        return new Date(date.getFullYear(), date.getMonth(), diff);
    };

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

        // Calcular a Páscoa
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
            const mo = String(date.getMonth() + 1).padStart(2, '0');
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
        } else if (view === 'week') {
            setCurrentDate(addDays(currentDate, -7));
        } else if (view === 'day') {
            const newDate = addDays(currentDate, -1);
            setCurrentDate(newDate);
            setSelectedDate(newDate);
        }
    };

    const handleNext = () => {
        if (view === 'month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        } else if (view === 'week') {
            setCurrentDate(addDays(currentDate, 7));
        } else if (view === 'day') {
            const newDate = addDays(currentDate, 1);
            setCurrentDate(newDate);
            setSelectedDate(newDate);
        }
    };

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
        if (view === 'week') {
            const start = getStartOfWeek(currentDate);
            const end = addDays(start, 6);
            if (start.getMonth() !== end.getMonth()) {
                return `${start.getDate()} ${months[start.getMonth()].substring(0, 3)} - ${end.getDate()} ${months[end.getMonth()].substring(0, 3)} ${end.getFullYear()}`;
            }
            return `${start.getDate()} - ${end.getDate()} de ${months[start.getMonth()]} ${start.getFullYear()}`;
        }
        return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    };

    const isToday = (d) => {
        const today = new Date();
        return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    };

    const isSameDay = (d1, d2) => {
        return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
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
                                onClick={() => setSelectedDate(slotDate)}
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
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderWeekGrid = () => {
        const startOfWeek = getStartOfWeek(currentDate);
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            weekDays.push(addDays(startOfWeek, i));
        }

        return (
            <div className="d-flex flex-wrap text-center">
                {weekDays.map((date, i) => {
                    const selected = isSameDay(date, selectedDate);
                    const today = isToday(date);
                    const holidayName = getHolidayName(date);

                    return (
                        <div key={i} style={{ width: '14.28%', padding: '4px' }}>
                            <div
                                onClick={() => setSelectedDate(date)}
                                className={`p-1 border rounded-3 d-flex flex-column align-items-center justify-content-center position-relative`}
                                style={{
                                    height: '150px',
                                    cursor: 'pointer',
                                    backgroundColor: selected ? 'var(--primary-button)' : 'var(--white)',
                                    borderColor: selected ? 'var(--primary-button)' : (today ? 'var(--primary-button)' : 'var(--white)'),
                                    borderWidth: today && !selected ? '2px' : '1px',
                                    color: selected ? 'var(--white)' : 'var(--main-green)'
                                }}
                            >
                                <span className="small mb-2 fw-bold text-uppercase opacity-75">{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][date.getDay()]}</span>
                                <span className={`${selected ? 'h3 fw-bold mb-0' : 'h4 fw-medium'}`}>{date.getDate()}</span>
                                <div className="mt-2 small opacity-75 text-truncate" style={{ maxWidth: '100%' }}>
                                    {holidayName ? <span className="text-danger fw-bold" style={{ fontSize: '0.7rem' }}>{holidayName}</span> : 'Livre'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderDayView = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i); // 00:00 to 23:00

        return (
            <div className="day-view-timeline p-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {getHolidayName(currentDate) && (
                    <div className="alert alert-danger py-2 mb-3 text-center small fw-bold">
                        Feriado: {getHolidayName(currentDate)}
                    </div>
                )}
                {hours.map(hour => (
                    <div key={hour} className="d-flex mb-3 align-items-center">
                        <div className="fw-bold text-muted small me-3" style={{ width: '50px' }}>{hour.toString().padStart(2, '0')}:00</div>
                        <div className="flex-grow-1 p-3 rounded bg-light border-start border-4 border-warning">
                            <small className="text-muted d-block">Disponível</small>
                        </div>
                    </div>
                ))}
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
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--main-green-lighter)' }}>
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--main-green-light)', color: 'var(--main-text)' }}>

                                        {/* Ícone Hoje */}
                                        {stat.icon === 'calendar' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zm-4.5-6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                            </svg>
                                        )}

                                        {/* Ícone Semanal (Calendar-Week) */}
                                        {stat.icon === 'calendar-week' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-week-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zM11 7.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5h-1zm-3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5h-1zm-5 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                                            </svg>
                                        )}

                                        {/* Ícone Mensal (Calendar-Month / Calendar3) */}
                                        {stat.icon === 'calendar-month' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            </svg>
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


            {/* Main Content Grid */}
            <div className="row g-4">
                {/* Left Column: Calendar */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        {/* Calendar Header with View Switcher */}
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-3">
                                <h5 className="mb-0 fw-bold text-dark">Calendário</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <button onClick={handlePrev} className="btn btn-link text-dark p-0" style={{ textDecoration: 'none' }}>❮</button>
                                    <span className="fw-medium text-capitalize">{getHeaderText()}</span>
                                    <button onClick={handleNext} className="btn btn-link text-dark p-0" style={{ textDecoration: 'none' }}>❯</button>
                                </div>
                            </div>
                            <div className="btn-group" role="group">
                                <button type="button" className={`btn btn-sm ${view === 'day' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setView('day')}>Dia</button>
                                <button type="button" className={`btn btn-sm ${view === 'week' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setView('week')}>Semana</button>
                                <button type="button" className={`btn btn-sm ${view === 'month' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setView('month')}>Mês</button>
                            </div>
                        </div>

                        {/* Calendar Grid Container */}
                        <div className="calendar-grid">
                            {/* Days Header - Only show for Month & Week */}
                            {view !== 'day' && (
                                <div className="d-flex text-center mb-2 text-muted small fw-bold">
                                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                                        <div key={day} style={{ width: '14.28%' }}>{day}</div>
                                    ))}
                                </div>
                            )}

                            {/* View Content */}
                            {view === 'month' && renderMonthGrid()}
                            {view === 'week' && renderWeekGrid()}
                            {view === 'day' && renderDayView()}

                        </div>
                    </div>
                </div>

                {/* Right Column: Forms */}
                <div className="col-lg-4">
                    {/* Add Appointment */}
                    <div className="card border-0 shadow-sm p-4 mb-4">
                        <h5 className="card-title fw-bold mb-3">Adicionar Marcação</h5>
                        <form>
                            <div className="mb-3">
                                <label className="form-label small text-muted">Tratamento</label>
                                <select className="form-select bg-light border-0">
                                    <option></option>
                                    <option>Limpeza de Pele</option>
                                    <option>Massagem</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small text-muted">Cliente</label>
                                <select className="form-select bg-light border-0">
                                    <option></option>
                                    <option>Ana Costa</option>
                                    <option>Carla Santos</option>
                                </select>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="voucherCheck" />
                                <label className="form-check-label small" htmlFor="voucherCheck">Voucher</label>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <label className="form-label small text-muted">Início</label>
                                    <input
                                        type="date"
                                        className="form-date bg-light border-0 text-muted small"
                                        key={`start-${selectedDate.getTime()}`}
                                        defaultValue={formatDateForInput(selectedDate)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small text-muted">Fim</label>
                                    <input type="date" className="form-date bg-light border-0 text-muted small" />
                                </div>
                            </div>
                            <button type="button" className="btn w-100 text-white fw-medium" style={{ backgroundColor: 'var(--primary-button)' }}>+ Agendar</button>
                        </form>
                    </div>

                    {/* Add Absence */}
                    <div className="card border-0 shadow-sm p-4 mb-5">
                        <h5 className="card-title fw-bold mb-3">Adicionar Ausência</h5>
                        <form>
                            <div className="mb-3">
                                <label className="form-label small text-muted">Motivo</label>
                                <input type="text" className="form-control bg-light border-0" />
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <label className="form-label small text-muted">Início</label>
                                    <input
                                        type="date"
                                        className="form-date bg-light border-0 text-muted small"
                                        key={`abs-start-${selectedDate.getTime()}`}
                                        defaultValue={formatDateForInput(selectedDate)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small text-muted">Fim</label>
                                    <input type="date" className="form-date bg-light border-0 text-muted small" />
                                </div>
                            </div>
                            <button type="button" className="btn w-100 text-white fw-medium" style={{ backgroundColor: 'var(--primary-button)' }}>+ Agendar</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

