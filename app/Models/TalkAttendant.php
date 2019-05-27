<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TalkAttendant extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */
    protected $fillable = [
        'talk_id', 'user_id', 'joined_at',
    ];
}
