<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/clientes', function () {
    return Inertia::render('Clientes');
})->middleware(['auth', 'verified'])->name('clientes');

Route::get('/clientes/detalhes', function () {
    return Inertia::render('Clientes/Show');
})->middleware(['auth', 'verified'])->name('clientes.show');

Route::get('/agendamentos', function () {
    return Inertia::render('Agendamentos');
})->middleware(['auth', 'verified'])->name('agendamentos');

Route::get('/tratamentos', function () {
    return Inertia::render('Tratamentos');
})->middleware(['auth', 'verified'])->name('tratamentos');

Route::get('/mensagens', function () {
    return Inertia::render('Mensagens');
})->middleware(['auth', 'verified'])->name('mensagens');

Route::get('/estoque', function () {
    return Inertia::render('Estoque');
})->middleware(['auth', 'verified'])->name('estoque');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';


