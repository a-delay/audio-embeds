
//* TITLE soundcloud_player **//
//* VERSION 1.0.1 **//
//* DESCRIPTION	makes soundcloud, spotify players less big**//
//* DEVELOPER a-delay **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.soundcloud_player = new Object({

	running: false,

	preferences: {
		"sep0": {
			text: "Options",
			type: "separator"
		},
		"soundcloud_embeds": {
			text: "Make SoundCloud embeds smaller",
			default: true,
			value: true
		},
		"spotify_embeds": {
			text: "Make Spotify embeds smaller",
			default: true,
			value: true
		}
	},

	run: function() {
		this.running = true;

		if(XKit.extensions.soundcloud_player.preferences.soundcloud_embeds.value){
			XKit.post_listener.add("soundcloud_player_soundcloud",XKit.extensions.soundcloud_player.soundcloud_embed_replace);
			XKit.extensions.soundcloud_player.soundcloud_embed_replace();
		}

		if(XKit.extensions.soundcloud_player.preferences.spotify_embeds.value){
			XKit.post_listener.add("soundcloud_player_spotify",XKit.extensions.soundcloud_player.spotify_embed_replace);
			XKit.extensions.soundcloud_player.spotify_embed_replace();
		}
	},

	soundcloud_embed_replace: function() {

        	var iframes = document.getElementsByClassName("soundcloud_audio_player");
        	for(i = 0; i < iframes.length; i++){
            		var url = iframes[i].src;
            		if(url.indexOf("visual=true")!= -1){
                		var newURL = url.replace("visual=true", "visual=false");
				iframes[i].height = "auto";
                		iframes[i].src = newURL;
            		}
        	}
	},

	spotify_embed_replace: function() {

 
        	$(".spotify_player").load(function(){
        	        $(".spotify_player").css("height","80px");
        	        $(".spotify_player").parent().css("height","auto");
        	});


	},

	destroy: function() {
		this.running = false;
		if(XKit.extensions.soundcloud_player.preferences.soundcloud_embeds.value){
			XKit.post_listener.remove("soundcloud_player_soundcloud");

			var iframes = document.getElementsByClassName("soundcloud_audio_player");
        		for(i = 0; i < iframes.length; i++){
            			var url = iframes[i].src;
            			if(url.indexOf("visual=false")!= -1){
                			var newURL = url.replace("visual=false", "visual=true");
					iframes[i].height = "500px";
                			iframes[i].src = newURL;
            			}
        		}
		}

		if(XKit.extensions.soundcloud_player.preferences.spotify_embeds.value){
			XKit.post_listener.remove("soundcloud_player_spotify");

			$(".spotify_player").parent().css("height","580px");
        		$(".spotify_player").css("height","580px");
		}
	
        	
        			
	}

});
