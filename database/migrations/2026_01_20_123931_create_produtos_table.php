<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
