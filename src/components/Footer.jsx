const Footer = ({ company, location }) => {
  return (
    <footer className="site-footer" aria-label="Footer">
      <span>{company}</span>
      <span className="footer-divider" aria-hidden="true" />
      <span>{location}</span>
    </footer>
  )
}

export default Footer
