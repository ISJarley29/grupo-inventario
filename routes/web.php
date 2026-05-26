<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\UnidadMedidaController;
use App\Repositories\Contracts\CategoriaRepositoryInterface;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (CategoriaRepositoryInterface $categoriaRepo) {
    return Inertia::render('Dashboard', [
        'categorias' => $categoriaRepo->obtenerTodas()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// RUTAS DE LOS CONTROLADORES CONECTADOS A LA BASE DE DATOS
Route::resource('categorias', CategoriaController::class);

Route::resource('almacenes', AlmacenController::class);

Route::resource('unidad-medidas', UnidadMedidaController::class);

require __DIR__.'/auth.php';
