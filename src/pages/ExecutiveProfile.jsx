import Header from '../components/Header'
import ProfileHero from '../components/ProfileHero'
import ContactGrid from '../components/ContactGrid'
import Footer from '../components/Footer'
import { profile } from '../data/profile'

const ExecutiveProfile = () => {
  return (
    <div className="page-shell">
      <div className="textile-pattern" aria-hidden="true" />
      <Header location={profile.location} />

      <main className="business-card">
        <ProfileHero profile={profile} />
        <ContactGrid profile={profile} />
        <Footer company={profile.company} location={profile.location} />
      </main>
    </div>
  )
}

export default ExecutiveProfile
