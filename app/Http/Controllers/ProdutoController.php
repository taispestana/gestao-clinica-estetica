<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto;
use Inertia\Inertia;

// Classe para gerenciar produtos
class ProdutoController extends Controller
{
    // Função para exibir produtos
    public function index()
    {
        $produtos = Produto::latest()->get();
        return Inertia::render('Estoque', [
            'produtos' => $produtos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    // Função para armazenar produtos
    public function storeProduto(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'stock' => 'nullable|integer|min:0',
            'data_validade' => 'nullable|date',
        ]);

        // Remover acentos e caracteres especiais do nome para gerar o SKU
        $nomeSemAcento = iconv('UTF-8', 'ASCII//TRANSLIT', $request->nome);
        $prefix = strtoupper(substr(preg_replace('/[^A-Za-z]/', '', $nomeSemAcento), 0, 3));

        // Se o prefixo tiver menos de 3 caracteres, preenche com X
        if (strlen($prefix) < 3) {
            $prefix = str_pad($prefix, 3, 'X');
        }

        // Busca o último produto com o mesmo prefixo
        $lastProduct = Produto::where('sku', 'LIKE', $prefix . '%')
            ->orderBy('sku', 'desc')
            ->first();

        // Se existir, incrementa o número
        $nextNumber = 1;
        if ($lastProduct) {
            // Tenta extrair os últimos 3 dígitos
            $lastSku = $lastProduct->sku;
            $lastNumber = (int) substr($lastSku, 3);
            $nextNumber = $lastNumber + 1;
        }

        // Gera o SKU
        $sku = $prefix . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

        // Cria o produto
        Produto::create([
            'nome' => $request->nome,
            'sku' => $sku,
            'preco' => 0, // Preço removido do form, padrão 0
            'stock' => $request->stock ?? 0,
            'stock_minimo' => 2, // Stock mínimo removido do form, padrão 2
            'data_validade' => $request->data_validade,
        ]);

        return redirect()->route('estoque')->with('message', 'Produto adicionado com sucesso');
    }

    // Função para exibir produtos
    public function show(string $id)
    {
        $produto = Produto::findOrFail($id);

        return Inertia::render('Estoque/Produto', [
            'produto' => $produto
        ]);
    }

    // Função para editar produtos
    public function edit(string $id)
    {
        $produto = Produto::findOrFail($id);

        return Inertia::render('Estoque/Edit', [
            'produto' => $produto
        ]);
    }

    // Função para atualizar produtos
    public function update(Request $request, string $id)
    {
        // Validação dos dados
        $request->validate([
            'nome' => 'required|string|max:100',
            'stock' => 'nullable|integer|min:0',
            'data_validade' => 'nullable|date',
        ]);

        // Busca o produto
        $produto = Produto::findOrFail($id);

        // Atualiza o produto
        $produto->update([
            'nome' => $request->nome,
            'stock' => $request->stock ?? 0,
            'data_validade' => $request->data_validade,
        ]);

        return redirect()->route('estoque')->with('message', 'Produto atualizado com sucesso');
    }

    // Função para eliminar produtos
    public function destroy(string $id)
    {
        // Busca o produto
        $produto = Produto::findOrFail($id);
        // Elimina o produto
        $produto->delete();
        return redirect()->route('estoque')->with('message', 'Produto eliminado com sucesso');
    }
}
