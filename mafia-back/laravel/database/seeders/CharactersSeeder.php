<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Characters;
class CharactersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Characters::create([

                "name"=>"mafia",
                "start_from"=>4,
                "percent"=>23.0,
            ]);
        Characters::create([
                 "name"=>"commissar",
                "start_from"=>4,
                "percent"=>14.0,
            ]);
        Characters::create([
                "name"=> 'villager',
                "start_from"=>4,
                "percent"=>null,
            ]);
        Characters::create([
                "name"=>"kamikaze",
                "start_from"=>7,
                "percent"=>null,
            ]);
        Characters::create([
                "name"=>"doctor",
                "start_from"=>9,
                "percent"=>null,
            ]);
        Characters::create([
                "name"=>"lover",
                "start_from"=>12,
                "percent"=>null,
            ]);

    }
}
