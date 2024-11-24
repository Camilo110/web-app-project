import { useEffect, useState } from 'react'
import { Table } from '../../../components/Table'
import '../../../styles/ModalServicios.css'
import { getInsumo } from '../../../services/Insumo'
import { getProveedor, getCliente } from '../../../services/forms'
import { createTransaccion } from '../../../services/transaccion'
import { getProductos } from '../../../services/producto'



export const TransaccionForm = () => {
  const [insumos, setInsumos] = useState([])
  const [productos, setProductos] = useState([])

  const [listProduct, setListProduct] = useState([])
  const [productotoAdd, setProductoToAdd] = useState({ Numero: '', Cantidad: 0 })

  const [search, setSearch] = useState('')

  const [values, setValues] = useState(
    {
      Fecha: new Date().toISOString().split('T')[0], 
      Tipo: 'Ingreso', 
      Descripcion: '', 
      Total: 0, Tercero: ''
    })

  const [listTerceros, setListTerceros] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [listProveedores, setListProveedores] = useState([])
  const [listClientes, setListClientes] = useState([])

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    const insumos = await getInsumo()
    setInsumos(insumos)
    const cliente = await getCliente()
    setListTerceros(cliente)
    setListClientes(cliente)
    const proovedor = await getProveedor()
    setListProveedores(proovedor)
    const producto = await getProductos()
    setProductos(producto)

    setIsLoading(false)
  }

  const filter = (value, list) => {
    const dataFilter = list.filter((item) => (item.Nombre.toString().toLowerCase().includes(value.toString().toLowerCase()) || item.Numero.toString().toLowerCase().includes(value.toString().toLowerCase())))
    return dataFilter.length > 0 ? dataFilter[0] : { ID: '', Numero: '', UnidadMedida: '', Nombre: '' }
  }

  const onDelete = (id) => {
    const index = listProduct.findIndex((item) => item.ID == id)
    setValues({...values, Valor: (values.Valor - listProduct[index].Total)})

    const filterData = listProduct.filter((item) => item.ID !== id)
    setListProduct(filterData)
    console.log(filterData.length)
  }

  const onSearchInsumo = (e) => {
    const { value } = e.target
    setSearch(value)

    const { ID, Numero, UnidadMedida, Nombre } = filter(value, (values.Tipo === 'Ingreso' ? productos : insumos))
    value ? setProductoToAdd({ ...productotoAdd, ID, Numero, UnidadMedida, Nombre }) : setProductoToAdd({ ...productotoAdd, ID: '', Numero: '', Nombre: '', UnidadMedida: '' })
  }

  const updateInsumoToAdd = (e, tipo) => {
    const { value } = e.target
    if (value < 0) {
      return
    }

    const insumoAux = { ...productotoAdd, [tipo]: parseFloat(value)  }

    if (insumoAux.Cantidad != null && insumoAux.Precio != null) {
      insumoAux.Total = insumoAux.Cantidad * insumoAux.Precio
    }

    setProductoToAdd(insumoAux)
  }

 
  const onAddInsumo = () => {
    if (!productotoAdd.ID) {
      console.log("No hay elemento seleccionado")
      return
    }
    if (productotoAdd.Cantidad <= 0) {
      console.log("Cantidad no valida")
      return
    }
    if (productotoAdd.Precio <= 0) {
      console.log("Precio no valido")
      return
    }
    
    let listInsumoAux = []
    const index = listProduct.findIndex((item) => item.ID === productotoAdd.ID)
    if (index >= 0) {
      // selleccionar el insumo y añadir la cantidad
      const insumo = listProduct[index]
      const Cantidad = parseFloat(insumo.Cantidad) + parseFloat(productotoAdd.Cantidad)
      const Precio = parseFloat(productotoAdd.Precio)
      const Total = Cantidad * Precio

      // eliminar el insumo de las listas
      const listInsumosFilter = listProduct.filter((insumo) => insumo.ID !== productotoAdd.ID)

      // añadir el insumo con la cantidad actualizada
      listInsumoAux = [{ ...insumo, Cantidad, Precio, Total }, ...listInsumosFilter]
    } else {
      listInsumoAux = [productotoAdd, ...listProduct]
    }

    const Total = listInsumoAux.reduce((acc, insumo) => acc + insumo.Total, 0)
    setValues({ ...values, Valor: Total })
    
    setListProduct(listInsumoAux)
    setProductoToAdd({Cantidad: 0, ID: '', Numero: '', UnidadMedida: '', Nombre: '', Precio: 0})
    setSearch('')
    console.log(listProduct, 'ADD INSUMO')
  }

  const handleChangeValues = (e, key) => {
    const { value } = e.target

    if (key == 'Valor'){
      if (listProduct.length <= 0){
        setValues({ ...values, [key]: value ? parseFloat(value) : 0})
      }
      return     
    }

    if (key === 'Tipo') {
      if (value === 'Ingreso') {
        setListTerceros(listClientes)
        setListProduct([])
      } else {
        setListTerceros(listProveedores)
        setListProduct([])
      }

      setValues({ ...values, Valor: 0, [key]: value })
      return
    }

    setValues({ ...values, [key]: value })
  }

  const onSubmit = async () => {
    let listInsumosFinal = []
    for (const insumo of listProduct){
      listInsumosFinal.push({ id: insumo.ID, cantidad: insumo.Cantidad , precio: insumo.Precio})
    }
    const resp = await createTransaccion({ ...values, Productos: listInsumosFinal })
    console.log(resp)
  }
  return (
    
    <>
      {
        isLoading
          ?
          <p>Cargando...</p>
          :
          <>
            <div className='form'>

            <div className="form-headear">
              <h2>Registrar Transacción </h2>
            </div>

            <div className='form-body'>

            

              <div className="form-input">
                <label>Tipo</label>
                <select value={values.Tipo || ''} onChange={(e) => handleChangeValues(e, 'Tipo')} >
                  <option value='' disabled>Elegir</option>
                  <option value='Ingreso'>Ingreso</option>
                  <option value='Egreso'>Egreso</option>
                </select>
              </div>

              <div className="form-input">
                <label>Fecha</label>
                <input value={values.Fecha} onChange={(e) => handleChangeValues(e, 'Fecha')} type='date' />
              </div>

              <div className="form-input">
                <label>Descripcion</label>
                <input value={values.Descripcion} onChange={(e) => handleChangeValues(e, 'Descripcion')} type='text' />
              </div>

              <div className="form-input">
                <label>Total</label>
                <input value={values.Valor} type='number' onChange={(e) => handleChangeValues(e, 'Valor')} />
              </div>

              <div className="form-input">
                <label>Cliente</label>
                <select value={values.Tercero || ''} onChange={(e) => handleChangeValues(e, 'Tercero')}>
                  <option value='' disabled>Seleccionar</option>
                  {listTerceros.map(({ ID, value }) => (
                    <option key={ID} value={ID}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="form-submit">
                <button onClick={onSubmit}>Guardar</button>
              </div>
            </div>

            <div className='Fields-modal-dos'>
              <h3>Incluir Insumos</h3>

              <div className="incluir-insumos">
                <div className='fields'>
                  <label>Insumo</label>
                  <input
                    type="text"
                    value={search}
                    onChange={onSearchInsumo}
                    placeholder='Ingrese Nombre o Código'
                  />
                </div>

                <div className='fields'>
                  <label>Cantidad</label>
                  <input type="number" value={productotoAdd.Cantidad || 0.0} onChange={(event) => updateInsumoToAdd(event, 'Cantidad')} />
                </div>

                <div className='fields'>
                  <label>Valor</label>
                  <input  type="number" value={productotoAdd.Precio || 0.0 } onChange={(event) => updateInsumoToAdd(event, 'Precio')}/>
                </div>

                <button onClick={onAddInsumo}>Agregar</button>
              </div>

              <div className=''>
                <label>Nombre</label>
                <input className='input' type="text" disabled value={productotoAdd.Nombre || ''} />

                <label>U. Medida</label>
                <input className='input' type="text" disabled value={productotoAdd.UnidadMedida || ''}/>  
              </div>

              <Table
                HeaderList={['Codigo', 'Nombre', 'Cantidad', 'U. Medida', 'Valor Unitario', 'Valor Total']}
                keyList={['Numero', 'Nombre', 'Cantidad', 'UnidadMedida', 'Precio', 'Total']}
                data={listProduct}
                onDelete={onDelete}
                edit={false}
                paginar={false}
                filtrar={false}
              />
              </div>
            </div>

          </>
      }
    </>
  )
}
