// Spotify app config and permissions required by SoundStash
const clientID = "f7737228c1344be88576076d6347d5d1";
const redirectURI = "http://127.0.0.1:5173/";
const scope = "playlist-modify-public playlist-modify-private";

// Generates a secure random string for PKCE verification and OAuth state
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const valuesArr = new Uint8Array(length);
  crypto.getRandomValues(valuesArr);

  const randomizedArr = Array.from(valuesArr).map(
    (value) => possible[value % possible.length],
  );
  return randomizedArr.join("");
};

// Creates a PKCE code challenge by hashing the verifier with SHA-256
// converts the result to URL-safe Base64
const createCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const encodedResult = encoder.encode(codeVerifier);
  const hashedResult = await crypto.subtle.digest("SHA-256", encodedResult);
  const convertHashed = new Uint8Array(hashedResult);
  const usableHashed = String.fromCharCode(...convertHashed);
  const base64Encoded = btoa(usableHashed);
  const urlFinalChallenge = base64Encoded
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return urlFinalChallenge;
};

// Starts Spotify auth using PKCE and redirects the user to Spotify to grand SoundStash access
const redirectToSpotifyAuth = async () => {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await createCodeChallenge(codeVerifier);

  // Store the verifier and state so they can be validated after redirect
  sessionStorage.setItem("code_verifier", codeVerifier);
  const state = generateRandomString(16);
  sessionStorage.setItem("state", state);

  const params = new URLSearchParams({
    client_id: clientID,
    response_type: "code",
    redirect_uri: redirectURI,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    state: state,
  });

  const authEndpoint = "https://accounts.spotify.com/authorize";
  const queryParams = params.toString();
  const authUrl = `${authEndpoint}?${queryParams}`;

  window.location.assign(authUrl);
};

// Handles Spotify's auth callback, validates the request, and exchanges the auth code for an access token
const handleSpotifyCallback = async () => {
  //prevents auth code from being exchanged more than 1x
  if (sessionStorage.getItem("spotify_callback_handled")) {
    return;
  }

  console.log("handleSpotifyCallback started...");
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  const storedState = sessionStorage.getItem("state");
  // Verifies that the returned OAuth state matches state created before auth
  if (state !== storedState) {
    console.log("The states do not match");
    return;
  }
  const codeVerifier = sessionStorage.getItem("code_verifier");
  if (!code || !codeVerifier) {
    console.log("Code and CodeVerifier do not exist");
    return;
  }

  sessionStorage.setItem("spotify_callback_handled", "true");

  // Exchange the auth code and PKCE verifier for Spotify access tokens
  const tokens = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectURI,
    client_id: clientID,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokens,
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Spotify token request failed", response.status, data);
    return;
  }

  sessionStorage.setItem("access_token", data.access_token);
};

const searchTracks = async (searchTerm) => {
  const accessToken = sessionStorage.getItem("access_token");
  if (!accessToken) {
    console.error("There was an error retrieving your Spotify token");
    return;
  }

  const params = new URLSearchParams({
    q: searchTerm,
    type: "track",
  });

  const searchEndpoint = "https://api.spotify.com/v1/search";
  const queryParams = params.toString();
  const searchUrl = `${searchEndpoint}?${queryParams}`;

  const search = await fetch(searchUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!search.ok) {
    console.error("Spotify search failed", search.status);
    return;
  }

  const data = await search.json();

  const formattedTracks = data.tracks.items.map((item) => {
    return {
      id: item.id,
      title: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      uri: item.uri,
    };
  });
  return formattedTracks;
};

export { handleSpotifyCallback, searchTracks };
export default redirectToSpotifyAuth;
