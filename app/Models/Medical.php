<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medical extends Model
{
    use HasFactory;

    protected $table = 'medical';

    protected $fillable = [
        'userId',
        'name',
        'number',
        'issue_date',
        'expiry_date'
    ];
}
