<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Galeria;
use Illuminate\Support\Facades\Storage;

class GaleriaController extends Controller
{
    public function upload(Request $request)
    {
        // Valida se o arquivo é uma imagem
        $request->validate([
            'foto' => 'required', // aceita tipos de imagem com até 2MB
        ]);

        // Armazena a imagem na pasta 'public/galeria'
        $filePath = $request->file('foto')->store('galeria', 'public');

        // Salva o caminho no banco de dados
        $imagem = Galeria::create([
            'file_path' => $filePath,
            'nome' => 'Nome da Imagem' // ou qualquer valor que você deseja usar
        ]);

        return response()->json([
            'message' => 'Imagem enviada com sucesso!',
            'file_path' => $imagem->file_path
        ], 201);
    }
}

