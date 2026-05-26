<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// 1. Importamos las interfaces y clases correspondientes
use App\Repositories\Contracts\CategoriaRepositoryInterface;
use App\Repositories\Eloquent\CategoriaRepository;
use App\Repositories\Contracts\AlmacenRepositoryInterface;
use App\Repositories\Eloquent\AlmacenRepository;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\UserRepository;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Enlace para Categorías
        $this->app->bind(CategoriaRepositoryInterface::class, CategoriaRepository::class);

        // 🌟 EL ENLACE CORRECTOR: Le decimos a Laravel qué clase usar para los Almacenes
        $this->app->bind(AlmacenRepositoryInterface::class, AlmacenRepository::class);

        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}