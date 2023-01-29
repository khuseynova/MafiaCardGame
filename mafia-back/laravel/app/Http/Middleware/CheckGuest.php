<?php

namespace App\Http\Middleware;

use App\Models\Guest;
use Closure;
use Illuminate\Http\Request;

class CheckGuest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('AuthToken') ?? 1;
        $id = $request->guest_id ?? ($request->route('id') ?? 0);
        if (Guest::where([['token', '=', $token], ['id', '=', $id]])->exists()) {
            return $next($request);
        } else {
            return response([
                'error' => 'Token is not found!'
            ], 422);
        }
    }
}
