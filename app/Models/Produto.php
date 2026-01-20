<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'sku',
        'preco',
        'stock',
        'stock_minimo',
        'data_validade',
    ];

    /**
     * Verifica se o produto está com stock baixo.
     * Útil para exibir alertas no Dashboard do React.
     */
    public function precisaReposicao()
    {
        return $this->stock <= $this->stock_minimo;
    }
}
