import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../App.css'; // Ensure styles are available

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button className="language-switcher" onClick={toggleLanguage}>
            {language === 'en' ? '🇮🇳 Hindi' : '🇺🇸 English'}
        </button>
    );
};

export default LanguageSwitcher;
