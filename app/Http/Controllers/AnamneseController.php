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
            try {
                $imageData = $request->assinatura;
                // Extrai o formato e os dados base64 de forma mais robusta
                if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
                    $imageData = substr($imageData, strpos($imageData, ',') + 1);
                    $type = strtolower($type[1]); // png, jpg, etc.

                    $imageData = base64_decode($imageData);

                    if ($imageData === false) {
                        throw new \Exception('Base64 decode failed');
                    }

                    $imageName = 'signature_' . $validated['user_id'] . '_' . time() . '.' . $type;
                    $path = 'signatures/' . $imageName;

                    // Garante que o diretório existe
                    if (!\Illuminate\Support\Facades\Storage::disk('public')->exists('signatures')) {
                        \Illuminate\Support\Facades\Storage::disk('public')->makeDirectory('signatures');
                    }

                    // Armazenamento da assinatura
                    \Illuminate\Support\Facades\Storage::disk('public')->put($path, $imageData);
                    $validated['assinatura_path'] = '/storage/' . $path;

                    \Illuminate\Support\Facades\Log::info('Signature saved: ' . $validated['assinatura_path']);
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Signature save error: ' . $e->getMessage());
            }
        }

        // Se a assinatura for uma URL existente (edição), não precisamos fazer nada,
        // pois ela não está no str_starts_with('data:image').
        // Mas precisamos garantir que assinatura_path não seja sobrescrito se não mudar.

        // Remove o campo 'assinatura' se existir para não dar erro no updateOrCreate
        unset($validated['assinatura']);

        // Criação ou atualização da anamnese
        $anamnese = \App\Models\Anamnese::updateOrCreate(
            ['user_id' => $validated['user_id']],
            $validated
        );

        // Redirecionamento
        return redirect()->back()->with('message', 'Ficha de anamnese salva com sucesso');
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
