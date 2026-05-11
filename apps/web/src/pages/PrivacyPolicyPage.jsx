import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad - Skaldcraft</title>
        <meta
          name="description"
          content="Política de privacidad y tratamiento de datos personales en esta web."
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
              Política de Privacidad
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {/* Intro */}
              <section className="space-y-3">
                <p>
                  En esta web, la privacidad de los usuarios es una prioridad absoluta. Esta
                  Política de Privacidad describe cómo se tratará y protegerá la información
                  personal de todas las personas que se relacionan con el responsable a
                  través de este sitio web.
                </p>
                <p>
                  De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica
                  3/2018 (LOPDGDD), mediante la navegación en esta web, el usuario queda
                  informado del tratamiento de sus datos por parte del responsable.
                </p>
              </section>

              {/* 1. Responsable */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. ¿Quién es el responsable de esta web?
                </h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Identidad del responsable:</span>{' '}
                    Ángel González Palenzuela.
                  </p>
                  <p>
                    <span className="font-medium">NIF/CIF:</span> 38078911L.
                  </p>
                  <p>
                    <span className="font-medium">Dirección:</span>{' '}
                    Avenida de los Telares, 30 - 33401 Avilés, Asturias.
                  </p>
                  <p>
                    <span className="font-medium">Correo electrónico:</span>{' '}
                    <a
                      href="mailto:skald@skaldcraft.com"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      skald@skaldcraft.com
                    </a>
                    .
                  </p>
                  <p>
                    <span className="font-medium">Actividad:</span>{' '}
                    Prestación de productos y servicios digitales.
                  </p>
                </div>
              </section>

              {/* 2. Datos que se recogen */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. ¿Qué datos personales se recogen en esta web?
                </h2>
                <p>Para las finalidades establecidas en esta política, se tratan los siguientes datos personales:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Datos de navegación:</span> dirección IP,
                    tipo e identificación del dispositivo, tipo de navegador, dominio a través
                    del cual accede al sitio web, datos de navegación y actividad en el sitio.
                  </li>
                  <li>
                    <span className="font-medium">Datos introducidos en la herramienta:</span>{' '}
                    las cifras de precio e ingresos introducidas por el usuario para realizar
                    los cálculos. Estos datos no se asocian a una identidad personal
                    identificable.
                  </li>
                </ul>
                <p className="italic">
                  Importante: Esta web no dispone de formularios de contacto, sistemas de
                  suscripción ni login, por lo que no se recaban nombres, correos electrónicos
                  ni teléfonos de forma directa.
                </p>
              </section>

              {/* 3. Finalidades */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. ¿Con qué finalidad tratamos tus datos?
                </h2>
                <p>La información recolectada tiene como objetivos:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Analítica:</span> realizar estudios
                    estadísticos sobre las visitas y el comportamiento de los usuarios para
                    mejorar la usabilidad de la herramienta de cálculo.
                  </li>
                  <li>
                    <span className="font-medium">Seguridad:</span> garantizar la seguridad
                    del sitio y detectar posibles abusos o fraudes.
                  </li>
                </ul>
              </section>

              {/* 4. Base legal */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. ¿Con qué base legal se tratan esos datos?
                </h2>
                <p>
                  La base legal para el tratamiento de los datos es el consentimiento del
                  usuario otorgado al aceptar el uso de cookies en el banner de entrada, así
                  como el interés legítimo del responsable para mantener la seguridad y el
                  correcto funcionamiento de la web.
                </p>
              </section>

              {/* 5. Conservación */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. Tiempo de conservación de los datos
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Datos de navegación:</span> se conservarán
                    durante el tiempo estrictamente necesario para cumplir con las finalidades
                    estadísticas o de seguridad.
                  </li>
                  <li>
                    <span className="font-medium">Datos de la herramienta:</span> los cálculos
                    son transitorios y no se almacenan vinculados al usuario de forma
                    permanente.
                  </li>
                </ul>
              </section>

              {/* 6. Derechos */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  6. Tus derechos sobre tus datos
                </h2>
                <p>
                  Cualquier persona tiene derecho a obtener confirmación sobre si estamos
                  tratando datos personales que le conciernen. Los interesados tienen derecho a:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Solicitar el acceso a sus datos personales.</li>
                  <li>Solicitar su rectificación o supresión.</li>
                  <li>Solicitar la limitación de su tratamiento.</li>
                  <li>Oponerse al tratamiento.</li>
                </ul>
                <p>
                  Para ejercitar estos derechos, puede escribir un correo electrónico a{' '}
                  <a
                    href="mailto:skald@skaldcraft.com"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    skald@skaldcraft.com
                  </a>
                  , acreditando su identidad mediante fotocopia del DNI o documento
                  equivalente. También tiene derecho a presentar una reclamación ante la
                  Agencia Española de Protección de Datos (AEPD).
                </p>
              </section>

              {/* 7. Secreto y seguridad */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  7. Secreto y seguridad de los datos
                </h2>
                <p>
                  El responsable se compromete al uso y tratamiento de los datos respetando su
                  confidencialidad. Esta web incluye un certificado SSL (HTTPS), un protocolo
                  de seguridad que garantiza que la transmisión de datos entre el servidor y
                  el usuario sea totalmente cifrada y segura.
                </p>
              </section>

              {/* 8. Cambios en la política */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  8. Cambios en la política de privacidad
                </h2>
                <p>
                  El responsable se reserva el derecho a modificar esta política para
                  adaptarla a novedades legislativas o futuras funcionalidades de la web, como
                  la inclusión de publicidad abierta sin login, informando siempre debidamente
                  a los usuarios en esta misma página.
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

export default PrivacyPolicyPage;