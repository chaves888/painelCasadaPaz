<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galeria extends Model
{
    use HasFactory;

    // Especifique quais campos podem ser preenchidos em massa
    protected $fillable = [
        'file_path',
    ];
}