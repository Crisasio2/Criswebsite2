export default function About() {
  return (
    <div className="ecrist-enhanced-page-content">
      <h2 className="ecrist-enhanced-page-title" data-testid="text-about-title">
        🌿 Sobre E'Crist Commerce
      </h2>
      
      {/* Stats Section */}
      <div className="ecrist-stats-grid">
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">2024</span>
          <span className="ecrist-stat-label">Año de Fundación</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">500+</span>
          <span className="ecrist-stat-label">Productos Sostenibles</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">95%</span>
          <span className="ecrist-stat-label">Clientes Satisfechos</span>
        </div>
        <div className="ecrist-stat-card">
          <span className="ecrist-stat-number">100%</span>
          <span className="ecrist-stat-label">Productos Ecológicos</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="ecrist-enhanced-section">
        <p style={{ fontSize: '18px', textAlign: 'center', marginBottom: '30px', color: 'var(--ecrist-text-primary)' }}>
          E'Crist Commerce nació de la visión de crear un marketplace que conecte a consumidores 
          conscientes con productos verdaderamente sostenibles. Fundada en 2024, nuestra plataforma 
          ha crecido hasta convertirse en el destino preferido para compras ecológicas.
        </p>
      </div>
        
      <div className="ecrist-enhanced-section">
        <h3>🎯 Nuestra Misión</h3>
        <p>
          Facilitar el acceso a productos sostenibles de alta calidad, apoyando a productores 
          locales y promoviendo un estilo de vida más consciente con el medio ambiente. Creemos 
          que cada compra es una oportunidad para generar un impacto positivo en nuestro planeta.
        </p>
      </div>
        
      <div className="ecrist-enhanced-section">
        <h3>💚 Nuestros Valores</h3>
        <p>
          <strong>Transparencia:</strong> Información clara sobre el origen y proceso de cada producto.<br/>
          <strong>Calidad:</strong> Solo productos que cumplen nuestros estrictos estándares de sostenibilidad.<br/>
          <strong>Sostenibilidad:</strong> Compromiso real con el cuidado del medio ambiente.<br/>
          <strong>Compromiso Social:</strong> Apoyo a comunidades locales y comercio justo.
        </p>
      </div>
        
      <div className="ecrist-enhanced-section">
        <h3>👥 El Equipo</h3>
        <p>
          Somos un equipo apasionado de profesionales comprometidos con hacer del mundo 
          un lugar mejor, un producto sostenible a la vez. Nuestro equipo multidisciplinario 
          combina experiencia en e-commerce, sostenibilidad y tecnología para ofrecerte 
          la mejor experiencia de compra consciente.
        </p>
      </div>
      
      <div className="ecrist-enhanced-section">
        <h3>🌱 Nuestro Compromiso</h3>
        <p>
          En E'Crist Commerce, cada producto que vendemos ha sido cuidadosamente seleccionado 
          por nuestro equipo de expertos en sostenibilidad. Trabajamos directamente con 
          productores comprometidos con prácticas ambientalmente responsables y socialmente justas.
        </p>
      </div>
    </div>
  );
}