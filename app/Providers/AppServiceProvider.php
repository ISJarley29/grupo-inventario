<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\CategoriaRepositoryInterface;
use App\Repositories\Eloquent\CategoriaRepository;
use App\Repositories\Contracts\AlmacenRepositoryInterface;
use App\Repositories\Eloquent\AlmacenRepository;
use App\Repositories\Contracts\UnidadMedidaRepositoryInterface;
use App\Repositories\Eloquent\UnidadMedidaRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Enlace para Categorías
        $this->app->bind(CategoriaRepositoryInterface::class, CategoriaRepository::class);
        // Enlace para Alamacenes
        $this->app->bind(AlmacenRepositoryInterface::class, AlmacenRepository::class);
        // Enlace para UnidadesdeMedida
        $this->app->bind(UnidadMedidaRepositoryInterface::class, UnidadMedidaRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
