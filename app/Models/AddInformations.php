<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddInformations extends Model
{
    use HasFactory;

    protected $table = 'informations';

    protected $fillable = [
        'userId',
        'languages',
        'computer',
        'add_skills'
    ];
}