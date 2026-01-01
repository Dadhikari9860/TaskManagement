<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Admin sees all, user sees own
        $tasks = $user->isAdmin()
            ? Task::latest()->paginate(10)
            : Task::where('user_id', $user->id)->latest()->paginate(10);

        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        $user = $request->user();

        // If admin sends user_id, assign task to that user
        // otherwise assign to self
        $targetUserId = $user->isAdmin() && $request->filled('user_id')
            ? (int) $request->user_id
            : $user->id;

        $task = Task::create([
            'user_id' => $targetUserId,
            'title' => $request->title,
            'description' => $request->description,
            'completed' => (bool) ($request->completed ?? false),
        ]);

        return response()->json([
            'message' => 'Task created',
            'task' => new TaskResource($task),
        ], 201);
    }

    public function show(Request $request, Task $task)
    {
        $this->authorize('view', $task);

        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $user = $request->user();

        // Only admin can change user_id
        if ($request->filled('user_id') && !$user->isAdmin()) {
            return response()->json(['message' => 'Only admin can reassign tasks'], 403);
        }

        $task->fill($request->only(['title','description','completed']));

        if ($user->isAdmin() && $request->filled('user_id')) {
            $task->user_id = (int) $request->user_id;
        }

        $task->save();

        return response()->json([
            'message' => 'Task updated',
            'task' => new TaskResource($task),
        ]);
    }

    public function destroy(Request $request, Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return response()->json([
            'message' => 'Task deleted',
        ]);
    }
}
