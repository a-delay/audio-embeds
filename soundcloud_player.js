//* TITLE soundcloud_player **//
//* VERSION 1.0.0 **//
//* DESCRIPTION	makes soundcloud player less big**//
//* DEVELOPER adelay243 **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.soundcloud_player = new Object({

	running: false,

	run: function() {
		this.running = true;
        	XKit.post_listener.add("soundcloud_player",XKit.extensions.soundcloud_player.embed_replace);
        	XKit.extensions.soundcloud_player.embed_replace();
	},

	embed_replace: function() {

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

	destroy: function() {
		this.running = false;
		XKit.post_listener.remove("soundcloud_player");
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

});