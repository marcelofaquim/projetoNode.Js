import chalk from "chalk";

// Comando abaixo esta sendo criado para fazer um "LOOP", das URL dos link
//Cada link, estará dentro de um Array "{}

function extraiLinks (arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

//Comando abaixo esta criando o erro '404', que nada mais é quando o link/ url do arquivos esta digitado ou foi mudado para uma digitação errada;

async function checaStatus (listaURLs) {

    const arrStatus = await Promise
    .all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status;
            } catch (erro) {
                return manejaErros (erro);
            }
     })

    )
    return arrStatus;
}

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    
    }else{
        return 'Ocorreu algum erro';
    }
}


export default async function listaValidada (listaDeLinks) {
   const links = extraiLinks(listaDeLinks);
   const status =  await checaStatus(links);
   
   return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status:status[indice]

   }))

}



