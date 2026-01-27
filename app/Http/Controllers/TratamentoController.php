<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tratamento;
use App\Models\Agendamento;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TratamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tratamentos = Tratamento::latest()->get();

        $now = Carbon::now();
        $startOfWeek = $now->copy()->startOfWeek();
        $endOfWeek = $now->copy()->endOfWeek();

        $totalSemana = Agendamento::where('estado_agendamento', '!=', 5) // 5 = Ausência
            ->whereBetween('data_hora_inicio', [$startOfWeek, $endOfWeek])
            ->count();

        $totalMes = Agendamento::where('estado_agendamento', '!=', 5)
            ->whereMonth('data_hora_inicio', $now->month)
            ->whereYear('data_hora_inicio', $now->year)
            ->count();

        $totalAgendamentos = Agendamento::where('estado_agendamento', '!=', 5)->count();

        $popularTreatments = Agendamento::where('estado_agendamento', '!=', 5)
            ->whereNotNull('tratamento_id')
            ->select('tratamento_id', DB::raw('count(*) as count'))
            ->groupBy('tratamento_id')
            ->orderByDesc('count')
            ->limit(3)
            ->get()
            ->map(function ($agendamento) use ($totalAgendamentos) {
                $tratamento = Tratamento::find($agendamento->tratamento_id);
                return [
                    'name' => $tratamento ? $tratamento->nome : 'Desconhecido',
                    'percentage' => $totalAgendamentos > 0 ? round(($agendamento->count / $totalAgendamentos) * 100) : 0
                ];
            });

        return Inertia::render('Tratamentos', [
            'tratamentos' => $tratamentos,
            'totalSemana' => $totalSemana,
            'totalMes' => $totalMes,
            'popularTreatments' => $popularTreatments
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
