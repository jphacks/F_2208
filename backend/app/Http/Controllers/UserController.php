<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request) {
        // current login user
        $user = $request->user();
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request) {
        // 自身のみ更新できる
        $user = $request->user();
        $user->name = $request->input("name") ?? $user->level;
        $user->email = $request->input("email") ?? $user->email;
        $user->avatar = $request->input("avatar") ?? $user->avatar;
        $user->level = $request->input("level") ?? $user->level;
        $user->total_exp = $request->input("total_exp") ?? $user->total_exp;
        $user->balance_exp = $request->input("balance_exp") ?? $user->balance_exp;
        $user->updated_at = now();
        $user->save();
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        // 自身のみ削除できる
        $user = $request->user();
        $user->delete();
        return response('Deletion completed.');
    }
}
