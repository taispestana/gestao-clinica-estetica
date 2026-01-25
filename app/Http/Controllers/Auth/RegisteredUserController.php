<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],$this->messages()); // <--- Chama a função de traduções aqui), ;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Mensagens de erro personalizadas para o registo em português.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Por favor, indique o seu nome completo.',
            'name.string'   => 'O nome deve conter apenas letras.',
            'name.max'      => 'O nome não pode ter mais de 255 caracteres.',
            
            'email.required'  => 'O endereço de e-mail da clínica é obrigatório.',
            'email.email'     => 'Insira um formato de e-mail válido (ex: utilizador@exemplo.com).',
            'email.unique'    => 'Este e-mail já está registado no nosso sistema.',
            'email.lowercase' => 'O e-mail deve ser escrito em letras minúsculas.',
            
            'password.required'  => 'A senha é obrigatória para aceder ao sistema.',
            'password.confirmed' => 'A confirmação da senha não coincide com a senha digitada.',
            'password.min'       => 'A senha deve ter pelo menos 8 caracteres.',
        ];
    }

    
}
