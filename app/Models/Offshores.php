<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offshores extends Model
{
    use HasFactory;

    protected $table = 'offshore';

    protected $fillable = [
        'userId',
        'name',
        'number',
        'issue_date',
        'expiry_date'
    ];
}
