<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Agendamento;
use Inertia\Inertia;
use Carbon\Carbon;

// Classe para gerenciar mensagens
class MensagensController extends Controller
{
    // Função para exibir mensagens
    public function index()
    {
        $currentMonth = Carbon::now()->month;

        // Clientes que fazem anos este mês
        $aniversariantes = User::whereMonth('data_nascimento', $currentMonth)
            ->where('tipo_users', 1) // 1 para Cliente
            ->get();

        // Agendamentos: aparece 72h antes e sai 24h depois do início
        $lembretes = Agendamento::with(['cliente', 'tratamento'])
            ->whereBetween('data_hora_inicio', [
                Carbon::now()->subHours(24),
                Carbon::now()->addHours(72)
            ])
            ->orderBy('data_hora_inicio', 'asc')
            ->get();

        // Retorno dos dados
        return Inertia::render('Mensagens', [
            'aniversariantes' => $aniversariantes,
            'lembretes' => $lembretes,
        ]);
    }
}
