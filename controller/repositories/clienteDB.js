const clienteBD = require('./db.js');
const seguranca = require('../components/seguranca');

async function selectCliente(){
    const conn = await clienteBD.connect();
    const [rows] = await conn.query('SELECT * FROM cliente;');
    return rows;
}
async function getClienteId(id){
    const conn = await clienteBD.connect();
    const sql = 'SELECT * FROM cliente WHERE id = ?';
    const values = [id];
    const [rows] = await conn.query(sql,values);
    if(rows.length > 0)
    return rows[0];
    else 
    return null;
}
export async function login(nome, senha){
    const conn = await clienteBD.connect();
    const sql = 'SELECT * FROM cliente WHERE nome=? and senha=?';
    const values = [nome, seguranca.ocultarSenha(senha)];
    const [rows] = await conn.query(sql, values);
    return rows ? rows.length > 0 : null;
}
export async function insertCliente(cliente){
    const conn = await clienteBD.connect();
    const sql = 'INSERT INTO cliente(nome,senha) VALUES(?,?);';
    const values = [cliente.nome, seguranca.ocultarSenha(cliente.senha)]
    return await conn.query(sql,value);
}
export async function deleteCliente(id){
    const conn = await clienteBD.connect();
    const sql = 'DELETE FROM cliente where id = ?';
    return await conn.query(sql,[id]);
}
export async function updateCliente(id){
    const conn = await clienteBD.connect();
    const sql = 'UPDATE cliente SET nome = ?, senha = ? WHERE id = ?;'
    const values = [cliente.nome, seguranca.ocultarSenha(cliente.senha), cliente.id];
    return await conn.query(sql, values);
}

async function getClienteId(id){
    const conn = await clienteDB.connect();
    const sql = 'SELECT * FROM cliente where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

module.exports = {selectCliente, insertCliente, deleteCliente, updateCliente, getClienteId};
