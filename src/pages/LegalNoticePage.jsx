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
              <p>
                En cumplimiento de la <strong>Ley 34/2002 (LSSI-CE)</strong>, el{' '}
                <strong>RGPD</strong> y la <strong>LOPDGDD</strong>, este Aviso Legal
                regula el uso del sitio web <strong>worthmytimecalculator.com</strong>.
              </p>

              {/* 1. Identificación del responsable */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  1. Identificación del responsable
                </h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Nombre del titular:</span>{' '}
                    Ángel González Palenzuela.
                  </p>
                  <p>
                    <span className="font-medium">NIF:</span> 38078911L.
                  </p>
                  <p>
                    <span className="font-medium">Domicilio:</span>{' '}
                    Avenida de los telares, 30 - 33401 Avilés, Asturias, España.
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> skald@skaldcraft.com.
                  </p>
                  <p>
                    <span className="font-medium">Actividad:</span>{' '}
                    Prestación de servicios y herramientas digitales.
                  </p>
                </div>
              </section>

              {/* 2. Uso de la web y compromisos del usuario */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  2. Uso de la web y compromisos del usuario
                </h2>
                <p>
                  El usuario se compromete a utilizar la web y sus contenidos sin
                  contravenir la legislación vigente, la buena fe y el orden público.
                  Queda prohibido el uso de la web con fines ilícitos o lesivos contra
                  el titular o terceros.
                </p>
              </section>

              {/* 3. Exención de responsabilidad de la herramienta de cálculo */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  3. Exención de responsabilidad de la herramienta de cálculo
                </h2>
                <p>
                  Esta web proporciona una calculadora para estimar el coste de productos
                  en horas de trabajo.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Los resultados son <strong>meramente informativos y orientativos</strong>.
                  </li>
                  <li>
                    El responsable no se hace responsable de las decisiones financieras o de
                    compra tomadas por el usuario basadas en dichos cálculos.
                  </li>
                  <li>
                    No se garantiza la exactitud absoluta de las cifras, ya que los precios y
                    variables externas están sujetos a cambios.
                  </li>
                </ul>
              </section>

              {/* 4. Afiliación de Amazon y publicidad */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  4. Afiliación de Amazon y publicidad
                </h2>
                <p>
                  <strong>Declaración obligatoria:</strong> En calidad de Afiliado de Amazon,
                  obtengo ingresos por las compras adscritas que cumplen los requisitos
                  aplicables. <strong>Importante:</strong> Esto no supone ningún coste
                  adicional para ti como comprador.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-medium">Transparencia:</span> Los enlaces marcados
                    o que redirigen a Amazon son enlaces de afiliado. Si compras algo a
                    través de ellos, recibo una comisión sin que tu precio varíe.
                  </li>
                  <li>
                    <span className="font-medium">Responsabilidad:</span> Al hacer clic, te
                    conviertes en cliente de Amazon. Skaldcraft no gestiona pedidos, envíos
                    ni devoluciones; cualquier reclamación debe dirigirse directamente a
                    Amazon.
                  </li>
                </ul>
              </section>

              {/* 5. Medidas de Seguridad */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  5. Medidas de Seguridad
                </h2>
                <p>
                  El sitio utiliza un certificado <strong>SSL (HTTPS)</strong> para
                  garantizar que la navegación y los datos (aunque sean anónimos) viajen
                  de forma cifrada y segura.
                </p>
              </section>

              {/* 6. Ley aplicable y jurisdicción */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  6. Ley aplicable y jurisdicción
                </h2>
                <p>
                  Estas condiciones se rigen por la <strong>ley española</strong>. Cualquier
                  conflicto se someterá a los tribunales de{' '}
                  <strong>Avilés/Asturias, España</strong>.
                </p>
              </section>

              {/* Última actualización */}
              <section className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Última actualización: 21 de julio de 2026.
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
