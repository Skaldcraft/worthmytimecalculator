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
                  This website uses first-party and third-party cookies to improve the user
                  experience and manage advertising spaces.
                </p>

                {/* A. Technical */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    A. Technical Cookies (Strictly Necessary)
                  </h3>
                  <p>
                    These are the most basic cookies and allow the website to function
                    correctly, such as knowing when a human or an automated application is
                    browsing. These cookies do not require consent.
                  </p>
                </div>

                {/* B. Analysis */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    B. Analysis Cookies (Third-party)
                  </h3>
                  <p>
                    These cookies collect information about the type of navigation being
                    performed, the sections used most, or the language.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-medium">Tool:</span> e.g., Google Analytics or
                      Cloudflare.
                    </li>
                    <li>
                      <span className="font-medium">Purpose:</span> anonymous statistical
                      analysis of visits.
                    </li>
                  </ul>
                </div>

                {/* C. Advertising */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    C. Advertising and Behavioral Advertising Cookies (Third-party)
                  </h3>
                  <p>
                    These cookies allow for effective management of advertising spaces and
                    analyze your browsing habits to show advertising related to your
                    preference profile.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-medium">Purpose:</span> to show relevant and
                      useful ads without revealing your identity directly to advertisers.
                    </li>
                    <li>
                      <span className="font-medium">Platform used:</span> Google Ads (see its{' '}
                      <a
                        href="https://policies.google.com/technologies/ads?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        Cookie Policy
                      </a>
                      ).
                    </li>
                  </ul>
                </div>
              </section>

              {/* 4. Deleting cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. Can cookies be deleted?
                </h2>
                <p>
                  Yes. You can block or delete cookies generally or specifically for a domain
                  from your browser settings. In the following links you can find how to
                  manage cookies in the most commonly used browsers:
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
                  Last updated: 30/03/2026.
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