<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Crewings extends Model
{
    use HasFactory;
    protected $table = "add_crewing";
    protected $fillable = [
        'company',
        "how",
        "country"
    ];
}
