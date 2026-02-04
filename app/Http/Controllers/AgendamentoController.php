<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tratamento;
use App\Models\User;
use App\Models\Agendamento;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// Classe para gerenciar agendamentos
class AgendamentoController extends Controller
{
    /**
     * Função para listar todos os agendamentos
     */
    public function index()
    {
        // Listagem de tratamentos e clientes
        $tratamentos = Tratamento::all();
        $clientes = User::where('tipo_users', '=', 1)->get(); // 1 = Cliente
        $agendamentos = Agendamento::with(['cliente', 'tratamento', 'profissional'])->get();

        // Renderização da página
        return Inertia::render('Agendamentos', [
            'tratamentos' => $tratamentos,
            'clientes' => $clientes,
            'agendamentos' => $agendamentos
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
     * Função para criar um novo agendamento
     */
    public function store(Request $request)
    {
        $isAbsence = $request->input('is_absence', false);

        // Regras de validação
        $rules = [
            'data' => 'required|date',
            'inicio' => 'required',
            'fim' => 'required',
            'observacoes' => 'nullable|string',
        ];

        // Regras de validação para ausência
        if ($isAbsence) {
            $rules['motivo'] = 'required|string|max:255';
        } else {
            $rules['cliente_id'] = 'required|exists:users,id';
            $rules['tratamento_id'] = 'required|exists:tratamentos,id';
            $rules['voucher'] = 'nullable|string';
        }

        // Validação
        $request->validate($rules, [
            'cliente_id.required' => 'Selecione um cliente.',
            'tratamento_id.required' => 'Selecione um tratamento.',
            'motivo.required' => 'Informe o motivo da ausência.',
        ]);

        // Criação do agendamento
        Agendamento::create([
            'cliente_id' => $isAbsence ? null : $request->cliente_id,
            'profissional_id' => Auth::id(),
            'tratamento_id' => $isAbsence ? null : $request->tratamento_id,
            'data_hora_inicio' => $request->data . ' ' . $request->inicio,
            'data_hora_fim' => $request->data . ' ' . $request->fim,
            'voucher' => $isAbsence ? null : $request->voucher,
            'observacoes' => $request->observacoes,
            'motivo' => $isAbsence ? $request->motivo : null,
            'estado_agendamento' => $isAbsence ? 5 : 1,
        ]);

        // Redirecionamento
        return redirect()->back()->with('message', $isAbsence ? 'Ausência registrada com sucesso!' : 'Agendamento realizado com sucesso!');
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
     * Função para eliminar um agendamento
     */
    public function destroy(string $id)
    {
        // Encontrar o agendamento
        $agendamento = Agendamento::findOrFail($id);

        // Eliminação do agendamento
        $agendamento->delete();

        // Redirecionamento
        return redirect()->back()->with('message', 'Agendamento removido com sucesso!');
    }
}
