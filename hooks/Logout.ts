export async function Logout() {
    localStorage.clear()
    window.location.pathname = '/'
}
