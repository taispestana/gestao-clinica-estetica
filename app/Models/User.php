<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'data_nascimento',
        'telemovel',
        'nif',
        'endereco',
        'profissao',
        'estado_fidelidade',
        'especialidade',
        'tipo_users',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relacionamentos para facilitar as queries no React
    public function agendamentosNotificados()
    {
        return $this->belongsToMany(Agendamento::class, 'users_agendamento')
            ->withPivot('tipo_mensagem', 'estado_mensagem', 'data_envio')
            ->withTimestamps();
    }

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class, 'cliente_id');
    }

    public function anamnese()
    {
        return $this->hasOne(Anamnese::class);
    }

    public function historicoTratamentos()
    {
        return $this->hasMany(HistoricoTratamento::class);
    }
}
