import { useState } from "react";

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
  /* const handleModule = (title) => {
    //redireccionar en el router como /{title}
    console.log(title);
  }; */

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside >
      <div className="toggle">
          <div className="logo">
              <img src="src/assets/img/logo.png" alt="logo" />
              <h1>ProGanadero</h1>
          </div>

          
      <label className="close" htmlFor="check">
              <span className="material-icons-sharp">
                  close
              </span>
          </label>
          
              <input type="checkbox" className="check" name="nn" id="check" />
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
  );
}