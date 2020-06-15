let users = []
users.push({ id: 1, username: "Ksota", name: "Nuno Costa", email: "nunocosta@esmad.ipp.pt", password: "12345", address: "Rua 1", phone: 12345, diseases: ["sidoso"], prescriptions: ["pills"] })

function updateTableUsers() {
    let tableUsers = document.getElementById("tableUsers")
    let str = `
        <thead class="top-table">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Profile</th>
            </tr>
        </thead>
        <tbody>
    `

    users.forEach((user, userIndex) => {
        str += `
            <tr id="${user.id}">
                <th scope="row">${userIndex + 1}</th>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button type="button" class="btn profile-btn infoUtilizador">
                        <i class="fas fa-search"></i>
                    </button>
                </td>
            </tr>
        `
    })
    str += "</tbody>"
    tableUsers.innerHTML = str
}

window.onload = function () {
    updateTableUsers()

    const modalTitulo = document.getElementById("titleModal")
    const modalBody = document.getElementById("bodyModal")
    const modalFooter = document.getElementById("footerModal")

    //btn info utilizador
    let btnInfoUtilizador = document.getElementsByClassName("infoUtilizador")
    for (let i = 0; i < btnInfoUtilizador.length; i++) {
        btnInfoUtilizador[i].addEventListener("click", function () {
            let idUtilizador = parseInt(btnInfoUtilizador[i].parentNode.parentNode.id)
            for (let j in users) {
                if (users[j].id === idUtilizador) {
                    modalTitulo.innerHTML = "Informações sobre o utilizador"

                    modalBody.innerHTML = `<div class="container-fluid">
                                             <p><b>Username:</b> ${users[j].username}</p>
                                             <p><b>Name:</b> ${users[j].name}</p>
                                             <p><b>Email:</b> ${users[j].email}</p>
                                             <p><b>Password:</b> ${users[j].password}</p>
                                             <p><b>Address:</b> ${users[j].address}</p>
                                             <p><b>Phone Number:</b> ${users[j].phone}</p>
                                             <p><b>Diseases:</b> ${users[j].diseases.join(', ')}</p>
                                             <p><b>Prescription Pills:</b> ${users[j].prescriptions.join(', ')}</p>                   
                                         </div>`
                    modalFooter.innerHTML = `
                                          <button type="button" class="btn btn-danger removeUser">Remove user</button>
                                          <button type="button" class="btn btn-warning editUser">Edit user</button>
                                          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    `
                }
            }
            $("#modal").modal('show')

            // btn remover utilizador
            let btnRemoverUtilizador = document.getElementsByClassName("removeUser")
            for (let j = 0; j < btnRemoverUtilizador.length; j++) {
                btnRemoverUtilizador[j].addEventListener("click", function () {
                    $("#modal").modal('hide')
                    const userIndex = users.findIndex(user => user.id === idUtilizador)
                    users.splice(userIndex, 1)
                    updateTableUsers()
                })
            }


            //btn editar utilizador
            let btnEditarUtilizador = document.getElementsByClassName("editUser")
            for (let j = 0; j < btnEditarUtilizador.length; j++) {
                btnEditarUtilizador[j].addEventListener("click", function () {
                    for (let k in users) {
                        if (users[k].id === idUtilizador) {
                            modalTitulo.innerHTML = "A editar " + users[k].name
                            modalBody.innerHTML = `<div class="container-fluid">
                                                         <form class="form-horizontal" id="formAdmEditarUtilizador">
                                                             <div class="form-group">
                                                                 <label class="col-12 control-label" for="inputAdmUtilizadorEditarId">ID</label>
                                                                 <div class="col-sm-9">
                                                                     <input id="inputAdmUtilizadorEditarId" type="text" class="form-control" required readonly value="${users[k].id}">
                                                                 </div>
                                                             </div>
                                                             <div class="form-group">
                                                                 <label class="col-12 control-label" for="inputAdmUtilizadorEditarNome">Name</label>
                                                                 <div class="col-sm-9">
                                                                     <input id="inputAdmUtilizadorEditarNome" type="text" class="form-control" required value="${users[k].name}">
                                                                 </div>
                                                             </div>
                                                             <div class="form-group">
                                                                 <label class="col-12 control-label" for="inputAdmUtilizadorEditarEmail">Email</label>
                                                                 <div class="col-sm-9">
                                                                     <input id="inputAdmUtilizadorEditarEmail" type="email" class="form-control" required value="${users[k].email}">
                                                                 </div>
                                                             </div>
                                                             <div class="form-group">
                                                                 <label class="col-12 control-label" for="inputAdmUtilizadorEditarPassword">Password</label>
                                                                 <div class="col-sm-9">
                                                                     <input id="inputAdmUtilizadorEditarPassword" type="text" class="form-control" required value="${users[k].password}">
                                                                 </div>
                                                             </div>
                                                             <div class="form-group">
                                                                <label class="col-12 control-label" for="inputAdmUtilizadorEditarAddress">Address</label>
                                                                <div class="col-sm-9">
                                                                    <input id="inputAdmUtilizadorEditarAddress" type="text" class="form-control" required value="${users[k].address}">
                                                                </div>
                                                            </div>
                                                             <input type="submit" class="col-6 btn btn-warning" value="Confirmar">
                                                             <button type="button" class="col-6 btn btn-primary" data-dismiss="modal">Fechar</button>
                                                         </form>                                  
                                                     </div>`

                        }
                    }
                })
            }
        })
    }
}

