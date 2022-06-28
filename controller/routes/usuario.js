module.exports = function(app){
    app.get("/login", function(req,res){
        if(req.query.fail)
        res.render('usuario/Login',{mensagemLogin:
        'Usuário e/ou senha incorreto'});
        else
        res.render('usuario/Login',{mensagemLogin:null});

})
app.post('/login/executar', (req, res) => {
    if(req.body.nome === "natali" && req.body.senha === "123456")
    res.render('/lista/usuario',{
        mensagem:'cadastro' })
    else
    res.render('/login/?fail=true'); 
});
app.get("/cadastro", function(req,res){
    if (req.query.fail)
    res.render('usuario/Cadastro', {mensagem: "Cadastro"});
    else
    res.render('usuario/Cadastro', {mensagem: null});
});
app.post('/cadastro/usuario/edit/salvar',(req,res)=>{
    var usuario = {nome: req.body.nome,
    senha: req.body.senha,
    id = req.body.id};
    try{
        usuarioBanco.updateUsuario(usuario);
        res.render('usuario/Sucesso',{mensagem:'alterado'});
    }
    catch (error){
        res.render('usuario/EditUsuario', {title:'edição cadastro', mensagem: 'erro no cadastro'});
    }
});
app.post('/cadastro/usuario/salvar',(req,res)=>{
    try{
    var usuario = {nome: req.body.nome,
    senha: seguranca.ocultarSenha(req.body.senha)}
    usuarioBanco.insertUsuario(usuario);
        res.render('usuario/Sucesso',{mensagem:'cadastrado'});
    }
    catch (error){
        console.log(error);
        res.render('usuario/Cadastro', {title:'Cadastro', mensagem: 'erro no cadastro'});
    }
});
app.get('delete/usuario/:id', async (req, res, next)=>{
    try{
        var id = req.params.id;
        await usuarioBanco.deleteUsuario(id);
        const docs = await usuarioBanco.selectUsuario();
        res.render('usuario/Lista', {mensagem: 'Usuário excluído como sucesso', docs });
    }catch(err){
        next(err);
    }
});

}