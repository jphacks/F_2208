<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFriendRequest;
use App\Http\Requests\UpdateFriendRequest;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;


class FriendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $freinds = Friend::where('id', $user->id)->get();
        return response()->json($freinds);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFriendRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFriendRequest $request)
    {
        $friend = new Friend();
        $friend->id = $request->input('id');
        $friend->user_id = $request->input('user_id');
        $friend->intimacy = $request->input('intimacy');
        $friend->favorite = $request->input('favorite');
        $friend->sent_exp = $request->input('sent_exp');
        $friend->received_exp = $request->input('received_exp');
        $friend->created_at = now();
        $friend->updated_at = now();
        $friend->save();
        return response()->json($friend);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Friend  $friend
     * @return \Illuminate\Http\Response
     */
    public function show(Friend $friend)
    {
        return response()->json($friend);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Friend  $friend
     * @return \Illuminate\Http\Response
     */
    public function edit(Friend $friend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFriendRequest  $request
     * @param  \App\Models\Friend  $friend
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFriendRequest $request, Friend $friend)
    {
        $friend->intimacy = $request->input('intimacy');
        $friend->favorite = $request->input('favorite');
        $friend->sent_exp = $request->input('sent_exp');
        $friend->received_exp = $request->input('received_exp');
        $friend->updated_at = now();
        $friend->save();
        return response()->json($friend);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Friend  $friend
     * @return \Illuminate\Http\Response
     */
    public function destroy(Friend $friend)
    {
        $friend->delete();
        return response('Deletion completed.');
    }

    public function searchEmail(Request $request)
    {
        $email = $request->email;
        
        $friends = User::find()->friends()->where('email',$email)->get();
        return response()->json($friends);
    }
}
