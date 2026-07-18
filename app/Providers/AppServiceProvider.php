<?php

namespace App\Providers;

use App\Repositories\Contracts\ProductoRepositoryInterface;
use App\Repositories\Eloquent\ProductoRepository;
use App\Repositories\Contracts\TurnoRepositoryInterface;
use App\Repositories\Eloquent\TurnoRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\CategoriaRepositoryInterface;
use App\Repositories\Eloquent\CategoriaRepository;
use App\Repositories\Contracts\AlmacenRepositoryInterface;
use App\Repositories\Eloquent\AlmacenRepository;
use App\Repositories\Contracts\UnidadMedidaRepositoryInterface;
use App\Repositories\Eloquent\UnidadMedidaRepository;

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
        // Enlace para Alamacenes
        $this->app->bind(AlmacenRepositoryInterface::class, AlmacenRepository::class);
        // Enlace para UnidadesdeMedida
        $this->app->bind(UnidadMedidaRepositoryInterface::class, UnidadMedidaRepository::class);
        // 2. Registramos el nuevo repositorio de Productos
        $this->app->bind(ProductoRepositoryInterface::class, ProductoRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(TurnoRepositoryInterface::class, TurnoRepository::class);

        $this->app->bind(\App\Repositories\Contracts\MovimientoRepositoryInterface::class, \App\Repositories\Eloquent\MovimientoRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
