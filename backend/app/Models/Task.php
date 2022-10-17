<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'exp',
        'severity',
        'status',
    ];

    public function usertask() {
        return $this->belongsTo(User::class);
    }
    public function orderuser() {
        return $this->belongsTo(User::class);
    }
}
