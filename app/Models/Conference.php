<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conference extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */
    protected $fillable = [
        'title', 'description', 'start_date', 'end_date', 'created_by',
    ];

    public function talks()
    {
        return $this->hasMany('App\Models\Talk');
    }
}
