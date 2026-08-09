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
                  Esta web instala cookies propias y de terceros únicamente tras obtener tu
                  consentimiento, salvo las estrictamente necesarias. Cada categoría se
                  instala según lo que elijas en el panel de configuración de cookies.
                </p>

                {/* A. Técnicas */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    A. Cookies técnicas (Estrictamente necesarias)
                  </h3>
                  <p>
                    No requieren consentimiento. Actualmente esta web no instala cookies
                    técnicas de almacenamiento, ya que el funcionamiento de la herramienta no
                    requiere cookies. El registro de tu consentimiento se guarda en el
                    almacenamiento local (localStorage) de tu navegador bajo la clave{' '}
                    <code className="text-foreground">ptu_cookie_consent</code>, con fecha y
                    versión, y no se envía a ningún servidor.
                  </p>
                </div>

                {/* B. Análisis */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    B. Cookies de análisis (De terceros)
                  </h3>
                  <p>
                    Se instalan únicamente si aceptas la categoría “Analíticas”. Se utilizan
                    para medir de forma agregada cómo se utiliza la web y poder mejorarla,
                    mediante Google Analytics:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <code className="text-foreground">_ga</code> — 2 años — distingue a los
                      usuarios.
                    </li>
                    <li>
                      <code className="text-foreground">_ga_&lt;ID&gt;</code> — 2 años — persiste
                      el estado de la sesión.
                    </li>
                    <li>
                      <code className="text-foreground">_gid</code> — 24 horas — distingue a los
                      usuarios.
                    </li>
                    <li>
                      <span className="font-medium">Responsable tercero:</span> Google LLC /
                      Google Ireland Limited (
                      <a
                        href="https://policies.google.com/technologies/cookies?hl=es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        política de cookies de Google
                      </a>
                      ).
                    </li>
                  </ul>
                  <p>
                    La duración indicada es orientativa y puede variar según la configuración
                    del servicio.
                  </p>
                </div>

                {/* C. Publicitarias */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    C. Cookies publicitarias y comportamentales (De terceros)
                  </h3>
                  <p>
                    Se instalan únicamente si aceptas la categoría “Publicidad”. Permiten
                    gestionar los espacios publicitarios, medir el rendimiento de los anuncios
                    y reproducir vídeos incrustados (YouTube y Vimeo):
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <code className="text-foreground">_gcl_au</code> y{' '}
                      <code className="text-foreground">_gcl_*</code> (Google Ads) — 90 días —
                      conversiones y seguimiento de clics en anuncios.
                    </li>
                    <li>
                      <code className="text-foreground">CONSENT</code>,{' '}
                      <code className="text-foreground">VISITOR_INFO1_LIVE</code>,{' '}
                      <code className="text-foreground">YSC</code> y{' '}
                      <code className="text-foreground">PREF</code> (YouTube) — duración
                      variable (de la sesión a 2 años) — preferencias del reproductor, idioma y
                      seguridad.
                    </li>
                    <li>
                      <code className="text-foreground">vuid</code> y{' '}
                      <code className="text-foreground">player</code> (Vimeo) — 1 a 2 años —
                      preferencias del reproductor y análisis de reproducción.
                    </li>
                    <li>
                      <span className="font-medium">Responsables terceros:</span> Google LLC /
                      Google Ireland Limited (
                      <a
                        href="https://policies.google.com/technologies/ads?hl=es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        política de Google Ads
                      </a>
                      ) y Vimeo, Inc. (
                      <a
                        href="https://vimeo.com/cookie_policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        política de cookies de Vimeo
                      </a>
                      ).
                    </li>
                  </ul>
                  <p>
                    Nota: el contenedor de Google Tag Manager no instala cookies por sí mismo;
                    ejecuta las etiquetas configuradas (analíticas y publicidad de Google)
                    conforme al consentimiento otorgado.
                  </p>
                </div>

                {/* D. Preferencias */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    D. Cookies de preferencias
                  </h3>
                  <p>
                    Se instalarían únicamente si aceptas la categoría “Preferencias”. De
                    momento esta web no instala cookies de preferencias; la categoría queda
                    disponible para futuros ajustes como el idioma o la región.
                  </p>
                </div>
              </section>

              {/* 4. Eliminar cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. ¿Se pueden eliminar las cookies?
                </h2>
                <p>
                  Puedes cambiar o retirar tu consentimiento en cualquier momento desde el
                  enlace “Configurar cookies” del pie de página. También puedes bloquear o
                  eliminar las cookies de forma general o particular para un dominio desde la
                  configuración de tu navegador. En los siguientes enlaces puedes encontrar
                  cómo gestionar las cookies en los navegadores más usados:
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
                  Última actualización: 09/08/2026.
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