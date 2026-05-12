import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const CookiePolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Política de Cookies - Skaldcraft</title>
        <meta
          name="description"
          content="Información sobre el uso de cookies en esta web y cómo gestionarlas."
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
              Política de Cookies
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {/* Intro */}
              <section className="space-y-3">
                <p>
                  En esta web recopilamos y utilizamos la información según indicamos en
                  nuestra política de privacidad. Una de las formas en las que recopilamos
                  información es a través del uso de la tecnología llamada “cookies”.
                </p>
              </section>

              {/* 1. Qué es una cookie */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. ¿Qué es una cookie?
                </h2>
                <p>
                  Una “cookie” es una pequeña cantidad de texto que se almacena en tu
                  navegador (como Chrome de Google o Safari de Apple) cuando navegas por la
                  mayoría de los sitios web. Las cookies no suelen almacenar información
                  sensible sobre ti; los datos que guardan son de carácter técnico,
                  estadísticos o de preferencias personales.
                </p>
              </section>

              {/* 2. Aceptación de cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. Aceptación de cookies
                </h2>
                <p>
                  Al acceder a esta web por primera vez, verás una advertencia informativa
                  sobre el uso de cookies. Según la normativa vigente:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    No se descargará ninguna cookie (salvo las técnicas) hasta que el
                    usuario consienta expresamente su instalación.
                  </li>
                  <li>
                    El usuario puede aceptar, rechazar o configurar las cookies de forma
                    granular.
                  </li>
                  <li>
                    La aceptación por “seguir navegando” ya no se considera válida por sí
                    sola.
                  </li>
                </ul>
              </section>

              {/* 3. Tipos de cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. ¿Qué tipos de cookies utiliza esta web?
                </h2>
                <p>
                  Esta web utiliza cookies propias y de terceros para mejorar la experiencia
                  del usuario y gestionar los espacios publicitarios.
                </p>

                {/* A. Técnicas */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    A. Cookies técnicas (Estrictamente necesarias)
                  </h3>
                  <p>
                    Son las más elementales y permiten que la web funcione correctamente,
                    como saber cuándo está navegando un humano o una aplicación
                    automatizada. Estas cookies no requieren consentimiento.
                  </p>
                </div>

                {/* B. Análisis */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    B. Cookies de análisis (De terceros)
                  </h3>
                  <p>
                    Son aquellas que recogen información sobre el tipo de navegación que
                    estás realizando, las secciones que más utilizas o el idioma.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-medium">Herramienta:</span> ej. Google Analytics
                      o Cloudflare.
                    </li>
                    <li>
                      <span className="font-medium">Finalidad:</span> análisis estadístico
                      anónimo de las visitas.
                    </li>
                  </ul>
                </div>

                {/* C. Publicitarias */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    C. Cookies publicitarias y comportamentales (De terceros)
                  </h3>
                  <p>
                    Son aquellas que permiten la gestión eficaz de los espacios
                    publicitarios y analizan tus hábitos de navegación para mostrar
                    publicidad relacionada con tu perfil de preferencias.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-medium">Finalidad:</span> mostrar anuncios
                      relevantes y útiles sin revelar tu identidad directamente a los
                      anunciantes.
                    </li>
                    <li>
                      <span className="font-medium">Plataforma utilizada:</span> Google Ads
                      (ver su{' '}
                      <a
                        href="https://policies.google.com/technologies/ads?hl=es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        Política de Cookies
                      </a>
                      ).
                    </li>
                  </ul>
                </div>
              </section>

              {/* 4. Eliminar cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. ¿Se pueden eliminar las cookies?
                </h2>
                <p>
                  Sí. Puedes bloquear o eliminar las cookies de forma general o particular
                  para un dominio desde la configuración de tu navegador. En los siguientes
                  enlaces puedes encontrar cómo gestionar las cookies en los navegadores más
                  usados:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Configuración de cookies de Google Chrome (centro de ayuda en{' '}
                    <a
                      href="https://support.google.com/chrome/answer/95647?hl=es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      support.google.com
                    </a>
                    ).
                  </li>
                  <li>
                    Configuración de cookies de Apple Safari (centro de ayuda en{' '}
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      support.apple.com
                    </a>
                    ).
                  </li>
                  <li>
                    Configuración de cookies de Mozilla Firefox (centro de ayuda en{' '}
                    <a
                      href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
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

              {/* 5. Más info */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. Más información sobre las cookies
                </h2>
                <p>
                  Puedes consultar el reglamento y las recomendaciones prácticas sobre el
                  uso de cookies publicadas por la Agencia Española de Protección de Datos
                  en su “Guía sobre el uso de las cookies”.
                </p>
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

export default CookiePolicyPage;