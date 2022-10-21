<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $user = $request->user();
        $tasks = Task::with('orderUser')->where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        return response()->json($tasks);
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
     * @param  \App\Http\Requests\StoreTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request) {
        $task = new Task();
        $request->input('title') && $task->title = $request->input('title');
        $request->input('description') && $task->description = $request->input('description');
        $request->input('exp') && $task->exp = $request->input('exp');
        $request->input('time_limit') && $task->time_limit = $request->input('time_limit');
        $request->input('severity') && $task->severity = $request->input('severity');
        $request->input('status') && $task->status = $request->input('status');
        $request->input('user_id') && $task->user_id = $request->input('user_id');
        $task->order_user_id = $request->user()->id;
        $task->created_at = now();
        $task->updated_at = now();
        $task->save();
        return response()->json($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task) {
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTaskRequest  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task) {
        $request->input('title') && $task->title = $request->input('title');
        $request->input('description') && $task->description = $request->input('description');
        $request->input('exp') && $task->exp = $request->input('exp');
        $request->input('time_limit') && $task->time_limit = $request->input('time_limit');
        $request->input('severity') && $task->severity = $request->input('severity');
        $request->input('status') && $task->status = $request->input('status');
        $request->input('user_id') && $task->user_id = $request->input('user_id');
        $task->updated_at = now();
        $task->save();
        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task) {
        $task->delete();
        return response('Deletion completed.');
    }

    // 完了
    public function do(Request $request, Task $task) {
        $task->status = 2;
        $task->save();
        $user = $request->user();
        $user->total_exp += $task->exp;
        $user->balance_exp += $task->exp;
        $user->level = floor($user->total_exp / 200) + 1;
        $user->save();
        return response()->json($task);
    }
    // 未完了
    public function undo(Request $request, Task $task) {
        $task->status = 1;
        $task->save();
        $user = $request->user();
        $user->total_exp -= $task->exp;
        $user->balance_exp -= $task->exp;
        $user->level = floor($user->total_exp / 200) + 1;
        $user->save();
        return response()->json($task);
    }
}
