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

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/clientes', [UserController::class, 'index'])->middleware(['auth', 'verified'])->name('clientes');

Route::get('/clientes/{id}', [UserController::class, 'show'])->middleware(['auth', 'verified'])->name('clientes.show');
Route::put('/clientes/{id}', [UserController::class, 'update'])->middleware(['auth', 'verified'])->name('clientes.update');



Route::get('/agendamentos', [AgendamentoController::class, 'index'])->middleware(['auth', 'verified'])->name('agendamentos');
Route::post('/agendamentos', [AgendamentoController::class, 'store'])->middleware(['auth', 'verified'])->name('agendamentos.store');
Route::delete('/agendamentos/{id}', [AgendamentoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('agendamentos.destroy');

Route::post('/anamneses', [AnamneseController::class, 'store'])->middleware(['auth', 'verified'])->name('anamneses.store');

Route::get('/tratamentos', [TratamentoController::class, 'index'])->middleware(['auth', 'verified'])->name('tratamentos');
Route::post('/storeTratamento', [TratamentoController::class, 'storeTratamento'])->name('tratamentos.store');
Route::put('/tratamentos/{id}', [TratamentoController::class, 'update'])->middleware(['auth', 'verified'])->name('tratamentos.update');
Route::delete('/tratamentos/{id}', [TratamentoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('tratamentos.destroy');

Route::get('/mensagens', function () {
    return Inertia::render('Mensagens');
})->middleware(['auth', 'verified'])->name('mensagens');

Route::get('/estoque', [ProdutoController::class, 'index'])->middleware(['auth', 'verified'])->name('estoque');
Route::post('/storeProduto', [ProdutoController::class, 'storeProduto'])->name('estoque.storeProduto');
Route::put('/estoque/{id}', [ProdutoController::class, 'update'])->middleware(['auth', 'verified'])->name('estoque.update');
Route::delete('/estoque/{id}', [ProdutoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('estoque.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';


Route::post('/storeUser', [UserController::class, 'storeUser'])->name('users.storeUser');
