<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;

    protected $fillable = [
        'intimacy',
        'favorite',
        'sent_exp',
        'recieved_exp',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
