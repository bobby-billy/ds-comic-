const auth0Client = await createAuth0Client({
  domain: "YOUR_AUTH0_DOMAIN",
  client_id: "YOUR_AUTH0_CLIENT_ID",
  redirect_uri: "https://your-vercel-app-url/"
});

// Login function
async function login() {
  await auth0Client.loginWithRedirect();
}

// Logout function
async function logout() {
  await auth0Client.logout({ returnTo: "https://your-vercel-app-url/" });
}