// //btn info utilizador
// let btnInfoUtilizador = document.getElementsByClassName("infoUtilizador")
// for (let i = 0; i < btnInfoUtilizador.length; i++) {
//     btnInfoUtilizador[i].addEventListener("click", function () {
//         let idUtilizador = parseInt(btnInfoUtilizador[i].parentNode.parentNode.id)
//         for (let j in users) {
//             if (users[j].id === idUtilizador) {
//                 modalTitulo.innerHTML = "Informações sobre o utilizador"

//                 let foto = (users[j].urlFoto === "img/perfil.png") ? "../../img/perfil.png" : users[j].urlFoto

//                 modalBody.innerHTML = `<div class="container-fluid">
//                                              <div class="text-center">
//                                                  <img src="${foto}" title="${users[j].nome}" class="img-fluid img-thumbnail" style="width: 150px; height: 150px; border-radius: 50%;">                            
//                                              </div>
//                                              <br>
//                                              <p><b>ID:</b> ${users[j].id}</p>
//                                              <p><b>Nome:</b> ${users[j].nome}</p>
//                                              <p><b>Email:</b> ${users[j].email}</p>
//                                              <p><b>Password:</b> ${users[j].password}</p> 
//                                              <p><b>Valor multa:</b> € ${users[j].multa}</p>
//                                              <p><b>Número de requisições:</b> ${Requisicao.quantidadeRequisicoesByIdUtilizador(users[j].id)}</p> 
//                                              <p><b>Livros requisitados:</b> ${Requisicao.livrosRequisitadosByIdUtilizador(users[j].id).join(" / ")}</p>
//                                              <p><b>Data de inscrição:</b> ${dataToString(users[j].dataInscricao)}</p>
//                                              <p><b>Tipo de acesso:</b> ${Utilizador.tipoAcessoToString(users[j].tipoAcesso)}</p>                      
//                                              <p><b>Lista de desejos:</b> ${users[j].listaDesejosToString().join(", ")}</p>                      
//                                          </div>`
//                 modalFooter.innerHTML = `<button type="button" class="btn btn-primary desbloquear" disabled>Desbloquear</button>
//                                           <button type="button" class="btn btn-danger remover">Remover utilizador</button>
//                                           <button type="button" class="btn btn-warning editar">Editar perfil</button>
//                                           <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`
//             }
//         }



