<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tratamento;
use Inertia\Inertia;

class TratamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tratamentos = Tratamento::latest()->get();
        return Inertia::render('Tratamentos', [
            'tratamentos' => $tratamentos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeTratamento(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'duracao' => 'required|integer|min:1',
            'preco' => 'required|numeric|min:0',
        ]);

        Tratamento::create([
            'nome' => $request->nome,
            'duracao' => $request->duracao,
            'preco' => $request->preco,
        ]);

        return redirect()->route('tratamentos')->with('message', 'Tratamento adicionado com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'duracao' => 'required|integer|min:1',
            'preco' => 'required|numeric|min:0',
        ]);

        $tratamento = Tratamento::findOrFail($id);
        $tratamento->update([
            'nome' => $request->nome,
            'duracao' => $request->duracao,
            'preco' => $request->preco,
        ]);

        return redirect()->route('tratamentos')->with('message', 'Tratamento atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tratamento = Tratamento::findOrFail($id);
        $tratamento->delete();

        return redirect()->route('tratamentos')->with('message', 'Tratamento excluído com sucesso');
    }
}
