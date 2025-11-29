import { Link } from 'react-router-dom';
import './App.css';
import { useLanguage } from './context/LanguageContext';

function Home() {
    const { t } = useLanguage();

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>{t('welcomeTitle')}</h1>
                <p>{t('welcomeSubtitle')}</p>
            </header>

            <div className="features-grid">
                <Link to="/weather" className="feature-card">
                    <div className="feature-icon">☁️</div>
                    <h3>{t('weatherTitle')}</h3>
                    <p>{t('weatherDesc')}</p>
                </Link>

                <Link to="/crop" className="feature-card">
                    <div className="feature-icon">🌱</div>
                    <h3>{t('cropTitle')}</h3>
                    <p>{t('cropDesc')}</p>
                </Link>

                <Link to="/soil" className="feature-card">
                    <div className="feature-icon">🌍</div>
                    <h3>{t('soilTitle')}</h3>
                    <p>{t('soilDesc')}</p>
                </Link>

                <Link to="/pest" className="feature-card">
                    <div className="feature-icon">🦠</div>
                    <h3>{t('pestTitle')}</h3>
                    <p>{t('pestDesc')}</p>
                </Link>
            </div>
        </div>
    );
}

export default Home;
