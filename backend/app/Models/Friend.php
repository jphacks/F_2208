<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model {
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'intimacy',
        'favorite',
        'sent_exp',
        'received_exp',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    protected $primaryKey = "user_id";
    public $incrementing = false;
}
