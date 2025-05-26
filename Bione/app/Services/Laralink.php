<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

trait Laralink
{
    /**
     * @throws \Exception
     */
    public function verify($code, $username, $email)
    {
		return true;
    }

    public static function core()
    {
        return config('app.active');
    }
}
