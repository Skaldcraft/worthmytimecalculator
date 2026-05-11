import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const LegalNoticePage = () => {
  return (
    <>
      <Helmet>
        <title>Aviso Legal - Skaldcraft</title>
        <meta
          name="description"
          content="Aviso legal, condiciones de uso y responsabilidades de la herramienta."
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
              Volver al inicio
            </Link>
          </Button>

          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Aviso Legal
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {/* 1. Información general */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. Información general
                </h2>
                <p>
                  En este espacio, el usuario podrá encontrar toda la información relativa
                  a los términos y condiciones legales que definen las relaciones entre los
                  usuarios y yo, como responsable de esta web. Como usuario, es importante
                  que conozcas estos términos antes de continuar tu navegación.
                </p>
                <p>
                  Esta web cumple rigurosamente con la Ley Orgánica 3/2018, de 5 de diciembre,
                  de Protección de Datos Personales y garantía de los derechos digitales
                  (LOPDGDD). Cumple también con el Reglamento (UE) 2016/679 (RGPD), así como
                  con la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
                  Información y Comercio Electrónico (LSSICE o LSSI).
                </p>
              </section>

              {/* 2. Identificador del responsable */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. Identificación del responsable de la web
                </h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Denominación social:</span>{' '}
                    Ángel González Palenzuela
                  </p>
                  <p>
                    <span className="font-medium">NIF/CIF:</span> 38078911L
                  </p>
                  <p>
                    <span className="font-medium">Correo electrónico:</span>skald@skaldcraft.com
                    skald@skaldcraft.com
                  </p>
                  <p>
                    <span className="font-medium">Domicilio social:</span>{' '}
                    Avenida de los Telares, 30 - 33401 Avilés, Asturias
                  </p>
                  <p>
                    <span className="font-medium">Actividad:</span>{' '}
                    Prestación de productos y servicios digitales
                  </p>
                </div>
              </section>

              {/* 3. Compromisos y obligaciones de los usuarios */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. Compromisos y obligaciones de los usuarios
                </h2>
                <p>
                  El acceso a la presente web no supone, en modo alguno, el inicio de una
                  relación comercial con el responsable. El usuario se compromete a utilizar
                  el sitio web, sus servicios y contenidos sin contravenir la legislación
                  vigente, la buena fe y el orden público.
                </p>
                <p>
                  Queda prohibido el uso de la web con fines ilícitos, lesivos o que puedan
                  impedir el normal funcionamiento del sitio. Respecto de los contenidos,
                  se prohíbe su reproducción, distribución o modificación, total o parcial,
                  a menos que se cuente con mi autorización como legítimo titular.
                </p>
              </section>

              {/* 4. Exactitud de la herramienta de cálculo */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. Exactitud de la herramienta de cálculo
                </h2>
                <p>
                  Esta web proporciona una herramienta para calcular estimaciones de horas
                  de trabajo necesarias para adquirir un bien basándose en los datos
                  introducidos por el usuario (precio e ingresos).
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Los resultados son meramente informativos y orientativos.</li>
                  <li>
                    El responsable no se hace responsable de las decisiones tomadas por el
                    usuario basadas en dichos cálculos.
                  </li>
                  <li>
                    El usuario es el único responsable de la veracidad y corrección de las
                    cifras que introduzca en la herramienta.
                  </li>
                </ul>
              </section>

              {/* 5. Medidas de seguridad */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. Medidas de seguridad
                </h2>
                <p>
                  Los datos de navegación que pudieran tratarse en esta web se gestionan
                  bajo protocolos de seguridad para garantizar la confidencialidad de los
                  usuarios. La comunicación entre los usuarios y la web utiliza un canal
                  seguro, y los datos transmitidos son cifrados gracias al protocolo HTTPS,
                  garantizando unas condiciones adecuadas de seguridad para la integridad
                  de los datos.
                </p>
              </section>

              {/* 6. Exclusión de garantías y responsabilidad */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  6. Exclusión de garantías y responsabilidad
                </h2>
                <p>
                  El responsable no otorga ninguna garantía ni se hace responsable de los
                  daños y perjuicios de cualquier naturaleza que pudieran traer causa de:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>La falta de disponibilidad o mantenimiento de la web.</li>
                  <li>La existencia de malware o programas maliciosos en los contenidos.</li>
                  <li>
                    El uso ilícito, negligente o fraudulento de la información contenida en
                    este Aviso Legal.
                  </li>
                </ul>
              </section>

              {/* 7. Plataforma de resolución de conflictos */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  7. Plataforma de resolución de conflictos
                </h2>
                <p>
                  Pongo también a disposición de los usuarios la plataforma de resolución
                  de litigios que facilita la Comisión Europea:
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

              {/* 8. Ley aplicable y jurisdicción */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  8. Ley aplicable y jurisdicción
                </h2>
                <p>
                  Con carácter general, las relaciones entre el responsable de esta web y
                  los usuarios de sus servicios telemáticos se encuentran sometidas a la
                  legislación y jurisdicción españolas y a los tribunales de Asturias.
                </p>
              </section>

              {/* 9. Contacto */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  9. Contacto
                </h2>
                <p>
                  En caso de que cualquier usuario tuviese alguna duda acerca de este Aviso
                  Legal, puede dirigirse a la siguiente dirección de correo electrónico:
                </p>
                <p className="font-medium">skald@skaldcraft.com</p>
              </section>

              {/* Última actualización */}
              <section className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Última actualización: 30/03/2026.
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

export default LegalNoticePage;