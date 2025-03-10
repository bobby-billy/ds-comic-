async function addManga(title, author, description, cover_image) {
    const token = await auth0Client.getTokenSilently();

    const response = await fetch("/api/addManga.js", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author, description, cover_image })
    });

    const result = await response.json();
    console.log(result);
}
