<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// Classe para gerenciar tratamentos
class Tratamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'duracao',
        'preco',
    ];

    // Função para obter os agendamentos
    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class);
    }
}
