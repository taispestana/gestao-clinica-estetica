<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

// Classe para gerenciar usuários
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    // Os atributos que podem ser preenchidos via API
    protected $fillable = [
        'name',
        'email',
        'password',
        'data_nascimento',
        'telemovel',
        'nif',
        'endereco',
        'profissao',
        'cliente_desde',
        'estado_fidelidade',
        'especialidade',
        'tipo_users',
    ];

    // Os atributos que devem ser ocultos na serialização
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Os atributos que devem ser cast
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Função para obter os agendamentos notificados
    public function agendamentosNotificados()
    {
        return $this->belongsToMany(Agendamento::class, 'users_agendamento')
            ->withPivot('tipo_mensagem', 'estado_mensagem', 'data_envio')
            ->withTimestamps();
    }

    // Função para obter os agendamentos
    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class, 'cliente_id');
    }

    // Função para obter a ficha de anamnese
    public function anamnese()
    {
        return $this->hasOne(Anamnese::class);
    }

    // Função para obter os histórico de tratamentos
    public function historicoTratamentos()
    {
        return $this->hasMany(HistoricoTratamento::class);
    }
}
