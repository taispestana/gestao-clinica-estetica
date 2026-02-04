<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    // Função para executar as migrations
    public function up(): void
    {
        // Altera a coluna voucher na tabela agendamentos
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->string('voucher')->nullable()->change();
        });
    }

    // Função para desfazer as migrations
    public function down(): void
    {
        // Altera a coluna voucher na tabela agendamentos
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->boolean('voucher')->default(false)->change();
        });
    }
};
