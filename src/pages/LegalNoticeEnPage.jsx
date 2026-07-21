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
              <p>
                In compliance with <strong>Spanish Law 34/2002 (LSSI-CE)</strong>,{' '}
                <strong>GDPR</strong> and Spanish <strong>LOPDGDD</strong>, this Legal
                Notice governs the use of the website{' '}
                <strong>worthmytimecalculator.com</strong>.
              </p>

              {/* 1. Owner identification */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. Owner Identification
                </h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Owner name:</span>{' '}
                    Ángel González Palenzuela.
                  </p>
                  <p>
                    <span className="font-medium">Tax ID (NIF):</span> 38078911L.
                  </p>
                  <p>
                    <span className="font-medium">Registered address:</span>{' '}
                    Avenida de los telares, 30 - 33401 Avilés, Asturias, Spain.
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> skald@skaldcraft.com.
                  </p>
                  <p>
                    <span className="font-medium">Business activity:</span>{' '}
                    Provision of digital tools and services.
                  </p>
                </div>
              </section>

              {/* 2. Website use and user commitments */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. Website Use and User Commitments
                </h2>
                <p>
                  The user agrees to use the website and its contents without violating
                  current legislation, good faith, or public order. Any illegal or harmful
                  use of the site against the owner or third parties is prohibited.
                </p>
              </section>

              {/* 3. Disclaimer for the calculation tool */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. Disclaimer for the Calculation Tool
                </h2>
                <p>
                  This website provides a calculator that estimates the cost of products in
                  working hours based on the user's input.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Results are <strong>purely informative and indicative</strong>.
                  </li>
                  <li>
                    The owner is not responsible for any financial or purchasing decisions
                    made by the user based on these calculations.
                  </li>
                  <li>
                    Absolute accuracy of the figures is not guaranteed, as prices and
                    external variables are subject to change.
                  </li>
                </ul>
              </section>

              {/* 4. Amazon Affiliation and Advertising */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. Amazon Affiliation and Advertising
                </h2>
                <p>
                  <strong>Mandatory disclosure:</strong> As an Amazon Associate, I earn from
                  qualifying purchases. <strong>Important:</strong> This does not result in
                  any additional cost to you as a buyer.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Transparency:</span> Marked or redirecting
                    links to Amazon are affiliate links. If you purchase something through
                    them, I receive a commission at no extra cost to you.
                  </li>
                  <li>
                    <span className="font-medium">Responsibility:</span> By clicking, you
                    become a customer of Amazon. Skaldcraft does not manage orders, shipping,
                    or returns; any claim must be directed to Amazon directly.
                  </li>
                </ul>
              </section>

              {/* 5. Security Measures */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. Security Measures
                </h2>
                <p>
                  The site uses an <strong>SSL (HTTPS)</strong> certificate to ensure that
                  navigation and data (even anonymous data) travel in an encrypted and
                  secure manner.
                </p>
              </section>

              {/* 6. Governing Law and Jurisdiction */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  6. Governing Law and Jurisdiction
                </h2>
                <p>
                  These terms are governed by <strong>Spanish law</strong>. Any dispute
                  shall be submitted to the courts of{' '}
                  <strong>Avilés/Asturias, Spain</strong>.
                </p>
              </section>

              {/* Last updated */}
              <section className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Last updated: July 21, 2026.
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
