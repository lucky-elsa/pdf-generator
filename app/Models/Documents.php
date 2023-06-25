<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    use HasFactory;

    protected $table = 'documents';

    protected $fillable = [
        'userId',
        'document_type',
        'country',
        'number',
        'issue_date',
        'expiration_date'
    ];
}