import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const CookiePolicyEnPage = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Skaldcraft</title>
        <meta
          name="description"
          content="Information about the use of cookies on this website and how to manage them."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <Button
            variant="ghost"
            asChild
            className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Cookie Policy
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {/* Intro */}
              <section className="space-y-3">
                <p>
                  On this website, we collect and use information as indicated in our privacy
                  policy. One way we collect information is through the use of technology
                  called “cookies”.
                </p>
              </section>

              {/* 1. What is a cookie */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. What is a cookie?
                </h2>
                <p>
                  A “cookie” is a small amount of text stored in your browser when you visit
                  most websites. Cookies do not usually store sensitive information about you;
                  the data they keep is technical, statistical, or related to personal
                  preferences.
                </p>
              </section>

              {/* 2. Acceptance of cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. Acceptance of cookies
                </h2>
                <p>
                  When accessing this website for the first time, you will see an informative
                  warning about the use of cookies. According to current regulations:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    No cookie will be downloaded (except technical ones) until the user
                    expressly consents to its installation.
                  </li>
                  <li>
                    The user can accept, reject, or configure cookies in a granular way.
                  </li>
                  <li>
                    Acceptance by “continued browsing” is no longer considered valid on its
                    own.
                  </li>
                </ul>
              </section>

              {/* 3. Types of cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. What types of cookies does this website use?
                </h2>
                <p>
                  This website installs first-party and third-party cookies only after
                  obtaining your consent, except for strictly necessary ones. Each category is
                  installed according to what you choose in the cookie settings panel.
                </p>

                {/* A. Technical */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    A. Technical Cookies (Strictly Necessary)
                  </h3>
                  <p>
                    They do not require consent. This website currently does not install
                    technical storage cookies, since the tool works without cookies. Your
                    consent record is stored in your browser's local storage (localStorage)
                    under the key{' '}
                    <code className="text-foreground">ptu_cookie_consent</code>, with date and
                    version, and it is not sent to any server.
                  </p>
                </div>

                {/* B. Analysis */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    B. Analysis Cookies (Third-party)
                  </h3>
                  <p>
                    They are installed only if you accept the “Analytics” category. They are
                    used to measure in an aggregated way how the website is used and to improve
                    it, through Google Analytics:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <code className="text-foreground">_ga</code> — 2 years — distinguishes
                      users.
                    </li>
                    <li>
                      <code className="text-foreground">_ga_&lt;ID&gt;</code> — 2 years —
                      persists the session state.
                    </li>
                    <li>
                      <code className="text-foreground">_gid</code> — 24 hours — distinguishes
                      users.
                    </li>
                    <li>
                      <span className="font-medium">Third-party controller:</span> Google LLC /
                      Google Ireland Limited (
                      <a
                        href="https://policies.google.com/technologies/cookies?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        Google's cookie policy
                      </a>
                      ).
                    </li>
                  </ul>
                  <p>
                    The indicated duration is approximate and may vary depending on the service
                    configuration.
                  </p>
                </div>

                {/* C. Advertising */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    C. Advertising and Behavioral Advertising Cookies (Third-party)
                  </h3>
                  <p>
                    They are installed only if you accept the “Advertising” category. They
                    allow managing advertising spaces, measuring ad performance, and playing
                    embedded videos (YouTube and Vimeo):
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <code className="text-foreground">_gcl_au</code> and{' '}
                      <code className="text-foreground">_gcl_*</code> (Google Ads) — 90 days —
                      conversions and click tracking on ads.
                    </li>
                    <li>
                      <code className="text-foreground">CONSENT</code>,{' '}
                      <code className="text-foreground">VISITOR_INFO1_LIVE</code>,{' '}
                      <code className="text-foreground">YSC</code> and{' '}
                      <code className="text-foreground">PREF</code> (YouTube) — variable
                      duration (from session to 2 years) — player preferences, language, and
                      security.
                    </li>
                    <li>
                      <code className="text-foreground">vuid</code> and{' '}
                      <code className="text-foreground">player</code> (Vimeo) — 1 to 2 years —
                      player preferences and playback analytics.
                    </li>
                    <li>
                      <span className="font-medium">Third-party controllers:</span> Google LLC /
                      Google Ireland Limited (
                      <a
                        href="https://policies.google.com/technologies/ads?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        Google Ads policy
                      </a>
                      ) and Vimeo, Inc. (
                      <a
                        href="https://vimeo.com/cookie_policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        Vimeo's cookie policy
                      </a>
                      ).
                    </li>
                  </ul>
                  <p>
                    Note: the Google Tag Manager container does not install cookies by itself;
                    it runs the configured tags (Google analytics and advertising) according to
                    the consent granted.
                  </p>
                </div>

                {/* D. Preferences */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    D. Preference Cookies
                  </h3>
                  <p>
                    They would be installed only if you accept the “Preferences” category. This
                    website currently does not install preference cookies; the category is
                    available for future settings such as language or region.
                  </p>
                </div>
              </section>

              {/* 4. Deleting cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. Can cookies be deleted?
                </h2>
                <p>
                  You can change or withdraw your consent at any time through the “Cookie
                  settings” link in the footer. You can also block or delete cookies generally
                  or specifically for a domain from your browser settings. In the following
                  links you can find how to manage cookies in the most commonly used browsers:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Google Chrome cookie settings (help center at{' '}
                    <a
                      href="https://support.google.com/chrome/answer/95647?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      support.google.com
                    </a>
                    ).
                  </li>
                  <li>
                    Apple Safari cookie settings (help center at{' '}
                    <a
                      href="https://support.apple.com/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      support.apple.com
                    </a>
                    ).
                  </li>
                  <li>
                    Mozilla Firefox cookie settings (help center at{' '}
                    <a
                      href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      support.mozilla.org
                    </a>
                    ).
                  </li>
                </ul>
              </section>

              {/* 5. More info */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. More information about cookies
                </h2>
                <p>
                  You can consult the regulations and practical recommendations on the use of
                  cookies published by the Spanish Data Protection Agency in its “Guide on the
                  use of cookies”.
                </p>
              </section>

              {/* Last update */}
              <section className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Last updated: 09/08/2026.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CookiePolicyEnPage;