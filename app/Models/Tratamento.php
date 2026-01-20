<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tratamento extends Model
{
    use HasFactory;

    // Define quais campos podem ser preenchidos via API
    protected $fillable = [
        'nome',
        'duracao',
        'preco',
    ];

    /**
     * Relacionamento: Um tratamento pode estar em muitos agendamentos.
     */
    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class);
    }
}
