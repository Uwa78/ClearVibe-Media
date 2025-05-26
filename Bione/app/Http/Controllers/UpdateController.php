<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class UpdateController extends Controller
{
    public function update()
    {
        $sql_path = base_path('update.sql');
        if (file_exists($sql_path)){
            DB::unprepared(file_get_contents($sql_path));
            // copy language file
            $language = json_decode(Setting::pull('languages'), true);
            $directory = base_path('lang/');
            $newData = base_path('lang.json');
            $newLangData = json_decode(File::get($newData), true);
            foreach ($language as $key => $lang){
                $path = $directory.$key.'.json';
                $existingData = [];
                if (File::exists($path)) {
                    $existingData = json_decode(File::get($path), true);
                }
                $mergedData = array_merge($existingData, $newLangData);
                File::put($path, json_encode($mergedData, JSON_PRETTY_PRINT));
            }
            // Delete the update.sql file
            unlink($sql_path);
            unlink($newData);
            // create symlink
            Artisan::call('storage:link');
            Artisan::call('optimize:clear');
            return redirect('/');
        }
    }
}