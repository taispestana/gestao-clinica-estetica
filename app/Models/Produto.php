<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// Classe para gerenciar produtos
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

    // Função para verificar se o produto está com stock baixo
    public function precisaReposicao()
    {
        return $this->stock <= $this->stock_minimo;
    }
}
