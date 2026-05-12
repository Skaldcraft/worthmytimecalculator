import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const LegalNoticeEnPage = () => {
  return (
    <>
      <Helmet>
        <title>Legal Notice - Skaldcraft</title>
        <meta
          name="description"
          content="Legal notice, terms of use and responsibilities for this website."
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
              Legal Notice
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {/* Intro */}
              <section className="space-y-3">
                <p>
                  This space provides the user with all the information regarding the legal
                  terms and conditions that define the relationship between users and me, as
                  the person responsible for this website. As a user, it is important that you
                  are aware of these terms before continuing your navigation.
                </p>
                <p>
                  This website strictly complies with Spanish Organic Law 3/2018 (LOPDGDD) on
                  the Protection of Personal Data and Guarantee of Digital Rights. It also
                  complies with Regulation (EU) 2016/679 (GDPR) and Spanish Law 34/2002
                  (LSSICE) on Services of the Information Society and Electronic Commerce.
                </p>
              </section>

              {/* 1. Owner identification */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. Website Owner Identification
                </h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Name:</span> Ángel González Palenzuela.
                  </p>
                  <p>
                    <span className="font-medium">NIF/Tax ID:</span> 38078911L.
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
                  <p>
                    <span className="font-medium">Registered office:</span>{' '}
                    Avenida de los Telares, 30 - 33401 Avilés, Asturias, Spain.
                  </p>
                  <p>
                    <span className="font-medium">Business activity:</span>{' '}
                    Provision of digital products and services.
                  </p>
                </div>
              </section>

              {/* 2. User commitments */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. User Commitments and Obligations
                </h2>
                <p>
                  Access to this website does not imply the start of a commercial relationship
                  with the owner. The user agrees to use the website, its services, and
                  contents without contravening current legislation, good faith, and public
                  order.
                </p>
                <p>
                  Any illegal or harmful use of the website that could cause damage or prevent
                  its normal operation is prohibited. Regarding the contents, their
                  reproduction, distribution, or modification is prohibited unless authorized
                  by me as the legitimate owner.
                </p>
              </section>

              {/* 3. Calculation tool accuracy */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. Calculation Tool Accuracy
                </h2>
                <p>
                  This website provides a tool to calculate estimates of working hours needed
                  to purchase an item based on data entered by the user (price and income).
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Results are purely informative and indicative.</li>
                  <li>
                    The owner is not responsible for decisions made by the user based on these
                    calculations.
                  </li>
                  <li>
                    The user is solely responsible for the truthfulness of the figures entered
                    into the tool.
                  </li>
                </ul>
              </section>

              {/* 4. Security measures */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. Security Measures
                </h2>
                <p>
                  Navigation data processed on this site is managed under security protocols
                  to guarantee confidentiality. Communication between users and the website
                  uses a secure channel, and data is encrypted thanks to the HTTPS protocol,
                  ensuring appropriate security for data integrity.
                </p>
              </section>

              {/* 5. Exclusion of guarantees */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. Exclusion of Guarantees and Liability
                </h2>
                <p>
                  The owner does not grant any guarantee nor is responsible for damages of any
                  nature that could be caused by:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Lack of availability or maintenance of the website.</li>
                  <li>The existence of malware or harmful programs in the contents.</li>
                  <li>
                    Illicit, negligent, or fraudulent use of the information contained in this
                    Legal Notice.
                  </li>
                </ul>
              </section>

              {/* 6. Conflict resolution platform */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  6. Conflict Resolution Platform
                </h2>
                <p>
                  Users may also access the dispute resolution platform provided by the
                  European Commission:
                </p>
                <p>
                  <a
                    href="http://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    http://ec.europa.eu/consumers/odr/
                  </a>
                </p>
              </section>

              {/* 7. Governing law and jurisdiction */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  7. Governing Law and Jurisdiction
                </h2>
                <p>
                  Generally, the relationship between the owner of this website and the users
                  of its digital services is subject to Spanish legislation and jurisdiction,
                  specifically to the courts of Avilés/Asturias, Spain.
                </p>
              </section>

              {/* 8. Contact */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  8. Contact
                </h2>
                <p>
                  Should any user have questions regarding this Legal Notice, please contact:
                </p>
                <p className="font-medium">
                  <a
                    href="mailto:skald@skaldcraft.com"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    skald@skaldcraft.com
                  </a>
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

export default LegalNoticeEnPage;