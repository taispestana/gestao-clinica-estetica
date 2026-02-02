<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    // Função para executar as migrations
    public function up(): void
    {
        // Cria a tabela produtos
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->string('sku', 40)->unique()->nullable(); // Código de identificação único
            $table->decimal('preco', 10, 2);
            $table->integer('stock')->default(0);
            $table->integer('stock_minimo')->default(2);
            $table->date('data_validade')->nullable();
            $table->timestamps();
        });
    }

    // Função para desfazer as migrations
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
