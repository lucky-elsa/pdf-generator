<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personals extends Model
{
    use HasFactory;

    protected $table = "personal_data";

    protected $fillable = [
        'userId',
        'name',
        'surname',
        'citizen',
        'country',
        'phone',
        'airport',
        'email',
        'birthday',
        'gender',
        'link',
    ];
}