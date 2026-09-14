const clientID = "f7737228c1344be88576076d6347d5d1";
const redirectURI = "http://127.0.0.1:5173/";
const scope = "playlist-modify-public playlist-modify-private";

// function to generate a random string by taking an array of a specfied length, mapping through that array, and replacing the corresponding element with a randomized letter or number picked from 'Possible'
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

// this variable calls the generateRandomString function with a specified length

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

const redirectToSpotifyAuth = async () => {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await createCodeChallenge(codeVerifier);
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

export default redirectToSpotifyAuth;
