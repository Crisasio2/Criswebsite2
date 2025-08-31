export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8" data-testid="text-home-title">
        Página de Inicio
      </h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Bienvenido a nuestro sitio web
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Esta es la página de inicio donde encontrarás información general sobre 
            nuestro sitio. Navega por las diferentes secciones para conocer más 
            sobre nuestros productos y servicios.
          </p>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Nuestras Secciones
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">E'Crist Commerce</h3>
              <p className="text-sm text-gray-600">
                Descubre nuestra plataforma de comercio sostenible
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Productos</h3>
              <p className="text-sm text-gray-600">
                Explora nuestro catálogo de productos eco-amigables
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Sostenibilidad</h3>
              <p className="text-sm text-gray-600">
                Conoce nuestro compromiso con el medio ambiente
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Nosotros</h3>
              <p className="text-sm text-gray-600">
                Aprende más sobre nuestra historia y misión
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
