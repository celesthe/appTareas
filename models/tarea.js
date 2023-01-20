const { v4: uuidv4 } = require('uuid');

class Tarea{
    id = '';
    desc = '';
    CompletadoEn = null;
  
    constructor( desc ){
        this.id = uuidv4();
        this.desc = desc;
        this.CompletadoEn = null;

    }
}



module.exports = Tarea;