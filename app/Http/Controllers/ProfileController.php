<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

// Classe para gerenciar perfil
class ProfileController extends Controller
{
    // Função para exibir perfil
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // Função para atualizar perfil
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // Atualiza o perfil
        $request->user()->fill($request->validated());

        // Verifica se o email foi alterado
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // Salva o perfil
        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    // Função para eliminar perfil
    public function destroy(Request $request): RedirectResponse
    {
        // Valida a senha
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // Busca o usuário
        $user = $request->user();

        // Desloga o usuário
        Auth::logout();

        // Elimina o usuário
        $user->delete();

        // Invalida a sessão
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redireciona para a página inicial
        return Redirect::to('/');
    }
}
