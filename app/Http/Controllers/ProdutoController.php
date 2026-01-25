<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto;
use Inertia\Inertia;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
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
        
        if (strlen($prefix) < 3) {
            $prefix = str_pad($prefix, 3, 'X');
        }

        $lastProduct = Produto::where('sku', 'LIKE', $prefix . '%')
            ->orderBy('sku', 'desc')
            ->first();

        $nextNumber = 1;
        if ($lastProduct) {
            // Tenta extrair os últimos 3 dígitos
            $lastSku = $lastProduct->sku;
            $lastNumber = (int) substr($lastSku, 3);
            $nextNumber = $lastNumber + 1;
        }

        $sku = $prefix . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $produto = Produto::findOrFail($id);
        return Inertia::render('Estoque/Produto', [
            'produto' => $produto
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $produto = Produto::findOrFail($id);
        return Inertia::render('Estoque/Edit', [
            'produto' => $produto
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'stock' => 'nullable|integer|min:0',
            'data_validade' => 'nullable|date',
        ]);

        $produto = Produto::findOrFail($id);
        $produto->update([
            'nome' => $request->nome,
            'stock' => $request->stock ?? 0,
            'data_validade' => $request->data_validade,
        ]);

        return redirect()->route('estoque')->with('message', 'Produto atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $produto = Produto::findOrFail($id);
        $produto->delete();
        return redirect()->route('estoque')->with('message', 'Produto eliminado com sucesso');
    }
}
