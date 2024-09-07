import { useState, useEffect } from "react";

const modules = [
  {
    icon: 'pets',
    title: 'Animales',
    link: '/res'
  },
  {
    icon: 'production_quantity_limits',
    title: 'Produccion',
    link: '/produccion'
  },
  {
    icon: 'child_care',
    title: 'Reproduccion',
    link: '/reproduccion'
  },
  {
    icon: 'add_circle_outline',
    title: 'Servicios',
    link: '/servicios'
  },
  {
    icon: 'dry',
    title: 'Secado',
    link: '/secado'
  },
  {
    icon: 'restaurant',
    title: 'Alimentacion',
    link: '/alimentacion'
  },
  {
    icon: 'person',
    title: 'Usuario',
    link: '/user'
  }
];

export function Aside() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);

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
            <h1>ProGanadero</h1>
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
              <span className="material-icons-sharp">{icon}</span>
              <h3>{title}</h3>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}