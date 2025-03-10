const auth0Client = new Auth0Client({
    domain: "dev-sj0g1qcodfko6gg1.ca.auth0.com",
    client_id: "GqsSQ4mVPafWGmnx8PPU1We7OLnUm89Q",
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
