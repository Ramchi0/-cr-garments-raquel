import { ArrowUpRight } from 'lucide-react'

const ContactItem = ({ icon: Icon, label, value, href, external }) => {
  const content = (
    <>
      <span className="contact-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.9} />
      </span>
      <span className="contact-meta">
        <span className="contact-label">{label}</span>
        <span className="contact-value">{value}</span>
      </span>
      {href && external ? <ArrowUpRight className="contact-external" size={14} /> : null}
    </>
  )

  if (!href) {
    return (
      <li className="contact-item">
        <div className="contact-link contact-static">{content}</div>
      </li>
    )
  }

  return (
    <li className="contact-item">
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="contact-link"
      >
        {content}
      </a>
    </li>
  )
}

export default ContactItem
