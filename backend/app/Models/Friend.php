<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model {
    use HasFactory;

    protected $fillable = [
        'id',
        'friend_id',
        'intimacy',
        'favorite',
        'sent_exp',
        'received_exp',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    public function friend() {
        return $this->belongsTo(User::class, 'friend_id', 'id');
    }

    protected $primaryKey = "friend_id";
    public $incrementing = false;
}
