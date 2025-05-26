<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DebugController extends Controller
{
    public function any()
    {
        return Inertia::render('Debug/Index');
    }
}
