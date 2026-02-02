<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

// Classe para gerenciar clientes
class UserController extends Controller
{
    // Função para exibir clientes
    public function index()
    {
        // Busca os clientes
        $clientes = User::where('tipo_users', 1)
            ->withMax('agendamentos as ultima_marcacao', 'data_hora_inicio')
            ->latest()
            ->get();

        // Retorna os dados para a view
        return Inertia::render('Clientes', [
            'clientes' => $clientes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    // Função para armazenar clientes
    public function storeUser(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'name' => 'required|string|max:255',
            'telemovel' => 'required|string|min:9|max:20',
            'email' => 'nullable|email|unique:users|max:255',
            'data_nascimento' => 'nullable|date',
            'profissao' => 'nullable|string|max:255',
        ]);

        // Cria o cliente
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'telemovel' => $request->telemovel,
            'password' => Hash::make($request->telemovel), // Senha padrão é o telemovel
            'data_nascimento' => $request->data_nascimento,
            'profissao' => $request->profissao,
            'tipo_users' => 1, // 1 para Cliente
        ]);

        return redirect()->route('clientes')->with('message', 'Cliente adicionado com sucesso');
    }

    // Função para exibir clientes
    public function show(string $id)
    {
        // Busca o cliente
        $cliente = User::with([
            'agendamentos.tratamento',
            'agendamentos.profissional',
            'anamnese',
            'historicoTratamentos.anamnese'
        ])
            ->withMax('agendamentos as ultima_marcacao', 'data_hora_inicio')
            ->findOrFail($id);

        return Inertia::render('Clientes/Cliente', [
            'cliente' => $cliente
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    // Função para atualizar clientes
    public function update(Request $request, string $id)
    {
        // Validação dos dados
        $request->validate([
            'name' => 'required|string|max:255',
            'telemovel' => 'required|string|min:9|max:20',
            'email' => 'nullable|email|max:255|unique:users,email,' . $id,
            'data_nascimento' => 'nullable|date',
            'profissao' => 'nullable|string|max:255',
            'endereco' => 'nullable|string|max:255',
            'nif' => 'nullable|string|max:255',
            'tipo_users' => 'nullable|integer'
        ]);

        // Busca o cliente
        $user = User::findOrFail($id);
        // Atualiza o cliente
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'telemovel' => $request->telemovel,
            'data_nascimento' => $request->data_nascimento,
            'profissao' => $request->profissao,
            'endereco' => $request->endereco,
            'nif' => $request->nif,
        ]);

        return redirect()->back()->with('message', 'Cliente atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
