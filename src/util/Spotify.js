 const clientId = "b368caf4223e484fb1b25963b0264dc6";

 const redirectUri= "http://localhost:3000";

 let accessToken;

 const Spotify= {
     getAccessToken(){
         if(accessToken){
             return accessToken;
         }

         const accessTokenMatch=window.location.href.match(/access_token=([^&]*)/);
         const expiresInMatch=window.location.href.match(/expires_in([^&]*)/);
         if(accessTokenMatch && expiresInMatch){
             accessToken=accessTokenMatch[1];
             const expiresIn=Number(expiresInMatch[1]);
             window.setTimeout(()=>(accessToken=""),expiresIn * 1000);
             window.history.pushState("Access Token",null,"/");
             return accessToken;
         }else{
             const accessUrl="https://accounts.spotify.com/authprize?client_id=${client}&response_type-token&scope-playlist-modify-public&redirect_url=${redirectUri}";
                window.location=accessUrl;
            }
        },
        search(term){
            const accessToken=Spotify.getAccessToken();
            return fetch("https://api.spotify.com/v1/search?type=track&g={term}",{
                headers:(
                    Authorization: 'Bearer ${accessToken}'
                )
            }).then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                return response.json();
            })
            .then(jsonResponse => {
                if(!jsonResponse.tracks){
                    return [];
                }
                return jsonResponse.tracks.items.map(track =>({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album:track.album.name,
                    url:track.url
            }));
        });
    },
    savePlaylist(name,trackUris){
        if(!name || !trackerUris.length){
            return;
        }
        const accessToken =Spotify.getAccessToken();
    }
}
