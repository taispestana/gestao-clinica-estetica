<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// Classe para gerenciar histórico de tratamentos
class HistoricoTratamento extends Model
{
    use HasFactory;

    protected $table = 'historico_tratamentos';

    protected $fillable = [
        'anamnese_id',
        'user_id',
        'agendamento_id',
        'descricao',
        'data_sessao'
    ];

    // Função para obter o cliente
    public function cliente()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Função para obter a ficha de anamnese
    public function anamnese()
    {
        return $this->belongsTo(Anamnese::class);
    }
}
