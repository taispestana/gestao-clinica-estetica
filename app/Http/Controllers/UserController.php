<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = User::where('tipo_users', 1)->latest()->get();
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

    /**
     * Store a newly created resource in storage.
     */
    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'telemovel' => 'required|string|max:20',
            'email' => 'nullable|email|unique:users|max:255',
            'data_nascimento' => 'nullable|date',
            'profissao' => 'nullable|string|max:255',
        ]);

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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cliente = User::findOrFail($id);
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'telemovel' => 'required|string|max:20',
            'email' => 'nullable|email|max:255|unique:users,email,' . $id,
            'data_nascimento' => 'nullable|date',
            'profissao' => 'nullable|string|max:255',
            'endereco' => 'nullable|string|max:255',
            'nif' => 'nullable|string|max:255',
            'tipo_users' => 'nullable|integer'
        ]);

        $user = User::findOrFail($id);
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
