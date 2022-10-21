<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFriendRequest;
use App\Http\Requests\UpdateFriendRequest;
use App\Models\Friend;
use Illuminate\Http\Request;


class FriendController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $user = $request->user();
        $friends = Friend::with("user")->with("friend")->where('id', $user->id)->orWhere('friend_id', $user->id)->get();
        return response()->json($friends);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFriendRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFriendRequest $request) {
        $friend = new Friend();
        $user = $request->user();
        $friend->id = $user->id;
        $friend->friend_id = $request->input('friend_id');
        $request->input('intimacy') && $friend->intimacy = $request->input('intimacy');
        $request->input('favorite') && $friend->favorite = $request->input('favorite');
        $request->input('sent_exp') && $friend->sent_exp = $request->input('sent_exp');
        $request->input('received_exp') && $friend->received_exp = $request->input('received_exp');
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
    public function show(Request $request, $id) {
        $user  = $request->user();
        $friend = $this->friend($request, $id);

        if ($friend->id === $user->id) {
            $friend = $friend->user;
        }

        return response()->json($friend);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Friend  $friend
     * @return \Illuminate\Http\Response
     */
    public function edit(Friend $friend) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFriendRequest  $request
     * @param  \App\Models\Friend  $friend
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFriendRequest $request, $id) {
        // get record
        $friend = $this->friend($request, $id);

        // update record
        $friend->intimacy = $request->input('intimacy') ?? $friend->intimacy;
        $friend->favorite = $request->input('favorite') ?? $friend->favorite;
        $friend->sent_exp = $request->input('sent_exp') ?? $friend->sent_exp;
        $friend->received_exp = $request->input('received_exp') ?? $friend->received_exp;
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
    public function destroy(Request $request, $id) {
        $friend = $this->friend($request, $id);
        $friend->delete();
        return response('Deletion completed.');
    }

    // id　または friend_idに存在するフレンドを取得する
    protected function friend($request, $id) {
        $user = $request->user();

        return Friend::with('user')->with('friend')
            ->where(function ($query) use ($user, $id) {
                $query->where('id', $user->id)->where('friend_id', $id);
            })
            ->orWhere(function ($query) use ($user, $id) {
                $query->where('friend_id', $user->id)->where('id', $id);
            })
            ->firstOrFail();
    }

    // メールアドレスで検索する
    public function search($request) {
        $email = $request->email;
        $user = $request->user();

        // フレンドを全て取得する
        $friends = Friend::with("user")->with("friend")->where('id', $user->id)->orWhere('friend_id', $user->id)->get();

        foreach ($friends as $friend) {
            if ($friend->user->email === $email) {
                return response()->json($friend->user);
            } elseif ($friend->friend->email === $email) {
                return response()->json($friend->friend);
            }
        }
    }

    // 自身のフレンドのみを取得する
    // indexがフレンドテーブルを返すのに対し、これはフレンドのユーザテーブルの情報を返す
    public function friends(Request $request) {
        $user = $request->user();
        // フレンドを全て取得する
        $friends = Friend::with("user")->with("friend")->where('id', $user->id)->orWhere('friend_id', $user->id)->get();

        $friendUsers = [];

        foreach ($friends as $friend) {
            if ($friend->user->id === $user->id) {
                $friendUsers[] = $friend->friend;
            } elseif ($friend->friend->id === $user->id) {
                $friendUsers[] = $friend->user;
            }
        }

        return response()->json($friendUsers);
    }
}
