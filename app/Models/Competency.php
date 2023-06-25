<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competency extends Model
{
    use HasFactory;

    protected $table = 'competency';

    protected $fillable = [
        'userId',
        'name',
        'number',
        'issue_date',
        'expiry_date'
    ];
}