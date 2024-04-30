<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth','verified'])->group( function () {
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::get('/chat/{chat}',[\App\Http\Controllers\MessagesController::class,'chat'])->name('chat');
    Route::get('/group/{group}',[\App\Http\Controllers\MessagesController::class,'group'])->name('group');
    Route::post('/message/',[\App\Http\Controllers\MessagesController::class,'store'])->name('messages.store');
    Route::delete('/message/{message}',[\App\Http\Controllers\MessagesController::class,'destroy'])->name('messages.destroy');
    Route::post('/message/load',[\App\Http\Controllers\MessagesController::class,'loadMessages'])->name('messages.load');

    Route::get('/block/{user}',function (){
    })->name('user.block');
    Route::get('/admin/{user}',function (){
    })->name('user.admin');

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
