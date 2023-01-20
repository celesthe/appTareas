const Tarea = require('./tarea');
require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
           // console.log(key);

        }

        )
        return listado;
    }
    constructor() {
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        try {
           // console.log(tareas)
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
        } catch (error) {
            this._listado[tarea.id] = error;
        }
        

    };

    listadoCompleto(){
        let NumeroTarea = 1;
        this.listadoArr.forEach(tarea => {
              

              if(tarea.CompletadoEn == null){
               // console.log(tarea.CompletadoEn);
                 console.log(`${ NumeroTarea.toString().red }. ${ tarea.desc } :: ${"PENDIENTE".red}`) ;
              }else{
                console.log(`${ NumeroTarea.toString().green }. ${ tarea.desc } :: ${"COMPLETADA".green}`); 
              }
              
              NumeroTarea++;
            
        });

    }

    listarPendientesCompletadas( completadas = true){
        let correlativo = 1;
        this.listadoArr.forEach(tarea => {
              
           
            if(tarea.CompletadoEn == null && completadas == false){
             // console.log(tarea.CompletadoEn);
               console.log(`${ correlativo.toString().red }. ${ tarea.desc } :: ${"PENDIENTE".red}`) ;
            }else if(tarea.CompletadoEn != null && completadas == true){
              console.log(`${ correlativo.toString().green }. ${ tarea.desc } :: ${"COMPLETADA".green}`); 
            }
            
            correlativo++;
          
      });
    }

    toggleCompletadas ( ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.CompletadoEn) {
                tarea.CompletadoEn = new Date().toISOString();
            }
        });
        
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                 this._listado[tarea.id].CompletadoEn = null;
            }
           
        })
    }
}

module.exports = Tareas;