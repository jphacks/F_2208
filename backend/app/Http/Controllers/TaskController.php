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
        $sort = $request->get('sort');
        switch ($sort) {
            case 'time_limit_asc':
                $tasks = Task::where('user_id', $user->id)->orderBy('time_limit_asc','asc')->get();
                break;
            case 'time_limit_desc':
                $tasks = Task::where('user_id', $user->id)->orderBy('time_limit_desc','desc')->get();
                break;
            case 'created_at_asc':
                $tasks = Task::where('user_id', $user->id)->orderBy('created_at_asc','asc')->get();
                break;
            case 'created_at_desc':
                $tasks = Task::where('user_id', $user->id)->orderBy('created_at_desc','desc')->get();
                break;
            case 'severity_asc':
                $tasks = Task::where('user_id', $user->id)->orderBy('severity_asc','asc')->get();
                break;
            case 'severity_desc':
                $tasks = Task::where('user_id', $user->id)->orderBy('severity_desc','desc')->get();
                break;
            default:
                $tasks = Task::where('user_id', $user->id)->all()->get();
        } 
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
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->exp = $request->input('exp');
        $task->time_limit = $request->input('time_limit');
        $task->severity = $request->input('severity');
        $task->status = $request->input('status');
        $task->user_id = $request->input('user_id');
        $task->order_user_id = $request->input('order_user_id');
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
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->exp = $request->input('exp');
        $task->time_limit = $request->input('time_limit');
        $task->severity = $request->input('severity');
        $task->status = $request->input('status');
        $task->user_id = $request->input('user_id');
        $task->order_user_id = $request->input('order_user_id');
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
}