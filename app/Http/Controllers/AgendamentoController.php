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
        $clientes = User::where('tipo_users', 1)->get(); // 1 = Cliente
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
        $request->validate([
            'cliente_id' => 'required|exists:users,id',
            'tratamento_id' => 'required|exists:tratamentos,id',
            'data' => 'required|date',
            'inicio' => 'required',
            'fim' => 'required',
            'voucher' => 'nullable|string',
        ], [
            'cliente_id.required' => 'Selecione um cliente.',
            'tratamento_id.required' => 'Selecione um tratamento.',
        ]);

        Agendamento::create([
            'cliente_id' => $request->cliente_id,
            'profissional_id' => Auth::id(),
            'tratamento_id' => $request->tratamento_id,
            'data_hora_inicio' => $request->data . ' ' . $request->inicio,
            'data_hora_fim' => $request->data . ' ' . $request->fim,
            'voucher' => $request->voucher,
            'estado_agendamento' => 1,
        ]);

        return redirect()->back()->with('message', 'Agendamento realizado com sucesso!');
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
