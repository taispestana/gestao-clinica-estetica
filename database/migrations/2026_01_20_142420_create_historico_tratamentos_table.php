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
        Schema::create('historico_tratamentos', function (Blueprint $table) {
            $table->id();
            // Relacionamentos
            $table->foreignId('anamnese_id')->constrained('anamneses')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('agendamento_id')->nullable()->constrained('agendamentos')->onDelete('set null');

            // Dados da Sessão
            $table->text('descricao');
            $table->dateTime('data_sessao')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historico_tratamentos');
    }
};
