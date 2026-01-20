<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    // Relacionamento: O histórico pertence a um cliente
    public function cliente() {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relacionamento: O histórico está ligado a uma ficha de anamnese
    public function anamnese() {
        return $this->belongsTo(Anamnese::class);
    }
}
