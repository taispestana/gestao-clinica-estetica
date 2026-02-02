import React, { useRef, useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';

// Componente de assinatura
const SignaturePad = ({ onSave, readOnly, existingSignature }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Configurações iniciais do contexto
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        if (existingSignature) {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = existingSignature;
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [existingSignature]);

    // Função para obter as coordenadas do mouse
    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    // Função para iniciar o desenho
    const startDrawing = (e) => {
        if (readOnly) return;
        setIsDrawing(true);
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    // Função para parar o desenho
    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        onSave(canvasRef.current.toDataURL());
    };

    // Função para desenhar
    const draw = (e) => {
        if (!isDrawing || readOnly) return;
        if (e.cancelable) e.preventDefault();

        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    // Função para limpar a assinatura
    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onSave('');
    };

    // Renderização do componente
    return (
        <div className="signature-pad-container w-100">
            <canvas
                ref={canvasRef}
                width={800}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="border rounded bg-white w-100"
                style={{ cursor: readOnly ? 'default' : 'crosshair', touchAction: 'none', maxWidth: '100%', height: 'auto' }}
            />
            {!readOnly && (
                <div className="d-flex justify-content-end mt-1">
                    <button type="button" className="btn btn-sm btn-link text-danger p-0" onClick={clear}>
                        <i className="bi bi-eraser me-1"></i>Limpar Assinatura
                    </button>
                </div>
            )}
        </div>
    );
};

// Componente principal
export default function FichaAnamnese({ customer, anamnese = null, readOnly = false, onSuccess = null }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: customer?.id || null,
        origem_conheceu: anamnese?.origem_conheceu ?? null,
        exposicao_sol: anamnese?.exposicao_sol ?? null,
        fumante: anamnese?.fumante ?? 0,
        cigarros_por_dia: anamnese?.cigarros_por_dia ?? null,
        ingestao_agua: anamnese?.ingestao_agua ?? null,
        alimentacao: anamnese?.alimentacao ?? null,
        atividade_fisica: anamnese?.atividade_fisica ?? null,
        cirurgia_plastica: anamnese?.cirurgia_plastica || '',
        tratamento_estetico: anamnese?.tratamento_estetico || '',
        tratamento_medico: anamnese?.tratamento_medico || '',
        alergias: anamnese?.alergias || '',
        diabetica: anamnese?.diabetica ?? 0,
        antecedentes_onco: !!(anamnese?.antecedentes_onco),
        anemia_recente: !!(anamnese?.anemia_recente),
        peso_atual: anamnese?.peso_atual ?? null,
        observacoes: anamnese?.observacoes || '',
        assinatura: anamnese?.assinatura_path || '',
    });

    // Efeito para preencher os dados do formulário
    useEffect(() => {
        if (anamnese) {
            setData(prev => ({
                ...prev,
                origem_conheceu: anamnese.origem_conheceu ?? null,
                exposicao_sol: anamnese.exposicao_sol ?? null,
                fumante: anamnese.fumante ?? 0,
                cigarros_por_dia: anamnese.cigarros_por_dia ?? null,
                ingestao_agua: anamnese.ingestao_agua ?? null,
                alimentacao: anamnese.alimentacao ?? null,
                atividade_fisica: anamnese.atividade_fisica ?? null,
                cirurgia_plastica: anamnese.cirurgia_plastica || '',
                tratamento_estetico: anamnese.tratamento_estetico || '',
                tratamento_medico: anamnese.tratamento_medico || '',
                alergias: anamnese.alergias || '',
                diabetica: anamnese.diabetica ?? 0,
                antecedentes_onco: !!(anamnese.antecedentes_onco),
                anemia_recente: !!(anamnese.anemia_recente),
                peso_atual: anamnese.peso_atual ?? null,
                observacoes: anamnese.observacoes || '',
                assinatura: anamnese.assinatura_path || '',
            }));
        }
    }, [anamnese]);

    // Efeito para lidar com a saída da página
    useEffect(() => {
        if (readOnly) return;

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            return '';
        };

        const unsubscribe = router.on('before', (event) => {
            // Ignorar se for a própria submissão ou logout
            if (event.detail.visit.method === 'post' && (event.detail.visit.url.href.includes('anamneses') || event.detail.visit.url.href.includes('logout'))) {
                return;
            }

            if (!confirm('Para sair desta página deve primeiro Salvar a anamnese. Tem a certeza que deseja sair sem salvar?')) {
                event.preventDefault();
            }
        });

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            unsubscribe();
        };
    }, [readOnly]);

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        if (readOnly) return;
        post(route('anamneses.store'), {
            onSuccess: () => {
                if (onSuccess) onSuccess();
                // Faz logout após salvar
                router.post(route('logout'));
            }
        });
    };

    // Renderização do formulário
    return (
        <form onSubmit={handleSubmit} className="anamnese-form container-fluid">
            {!readOnly && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Ficha de Anamnese</h5>
                </div>
            )}

            {/* Dados Pessoais */}
            <div className="mb-5">
                <h6 className="fw-bold mb-3">Dados Pessoais</h6>
                <div className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label small text-secondary mb-1">Nome Completo</label>
                        <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer?.name} readOnly />
                    </div>
                    <div className="col-4 col-md-3">
                        <label className="form-label small text-secondary mb-1">Idade</label>
                        <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer?.age} readOnly />
                    </div>
                    <div className="col-8 col-md-5">
                        <label className="form-label small text-secondary mb-1">Data de Nascimento</label>
                        <input
                            type="text"
                            className="form-control bg-light border-0 py-2"
                            defaultValue={customer?.data_nascimento ? new Date(customer.data_nascimento).toLocaleDateString('pt-PT') : ''}
                            readOnly
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small text-secondary mb-1">Telemóvel</label>
                        <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer?.phone} readOnly />
                    </div>
                    <div className="col-md-7">
                        <label className="form-label small text-secondary mb-1">Email</label>
                        <input type="email" className="form-control bg-light border-0 py-2" defaultValue={customer?.email} readOnly />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label small text-secondary mb-1">Profissão</label>
                        <input type="text" className="form-control bg-light border-0 py-2" defaultValue={customer?.occupation} readOnly />
                    </div>
                    <div className="col-12">
                        <label className="form-label small text-secondary mb-1">Como nos conheceu?</label>
                        <div className="d-flex flex-wrap gap-x-4 gap-y-2 mt-1">
                            <div className="d-flex flex-wrap gap-3">
                                {[
                                    { label: 'Facebook', value: 1 },
                                    { label: 'Instagram', value: 2 },
                                    { label: 'Indicação de amigos', value: 3 },
                                    { label: 'Google/Motor de pesquisa', value: 4 }
                                ].map((opt, i) => (
                                    <div key={i} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="origem_conheceu"
                                            id={`opt${i}`}
                                            checked={data.origem_conheceu === opt.value}
                                            onChange={() => setData('origem_conheceu', opt.value)}
                                            disabled={readOnly}
                                        />
                                        <label className="form-check-label small" htmlFor={`opt${i}`}>
                                            {opt.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="origem_conheceu"
                                        id="opt4"
                                        checked={data.origem_conheceu === 5}
                                        onChange={() => setData('origem_conheceu', 5)}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small" htmlFor="opt4">Passagem pela clínica</label>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="origem_conheceu"
                                            id="opt-outro"
                                            checked={data.origem_conheceu === 6}
                                            onChange={() => setData('origem_conheceu', 6)}
                                            disabled={readOnly}
                                        />
                                        <label className="form-check-label small text-nowrap" htmlFor="opt-outro">Outro:</label>
                                    </div>
                                    <input type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '150px' }} disabled={readOnly} />
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
                            {[
                                { label: 'Nunca', value: 1 },
                                { label: 'Raramente', value: 2 },
                                { label: 'Frequentemente', value: 3 },
                                { label: 'Diariamente', value: 4 }
                            ].map((opt, i) => (
                                <div key={i} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exposicao_sol"
                                        id={`sol${i}`}
                                        checked={data.exposicao_sol === opt.value}
                                        onChange={() => setData('exposicao_sol', opt.value)}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small" htmlFor={`sol${i}`}>{opt.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="small text-secondary d-block mb-1">É fumador(a)?</label>
                        <div className="d-flex flex-wrap align-items-center gap-4">
                            <div className="d-flex align-items-center gap-2">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="fumante"
                                        id="fuma-sim"
                                        checked={data.fumante === 1}
                                        onChange={() => setData('fumante', 1)}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small" htmlFor="fuma-sim">Sim</label>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="form-control form-control-sm border-0 border-bottom bg-transparent p-0 text-center"
                                        style={{ width: '40px' }}
                                        value={data.cigarros_por_dia}
                                        onChange={e => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            setData(prev => ({ ...prev, cigarros_por_dia: val, fumante: 1 }));
                                        }}
                                        disabled={readOnly}
                                    />
                                    <span className="small text-secondary">cigarros/dia</span>
                                </div>
                            </div>
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="fumante"
                                    id="fuma-nao"
                                    checked={data.fumante === 0}
                                    onChange={() => {
                                        setData(prev => ({ ...prev, fumante: 0, cigarros_por_dia: '' }));
                                    }}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="fuma-nao">Não</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="small text-secondary d-block mb-1">Ingestão de líquidos (Água):</label>
                        <div className="d-flex flex-wrap gap-4">
                            {[
                                { label: 'Menos de 1 litro/dia', value: 1 },
                                { label: '1 a 2 litros/dia', value: 2 },
                                { label: 'Mais de 2 litros/dia', value: 3 }
                            ].map((opt, i) => (
                                <div key={i} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="ingestao_agua"
                                        id={`agua${i}`}
                                        checked={data.ingestao_agua === opt.value}
                                        onChange={() => setData('ingestao_agua', opt.value)}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small" htmlFor={`agua${i}`}>{opt.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="small text-secondary d-block mb-1">Alimentação predominante:</label>
                        <div className="d-flex flex-wrap gap-4">
                            {[
                                { label: 'Equilibrada', value: 1 },
                                { label: 'Rica em açúcares/doces', value: 2 },
                                { label: 'Rica em gorduras/fritos', value: 3 },
                                { label: 'Rica em processados/fast food', value: 4 }
                            ].map((opt, i) => (
                                <div key={i} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="alimentacao"
                                        id={`alim${i}`}
                                        checked={data.alimentacao === opt.value}
                                        onChange={() => setData('alimentacao', opt.value)}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small" htmlFor={`alim${i}`}>{opt.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="small text-secondary d-block mb-1">Pratica atividade física?</label>
                        <div className="d-flex flex-wrap gap-4">
                            {[
                                { label: 'Não (sedentário)', value: 1 },
                                { label: 'Sim (1-2 x /semana)', value: 2 },
                                { label: 'Sim (3 x ou mais/semana)', value: 3 }
                            ].map((opt, i) => (
                                <div key={i} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="atividade_fisica"
                                        id={`treino${i}`}
                                        checked={data.atividade_fisica === opt.value}
                                        onChange={() => setData('atividade_fisica', opt.value)}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small" htmlFor={`treino${i}`}>{opt.label}</label>
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
                    {/* Cirurgia Plástica */}
                    <div className="d-flex flex-column gap-2">
                        <label className="small text-secondary mb-0">Já realizou cirurgia plástica?</label>
                        <div className="d-flex align-items-center gap-4">
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input" type="radio" name="has_cirurgia" id="ciru-nao"
                                    checked={data.cirurgia_plastica === 'Não'}
                                    onChange={() => setData('cirurgia_plastica', 'Não')}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="ciru-nao">Não</label>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input" type="radio" name="has_cirurgia" id="ciru-sim"
                                        checked={data.cirurgia_plastica !== 'Não' && data.cirurgia_plastica !== ''}
                                        onChange={() => setData(prev => ({ ...prev, cirurgia_plastica: 'Sim  Qual(is): ' }))}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small text-nowrap" htmlFor="ciru-sim">Sim Qual(is):</label>
                                </div>
                                <input
                                    type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '300px' }}
                                    value={data.cirurgia_plastica.startsWith('Sim Qual(is): ') ? data.cirurgia_plastica.replace('Sim Qual(is): ', '') : ''}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setData(prev => ({ ...prev, cirurgia_plastica: 'Sim Qual(is): ' + val }));
                                    }}
                                    disabled={readOnly}
                                />

                            </div>
                        </div>
                    </div>

                    {/* Tratamentos Estéticos Anteriores */}
                    <div className="d-flex flex-column gap-2">
                        <label className="small text-secondary mb-0">Já fez tratamentos estéticos anteriores?</label>
                        <div className="d-flex align-items-center gap-4">
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input" type="radio" name="has_trat_estetico" id="trat-nao"
                                    checked={data.tratamento_estetico === 'Não'}
                                    onChange={() => setData('tratamento_estetico', 'Não')}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="trat-nao">Não</label>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input" type="radio" name="has_trat_estetico" id="trat-sim"
                                        checked={data.tratamento_estetico !== 'Não' && data.tratamento_estetico !== ''}
                                        onChange={() => setData(prev => ({ ...prev, tratamento_estetico: 'Sim Qual(is): ' }))}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small text-nowrap" htmlFor="trat-sim">Sim Qual(is):</label>
                                </div>
                                <input
                                    type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '300px' }}
                                    value={data.tratamento_estetico.startsWith('Sim Qual(is): ') ? data.tratamento_estetico.replace('Sim Qual(is): ', '') : ''}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setData(prev => ({ ...prev, tratamento_estetico: 'Sim Qual(is): ' + val }));
                                    }}
                                    disabled={readOnly}
                                />

                            </div>
                        </div>
                    </div>

                    {/* Tratamento Médico Atual */}
                    <div className="d-flex flex-column gap-2">
                        <label className="small text-secondary mb-0">Faz algum tratamento médico atual?</label>
                        <div className="d-flex align-items-center gap-4">
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input" type="radio" name="has_trat_medico" id="med-nao"
                                    checked={data.tratamento_medico === 'Não'}
                                    onChange={() => setData('tratamento_medico', 'Não')}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="med-nao">Não</label>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input" type="radio" name="has_trat_medico" id="med-sim"
                                        checked={data.tratamento_medico !== 'Não' && data.tratamento_medico !== ''}
                                        onChange={() => setData(prev => ({ ...prev, tratamento_medico: 'Sim Qual(is): ' }))}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small text-nowrap" htmlFor="med-sim">Sim Qual(is):</label>
                                </div>
                                <input
                                    type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '300px' }}
                                    value={data.tratamento_medico.startsWith('Sim Qual(is): ') ? data.tratamento_medico.replace('Sim Qual(is): ', '') : ''}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setData(prev => ({ ...prev, tratamento_medico: 'Sim Qual(is): ' + val }));
                                    }}
                                    disabled={readOnly}
                                />

                            </div>
                        </div>
                    </div>

                    {/* Alergias */}
                    <div className="d-flex flex-column gap-2">
                        <label className="small text-secondary mb-0">Possui alergias?</label>
                        <div className="d-flex align-items-center gap-4">
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input" type="radio" name="has_alergias" id="ale-nao"
                                    checked={data.alergias === 'Não'}
                                    onChange={() => setData('alergias', 'Não')}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="ale-nao">Não</label>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input" type="radio" name="has_alergias" id="ale-sim"
                                        checked={data.alergias.startsWith('Sim Especifique: ')}
                                        onChange={() => setData(prev => ({ ...prev, alergias: 'Sim Especifique: ' }))}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small text-nowrap" htmlFor="ale-sim">Sim Especifique:</label>
                                </div>
                                <input
                                    type="text" className="form-control form-control-sm border-0 border-bottom bg-transparent p-0" style={{ width: '300px' }}
                                    value={data.alergias.startsWith('Sim (Especifique: ') ? data.alergias.replace('Sim (Especifique: ', '') : ''}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setData(prev => ({ ...prev, alergias: 'Sim (Especifique: ' + val }));
                                    }}
                                    disabled={readOnly}
                                />

                            </div>
                        </div>
                    </div>

                    {/* Diabétic@ */}
                    <div className="row align-items-center g-2 mt-2">
                        <div className="col-auto">
                            <label className="small text-secondary">É diabética(o)?</label>
                        </div>
                        <div className="col-auto d-flex align-items-center gap-4 ms-2">
                            {[
                                { label: 'Não', value: 0 },
                                { label: 'Sim (Tipo I)', value: 1 },
                                { label: 'Sim (Tipo II)', value: 2 }
                            ].map((opt, i) => (
                                <div key={i} className="form-check mb-0">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="diabetica"
                                        id={`dia${i}`}
                                        checked={data.diabetica === opt.value}
                                        onChange={() => setData('diabetica', opt.value)}
                                        disabled={readOnly}
                                    />
                                    <label className="form-check-label small" htmlFor={`dia${i}`}>{opt.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Antecedentes Oncológicos */}
                    <div className="row align-items-center g-2 mt-2">
                        <div className="col-auto">
                            <label className="small text-secondary">Antecedentes Oncológicos?</label>
                        </div>
                        <div className="col-auto d-flex align-items-center gap-4 ms-2">
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="antecedentes_onco_radio"
                                    id="onco-nao"
                                    checked={data.antecedentes_onco === false}
                                    onChange={() => setData('antecedentes_onco', false)}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="onco-nao">Não</label>
                            </div>
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="antecedentes_onco_radio"
                                    id="onco-sim"
                                    checked={data.antecedentes_onco === true}
                                    onChange={() => setData('antecedentes_onco', true)}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="onco-sim">Sim</label>
                            </div>
                        </div>
                    </div>

                    {/* Anemia recente */}
                    <div className="row align-items-center g-2 mt-2">
                        <div className="col-auto">
                            <label className="small text-secondary">Anemia recente?</label>
                        </div>
                        <div className="col-auto d-flex align-items-center gap-4 ms-2">
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="anemia_recente_radio"
                                    id="ane-nao"
                                    checked={data.anemia_recente === false}
                                    onChange={() => setData('anemia_recente', false)}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="ane-nao">Não</label>
                            </div>
                            <div className="form-check mb-0">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="anemia_recente_radio"
                                    id="ane-sim"
                                    checked={data.anemia_recente === true}
                                    onChange={() => setData('anemia_recente', true)}
                                    disabled={readOnly}
                                />
                                <label className="form-check-label small" htmlFor="ane-sim">Sim</label>
                            </div>
                        </div>
                    </div>

                    {/* Peso atual */}
                    <div className="row align-items-center g-2 mt-3">
                        <div className="col-auto">
                            <label className="small text-secondary">Peso atual:</label>
                        </div>
                        <div className="col-auto d-flex align-items-center gap-2">
                            <input
                                type="number"
                                step="0.1"
                                className="form-control form-control-sm bg-light border-0 text-center"
                                style={{ width: '80px' }}
                                value={data.peso_atual}
                                onChange={e => setData('peso_atual', e.target.value)}
                                disabled={readOnly}
                            />
                            <span className="small">Kg</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Observações */}
            <div className="mb-5">
                <label className="fw-bold mb-2">Observações</label>
                <textarea
                    className="form-control bg-light border-0 p-3"
                    rows="4"
                    value={data.observacoes}
                    onChange={e => setData('observacoes', e.target.value)}
                    disabled={readOnly}
                ></textarea>
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
                <label className="small text-secondary mb-2">Assinatura do Cliente:</label>
                <SignaturePad
                    onSave={(val) => setData('assinatura', val)}
                    readOnly={readOnly || !!anamnese}
                    existingSignature={data.assinatura}
                />
            </div>

            {/* Data e Enviar */}
            {!readOnly && (
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <label className="small text-secondary mb-0">Data</label>
                        <input type="text" className="form-control form-control-sm bg-light border-0" value={new Date().toLocaleDateString('pt-PT')} readOnly style={{ width: '150px' }} />
                    </div>
                    {Object.keys(errors).length > 0 && (
                        <div className="alert alert-danger mt-3 mb-0 py-2 small">
                            <ul className="mb-0">
                                {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                            </ul>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-gold px-5 py-2 mt-3"
                        style={{ borderRadius: '8px' }}
                        disabled={processing}
                    >
                        {processing ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            )}
        </form>
    );
}

