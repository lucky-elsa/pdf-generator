<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seas extends Model
{
    use HasFactory;

    protected $table = 'seas';

    protected $fillable = [
        'userId',
        'vessel',
        'vessel_type',
        'rank',
        'contracts',
        'contract_duration',
        'description'
    ];
}