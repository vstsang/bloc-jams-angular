(function() {
	// Inject the custom Fixtures service
	function AlbumCtrl(Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
	}
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();