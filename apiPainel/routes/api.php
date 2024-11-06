<?php

use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\VoluntariosController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GaleriaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('usuarios', UsuarioController::class)->except([
    'create', 'edit'
]);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/galeria/upload', [GaleriaController::class, 'upload']);

Route::apiResource('voluntarios', VoluntariosController::class)->except([
    'create', 'edit'
]);