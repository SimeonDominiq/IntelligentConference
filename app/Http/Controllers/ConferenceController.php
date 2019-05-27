<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Illuminate\Http\Response as Res;
use App\Http\Controllers\RootController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Models\Conference;
use App\Models\Talk;
use App\Models\TalkAttendant;
use Auth;

class ConferenceController extends RootController
{
    public $currentUser;
    function __construct(){
        $this->currentUser = Auth::user();
    }

    function getConferences() {
        $conferences = Conference::all();
        $conferences = $conferences->toArray();
        return $this->respond([
            'status'        => 'success',
            'status_code'   => $this->getStatusCode(),
            'conferences'   => $conferences
        ]); 
    }

    function addConference(Request $request) {
            /* Perform Validation on request data */
            $validator = Validator::make($request->all(), [
                'title'         => 'required|string',
                'description'   => 'required',
                'startDate'     => 'required',
                'endDate'       => 'required'
            ]);
            
            if($validator->fails()){
                $errorString = implode(",",$validator->messages()->all());
                return $this->respondValidationError($errorString);
            }
            
            $record = Conference::create([
                'title'             => $request->title,
                'description'       => $request->description,
                'start_date'        => $request->startDate,
                'end_date'          => $request->endDate,
                'created_by'        => $this->currentUser->id
            ]);

            return $this->respond([
                'status'        => 'success',
                'status_code'   => $this->getStatusCode(),
                'message'       => 'Conference added successfully!'
            ]);
    }

    function getConferenceDetails($id) {
        /* Perform Validation on request data */
        if($id == null) {
            return $this->respondValidationError('Id is required');
        }
        
        $conference = Conference::with('talks')->find($id);
        if(count($conference->talks) > 0) {
            foreach($conference->talks as $talk) {
                $talk->speaker = self::getUserName($talk->speaker_id);
                $talk->isAttending = self::isUserAttending($talk->id);
            }
        }
        $conference = $conference->toArray();
        return $this->respond([
            'status'        => 'success',
            'status_code'   => $this->getStatusCode(),
            'conference'    => $conference
        ]);  
    }

    function addTalk(Request $request) {
        /* Perform Validation on request data */
        $validator = Validator::make($request->all(), [
            'conferenceId'      => 'required',
            'speaker'           => 'required',
            'title'             => 'required|string',
            'description'       => 'required'
        ]);
        
        if($validator->fails()){
            $errorString = implode(",",$validator->messages()->all());
            return $this->respondValidationError($errorString);
        }

        $joined_at = date('Y-m-d H:i:s');
        
        $talk = Talk::create([
            'conference_id'     => $request->conferenceId,
            'speaker_id'        => $request->speaker,
            'title'             => $request->title,
            'description'       => $request->description
        ]);

        $talk_attendant = TalkAttendant::create([
            'talk_id'       =>  $talk->id,
            'user_id'       =>  $request->speaker,
            'joined_at '    =>  $joined_at
        ]);

        return $this->respond([
            'status'        => 'success',
            'status_code'   => $this->getStatusCode(),
            'message'       => 'Talk added successfully!'
        ]);        
    }

    function deleteTalk($conference_id,$talk_id) {
        if($conference_id== null || $talk_id == null) {
            return $this->respondValidationError('Conference & Talk id is required');
        }
        $talk = Talk::where([['conference_id', $conference_id], ['id', $talk_id]])->first();
        if($talk == null) {
            return $this->respondWithError('Talk not found');
        }

        $delete_talk = $talk->delete();
        if($delete_talk) {
            return $this->respond([
                'status'        => 'success',
                'status_code'   => $this->getStatusCode(),
                'message'       => 'Talk Deleted successfully!'
            ]);            
        } else {
            return $this->respondWithError('Error Completing Request');
        }
    }

    function isUserAttending($talk_id){
        $attending = TalkAttendant::where([['talk_id', $talk_id], ['user_id', $this->currentUser->id]])
                     ->count();
        $isAttending = $attending > 0 ? true:false;
        return $isAttending;
    }
}
