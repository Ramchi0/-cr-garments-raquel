import raquelPhoto from '../assets/CR.jpeg'

const ProfileHero = ({ profile }) => {
  return (
    <section className="hero-layout" aria-labelledby="profile-name">
      <div className="portrait-panel">
        <div className="portrait-frame" aria-label="Portrait of Raquel Sainz Flores">
          <img src={raquelPhoto} alt="Raquel Sainz Flores" className="profile-portrait" />
        </div>
      </div>

      <div className="profile-copy">
        <div className="hero-intro" aria-label="Company and location">
          <p className="eyebrow">C.R. Garments</p>
          <p className="location-badge">{profile.location}</p>
        </div>

        <p className="eyebrow eyebrow-subtitle">DESARROLLO DE NEGOCIO INTERNACIONAL</p>
        <h1 id="profile-name" className="profile-name">
          <span>Raquel</span>
          <span>Sainz Flores</span>
        </h1>
        <p className="role-title">{profile.designation}</p>
        <p className="company-line">{profile.company}</p>
      </div>
    </section>
  )
}

export default ProfileHero
