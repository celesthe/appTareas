require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, pausa,
          leerInput , listaTareasBorrar, confirmar, mostrarTareasCheck} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async () => {

  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();
  
 // await pausa();
  if(tareasDB){
  
    tareas.cargarTareasFromArray(tareasDB);
  }
 
  do {
    opt = await inquireMenu();
   
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
       
        break;
      case '2':
        //console.log(tareas.listadoArr);
        tareas.listadoCompleto();
        break;
        case '3':
        //console.log(tareas.listadoArr);
        tareas.listarPendientesCompletadas();
        break;
        case '4':
        //console.log(tareas.listadoArr);
        tareas.listarPendientesCompletadas(false);
        break;
        case '5':
          //console.log(tareas.listadoArr);
          const ids = await mostrarTareasCheck(tareas.listadoArr);
          tareas.toggleCompletadas(ids);
          // if (id !=='0') {
          //   const ok = await confirmar('¿Esta seguro ?')
          //   if (ok) {
          //     tareas.borrarTarea(id);
          //     console.log('tarea eliminada');
          //   }
          // } 
          console.log(ids);
        
          break;
        case '6':
          //console.log(tareas.listadoArr);
          const id = await listaTareasBorrar(tareas.listadoArr);
          if (id !=='0') {
            const ok = await confirmar('¿Esta seguro ?')
            if (ok) {
              tareas.borrarTarea(id);
              console.log('tarea eliminada');
            }
          } 
         
        
          break;
      default:
        break;
    }

   guardarDB(tareas.listadoArr);
    await pausa();
    //console.log({opt});


  } while (opt != '0')


}

main();
