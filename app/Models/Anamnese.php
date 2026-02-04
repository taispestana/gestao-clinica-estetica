<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// Classe para gerenciar anamnese
class Anamnese extends Model
{
    use HasFactory;

    protected $table = 'anamneses';

    protected $fillable = [
        'user_id',
        'origem_conheceu',
        'exposicao_sol',
        'fumante',
        'ingestao_agua',
        'alimentacao',
        'atividade_fisica',
        'cirurgia_plastica',
        'tratamento_estetico',
        'tratamento_medico',
        'alergias',
        'diabetica',
        'antecedentes_onco',
        'anemia_recente',
        'peso_atual',
        'cigarros_por_dia',
        'observacoes',
        'assinatura_path',
        'data_assinatura'
    ];

    /**
     * Os atributos que devem ser convertidos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'antecedentes_onco' => 'boolean',
        'anemia_recente' => 'boolean',
    ];

    // Função para obter o usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
