<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        // Torna os campos cliente_id e tratamento_id nullable para agendamentos ausentes
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->foreignId('cliente_id')->nullable()->change();
            $table->foreignId('tratamento_id')->nullable()->change();
        });
    }


    public function down(): void
    {
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->foreignId('cliente_id')->nullable(false)->change();
            $table->foreignId('tratamento_id')->nullable(false)->change();
        });
    }
};
