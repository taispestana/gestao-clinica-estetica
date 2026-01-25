<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Anamnese extends Model
{
    use HasFactory;

    // O Laravel assume o plural 'anamneses', mas é boa prática declarar
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
        'observacoes',
        'assinatura_path',
        'data_assinatura'
    ];

    /**
     * Relacionamento com o Usuário (Cliente)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
