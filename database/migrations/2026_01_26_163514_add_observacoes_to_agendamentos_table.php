<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Adiciona a coluna observacoes na tabela agendamentos
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->text('observacoes')->nullable()->after('voucher');
        });
    }

    public function down(): void
    {
        // Remove a coluna observacoes da tabela agendamentos
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->dropColumn('observacoes');
        });
    }
};
