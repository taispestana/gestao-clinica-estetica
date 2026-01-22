<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('anamneses', function (Blueprint $table) {
            // id_anamnese integer [pk, increment]
            $table->id();
            // id_users integer [fk]
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // Campos Inteiros com mapeamento por notas
            $table->integer('origem_conheceu')->nullable()->comment('1:Facebook, 2:Instagram, 3:Indicação, 4:Google, 5:Passagem, 6:Outro');
            $table->integer('exposicao_sol')->nullable()->comment('1:Nunca, 2:Raramente, 3:Frequentemente, 4:Diariamente');
            $table->integer('fumante')->nullable();
            $table->integer('ingestao_agua')->nullable()->comment('1:<1L, 2:1-2L, 3:>2L');
            $table->integer('alimentacao')->nullable()->comment('1:Equilibrada, 2:Açúcares, 3:Gorduras, 4:Processados');
            $table->integer('atividade_fisica')->nullable()->comment('1:Não, 2:1-2x semana, 3:3x ou mais');
            $table->integer('diabetica')->nullable()->comment('0:Não, 1:Tipo I, 2:Tipo II');

            // Campos de texto
            $table->string('cirurgia_plastica', 255)->nullable();
            $table->string('tratamento_estetico', 255)->nullable();
            $table->string('tratamento_medico', 255)->nullable();
            $table->string('alergias', 255)->nullable();
            // Booleanos
            $table->boolean('antecedentes_onco')->default(false);
            $table->boolean('anemia_recente')->default(false);
            // Dados Finais
            $table->decimal('peso_atual', 5, 2)->nullable();
            $table->string('observacoes', 1000)->nullable();
            $table->string('assinatura_path', 100)->nullable();
            $table->date('data_assinatura')->useCurrent(); // data_assinatura date [default: now()]

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anamneses');
    }
};
