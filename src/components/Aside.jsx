import { useState, useEffect } from "react";

const modules = [
  {
    icon: 'home.png',
    title: 'Home',
    link: '/'
  },
  {
    icon: 'animales.png',
    title: 'Animales',
    link: '/res'
  },
  {
    icon: 'produccion.png',
    title: 'Produccion',
    link: '/produccion'
  },
  {
    icon: 'reproduccion.png',
    title: 'Reproduccion',
    link: '/reproduccion'
  },
  {
    icon: 'servicios.png',
    title: 'Servicios',
    link: '/servicios'
  },
  {
    icon: 'secado.png',
    title: 'Secado',
    link: '/secado'
  },
  {
    icon: 'finanzas.png',
    title: 'Finanzas',
    link: '/finanzas'
  },  
  {
    icon: 'insumos.png',
    title: 'Insumos',
    link: '/insumos'
  },
  {
    icon: 'fincas.png',
    title: 'Fincas',
    link: '/fincas'
  },
  {
    icon: 'user.png',
    title: 'Usuario',
    link: '/user'
  }
];

export function Aside() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if(window.innerWidth > 768){
        setIsOpen(false)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
       {isMobile && isOpen && (
        <label className="open" htmlFor="check" onClick={toggle}>
          <span className="material-icons-sharp" style={{ fontSize: '36px' }}>
            menu
          </span>
        </label>
      )}
      <aside style={{ display: isOpen ? 'none' : 'block' }}>
        <div className="toggle">
          <div className="logo">
            <img src="src/assets/img/logo.png" alt="logo" />
            <h1 className="responsive-heading"></h1>
          </div>
          {!isOpen && (
          <label className="close" htmlFor="check" onClick={toggle}>
            <span className="material-icons-sharp">
              close
            </span>
          </label>
        )}
        </div>
        <div className="sidebar">
          {modules.map(({icon, title, link}) => (
            <a href={link} key={title}>
              <span>
              <img className="icon" src={`src/assets/img/icons/${icon}`} alt={title} />
              </span>
              <h3>{title}</h3>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}