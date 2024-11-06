<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Valida os dados recebidos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Busca o usuário pelo email no banco de dados
        $user = Usuario::where('email', $request->email)->first();

        // Verifica se o usuário existe e se a senha está correta
        if ($user) {
            return response()->json([
                'email' => $user->email,
                'password' => $user->password // retorna a senha criptografada armazenada no banco
            ]);
        } else {
            return response()->json([
                'message' => 'Credenciais inválidas'
            ], 401);
        }
    }
}
