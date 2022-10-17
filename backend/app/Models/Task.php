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
        'severity',
        'status',
    ];

    public function User() {
        return $this->belongsTo(User::class);
    }
    public function Orderuser() {
        return $this->belongsTo(User::class,'order_user_id', 'id');
    }
}
