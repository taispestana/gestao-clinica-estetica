<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tratamento;
use App\Models\User;
use App\Models\Agendamento;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AgendamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tratamentos = Tratamento::all();
        $clientes = User::where('tipo_users', '=', 1)->get(); // 1 = Cliente
        $agendamentos = Agendamento::with(['cliente', 'tratamento', 'profissional'])->get();

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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $isAbsence = $request->input('is_absence', false);

        $rules = [
            'data' => 'required|date',
            'inicio' => 'required',
            'fim' => 'required',
            'observacoes' => 'nullable|string',
        ];

        if ($isAbsence) {
            $rules['motivo'] = 'required|string|max:255';
        } else {
            $rules['cliente_id'] = 'required|exists:users,id';
            $rules['tratamento_id'] = 'required|exists:tratamentos,id';
            $rules['voucher'] = 'nullable|string';
        }

        $request->validate($rules, [
            'cliente_id.required' => 'Selecione um cliente.',
            'tratamento_id.required' => 'Selecione um tratamento.',
            'motivo.required' => 'Informe o motivo da ausência.',
        ]);

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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $agendamento = Agendamento::findOrFail($id);

        // Opcional: Verificar se o usuário tem permissão (ex: se é o profissional ou admin)
        // if ($agendamento->profissional_id !== Auth::id()) { abort(403); }

        $agendamento->delete();

        return redirect()->back()->with('message', 'Agendamento removido com sucesso!');
    }
}
