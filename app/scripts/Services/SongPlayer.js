(function() {
/**
* @service SongPlayer
* @desc Private function setSong & playSong for use by public method SongPlayer.play & SongPlayer.pause
* @return {Object} SongPlayer objects with methods and attributes
*/
	function SongPlayer() {
		var SongPlayer = {};

/**
* @desc Current song object file 
* @type {Object}
*/
		var currentSong = null;
		
/**
* @desc Buzz object audio file
* @type {Object}
*/		
		var currentBuzzObject = null;
		
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		};	

/**
* @function playSong
* @desc Plays currentSong and set playing property to true 
* @param {Object} song
*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		}
		
/**
* @method SongPlayer.play
* @desc Either plays new song or plays paused song
* @param {Object} song
*/
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}  
		};
	
/**
* @method SongPlayer.pause
* @desc Pauses the song and set playing attribute to false
* @param {Object} song
*/
		SongPlayer.pause = function(song) {
     		currentBuzzObject.pause();
     		song.playing = false;
 		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();