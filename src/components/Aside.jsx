import { Link } from 'react-router-dom';
import viteIcon from '../assets/img/vite.svg';

const modules = [
  {
    icon: viteIcon,
    title: 'Animales',
    link: '/res'
  },
  {
    icon: viteIcon,
    title: 'Produccion',
    link: '/produccion'
  },
  {
    icon: viteIcon,
    title: 'Reproduccion',
    link: '/reproduccion'
  },
  {
    icon: viteIcon,
    title: 'Servicios',
    link: '/servicios'
  },
  {
    icon: viteIcon,
    title: 'Secado',
    link: '/secado'
  },
  {
    icon: viteIcon,
    title: 'Alimentacion',
    link: '/alimentacion'
  }
];

export function Aside() {
  const handleModule = (title) => {
    //redireccionar en el router como /{title}
    console.log(title);
  };

  return (
    <div className='aside'>
      <h1>PROGRANADERO</h1>
      
      {modules.map(({icon, title, link}) => (
        <button onClick={() => handleModule(title)} key={title} aria-label={title} >
          <div className="modulo">
            <img src={icon} alt={title} /> 
            <Link to={link || '*'}>{title}</Link>
          </div>
        </button>
      ))}
    </div>
  );
}