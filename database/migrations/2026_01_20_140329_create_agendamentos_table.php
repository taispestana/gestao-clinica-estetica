<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    // Função para executar as migrations
    public function up(): void
    {

        // Cria a tabela agendamentos
        Schema::create('agendamentos', function (Blueprint $table) {
            $table->id();

            // Chaves Estrangeiras
            $table->foreignId('cliente_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('profissional_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tratamento_id')->constrained('tratamentos')->onDelete('cascade');

            // Campos de Dados
            $table->boolean('voucher')->default(false);
            $table->dateTime('data_hora_inicio');
            $table->dateTime('data_hora_fim');

            // 1: Pendente, 2: Confirmado, 3: Concluído, 4: Cancelado
            $table->integer('estado_agendamento')->default(1);
            $table->string('motivo', 255)->nullable();
            $table->timestamps(); // created_at e updated_at
        });

    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendamentos');
    }
};
