<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Guest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class MessageController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $input = $request->validate([
            'room_id' => 'required|integer',
            'user_id' => 'integer|nullable',
            'guest_id' => 'integer|nullable',
            "text"=>'required'
        ]);
        if ($input) {
            $message=Message::create([
                'room_id' => $input['room_id'],
                'user_id' => $input['user_id'],
                'guest_id' => $input['guest_id'],
                'text' => $input['text']
            ]);
            if ($message->user_id)
                $payload = [
                    'message' => $message->toArray(),
                    'writer' => $message->user()->first()->nickname
                ];
            if ($message->guest_id)
                $payload = [
                    'message' => $message->toArray(),
                    'writer' => 'guest_' . $message->guest_id
                ];
            Http::asForm()->post('http://localhost:3000/message-posted', $payload);
        }else{
            return response([
                'message' => null,
                'error' => 'Message could not be created'
            ]);
        }
        return $message->toArray();
    }


    public function showAll($id){
        $messages = Message::where("room_id",$id)->get();
        $data = [];
        foreach ($messages as $message) {
            $data[] = [
                'message' => $message,
                'writer' => $message->user_id ? $message->user()->first()->nickname : 'guest_' . $message->guest_id
            ];
        }
        return response([
            'messages' => $data,
            'error' => null
        ]);
    }
}
