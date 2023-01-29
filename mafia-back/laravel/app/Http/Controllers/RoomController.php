<?php

namespace App\Http\Controllers;
use App\Models\Characters;
use App\Models\Guest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use App\Models\Room;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class RoomController extends Controller
{
    public function store(Request $request){
        $roomInput=$request->validate([
            'number_of_players'=>'required|numeric|min:4|max:25',
            'PIN'=>'numeric|digits_between:1,10',
            'isPrivate'=>'required|boolean',

        ]);

        $user = auth()->user();
        $userdata=User::find($user->id);

        if($roomInput && $userdata->room_id==null){
            $room=Room::create([
                "admin_id"=>$user->id,
                'number_of_players'=>$roomInput['number_of_players'],
                'isPrivate'=>$roomInput['isPrivate'],
                "PIN"=>$roomInput['PIN'] ?? null,
                'hasStarted'=>false
            ]);
            $userdata->room_id=$room->id;
            $userdata->save();
        }
        else {
            return response([
                'room' => null,
                'error' => 'Room could not be created'
            ]);
        }
        $roomArray=$room->toArray();

        $roomArray=Arr::add($roomArray,'nickname',$userdata->nickname);
        unset($roomArray['PIN']);
        Http::asForm()->post('http://localhost:3000/room', [
            'room'  => $roomArray
        ]);
        return $roomArray;
    }


    public function showAll(){
        if (Gate::allows('showAll')) {
            $table= Room::join('users', 'users.id', '=', 'room.admin_id')->where('room.hasStarted', false)
                ->get(['users.nickname','room.*'])->makeHidden(['PIN']);
        } else {
            $table= Room::where('isPrivate', false)->join('users', 'users.id', '=', 'room.admin_id')->where('room.hasStarted', false)
                ->get(['users.nickname','room.*'])->makeHidden(['PIN']);
        }

        return $table ;
    }

    public function getById(Request $request, $id, $pin = null) {
        $room = Room::find($id);
        if ($room) {
//            if ( !$room->hasStarted ) {
                if (Gate::allows('getById') && (!$room->isPrivate || $pin == $room->PIN)) {
                    $user = User::find(auth()->id());
                    $user->room_id = intval($id);
                    $user->save();
                    Http::asForm()->post('http://localhost:3000/room-joined', [
                        'user' => [
                            'id' => $user->id,
                            'room_id' => $user->room_id,
                            'firstname' => $user->firstname,
                            'lastname' => $user->lastname,
                            'nickname' => $user->nickname,
                            'email' => $user->email,
                            'wins' => $user->wins,
                            'loses' => $user->loses
                        ]
                    ]);
                    return $this->getAllPlayers($id, $room);
                } elseif (Gate::denies('getById') && !$room->isPrivate) {
                    if ($token = $request->header('AuthToken')) {
                        $guest = Guest::where('token', $token)->first();
                        $guest->room_id = intval($id);
                        $guest->save();
                        Http::asForm()->post('http://localhost:3000/room-joined', [
                            'guest' => [
                                'id' => $guest->id,
                                'room_id' => $guest->room_id,
                                'token' => $guest->token
                            ]
                        ]);
                        return $this->getAllPlayers($id, $room);
                    }
                }
//            } else {
//                return  response([
//                    'room' => null,
//                    'error' => 'Game has already started in this room'
//                ]);
//            }
        } else {
            return response([
                'room' => null,
                'error' => 'Cannot find room'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return int
     */
    public function destroy($id)
    {
        $user = auth()->user();
        if ($user->id == Room::find($id)->admin_id) {
            $userdata = User::find($user->id);
            $userdata->room_id = null;
            User::where("room_id",$id)->update(["room_id" => null, "character_id" => null]);
            Guest::where("room_id",$id)->update(["room_id" => null, "character_id" => null]);
            Message::where("room_id",$id)->delete();
            $userdata->save();
//            Http::delete("http://localhost:3000/room/$id");
            return Room::destroy($id);
        }
    }

    public function getAllPlayers($id, $room) {
        $users = User::where('room_id', $id)->get();
        $guests = Guest::where('room_id', $id)->get();
        $union = $users->merge($guests);
        if ($union->count() === $room->number_of_players) {
            $this->generateRoles($union->shuffle());
            $users = User::join('characters', 'characters.id', '=', 'users.character_id')->where('room_id', $id)->get(['characters.name','users.*']);
            $guests = Guest::join('characters', 'characters.id', '=', 'guest.character_id')->where('room_id', $id)->get(['characters.name','guest.*']);
            $players = $users->merge($guests);
            if (!$room->hasStarted) {
                Http::asForm()->post('http://localhost:3000/start-game', [
                    'players' => $players->toArray(),
                    'game' => $room->toArray()
                ]);
                $room->hasStarted = true;
                $room->save();
            }
        }
        return response([
            'room' => $room,
            'users' => $users,
            'guests' => $guests
        ]);
    }

    private function generateRoles($players) {
        $characters = Characters::all();
        foreach ($characters as $character) {
            if ($character->percent) {
                $num = round($players->count()/100*$character->percent);
                foreach ($players as $player) {
                    if ($player->character_id) continue;
                    else {
                        if ($num <= 0) break;
                        $player->character_id = $character->id;
                        $player->save();
                        $num--;
                    }
                }
            } else if ($character->start_from !== 4 && $character->start_from <= $players->count()) {
                foreach ($players as $player) {
                    if ($player->character_id) continue;
                    else {
                        $player->character_id = $character->id;
                        $player->save();
                        break;
                    }
                }
            } else if ($character->name === "villager") $villagerId = $character->id;
        }

        foreach ($players as $player) {
            if ($player->character_id) continue;
            else {
                $player->character_id = $villagerId;
                $player->save();
            }
        }

        return $players;
    }
}
