<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marintimes extends Model
{
    use HasFactory;

    protected $table = 'marintimes';

    protected $fillable = [
        'userId',
        'job_title',
        'years',
        'vessel_type',
        'client',
        'employers'
    ];
}