const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt")

const model = {
    all: function() {
        const directory = path.resolve(__dirname,"../data","users.json")
        const file = fs.readFileSync(directory,"utf-8")
        const convert = JSON.parse(file)
        return convert
    },
    one: function (id) {
        let usuarios = this.all();
        let resultado = usuarios.find(usuario => usuario.id == id)
        return resultado;
    },
    oneEmail: function (email) {
        let usuarios = this.all();
        let resultado = usuarios.find(usuario => usuario.email == email)
        return resultado;
    },
    new: function (data,file) {
        const directory = path.resolve(__dirname,"../data","users.json")
        let usuarios = this.all();
        let nuevo = {
            id: usuarios.length > 0 ? usuarios[usuarios.length -1].id + 1: 1,
            name: data.name,
            surname: data.surname,
            email: data.email,
            avatar: file.filename,
            password: bcrypt.hashSync(data.password, 10),
            tel: data.tel,
            admin: false
        }    
        usuarios.push(nuevo)
        fs.writeFileSync(directory,JSON.stringify(usuarios,null,2));
        return true;    
    },
    edit: function (data,file,id) {
        const directory = path.resolve(__dirname,"../data","users.json")
        let usuarios = this.all();
        let updated = this.one([id]);

        usuarios.map(usuario => {
            if(usuario.id == id ){
                usuario.name = data.name,
                usuario.surname = data.surname,
                usuario.email = data.email,
                usuario.avatar = file.filename,
                usuario.tel = data.tel
                return usuario
            }
            return usuario
        })
        fs.writeFileSync(directory,JSON.stringify(usuarios,null,2));
        return true;
    },
   
    delete: function (id) {
        console.log("Inicio del borrado");
        const directory = path.resolve(__dirname,"../data","users.json")
        let usuarios = this.all();
        let deleted = this.one([id]);
        // eliminamos la imagen de la carpeta upload
        fs.unlinkSync(path.resolve(__dirname,"../../public/img/users",deleted.avatar))
        // filtarmos el usuario que deaseamos eliminar
        usuarios = usuarios.filter(usuario => usuario.id != deleted.id )
        fs.writeFileSync(directory,JSON.stringify(usuarios,null,2));
        console.log("Borrado exitoso");
        return true;
    },
    makeAdmin: function (id) {
        const directory = path.resolve(__dirname,"../data","users.json")
        let usuarios = this.all();

        usuarios.map(usuario => {
            if(usuario.id == id ){
                usuario.admin = true;
                return usuario
            }
            return usuario;
        })
        fs.writeFileSync(directory,JSON.stringify(usuarios,null,2));
        return true;
    },
    removeAdmin: function (id) {
        const directory = path.resolve(__dirname,"../data","users.json")
        let usuarios = this.all();

        usuarios.map(usuario => {
            if(usuario.id == id ){
                usuario.admin = false;
                return usuario
            }
            return usuario;
        })
        fs.writeFileSync(directory,JSON.stringify(usuarios,null,2));
        return true;
    }

};
module.exports = model;