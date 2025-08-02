const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3><img src="../assets/img/svgs/app-logo.png" alt="app logo" className="app-logo" /></h3>
        </Link>
        <nav>
            <NavLink to="/"><img src="../assets/img/svgs/google-logo.svg" alt="google app logo" className="navbar-logo" /></NavLink>
            <NavLink to="/about"><img src="../assets/img/svgs/about-logo.png" alt="about logo" className="navbar-logo" /></NavLink>
            <NavLink to="/mail"><img src="../assets/img/svgs/gmail-logo.png" alt="mail app logo" className="navbar-logo" /></NavLink>
            <NavLink to="/note"><img src="../assets/img/svgs/note-logo.svg" alt="note app logo" className="navbar-logo" /></NavLink>
        </nav>
    </header>
}
