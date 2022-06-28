const usuarioBD = require('./db.js');
const seguranca = require('../components/seguranca');

async function selectUsuario(){
    const conn = await usuarioBD.connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}
async function getUsuarioId(id){
    const conn = await usuarioBD.connect();
    const sql = 'SELECT * FROM usuario WHERE id = ?';
    const values = [id];
    const [rows] = await conn.query(sql,values);
    if(rows.length > 0)
    return rows[0];
    else 
    return null;
}
export async function login(nome, senha){
    const conn = await usuarioBD.connect();
    const sql = 'SELECT * FROM usuario WHERE nome=? and senha=?';
    const values = [nome, seguranca.ocultarSenha(senha)];
    const [rows] = await conn.query(sql, values);
    return rows ? rows.length > 0 : null;
}
export async function insertUsuario(usuario){
    const conn = await usuarioBD.connect();
    const sql = 'INSERT INTO usuario(nome,senha) VALUES(?,?);';
    const values = [usuario.nome, seguranca.ocultarSenha(usuario.senha)]
    return await conn.query(sql,value);
}
export async function deleteUsuario(id){
    const conn = await usuarioBD.connect();
    const sql = 'DELETE FROM usuario where id = ?';
    return await conn.query(sql,[id]);
}
export async function updateUsuario(id){
    const conn = await usuarioBD.connect();
    const sql = 'UPDATE usuario SET nome = ?, senha = ? WHERE id = ?;'
    const values = [usuario.nome, seguranca.ocultarSenha(usuario.senha), usuario.id];
    return await conn.query(sql, values);
}

async function getUsuarioId(id){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM usuario where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

module.exports = {selectUsuario, insertUsuario, deleteUsuario, updateUsuario, getUsuarioId};
