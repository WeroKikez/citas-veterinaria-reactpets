import { useState, useEffect } from 'react';
import Error from './Error';

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {

  const [ nombre, setNombre ] = useState('');
  const [ propietario, setPropietario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ fecha, setFecha ] = useState('');
  const [ sintomas, setSintomas ] = useState('');

  const [ error, setError ] = useState(false);

  useEffect( () => {
    if(Object.keys( paciente ).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString();

    return random + fecha;
  }

  const handleSubmit = e => {
    e.preventDefault();

    // Validación del Fórmulario
    if( [nombre, propietario, email, fecha, sintomas].includes('') ) {
      // console.log("Todos los campos son obligatorios");
      setError(true);
      return;
    }

    setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

    if( paciente.id ) {
      // console.log('Editando');
      // Editando el Registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState );

      setPacientes( pacientesActualizados );
      setPaciente('');
    } else {
      // console.log('Nuevo Registro');
      // Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        className="bg-white shadow-md rounded-md py-10 px-5" 
        onSubmit={handleSubmit}
      >
        { error && <Error>Todos Los Campos Son Obligatorios</Error> }

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">
            Nombre Propietario
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="email"
            type="text"
            placeholder="Coloca tu Email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">
            Alta
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="alta"
            type="date"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">
            Síntomas
          </label>
          <textarea 
            id="sintomas" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los Síntomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
          />
        </div>

        <input 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          type="submit" 
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />
      </form>
    </div>
  )
}

export default Formulario;