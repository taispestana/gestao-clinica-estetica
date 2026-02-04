<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    // Função para executar as migrations
    public function up(): void
    {
        // Cria a tabela users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();

            // Campos adicionais do diagrama
            $table->date('data_nascimento')->nullable();
            $table->string('telemovel', 20)->nullable();
            $table->string('nif', 40)->nullable();
            $table->string('endereco', 100)->nullable();
            $table->string('profissao', 40)->nullable();
            $table->boolean('estado_fidelidade')->default(false);
            $table->string('especialidade', 25)->nullable(); // Usado para profissionais
            $table->integer('tipo_users')->default(1)->comment('1: Cliente, 2: Profissional');
            $table->timestamps();
        });

        // Cria a tabela password_reset_tokens
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Cria a tabela sessions
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    // Função para desfazer as migrations
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
