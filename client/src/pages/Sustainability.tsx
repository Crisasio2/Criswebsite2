export default function Sustainability() {
  return (
    <div className="ecrist-enhanced-page-content">
      <h2 className="ecrist-enhanced-page-title" data-testid="text-sustainability-title">
        🌍 Nuestro Compromiso con la Sostenibilidad
      </h2>
      
      {/* Impact Stats */}
      <div className="ecrist-stats-grid">
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">0%</span>
          <span className="ecrist-stat-label">Desperdicio de Packaging</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">50%</span>
          <span className="ecrist-stat-label">Reducción CO₂</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">100%</span>
          <span className="ecrist-stat-label">Materiales Reciclables</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">200+</span>
          <span className="ecrist-stat-label">Productores Locales</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="ecrist-enhanced-section">
        <p style={{ fontSize: '18px', textAlign: 'center', marginBottom: '30px', color: 'var(--ecrist-text-primary)' }}>
          En E'Crist Commerce, creemos que el comercio puede ser una fuerza positiva para el cambio. 
          Nuestro compromiso con la sostenibilidad se refleja en cada aspecto de nuestro negocio, 
          desde la selección de productos hasta la entrega final.
        </p>
      </div>
        
      <div className="ecrist-enhanced-section">
        <h3>🌱 Productos Ecológicos</h3>
        <p>
          Seleccionamos cuidadosamente productos que minimizan el impacto ambiental, 
          priorizando materiales biodegradables, reciclados y de origen sostenible. 
          Cada producto pasa por un riguroso proceso de evaluación para garantizar 
          que cumple nuestros estándares de sostenibilidad.
        </p>
      </div>
        
      <div className="ecrist-enhanced-section">
        <h3>📦 Embalaje Sostenible</h3>
        <p>
          Utilizamos materiales de embalaje 100% reciclables y biodegradables, 
          reduciendo al mínimo el desperdicio de packaging. Nuestras cajas están 
          hechas de cartón reciclado y utilizamos relleno compostable en lugar 
          de plástico de burbujas tradicional.
        </p>
      </div>
        
      <div className="ecrist-enhanced-section">
        <h3>🚚 Logística Verde</h3>
        <p>
          Optimizamos nuestras rutas de entrega y trabajamos con proveedores locales 
          para reducir la huella de carbono del transporte. Agrupamos envíos para 
          maximizar la eficiencia y utilizamos vehículos eléctricos cuando es posible.
        </p>
      </div>
      
      <div className="ecrist-enhanced-section">
        <h3>🤝 Comercio Justo</h3>
        <p>
          Apoyamos a productores locales y pequeñas empresas comprometidas con 
          prácticas éticas. Garantizamos precios justos y relaciones comerciales 
          transparentes que benefician tanto a los productores como a los consumidores.
        </p>
      </div>
      
      <div className="ecrist-enhanced-section">
        <h3>🔄 Economía Circular</h3>
        <p>
          Promovemos la economía circular ofreciendo productos duraderos, 
          reparables y reciclables. También facilitamos programas de devolución 
          y reciclaje para extender el ciclo de vida de los productos.
        </p>
      </div>
      
      <div className="ecrist-enhanced-section">
        <h3>📊 Transparencia y Medición</h3>
        <p>
          Publicamos informes regulares sobre nuestro impacto ambiental y 
          trabajamos continuamente para mejorar nuestras métricas de sostenibilidad. 
          Creemos en la transparencia total sobre nuestros procesos y resultados.
        </p>
      </div>
    </div>
  );
}