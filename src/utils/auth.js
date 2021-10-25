class Auth {
    constructor() {
        this.authenticated = false;
        this.authenticatedAsAdmin = false;
    }
    login(cb) {
        this.authenticated = true;
        cb();
    }
    logout(cb) {
        this.authenticated = false;
        cb();
    }
    isAuthenticated() {
        return this.authenticated;
    }
    loginAdmin() {
        this.authenticatedAsAdmin = true;
    }
    isAuthenticatedAsAdmin() {
        return this.authenticatedAsAdmin;
    }
}
export default new Auth();