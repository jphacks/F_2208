<?php

namespace App\Actions\Fortify;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers {
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input) {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $user =  User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);

        $sampleTasks = [
            [
                "title" => "タスクをクリックしよう！",
                "description" => "このように、説明やタスクの作成者、作成日時を確認することができます。",
                "exp" => 100,
                "time_limit" => null,
            ],
            [
                "title" => "タスクを完了しよう！",
                "description" => "左側のチェックボックスをクリックすると、タスクを完了することができます。もう一度押して、完了を取り消すこともできます。",
                "exp" => 100,
                "time_limit" => null,
            ],
            [
                "title" => "タスクを追加しよう！",
                "description" => "上の「タスクを追加する」ボタンをクリックし、必要な情報を入力しましょう！",
                "exp" => 100,
                "time_limit" => null,
            ],
        ];

        foreach ($sampleTasks as $sampleTask) {
            $task = new Task();
            $task->title = $sampleTask["title"];
            $task->description = $sampleTask["description"];
            $task->exp = $sampleTask["exp"];
            $task->time_limit = $sampleTask["time_limit"];
            $task->user_id = $user->id;
            $task->order_user_id = $user->id;
            $task->created_at = now();
            $task->updated_at = now();
            $task->save();
        }

        return $user;
    }
}
