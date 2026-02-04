<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\TratamentoController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\AnamneseController;
use App\Http\Controllers\MensagensController;
use App\Http\Controllers\DashboardController;

// Rotas de autenticacao
Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});
require __DIR__ . '/auth.php';

// Rotas de dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// Rotas de mensagens
Route::get('/mensagens', [MensagensController::class, 'index'])->middleware(['auth', 'verified'])->name('mensagens');

// Rotas de clientes
Route::get('/clientes', [UserController::class, 'index'])->middleware(['auth', 'verified'])->name('clientes');
Route::get('/clientes/{id}', [UserController::class, 'show'])->middleware(['auth', 'verified'])->name('clientes.show');
Route::put('/clientes/{id}', [UserController::class, 'update'])->middleware(['auth', 'verified'])->name('clientes.update');
Route::post('/anamneses', [AnamneseController::class, 'store'])->middleware(['auth', 'verified'])->name('anamneses.store');

// Rotas de agendamentos
Route::get('/agendamentos', [AgendamentoController::class, 'index'])->middleware(['auth', 'verified'])->name('agendamentos');
Route::post('/agendamentos', [AgendamentoController::class, 'store'])->middleware(['auth', 'verified'])->name('agendamentos.store');
Route::delete('/agendamentos/{id}', [AgendamentoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('agendamentos.destroy');

// Rotas de tratamentos
Route::get('/tratamentos', [TratamentoController::class, 'index'])->middleware(['auth', 'verified'])->name('tratamentos');
Route::post('/storeTratamento', [TratamentoController::class, 'storeTratamento'])->name('tratamentos.store');
Route::put('/tratamentos/{id}', [TratamentoController::class, 'update'])->middleware(['auth', 'verified'])->name('tratamentos.update');
Route::delete('/tratamentos/{id}', [TratamentoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('tratamentos.destroy');

// Rotas de estoque
Route::get('/estoque', [ProdutoController::class, 'index'])->middleware(['auth', 'verified'])->name('estoque');
Route::post('/storeProduto', [ProdutoController::class, 'storeProduto'])->name('estoque.storeProduto');
Route::put('/estoque/{id}', [ProdutoController::class, 'update'])->middleware(['auth', 'verified'])->name('estoque.update');
Route::delete('/estoque/{id}', [ProdutoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('estoque.destroy');

// Rotas de perfil
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rotas de usuarios
Route::post('/storeUser', [UserController::class, 'storeUser'])->name('users.storeUser');

// Rotas de fallback
Route::fallback(function () {
    return Inertia::render('Fallback');
});