//         //btn remover utilizador
//         let btnRemoverUtilizador = document.getElementsByClassName("remover")
//         for (let j = 0; j < btnRemoverUtilizador.length; j++) {
//             btnRemoverUtilizador[j].addEventListener("click", function () {
//                 if (idUtilizador === idUtilizadorLogado) {
//                     swal("Erro!", "Impossível remover o próprio perfil.", "error");
//                 } else {
//                     swal({
//                         title: "Deseja mesmo remover?",
//                         text: `O utilizador ${Utilizador.getNomeById(idUtilizador)} e todo o seu perfil será removido para sempre!`,
//                         icon: "warning",
//                         buttons: true,
//                         dangerMode: true,
//                     }).then((willDelete) => {
//                         if (willDelete) {
//                             swal(`O utilizador ${Utilizador.getNomeById(idUtilizador)} foi removido com sucesso.`, {
//                                 icon: "success",
//                             });
//                             $("#modal").modal('hide')
//                             Utilizador.removerUtilizadorById(idUtilizador)
//                             localStorage.setItem("users", JSON.stringify(users))

//                             atualizarPercentagens()
//                             gerarTabelausers()
//                         }
//                     });
//                 }
//             })
//         }

//         //btn editar utilizador
//         let btnEditarUtilizador = document.getElementsByClassName("editar")
//         for (let j = 0; j < btnEditarUtilizador.length; j++) {
//             btnEditarUtilizador[j].addEventListener("click", function () {
//                 if (idUtilizador === idUtilizadorLogado) {
//                     swal("Erro!", "Impossível editar o próprio perfil.", "error");
//                 } else {
//                     for (let k in users) {
//                         if (users[k].id === idUtilizador) {
//                             modalTitulo.innerHTML = "A editar " + users[k].nome

//                             let foto = (users[k].urlFoto === "img/perfil.png") ? "../../img/perfil.png" : users[k].urlFoto
//                             let fotoTexto = (users[k].urlFoto === "img/perfil.png") ? "" : users[k].urlFoto

//                             modalBody.innerHTML = `<div class="container-fluid">
//                                                          <div class="text-center">
//                                                              <img src="${foto}" alt="${users[k].nome}" class="img-fluid img-thumbnail" id="inputAdmUtilizadorFoto" style="width: 150px; height: 150px; border-radius: 50%;">                            
//                                                          </div>
//                                                          <br>
//                                                          <form class="form-horizontal" id="formAdmEditarUtilizador">
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarId">ID</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarId" type="text" class="form-control" required readonly value="${users[k].id}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarNome">Nome *</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarNome" type="text" class="form-control" required value="${users[k].nome}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarEmail">Email *</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarEmail" type="email" class="form-control" required value="${users[k].email}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarPassword">Password *</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarPassword" type="text" class="form-control" required value="${users[k].password}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarFoto">URL foto</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarFoto" type="url" class="form-control" value="${fotoTexto}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarMulta">Multa *</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarMulta" type="number" min="0" class="form-control" required value="${users[k].multa}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarNumeroRequisicoes">Número de requisições</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarNumeroRequisicoes" type="number" class="form-control" required readonly value="${Requisicao.quantidadeRequisicoesByIdUtilizador(users[k].id)}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarLivrosRequisitados">Livros requisitados</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarLivrosRequisitados" type="text" class="form-control" required readonly value="${Requisicao.livrosRequisitadosByIdUtilizador(users[k].id).join(" / ")}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarInscricao">Data de inscrição:</label>
//                                                                  <div class="col-sm-9">
//                                                                      <input id="inputAdmUtilizadorEditarInscricao" type="text" class="form-control" required readonly value="${dataToString(users[k].dataInscricao)}">
//                                                                  </div>
//                                                              </div>
//                                                              <div class="form-group">
//                                                                  <label class="col-sm-3 control-label">Tipo acesso *</label>
//                                                                  <label class="radio-inline col-xl-1 col-lg-2 col-12">
//                                                                      <input type="radio" class="radio-inline-input-editar" name="editar" value="2">Utilizador
//                                                                  </label>
//                                                                  <label class="radio-inline col-xl-1 col-lg-2 col-12">
//                                                                      <input type="radio" class="radio-inline-input-editar" name="editar" value="1">Operador
//                                                                  </label>
//                                                                  <label class="radio-inline col-xl-1 col-lg-2 col-12">
//                                                                      <input type="radio" class="radio-inline-input-editar" name="editar" value="0">Administrador
//                                                                  </label>
//                                                              </div>
//                                                              <input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
//                                                              <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
//                                                          </form>                                  
//                                                      </div>`

