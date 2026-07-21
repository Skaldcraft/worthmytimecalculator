import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { run, setLanguage } from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

const LANGUAGES = ['en', 'es', 'de', 'fr', 'it', 'pl', 'ro', 'ru', 'tr', 'uk'];

const T = {
  consentModal: {
    en: {
      title: 'We use cookies',
      description: 'We use cookies to ensure the site works properly and to improve your experience. You can choose which categories to allow.',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all',
      showPreferencesBtn: 'Customize',
    },
    es: {
      title: 'Usamos cookies',
      description: 'Usamos cookies para garantizar el funcionamiento del sitio y mejorar tu experiencia. Puedes elegir qué categorías permitir.',
      acceptAllBtn: 'Aceptar todas',
      acceptNecessaryBtn: 'Rechazar todas',
      showPreferencesBtn: 'Personalizar',
    },
    de: {
      title: 'Wir verwenden Cookies',
      description: 'Wir verwenden Cookies, um die ordnungsgemäße Funktion der Website zu gewährleisten und Ihr Erlebnis zu verbessern. Sie können wählen, welche Kategorien Sie zulassen möchten.',
      acceptAllBtn: 'Alle akzeptieren',
      acceptNecessaryBtn: 'Alle ablehnen',
      showPreferencesBtn: 'Anpassen',
    },
    fr: {
      title: 'Nous utilisons des cookies',
      description: 'Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience. Vous pouvez choisir les catégories à autoriser.',
      acceptAllBtn: 'Tout accepter',
      acceptNecessaryBtn: 'Tout refuser',
      showPreferencesBtn: 'Personnaliser',
    },
    it: {
      title: 'Utilizziamo i cookie',
      description: 'Utilizziamo i cookie per garantire il corretto funzionamento del sito e migliorare la tua esperienza. Puoi scegliere quali categorie consentire.',
      acceptAllBtn: 'Accetta tutto',
      acceptNecessaryBtn: 'Rifiuta tutto',
      showPreferencesBtn: 'Personalizza',
    },
    pl: {
      title: 'Używamy plików cookie',
      description: 'Używamy plików cookie, aby zapewnić prawidłowe działanie witryny i poprawić komfort użytkowania. Możesz wybrać, które kategorie chcesz zezwolić.',
      acceptAllBtn: 'Akceptuj wszystkie',
      acceptNecessaryBtn: 'Odrzuć wszystkie',
      showPreferencesBtn: 'Dostosuj',
    },
    ro: {
      title: 'Folosim cookie-uri',
      description: 'Folosim cookie-uri pentru a asigura funcționarea corectă a site-ului și pentru a îmbunătăți experiența ta. Poți alege ce categorii să permiți.',
      acceptAllBtn: 'Acceptă toate',
      acceptNecessaryBtn: 'Respinge toate',
      showPreferencesBtn: 'Personalizează',
    },
    ru: {
      title: 'Мы используем файлы cookie',
      description: 'Мы используем файлы cookie для обеспечения правильной работы сайта и улучшения вашего опыта. Вы можете выбрать, какие категории разрешить.',
      acceptAllBtn: 'Принять все',
      acceptNecessaryBtn: 'Отклонить все',
      showPreferencesBtn: 'Настроить',
    },
    tr: {
      title: 'Çerezleri kullanıyoruz',
      description: 'Sitenin düzgün çalışmasını sağlamak ve deneyiminizi iyileştirmek için çerezler kullanıyoruz. Hangi kategorilere izin vereceğinizi seçebilirsiniz.',
      acceptAllBtn: 'Tümünü kabul et',
      acceptNecessaryBtn: 'Tümünü reddet',
      showPreferencesBtn: 'Özelleştir',
    },
    uk: {
      title: 'Ми використовуємо файли cookie',
      description: 'Ми використовуємо файли cookie для забезпечення правильної роботи сайту та покращення вашого досвіду. Ви можете вибрати, які категорії дозволити.',
      acceptAllBtn: 'Прийняти всі',
      acceptNecessaryBtn: 'Відхилити всі',
      showPreferencesBtn: 'Налаштувати',
    },
  },
  preferencesModal: {
    en: {
      title: 'Cookie preferences',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all',
      savePreferencesBtn: 'Save preferences',
      closeIconLabel: 'Close',
      sections: [
        {
          title: 'Strictly necessary',
          description: 'These cookies are essential for the website to function correctly and cannot be disabled.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytics',
          description: 'These cookies help us understand how visitors interact with the site, allowing us to improve it.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Advertising',
          description: 'These cookies are used to deliver relevant advertisements and track ad performance.',
          linkedCategory: 'marketing',
        },
        {
          title: 'More information',
          description: 'For more details, read our <a href="/en/privacy-policy">Privacy Policy</a> and <a href="/en/cookie-policy">Cookie Policy</a>.',
        },
      ],
    },
    es: {
      title: 'Preferencias de cookies',
      acceptAllBtn: 'Aceptar todas',
      acceptNecessaryBtn: 'Rechazar todas',
      savePreferencesBtn: 'Guardar preferencias',
      closeIconLabel: 'Cerrar',
      sections: [
        {
          title: 'Estrictamente necesarias',
          description: 'Estas cookies son esenciales para el funcionamiento correcto del sitio web y no se pueden desactivar.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analítica',
          description: 'Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio, permitiéndonos mejorarlo.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Publicidad',
          description: 'Estas cookies se utilizan para mostrar anuncios relevantes y medir el rendimiento de la publicidad.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Más información',
          description: 'Para más detalles, lee nuestra <a href="/es/politica-privacidad">Política de privacidad</a> y <a href="/es/politica-cookies">Política de cookies</a>.',
        },
      ],
    },
    de: {
      title: 'Cookie-Einstellungen',
      acceptAllBtn: 'Alle akzeptieren',
      acceptNecessaryBtn: 'Alle ablehnen',
      savePreferencesBtn: 'Einstellungen speichern',
      closeIconLabel: 'Schließen',
      sections: [
        {
          title: 'Notwendig',
          description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analyse',
          description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, damit wir sie verbessern können.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Werbung',
          description: 'Diese Cookies werden verwendet, um relevante Werbung anzuzeigen und die Werbeleistung zu messen.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Weitere Informationen',
          description: 'Weitere Details finden Sie in unserer <a href="/en/privacy-policy">Datenschutzerklärung</a> und <a href="/en/cookie-policy">Cookie-Richtlinie</a>.',
        },
      ],
    },
    fr: {
      title: 'Préférences de cookies',
      acceptAllBtn: 'Tout accepter',
      acceptNecessaryBtn: 'Tout refuser',
      savePreferencesBtn: 'Enregistrer les préférences',
      closeIconLabel: 'Fermer',
      sections: [
        {
          title: 'Strictement nécessaires',
          description: 'Ces cookies sont essentiels au bon fonctionnement du site web et ne peuvent pas être désactivés.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytique',
          description: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site, ce qui nous permet de l\'améliorer.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Publicité',
          description: 'Ces cookies sont utilisés pour afficher des publicités pertinentes et mesurer les performances publicitaires.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Plus d\'informations',
          description: 'Pour plus de détails, consultez notre <a href="/en/privacy-policy">Politique de confidentialité</a> et <a href="/en/cookie-policy">Politique des cookies</a>.',
        },
      ],
    },
    it: {
      title: 'Preferenze dei cookie',
      acceptAllBtn: 'Accetta tutto',
      acceptNecessaryBtn: 'Rifiuta tutto',
      savePreferencesBtn: 'Salva preferenze',
      closeIconLabel: 'Chiudi',
      sections: [
        {
          title: 'Strettamente necessari',
          description: 'Questi cookie sono essenziali per il corretto funzionamento del sito web e non possono essere disabilitati.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analitici',
          description: 'Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito, permettendoci di migliorarlo.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Pubblicitari',
          description: 'Questi cookie vengono utilizzati per mostrare annunci pertinenti e misurare le prestazioni pubblicitarie.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Maggiori informazioni',
          description: 'Per maggiori dettagli, leggi la nostra <a href="/en/privacy-policy">Informativa sulla privacy</a> e <a href="/en/cookie-policy">Politica sui cookie</a>.',
        },
      ],
    },
    pl: {
      title: 'Preferencje plików cookie',
      acceptAllBtn: 'Akceptuj wszystkie',
      acceptNecessaryBtn: 'Odrzuć wszystkie',
      savePreferencesBtn: 'Zapisz preferencje',
      closeIconLabel: 'Zamknij',
      sections: [
        {
          title: 'Niezbędne',
          description: 'Te pliki cookie są niezbędne do prawidłowego działania strony internetowej i nie można ich wyłączyć.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analityczne',
          description: 'Te pliki cookie pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z witryną, co pozwala nam ją ulepszać.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Reklamowe',
          description: 'Te pliki cookie są używane do wyświetlania odpowiednich reklam i mierzenia skuteczności reklam.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Więcej informacji',
          description: 'Aby uzyskać więcej szczegółów, przeczytaj naszą <a href="/en/privacy-policy">Politykę prywatności</a> i <a href="/en/cookie-policy">Politykę cookie</a>.',
        },
      ],
    },
    ro: {
      title: 'Preferințe cookie-uri',
      acceptAllBtn: 'Acceptă toate',
      acceptNecessaryBtn: 'Respinge toate',
      savePreferencesBtn: 'Salvează preferințele',
      closeIconLabel: 'Închide',
      sections: [
        {
          title: 'Strict necesare',
          description: 'Aceste cookie-uri sunt esențiale pentru funcționarea corectă a site-ului web și nu pot fi dezactivate.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analiză',
          description: 'Aceste cookie-uri ne ajută să înțelegem cum interacționează vizitatorii cu site-ul, permițându-ne să îl îmbunătățim.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Publicitate',
          description: 'Aceste cookie-uri sunt folosite pentru a afișa reclame relevante și a măsura performanța publicitară.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Mai multe informații',
          description: 'Pentru mai multe detalii, citește <a href="/en/privacy-policy">Politica de confidențialitate</a> și <a href="/en/cookie-policy">Politica privind cookie-urile</a>.',
        },
      ],
    },
    ru: {
      title: 'Настройки cookie',
      acceptAllBtn: 'Принять все',
      acceptNecessaryBtn: 'Отклонить все',
      savePreferencesBtn: 'Сохранить настройки',
      closeIconLabel: 'Закрыть',
      sections: [
        {
          title: 'Строго необходимые',
          description: 'Эти файлы cookie необходимы для правильной работы веб-сайта и не могут быть отключены.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Аналитика',
          description: 'Эти файлы cookie помогают нам понять, как посетители взаимодействуют с сайтом, что позволяет нам улучшать его.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Реклама',
          description: 'Эти файлы cookie используются для показа релевантной рекламы и измерения эффективности рекламы.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Дополнительная информация',
          description: 'Для получения дополнительной информации ознакомьтесь с <a href="/en/privacy-policy">Политикой конфиденциальности</a> и <a href="/en/cookie-policy">Политикой использования cookie</a>.',
        },
      ],
    },
    tr: {
      title: 'Çerez tercihleri',
      acceptAllBtn: 'Tümünü kabul et',
      acceptNecessaryBtn: 'Tümünü reddet',
      savePreferencesBtn: 'Tercihleri kaydet',
      closeIconLabel: 'Kapat',
      sections: [
        {
          title: 'Kesinlikle gerekli',
          description: 'Bu çerezler web sitesinin düzgün çalışması için gereklidir ve devre dışı bırakılamaz.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analitik',
          description: 'Bu çerezler, ziyaretçilerin siteyle nasıl etkileşime girdiğini anlamamıza yardımcı olarak siteyi iyileştirmemizi sağlar.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Reklam',
          description: 'Bu çerezler, ilgili reklamları göstermek ve reklam performansını ölçmek için kullanılır.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Daha fazla bilgi',
          description: 'Daha fazla bilgi için <a href="/en/privacy-policy">Gizlilik Politikası</a> ve <a href="/en/cookie-policy">Çerez Politikası</a>\'nı okuyun.',
        },
      ],
    },
    uk: {
      title: 'Налаштування cookie',
      acceptAllBtn: 'Прийняти всі',
      acceptNecessaryBtn: 'Відхилити всі',
      savePreferencesBtn: 'Зберегти налаштування',
      closeIconLabel: 'Закрити',
      sections: [
        {
          title: 'Строго необхідні',
          description: 'Ці файли cookie необхідні для правильної роботи веб-сайту і не можуть бути вимкнені.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Аналітика',
          description: 'Ці файли cookie допомагають нам зрозуміти, як відвідувачі взаємодіють із сайтом, що дозволяє нам його вдосконалювати.',
          linkedCategory: 'analytics',
        },
        {
          title: 'Реклама',
          description: 'Ці файли cookie використовуються для показу релевантної реклами та вимірювання ефективності реклами.',
          linkedCategory: 'marketing',
        },
        {
          title: 'Більше інформації',
          description: 'Для отримання додаткової інформації ознайомтеся з <a href="/en/privacy-policy">Політикою конфіденційності</a> та <a href="/en/cookie-policy">Політикою використання cookie</a>.',
        },
      ],
    },
  },
};

const buildConfig = (lang) => ({
  mode: 'opt-in',
  autoShow: true,
  lazyHtmlGeneration: true,
  autoClearCookies: true,
  manageScriptTags: true,
  hideFromBots: true,
  cookie: {
    name: 'cc_cookie',
    expiresAfterDays: 182,
    path: '/',
    sameSite: 'Lax',
  },
  guiOptions: {
    consentModal: {
      layout: 'bar',
      position: 'bottom',
      equalWeightButtons: false,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: false,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {},
    marketing: {},
  },
  language: {
    default: lang,
    translations: LANGUAGES.reduce((acc, code) => {
      acc[code] = {
        consentModal: T.consentModal[code],
        preferencesModal: T.preferencesModal[code],
      };
      return acc;
    }, {}),
  },
});

const CookieConsentBanner = () => {
  const { language } = useLanguage();
  const initialized = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (!initialized.current) {
        initialized.current = true;
        try {
          await run(buildConfig(language));
        } catch {
          // already initialized
        }
      } else {
        try {
          await setLanguage(language);
        } catch {
          // ignore
        }
      }
    };
    init();
  }, [language]);

  return null;
};

export default CookieConsentBanner;
