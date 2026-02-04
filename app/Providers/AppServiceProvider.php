<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    // Função para registrar serviços
    public function register(): void
    {
        //
    }

    // Função para iniciar serviços
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
