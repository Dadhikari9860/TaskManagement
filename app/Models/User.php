<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticable
{
    use HasApiTokens, HasFactory,Notifiable;

    protected $fillable =[
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden=[
'password',
'remember_token',

    ];

    protected function casts(): array
    {
        return[
            'email_verified_at'=>'datetime',
            'password'=>'hashed',
        ];
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function isAdmin():bool
    {
        return $this->role ==='admin';
    }
}