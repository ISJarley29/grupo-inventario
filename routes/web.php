<?php

use App\Exports\UsersExport;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\TurnoController;
use App\Http\Controllers\MovimientoController; // 👈 Importación del nuevo controlador
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\UnidadMedidaController;
use App\Repositories\Contracts\CategoriaRepositoryInterface;

// Redirección inicial
Route::get('/', function () {
    return redirect()->route('login');
});

// ==============================================================================
// 🔒 TODAS ESTAS RUTAS REQUIEREN QUE EL USUARIO HAYA INICIADO SESIÓN (auth)
// ==============================================================================
Route::middleware(['auth', 'verified'])->group(function () {

    // 🟢 NIVEL 1: ACCESO PARA TODOS (Admin, Docente, Estudiante)
    Route::get('/dashboard', function (CategoriaRepositoryInterface $categoriaRepo) {
        return Inertia::render('Dashboard', [
            'categorias' => $categoriaRepo->obtenerTodas()
        ]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Recursos básicos
    Route::resource('categorias', CategoriaController::class);
    Route::resource('almacenes', AlmacenController::class);
    Route::resource('productos', ProductoController::class);
    Route::resource('turnos', TurnoController::class);
    
    // 👈 Ruta de Movimientos (Solo permitimos ver el historial y registrar nuevos)
    Route::resource('movimientos', MovimientoController::class)->only(['index', 'store']);

    // 🟡 NIVEL 2: ACCESO SOLO PARA ADMIN Y DOCENTE
    Route::middleware(['role:admin,docente'])->group(function () {
        Route::resource('unidad-medidas', UnidadMedidaController::class);
    });

    // 🔴 NIVEL 3: ACCESO ESTRICTO SOLO PARA ADMIN
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('usuarios', UserController::class);

        Route::get('/usuarios/exportar', function () {
            return Excel::download(new UsersExport, 'lista_usuarios.xlsx');
        })->name('usuarios.export');
    });

});

// Archivo de rutas de autenticación (Login, registro, etc)
require __DIR__.'/auth.php';