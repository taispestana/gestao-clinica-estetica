<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_agendamento', function (Blueprint $table) {
            $table->id(); // ID único para o registro da mensagem
            // Chaves Estrangeiras
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('agendamento_id')->constrained('agendamentos')->onDelete('cascade');
            // Atributos da Mensagem
            $table->integer('tipo_mensagem')->comment('1: Lembrete, 2: Confirmação, 3: Marketing');
            $table->boolean('estado_mensagem')->default(false)->comment('false: Falha/Pendente, true: Enviada');
            $table->dateTime('data_envio')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_agendamento');
    }
};
