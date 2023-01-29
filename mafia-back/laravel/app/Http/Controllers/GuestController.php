<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guest;
use Ramsey\Uuid\Uuid;

class GuestController extends Controller{
    public function store(){
        $token=Uuid::uuid4()->toString();
        $guest=Guest::create([
            'token'=>$token
        ]);
        return response([
            'guest'=>$guest,
            'token'=>$token
        ]);
    }

    public function destroy($id){
        return Guest::destroy($id);
    }

    public function getGuestByToken(Request $request) {
        $guest = Guest::where('token', $request->header('AuthToken'))->first();
        return response([
           'guest' => $guest
        ]);
    }
}
