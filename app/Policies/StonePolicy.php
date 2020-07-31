<?php

namespace App\Policies;

use App\Models\Finds\Stone;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StonePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\Auth\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\Auth\User  $user
     * @param  \App\=Stone  $=Stone
     * @return mixed
     */
    public function view(User $user, Stone $stone)
    {
        //
    }

   
}
