<?php
use App\Exports\UsersExport;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\TurnoController;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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

Route::resource('categorias', CategoriaController::class);

Route::resource('almacenes', AlmacenController::class);

Route::resource('unidad-medidas', UnidadMedidaController::class);

Route::get('/usuarios/exportar', function () {
    return Excel::download(new UsersExport, 'lista_usuarios.xlsx');
})->middleware('auth')->name('usuarios.export');

Route::resource('usuarios', UserController::class)->middleware('auth');

Route::resource('productos', ProductoController::class)->middleware('auth');

// 🔥 Nueva ruta para el módulo de Turnos
Route::resource('turnos', TurnoController::class)->middleware('auth');

require __DIR__.'/auth.php';

