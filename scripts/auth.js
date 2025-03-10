const auth0Client = new Auth0Client({
    domain: "your-auth0-domain",
    client_id: "your-auth0-client-id",
    redirect_uri: window.location.origin
});

document.getElementById("login-btn").addEventListener("click", async () => {
    await auth0Client.loginWithPopup();
    const user = await auth0Client.getUser();
    console.log("User logged in:", user);
});

document.getElementById("logout-btn").addEventListener("click", async () => {
    await auth0Client.logout({ returnTo: window.location.origin });
});
