const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'


function index (req, res) {
    res.render('register',{
        title: 'Cadastro de Clientes'
    })
}

async function add (req, res){
const {
    name,
    age,
    email,
    password,
} = req.body

const passwordCrypto = await crypto(password)

const register = new CustomersModel({
    name,
    age,
    email,
    password: passwordCrypto,
})

register.save()
res.render ('register', {
    title: defaultTitle,
    message: ('Cadastro realizado com sucesso')
})

}


async function list(req,res){
    const users = await CustomersModel.find()

    res.render('list', {
        title: 'Listagem de Usuarios',
        users,
    })
}


async function formEdit(req,res){
    const { id } = req.query

   const user = await CustomersModel.findById(id)


    res.render('edit',{
        title: 'Editar Usuário',
        user,
    })

}
 
async function edit(req,res){
    const {
        name,
        age,
        email,
    } = req.body

    const { id } = req.params

    const user = await CustomersModel.findById(id)

    user.name = name
    user.age = age
    user.email = email

    user.save()

    res.render('edit',{
        title: 'Editar Usuário',
        user,
        message: 'Usuario alterado com sucesso!'
    })
}

async function remove(req, res) {
    const { id } = req.params;

    try {
        await CustomersModel.deleteOne({ _id: id });

        // Após a exclusão bem-sucedida, redirecione para a rota '/list'
        res.redirect('/list');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir o documento');
    }
}
  


module.exports = {
    index,
    add,
    list,
    formEdit,
    edit,
    remove,
}