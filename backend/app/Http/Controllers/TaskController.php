<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user = $request->user();
        $tasks = Task::where('user_id', $user->id)::get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, Task $task)
    {
        //
        $task = new Task();
        $task->title = $request->input('title');
        $task->content = $request->input('description');
        $task->content = $request->input('exp');
        $task->content = $request->input('time_limit');
        $task->content = $request->input('severity');
        $task->created_at = now();
        $task->updated_at = now();
        $task->save();
        return response()->json(Task::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request, Task $task)
    {
        //
        $task = Task::create($request->all());
        return response()->json([
            'status' => true,
            'message' => "Task Created successfully!",
            'task' => $Task
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show($id, Task $task)
    {
        //
        $task = Task::find($id);
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
        $task->title = $request->input('title');
        $task->content = $request->input('description');
        $task->content = $request->input('exp');
        $task->content = $request->input('time_limit');
        $task->content = $request->input('severity');
        $task->save();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTaskRequest  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, $id, Task $task)
    {
        //
        $task = Task::find($id);
        $task->title = $request->input('title');
        $task->content = $request->input('description');
        $task->content = $request->input('exp');
        $task->content = $request->input('time_limit');
        $task->content = $request->input('severity');
        $task->content = $request->input('satus');
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
    public function destroy(Task $task)
    {
        //
        $task->delete();
        return response()->json([
            'status' => true,
            'message' => "Task Deleted successfully!",
        ], 200);
    }
}
