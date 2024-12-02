import '../../styles/Manual.css'

export const Manual = () => {
  return (
    <div className="manual-usuario">
      <div className="titulo">
        <h1>Manual de Usuario</h1>
      </div>      
      
      <h2>Módulo Home</h2>
      <p>
        En este módulo se presenta información general basada en el periodo de tiempo seleccionado, incluyendo:
      </p>
      <ul>
        <li>Total de animales.</li>
        <li>Total de partos.</li>
        <li>Total de leche producida.</li>
        <li>Total de carne producida.</li>
        <li>Gráficos de producción de leche y balance general (finanzas).</li>
        <li>Distribuciones de reses según sexo, tipo, raza y edades.</li>
      </ul>
    
      <h2>Módulo Animales</h2>
      <ol>
        <li>
          <strong>Registro inicial:</strong>
          <p>
            Antes de registrar animales, ingresa al módulo "Fincas" y registra las fincas o lotes disponibles.
            Posteriormente, registra las reses en el módulo "Animales". Es recomendable registrar primero los padres y luego los hijos para asignar correctamente los parentescos.
            Si registras primero a los hijos, deberás editar su información posteriormente para agregar los datos de los padres.
          </p>
        </li>
        <li>
          <strong>Vista completa de un animal:</strong>
          <p>En este módulo puedes acceder a información detallada de cada animal, incluyendo:</p>
          <ul>
            <li><strong>Galería de imágenes:</strong> Agrega o elimina fotos.</li>
            <li><strong>Información completa:</strong> Consulta y edita los datos del animal.</li>
            <li><strong>Linaje:</strong> Visualiza sus padres e hijos.</li>
            <li><strong>Producción:</strong> Gráfico de producción individual para hembras de tipo leche o doble propósito.</li>
            <li><strong>Servicios médicos:</strong> Registra y consulta servicios realizados.</li>
            <li><strong>Montas o inseminaciones:</strong> Agrega o consulta registros.</li>
          </ul>
        </li>
      </ol>
    
      <h2>Módulo Producción</h2>
      <p>
        <strong>Registro de producción:</strong> Puedes registrar producción de carne o leche.
        <ul>
          <li><strong>Producción de carne:</strong> La res seleccionada será eliminada del sistema al ser marcada como vendida.</li>
          <li><strong>Producción de leche:</strong> Puedes seleccionar una o varias reses. Si eliges varias, la cantidad ingresada se distribuirá equitativamente entre ellas.</li>
        </ul>
      </p>
      <p>
        <strong>Corrección de errores:</strong> Si cometes un error al registrar la producción, utiliza la tabla para buscar el registro y edítalo o elimínalo según sea necesario.
      </p>
    
      <h2>Módulo Reproducción</h2>
      <p>Este módulo permite registrar inseminaciones, montas y realizar seguimientos.</p>
      <ul>
        <li>
          <strong>Vacas para inseminación:</strong> Inseminación programada o recomendada por el sistema. Las tarjetas recomendadas tienen un ícono distintivo.
        </li>
        <li>
          <strong>Inseminaciones por confirmar:</strong> Confirma si la res está en gestación o elimina el registro si el intento fue fallido o hubo aborto.
        </li>
        <li>
          <strong>Vacas en gestación:</strong> Visualiza las reses en seguimiento gestacional.
        </li>
        <li>
          <strong>Historial:</strong> Consulta partos e inseminaciones en una tabla con opciones de búsqueda y corrección.
        </li>
      </ul>
    
      <h2>Módulo Servicios</h2>
      <p>
        Registra servicios médicos realizados a las reses. Si se usaron insumos, asegúrate de que estén registrados y cuenten con las existencias necesarias.
      </p>
    
      <h2>Módulo Secado</h2>
      <p>
        Registra secados realizados a reses. Al igual que en servicios, los insumos utilizados deben estar previamente registrados y disponibles.
      </p>
    
      <h2>Módulo Finanzas</h2>
      <p>
        <strong>Resumen general:</strong> Consulta ingresos, egresos y balance total.
      </p>
      <p>
        <strong>Ingresos:</strong> Para registrar ventas de productos, asegúrate de que estén previamente registrados en el sistema.
      </p>
      <p>
        <strong>Egresos:</strong> Los insumos deben registrarse en la tabla de egresos para mantener actualizadas las existencias.
      </p>
      <p>
        <strong>Historial:</strong> Consulta, edita o elimina registros previos desde la tabla final.
      </p>
    
      <h2>Módulo Insumos</h2>
      <p>
        Registra insumos como alimentos y medicinas, indicando fechas de ingreso, vencimiento y unidades de medida. La cantidad de insumos es preferible ingresarla desde el módulo "Finanzas" en las compras y usar este módulo solo para ajustes.
      </p>
    
      <h2>Módulo Finca</h2>
      <p>Registra, edita o elimina fincas desde la tabla disponible en este módulo.</p>
    
      <h2>Módulo Usuario</h2>
      <p>
        Consulta y modifica tu información de usuario. Cierra sesión o accede al manual de usuario desde este módulo.
      </p>
    </div>
  
  )
}
