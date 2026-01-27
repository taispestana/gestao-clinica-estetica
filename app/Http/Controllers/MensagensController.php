<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Agendamento;
use Inertia\Inertia;
use Carbon\Carbon;

class MensagensController extends Controller
{
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

        return Inertia::render('Mensagens', [
            'aniversariantes' => $aniversariantes,
            'lembretes' => $lembretes,
        ]);
    }
}
