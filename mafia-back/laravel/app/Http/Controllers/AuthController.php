<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller {
    public function register(Request $request) {
        $data = $request->validate([
            'firstName' => 'required|string|max:20',
            'lastName' => 'required|string|max:20',
            'userName' => 'required|string|max:40|min:5|unique:users,nickname',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
            ],
            "guest_id"=>'required',
        ]);

        $user = User::create([
            'firstname' => $data['firstName'],
            'lastname' => $data['lastName'],
            'nickname' => $data['userName'],
            'wins' => 0,
            'loses' => 0,
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
        if($user){
            Guest::destroy($data['guest_id']);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response([
                'user' => $user,
                'token' => $token
            ]);
        } else {
            return response([
                'user' => null,
                'error' => 'Could not create user'
            ]);
        }
    }

    public function login(Request $request) {
        $credentials = $request->validate([
           'email' => 'required|email|string',
           'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response([
                'error' => 'User does not exist!'
            ], 422);
        } else {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
            $data=$request->validate([
                "guest_id"=>'required',
            ]);
            Guest::destroy($data['guest_id']);

            return response([
                'user' => $user,
                'token' => $token
            ], 200);
        }
    }

    public function logout() {
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ], 200);
    }

    public function getLoggedInUser() {
        $user = Auth::user();
        return response([
            'user' => $user
        ]);
    }
}
