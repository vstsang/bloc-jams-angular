(function() {
/**
* @function SongPlayer
* @desc Private function setSong & playSong for use by public method SongPlayer.play & SongPlayer.pause
* @return {Object} SongPlayer objects with methods and attributes
*/
	function SongPlayer(Fixtures) {

		/**
* @desc Initialise the SongPlayer object that will contain the public methods
* @type {Object}
*/		
		var SongPlayer = {};

/**
* @desc Gets the Picasso album from Fixtures
* @type {Object}
*/		
		var currentAlbum = Fixtures.getAlbum();
		
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
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			SongPlayer.currentSong = song;
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
* @function getSongIndex
* @desc Gets the index of song
* @param {Object} song
* @return {Number} currentAlbum.song.indexOf(song)
*/		
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
/**
* @desc Active song object from list of songs
* @type {Object}
*/
		SongPlayer.currentSong = null;
		
/**
* @function SongPlayer.play
* @desc Either plays new song or plays paused song
* @param {Object} song
*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};
	
/**
* @function SongPlayer.pause
* @desc Pauses the song and set playing attribute to false
* @param {Object} song
*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
 		};

/**
* @function SongPlayer.previous
* @desc Plays the previous song
*/		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
 			if (currentSongIndex < 0) {
         		currentBuzzObject.stop();
         		SongPlayer.currentSong.playing = null;
			} else {
			 	var song = currentAlbum.songs[currentSongIndex];
			 	setSong(song);
			 	playSong(song);
			}     					
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();