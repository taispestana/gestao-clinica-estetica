<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    // Função para executar as migrations
    public function up(): void
    {
        // Cria a tabela tratamentos
        Schema::create('tratamentos', function (Blueprint $table) {
            $table->id(); // Cria o id auto-incremento (substituindo id_tratamento)
            $table->string('nome', 100);
            $table->integer('duracao')->comment('Duração em minutos');
            $table->decimal('preco', 10, 2);
            $table->timestamps(); // Cria created_at e updated_at (essencial para auditoria)
        });
    }

    // Função para desfazer as migrations
    public function down(): void
    {
        Schema::dropIfExists('tratamentos');
    }
};
