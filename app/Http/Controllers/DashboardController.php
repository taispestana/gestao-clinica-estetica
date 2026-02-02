<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use App\Models\Tratamento;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

// Classe para gerenciar o dashboard
class DashboardController extends Controller
{
    // Função para exibir o dashboard
    public function index()
    {
        // Data atual
        $now = Carbon::now();

        // Estatísticas
        $totalClientes = User::where('tipo_users', 1)->count(); // 1 = Cliente
        $agendamentosHoje = Agendamento::where('estado_agendamento', '!=', 5)
            ->whereDate('data_hora_inicio', $now->toDateString())
            ->count();
        $agendamentoMensal = Agendamento::where('estado_agendamento', '!=', 5)
            ->whereMonth('data_hora_inicio', $now->month)
            ->whereYear('data_hora_inicio', $now->year)
            ->count();

        // Lista de agendamentos de hoje
        $appointmentsHoje = Agendamento::with(['cliente', 'tratamento'])
            ->where('estado_agendamento', '!=', 5)
            ->whereDate('data_hora_inicio', $now->toDateString())
            ->orderBy('data_hora_inicio')
            ->get()
            ->map(function ($apt) {
                $now = Carbon::now();
                $horaFim = Carbon::parse($apt->data_hora_fim);

                // Regra: CONFIRMADO após o fim, PENDENTE antes disso (respeitando cancelamentos)
                $estadoSet = $apt->estado_agendamento;

                if ($estadoSet != 4) { // Se não estiver cancelado
                    if ($now->greaterThanOrEqualTo($horaFim)) {
                        $estadoSet = 2; // CONFIRMADO
                    } else {
                        $estadoSet = 1; // PENDENTE
                    }
                }

                // Mapeamento de status
                $statusMap = [
                    1 => ['label' => 'PENDENTE', 'color' => 'var(--status-yellow)'],
                    2 => ['label' => 'CONFIRMADO', 'color' => 'var(--status-green)'],
                    3 => ['label' => 'CONCLUÍDO', 'color' => 'var(--status-green)'],
                    4 => ['label' => 'CANCELADO', 'color' => 'var(--status-red)'],
                ];

                $status = $statusMap[$estadoSet] ?? ['label' => 'DESCONHECIDO', 'color' => 'var(--secondary)'];

                // Retorno dos dados
                return [
                    'name' => $apt->cliente ? $apt->cliente->name : 'N/A',
                    'service' => $apt->tratamento ? $apt->tratamento->nome : 'N/A',
                    'time' => Carbon::parse($apt->data_hora_inicio)->format('H:i'),
                    'status' => $status['label'],
                    'color' => $status['color']
                ];
            });

        // Tratamentos mais populares
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

        // Retorno dos dados
        return Inertia::render('Dashboard', [
            'totalClientes' => $totalClientes,
            'agendamentosHoje' => $agendamentosHoje,
            'agendamentoMensal' => $agendamentoMensal,
            'appointmentsHoje' => $appointmentsHoje,
            'popularTreatments' => $popularTreatments
        ]);
    }
}
