import { Link } from 'react-router-dom';
import viteIcon from '../assets/img/vite.svg';

const modules = [
  {
    icon: viteIcon,
    title: 'Animales',
    link: '/listares'
  },
  {
    icon: viteIcon,
    title: 'Produccion'
  },
  {
    icon: viteIcon,
    title: 'Reproduccion'
  },
  {
    icon: viteIcon,
    title: 'Servicios'
  },
  {
    icon: viteIcon,
    title: 'Secado'
  },
  {
    icon: viteIcon,
    title: 'Alimentacion'
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