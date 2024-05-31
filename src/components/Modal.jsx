
// eslint-disable-next-line react/prop-types
export const Modal = ({children, fields, values, Handlesubmit, HandleChange}) => {

  return (
    <article className=" flex  justify-center items-center z-50 fixed top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm">
      <section className=" rounded-3xl shadow-2xl relative flex items-center flex-col justify-center w-6/12 h-4/6 min-w-96 overflow-y-auto p-2 bg-white">
        <button className="absolute top-3 right-3">X</button>
        {children}
        <section className="flex items-center flex-col gap-3">
        
        <button onClick={Handlesubmit}>Submit</button>
        </section>
      </section>
    </article>
  )
}
