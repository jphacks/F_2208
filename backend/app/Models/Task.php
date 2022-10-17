<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'exp',
        'time_limit',
        'severity',
        'status',
        'user_id',
        'order_user_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function orderUser() {
        return $this->belongsTo(User::class,'order_user_id', 'id');
    }
}
