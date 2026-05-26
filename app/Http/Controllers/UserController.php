<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\UserRepositoryInterface;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userRepo;

    // Inyectamos el repositorio
    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function index()
    {
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $this->userRepo->obtenerTodos()
        ]);
    }

    public function create()
    {
        return Inertia::render('Usuarios/Create');
    }

    public function store(StoreUserRequest $request)
    {
        $this->userRepo->guardar($request->validated());
        return redirect()->route('usuarios.index');
    }

    public function edit($id)
    {
        return Inertia::render('Usuarios/Edit', [
            'usuario' => $this->userRepo->buscarPorId($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validación rápida en línea para el update (o puedes usar un UpdateUserRequest)
        $datos = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|string|email|max:255|unique:users,email,{$id}",
            'password' => 'nullable|min:8',
            'role' => 'required|string|in:admin,docente,estudiante',
            'status' => 'required|boolean',
        ]);

        $this->userRepo->actualizar($id, $datos);
        return redirect()->route('usuarios.index');
    }

    public function destroy($id)
    {
        $this->userRepo->eliminar($id);
        return redirect()->route('usuarios.index');
    }
}