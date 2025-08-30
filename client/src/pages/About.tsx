export default function About() {
  return (
    <div className="ecrist-page-content">
      <h2 className="ecrist-page-title" data-testid="text-about-title">
        Sobre E'Crist Commerce
      </h2>
      <div className="ecrist-page-text">
        <p>
          E'Crist Commerce nació de la visión de crear un marketplace que conecte a consumidores 
          conscientes con productos verdaderamente sostenibles. Fundada en 2024, nuestra plataforma 
          ha crecido hasta convertirse en el destino preferido para compras ecológicas.
        </p>
        <br />
        
        <h3 style={{ color: 'var(--ecrist-text-primary)', margin: '20px 0 10px 0' }}>
          Nuestra Misión
        </h3>
        <p>
          Facilitar el acceso a productos sostenibles de alta calidad, apoyando a productores 
          locales y promoviendo un estilo de vida más consciente con el medio ambiente.
        </p>
        <br />
        
        <h3 style={{ color: 'var(--ecrist-text-primary)', margin: '20px 0 10px 0' }}>
          Nuestros Valores
        </h3>
        <p>
          Transparencia, calidad, sostenibilidad y compromiso social son los pilares que 
          guían todas nuestras decisiones empresariales.
        </p>
        <br />
        
        <h3 style={{ color: 'var(--ecrist-text-primary)', margin: '20px 0 10px 0' }}>
          El Equipo
        </h3>
        <p>
          Somos un equipo apasionado de profesionales comprometidos con hacer del mundo 
          un lugar mejor, un producto sostenible a la vez.
        </p>
      </div>
    </div>
  );
}
