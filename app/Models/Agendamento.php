<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    protected $fillable = [

        'cliente_id',
        'profissional_id',
        'tratamento_id',
        'voucher',
        'data_hora_inicio',
        'data_hora_fim',
        'estado_agendamento',
        'motivo',
        'observacoes'
    ];

    // Relacionamentos para facilitar as queries no React
    public function cliente()
    {

        return $this->belongsTo(User::class, 'cliente_id');

    }

    public function profissional()
    {

        return $this->belongsTo(User::class, 'profissional_id');

    }

    public function tratamento()
    {

        return $this->belongsTo(Tratamento::class);

    }

    public function mensagensEnviadas()
    {
        return $this->belongsToMany(User::class, 'users_agendamento')
            ->withPivot('tipo_mensagem', 'estado_mensagem', 'data_envio')
            ->withTimestamps();
    }

}