//                             let inputAdmUtilizadorEditarFoto = document.getElementById("inputAdmUtilizadorEditarFoto")
//                             inputAdmUtilizadorEditarFoto.addEventListener("change", function () {
//                                 document.getElementById("inputAdmUtilizadorFoto").src = inputAdmUtilizadorEditarFoto.value
//                             })

//                             let editarTipoAcesso = document.getElementsByClassName("radio-inline-input-editar")
//                             for (let l = 0; l < editarTipoAcesso.length; l++) {
//                                 if (Utilizador.getTipoAcessoById(idUtilizador) === parseInt(editarTipoAcesso[l].value)) {
//                                     editarTipoAcesso[l].checked = true
//                                 }
//                             }
//                             modalFooter.innerHTML = ""

//                             //form editar
//                             let formAdmEditarUtilizador = document.getElementById("formAdmEditarUtilizador")
//                             formAdmEditarUtilizador.addEventListener("submit", function (event) {
//                                 let inputAdmUtilizadorEditarEmail = document.getElementById("inputAdmUtilizadorEditarEmail")

//                                 if (Utilizador.getIdByEmail(inputAdmUtilizadorEditarEmail.value) === -1 || (Utilizador.getIdByEmail(inputAdmUtilizadorEditarEmail.value) === users[k].id && Utilizador.getIdByEmail(inputAdmUtilizadorEditarEmail.value) !== -1)) { //caso não exista nenhum utilizador com o email indicado
//                                     let inputAdmUtilizadorEditarNome = document.getElementById("inputAdmUtilizadorEditarNome")
//                                     let inputAdmUtilizadorEditarPassword = document.getElementById("inputAdmUtilizadorEditarPassword")
//                                     let inputAdmUtilizadorEditarMulta = document.getElementById("inputAdmUtilizadorEditarMulta")

//                                     users[k].nome = inputAdmUtilizadorEditarNome.value
//                                     users[k].email = inputAdmUtilizadorEditarEmail.value
//                                     users[k].password = inputAdmUtilizadorEditarPassword.value
//                                     users[k].urlFoto = inputAdmUtilizadorEditarFoto.value
//                                     users[k].multa = parseInt(inputAdmUtilizadorEditarMulta.value)

//                                     //radio btns tipo de acesso                           
//                                     for (let l = 0; l < editarTipoAcesso.length; l++) {
//                                         if (editarTipoAcesso[l].checked) {
//                                             users[k].tipoAcesso = parseInt(editarTipoAcesso[l].value)
//                                         }
//                                     }

//                                     //atualizar a key do localStorage
//                                     localStorage.setItem("users", JSON.stringify(users))

//                                     swal("Utilizador editado!", `O utilizador com o id ${users[k].id} dado pelo nome de ${users[k].nome} foi editado com sucesso.`, "success");
//                                     gerarTabelausers()
//                                     $("#modal").modal("hide")
//                                 } else { //caso exista um utilizador com o mesmo email indicado
//                                     swal("Erro!", `O email ${inputAdmUtilizadorEditarEmail.value} já está em uso.`, "error");
//                                 }

//                                 event.preventDefault()
//                             })
//                         }
//                     }
//                 }
//             })
//         }
//     })
// }