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
        Schema::table('anamneses', function (Blueprint $table) {
            $table->boolean('antecedentes_onco')->nullable()->change();
            $table->boolean('anemia_recente')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('anamneses', function (Blueprint $table) {
            $table->boolean('antecedentes_onco')->nullable(false)->change();
            $table->boolean('anemia_recente')->nullable(false)->change();
        });
    }
};
