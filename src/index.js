import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; //informações sobre isso está no rodapé do VS, colar essas informações em dentro de "//"

    const capturas = [...texto.matchAll(regex)]; //Expandindo o conteudo, para mostrar todos os links
   const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados.length !== 0 ? resultados : 'não há links no arquivo'; // Comando para caso se não tover nenhum link na pasta, irá retornar essa mensagem
}


function trataErro(erro) { // função para lidarmos com erros ou coisas inesperadas
    console.log(erro)
    throw new Error(chalk.red(erro.code, ' Arquivo não encontrado no direitorio'));
}

    // Função abaixo esta criando um metodo assincrono com "THEN" (metodo criado, para que eu possa fazer outras coisas enquanto eu estou colocando arquivos, link e etc, detro do java.)

   //function pegaArquivo(caminhoDoArquivo) {
      //  const encoding = 'utf-8';
       // fs.promises.
       // readFile(caminhoDoArquivo, encoding)
       // .then((texto) => console.log(chalk.blue(texto))) //metodo para criar uma promessa, um metodo assincrono
      //.catch(trataErro) // metodo para catar erro
    //}

    // ASYNC E AWAIT

    async function pegaArquivo(caminhoDoArquivo) { // colocar async, explica para o java que a promessa tem que ser comprida
        try{

        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding) // estamos avisando o java, que o pegaArquivo é assincrono e precisamos que seja resolvido as promessas dele.

        return extraiLinks(texto);

        }catch(erro) {
            trataErro(erro);
        }
    }

    export default pegaArquivo;




//pegaArquivo('./arquivos/texto.md'); // diretorio do vs code, usar para teste   
 
// \[([^[\]]*?)\] Aqui eu estou selecioando todos os titulos dentro dos "[" do texto.md

// \((http?:\/\/[^\s?#.].[^\s]*)\) Aqui estou selecionado o grupo dos links, estou selecionando somente os link