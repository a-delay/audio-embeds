
//* TITLE smaller_audio_embeds **//
//* VERSION 1.1.0 **//
//* DESCRIPTION	makes soundcloud, spotify players less big**//
//* DEVELOPER a-delay **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.smaller_audio_embeds = new Object({

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

		if(XKit.extensions.smaller_audio_embeds.preferences.soundcloud_embeds.value){
			XKit.post_listener.add("smaller_audio_embeds_soundcloud",XKit.extensions.smaller_audio_embeds.soundcloud_embed_replace);
			XKit.extensions.smaller_audio_embeds.soundcloud_embed_replace();
		}

		if(XKit.extensions.smaller_audio_embeds.preferences.spotify_embeds.value){
			XKit.post_listener.add("smaller_audio_embeds_spotify",XKit.extensions.smaller_audio_embeds.spotify_embed_replace);
			XKit.extensions.smaller_audio_embeds.spotify_embed_replace();
		}
	},

	soundcloud_embed_replace: function() {

        	var iframes = document.getElementsByClassName("soundcloud_audio_player");
        	for(i = 0; i < iframes.length; i++){
            		var url = iframes[i].src;
            		if(url.indexOf("visual=true")!= -1){
                		var newURL = url.replace("visual=true", "visual=false");
				iframes[i].height = "116";
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
		if(XKit.extensions.smaller_audio_embeds.preferences.soundcloud_embeds.value){
			XKit.post_listener.remove("smaller_audio_embeds_soundcloud");

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

		if(XKit.extensions.smaller_audio_embeds.preferences.spotify_embeds.value){
			XKit.post_listener.remove("smaller_audio_embeds_spotify");

			$(".spotify_player").parent().css("height","580px");
        		$(".spotify_player").css("height","580px");
		}
	
        	
        			
	}

});
