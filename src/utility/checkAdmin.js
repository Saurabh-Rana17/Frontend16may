export async function checkAdmin(adminState) {
    const object = localStorage.getItem("admin");
    if (object === "{}") return false;
    const {admin, session} = adminState;
    const data = await fetch("http://localhost:8080/session/verify", {
        method: "POST", body: JSON.stringify({
            email: admin, session: session
        }), headers: {
            "Content-Type": "application/json",
        },
    });
    const response = await data.text();
    return response === 'true';
}
