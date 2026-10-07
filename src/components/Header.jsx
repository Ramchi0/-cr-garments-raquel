const Header = ({ location }) => {
  return (
    <header className="topbar" aria-label="Header">
      <div className="brand-name">C.R. GARMENTS</div>
      <div className="header-location">{location.toUpperCase()}</div>
    </header>
  )
}

export default Header
