
# SoundStash

SoundStash is a React application that allows users to search for songs on Spotify, create custom playlists, and save them directly to their Spotify account.

I built this project as part of my journey learning React and working with APIs. It allowed me to get more comfortable with components, state management, async JS, and connecting an app to an API.

## Features

- Search for songs, artists, and albums using Spotify's API.
- Add and remove songs from a custom playlist.
- Prevent duplicate tracks from being added.
- Custom naming for Spotify playlists.
- Playlist saving functionality.
- Responsive design for desktop and mobile.
- Loading indicators and feedback when saving playlists.

## Built With

- React
- JavaScript
- HTML & CSS (CSS Modules)
- Vite
- Spotify Web API
- Spotify OAuth 2.0 with PKCE

## Running Locally

1. Clone the repository.
2. Install dependencies:

   npm install

3. Create an application in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
4. Configure your Spotify Client ID and redirect URI in `src/util/Spotify.js`.
5. Add `http://127.0.0.1:5173/` as an allowed redirect URI in your Spotify application settings.
6. Start the development server:

   npm run dev -- --host 127.0.0.1

7. Open the local URL and connect your Spotify account.

**Note:** Spotify API access may depend on your application's development-mode settings and authorized users.

## What I Learned

This project helped me better understand how React components communicate, how to manage state, and how to work with async API requests.

One of the bigger challenges was implementing Spotify authentication and getting the different API requests to work together when creating and saving playlists.

There are still a few things I'd like to improve upon, but overall, I'm happy with where the project ended up and what I learned while building it.

## Future Improvements

- Automatic Spotify access token refresh.
- Display album artwork alongside tracks.
- Additional error handling and user feedback.

