import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = ''){
    
    if (valida) {

        console.log(
            chalk.blue('listaValidada'), 
            chalk.black.bgYellow(identificador),
            await listaValidada(resultado))

    } else{
        console.log(
            chalk.blue('lista de links'), 
            chalk.black.bgYellow(identificador),
            resultado);

    }
    
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] == '--valida';
    

    try{

        fs.lstatSync(caminho);

    }catch (erro) {

        if (erro.code == 'ENOENT') {
            console.log('Arquivo ou diretorio não encontrado')
            return;
        }

    }

    // Comando abaixo faz com que, na hora da execução do comando no "CMD", eu possa colocar somente até o diretorio ao inves de colocar todo o caminho

    if(fs.lstatSync(caminho). isFile()) {
        
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(valida, resultado);

    } else if(fs.lstatSync(caminho). isDirectory()) {
        const arquivos = await fs.promises. readdir(caminho);
        arquivos.forEach( async(nomeDeArquivo) =>{
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(valida, lista, nomeDeArquivo)
            
        })
        
    }

}

processaTexto(caminho);