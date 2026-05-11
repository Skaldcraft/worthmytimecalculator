import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const PrivacyPolicyEnPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Skaldcraft</title>
        <meta
          name="description"
          content="Privacy policy and personal data processing information for this website."
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
              Privacy Policy
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {/* Intro */}
              <section className="space-y-3">
                <p>
                  On this website, user privacy is an absolute priority. This Privacy Policy
                  describes how personal information of all individuals interacting with the
                  owner through this site will be treated and protected.
                </p>
                <p>
                  In accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law
                  3/2018 (LOPDGDD), users are informed of the processing of their data by the
                  owner.
                </p>
              </section>

              {/* 1. Data controller */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. Data Controller
                </h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Identity:</span> Ángel González
                    Palenzuela.
                  </p>
                  <p>
                    <span className="font-medium">NIF/Tax ID:</span> 38078911L.
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> Avenida de los telares, 30
                    - 33401 Avilés, Asturias, Spain.
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    <a
                      href="mailto:skald@skaldcraft.com"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      skald@skaldcraft.com
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* 2. Collected data */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. Collected Personal Data
                </h2>
                <p>
                  The following personal data is processed for the purposes stated in this
                  policy:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Browsing data:</span> IP address, device
                    identification, browser type, domain through which the website is
                    accessed, browsing data, and activity on the site.
                  </li>
                  <li>
                    <span className="font-medium">Data entered in the tool:</span> figures
                    for price and income entered by the user. This data is not associated
                    with an identifiable personal identity.
                  </li>
                </ul>
                <p className="italic">
                  Important: This website does not have contact forms, subscription systems,
                  or login features, so names, emails, or phone numbers are not collected
                  directly.
                </p>
              </section>

              {/* 3. Purpose */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. Purpose of Processing
                </h2>
                <p>The collected information is used for:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Analytics:</span> to conduct statistical
                    studies on visits and user behavior to improve the usability of the tool.
                  </li>
                  <li>
                    <span className="font-medium">Security:</span> to guarantee site security
                    and detect possible abuse or fraud.
                  </li>
                </ul>
              </section>

              {/* 4. Legal basis */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. Legal Basis
                </h2>
                <p>
                  The legal basis for processing browsing data is the user's consent granted
                  by accepting cookies on the entry banner, as well as the legitimate interest
                  of the owner to maintain the security and correct operation of the website.
                </p>
              </section>

              {/* 5. Retention */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. Data Retention
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Browsing data:</span> will be kept for the
                    strictly necessary time to fulfill statistical or security purposes.
                  </li>
                  <li>
                    <span className="font-medium">Tool data:</span> calculations are
                    transient and are not stored linked to the user permanently.
                  </li>
                </ul>
              </section>

              {/* 6. Rights */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  6. Your Rights
                </h2>
                <p>
                  Anyone has the right to obtain confirmation as to whether we are processing
                  personal data concerning them. Interested parties have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Request access to their personal data.</li>
                  <li>Request rectification or erasure.</li>
                  <li>Request restriction of processing.</li>
                  <li>Object to processing.</li>
                </ul>
                <p>
                  To exercise these rights, you can write to{' '}
                  <a
                    href="mailto:skald@skaldcraft.com"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    skald@skaldcraft.com
                  </a>
                  , providing a copy of your ID to prove your identity. You also have the
                  right to file a complaint with the Spanish Data Protection Agency (AEPD).
                </p>
              </section>

              {/* 7. Data security */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  7. Data Security
                </h2>
                <p>
                  The owner is committed to using and treating data while respecting its
                  confidentiality. This website includes an SSL certificate (HTTPS), a
                  security protocol that ensures the transmission of data between the server
                  and the user is fully encrypted.
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

export default PrivacyPolicyEnPage;