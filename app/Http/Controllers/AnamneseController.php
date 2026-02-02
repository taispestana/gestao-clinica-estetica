<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// Classe para gerenciar anamneses
class AnamneseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Função para armazenar uma nova anamnese
     */
    public function store(Request $request)
    {
        // Validação dos dados
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'origem_conheceu' => 'nullable|integer',
            'exposicao_sol' => 'nullable|integer',
            'fumante' => 'nullable|integer',
            'ingestao_agua' => 'nullable|integer',
            'alimentacao' => 'nullable|integer',
            'atividade_fisica' => 'nullable|integer',
            'cirurgia_plastica' => 'nullable|string|max:255',
            'tratamento_estetico' => 'nullable|string|max:255',
            'tratamento_medico' => 'nullable|string|max:255',
            'alergias' => 'nullable|string|max:255',
            'diabetica' => 'nullable|integer',
            'antecedentes_onco' => 'nullable|boolean',
            'anemia_recente' => 'nullable|boolean',
            'peso_atual' => 'nullable|numeric',
            'cigarros_por_dia' => 'nullable|integer',
            'observacoes' => 'nullable|string|max:1000',
            'assinatura' => 'nullable|string',
        ]);

        // Validação da assinatura
        if ($request->assinatura && str_starts_with($request->assinatura, 'data:image')) {
            $imageData = $request->assinatura;
            $imageData = str_replace('data:image/png;base64,', '', $imageData);
            $imageData = str_replace(' ', '+', $imageData);
            $imageName = 'signature_' . $validated['user_id'] . '_' . time() . '.png';

            // Armazenamento da assinatura
            \Illuminate\Support\Facades\Storage::disk('public')->put('signatures/' . $imageName, base64_decode($imageData));
            $validated['assinatura_path'] = '/storage/signatures/' . $imageName;
        }

        // Criação ou atualização da anamnese
        \App\Models\Anamnese::updateOrCreate(
            ['user_id' => $validated['user_id']],
            $validated
        );

        // Redirecionamento
        return redirect()->back();
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
