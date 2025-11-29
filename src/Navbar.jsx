import { Link, useLocation } from 'react-router-dom';
import './App.css';
import { useLanguage } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function Navbar() {
    const location = useLocation();
    const { t } = useLanguage();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>{t('appTitle')}</h1>
            </div>
            <div className="navbar-links">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                    {t('home')}
                </Link>
                <Link to="/weather" className={`nav-link ${location.pathname === '/weather' ? 'active' : ''}`}>
                    {t('weather')}
                </Link>
                <Link to="/crop" className={`nav-link ${location.pathname === '/crop' ? 'active' : ''}`}>
                    {t('cropRecommend')}
                </Link>
                <Link to="/soil" className={`nav-link ${location.pathname === '/soil' ? 'active' : ''}`}>
                    {t('soilDetails')}
                </Link>
                <Link to="/pest" className={`nav-link ${location.pathname === '/pest' ? 'active' : ''}`}>
                    {t('pestDetect')}
                </Link>
                <LanguageSwitcher />
            </div>
        </nav>
    );
}

export default Navbar;
