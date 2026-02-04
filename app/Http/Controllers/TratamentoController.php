<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tratamento;
use App\Models\Agendamento;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

// Classe para gerenciar tratamentos
class TratamentoController extends Controller
{
    // Função para exibir tratamentos
    public function index()
    {
        $tratamentos = Tratamento::latest()->get();

        // Calcula os totais
        $now = Carbon::now();
        $startOfWeek = $now->copy()->startOfWeek();
        $endOfWeek = $now->copy()->endOfWeek();

        // Total de agendamentos na semana
        $totalSemana = Agendamento::where('estado_agendamento', '!=', 5) // 5 = Ausência
            ->whereBetween('data_hora_inicio', [$startOfWeek, $endOfWeek])
            ->count();

        // Total de agendamentos no mês
        $totalMes = Agendamento::where('estado_agendamento', '!=', 5)
            ->whereMonth('data_hora_inicio', $now->month)
            ->whereYear('data_hora_inicio', $now->year)
            ->count();

        $totalAgendamentos = Agendamento::where('estado_agendamento', '!=', 5)->count();

        // Tratamentos mais populares
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

        // Retorna os dados para a view
        return Inertia::render('Tratamentos', [
            'tratamentos' => $tratamentos,
            'totalSemana' => $totalSemana,
            'totalMes' => $totalMes,
            'popularTreatments' => $popularTreatments
        ]);
    }

    // Função para armazenar tratamentos
    public function storeTratamento(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'nome' => 'required|string|max:100',
            'duracao' => 'required|integer|min:1',
            'preco' => 'required|numeric|min:0',
        ]);

        // Cria o tratamento
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

    // Função para atualizar tratamentos
    public function update(Request $request, $id)
    {
        // Validação dos dados
        $request->validate([
            'nome' => 'required|string|max:100',
            'duracao' => 'required|integer|min:1',
            'preco' => 'required|numeric|min:0',
        ]);

        // Busca o tratamento
        $tratamento = Tratamento::findOrFail($id);
        // Atualiza o tratamento
        $tratamento->update([
            'nome' => $request->nome,
            'duracao' => $request->duracao,
            'preco' => $request->preco,
        ]);

        return redirect()->route('tratamentos')->with('message', 'Tratamento atualizado com sucesso');
    }

    // Função para eliminar tratamentos
    public function destroy($id)
    {
        // Busca o tratamento
        $tratamento = Tratamento::findOrFail($id);
        // Elimina o tratamento
        $tratamento->delete();

        return redirect()->route('tratamentos')->with('message', 'Tratamento excluído com sucesso');
    }
}
