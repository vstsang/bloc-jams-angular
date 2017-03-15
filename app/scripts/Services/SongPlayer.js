(function() {
/**
* @function SongPlayer
* @desc Private function setSong & playSong for use by public method SongPlayer.play & SongPlayer.pause
* @return {Object} SongPlayer objects with methods and attributes
*/
	function SongPlayer($rootScope, Fixtures) {

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
				stopSong(song);
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
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
* @function stopSong
* @desc Stops currentSong and set playing property to null 
* @param {Object} song
*/		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
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

		var autoPlayNextSong = function(song) {
			if (currentBuzzObject.isEnded) {
				SongPlayer.next();
			}
		}
		
/**
* @desc Active song object from list of songs
* @type {Object}
*/
		SongPlayer.currentSong = null;
		
/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
		SongPlayer.currentTime = null;
		
/**
* @desc Current volume of currently playing song, set initial volume to 20
* @type {Number}
*/		
		SongPlayer.volume = 20;
		
/**
* @desc Status of mute, used to show/hide mute icon
* @type {Boolean}
*/		
		SongPlayer.muteIcon = null;
		
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
			//autoPlayNextSong();
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
				stopSong(song);
			} else {
			 	var song = currentAlbum.songs[currentSongIndex];
			 	setSong(song);
			 	playSong(song);
			}     					
		};
		
/**
* @function SongPlayer.next
* @desc Plays the next song
*/		
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
 			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong(song);
			} else {
			 	var song = currentAlbum.songs[currentSongIndex];
			 	setSong(song);
			 	playSong(song);
			}     					
		};
		
/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};		
		
/**
* @function setVolume
* @desc Set volume (0-100) of currently playing song
* @param {Number} volume
*/		
		SongPlayer.setVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
		};
		
/**
* @function toggleMute
* @desc Mute and unmute
*/		
		SongPlayer.toggleMute = function() {
			if (currentBuzzObject) {
				currentBuzzObject.toggleMute();
			}
			
			if (currentBuzzObject.isMuted()) {
				SongPlayer.muteIcon = true;
			} else {
				SongPlayer.muteIcon = false;
			}
		};

/**
* @function autoplayNextSong
* @desc When the seekBar value changes, autoplay next song
*/		
		SongPlayer.autoplayNextSong = function() {
			if (currentBuzzObject.isEnded()) {
				SongPlayer.next();
			}		
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();