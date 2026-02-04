<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    // Função para executar as migrations
    public function up(): void
    {
        // Adiciona a coluna cigarros_por_dia na tabela anamneses
        Schema::table('anamneses', function (Blueprint $table) {
            $table->integer('cigarros_por_dia')->nullable()->after('fumante');
        });
    }

    // Função para desfazer as migrations
    public function down(): void
    {
        // Remove a coluna cigarros_por_dia da tabela anamneses
        Schema::table('anamneses', function (Blueprint $table) {
            $table->dropColumn('cigarros_por_dia');
        });
    }
};
