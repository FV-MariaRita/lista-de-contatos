import * as SQLite from 'expo-sqlite';
import { Contato } from "../models/contato";


const tableName = 'contatos';

export const getDBConnection = () => {
    return SQLite.openDatabaseAsync('agendaContatos.db');
};

//cria a tabela contatos
export const createTable = async () => {
    const db = await getDBConnection();
    try {
        const query = `
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nome TEXT NOT NULL, 
                sobrenome TEXT NOT NULL, 
                telefone TEXT NOT NULL, 
                email TEXT NOT NULL
            );`;
        await db.execAsync(query);
        console.log('Banco inicializado');
    } catch (error) {
        console.error("Erro ao inicializar o banco:", error);
    }
    
};

//retorna uma lista com id e nome de todos os contatos existentes no banco de dados 
export const getContatos = async (): Promise<Contato[]> => {
    const db = await getDBConnection();

    try {
        const resultados = await db.getAllAsync(`SELECT * FROM ${tableName}`);
        return resultados as Contato[];

    } catch (error) {
        console.error('Erro ao buscar os contatos', error);
        return [];
    }
}

/*retorna todos os dados de um contato específico
export const getContatoById = async (id: number, db: SQLiteDatabase ): Promise<Contato[]> => {
    try {
        const contato: Contato[] = [];
        const resultado = await db.executeSql(`SELECT *
                                               FROM ${tableName}
                                               WHERE id = ${id}`);
        
        if (resultado.length > 0) {
            const rows = resultado[0].rows;
            for (let i = 0; i < rows.length; i++) {
                contato.push(rows.item(i));
            }
        }                                      
        return contato;

    } catch (error) {
        console.error('Erro ao carregar contato: ', error);
        throw error;
    }   
}
*/

//cria um novo contato
export const saveContato = async (contato: Contato) => {

    if (
        typeof contato.nome !== 'string' ||
        typeof contato.sobrenome !== 'string' ||
        typeof contato.telefone !== 'string' ||
        typeof contato.email !== 'string'
    ) {
        console.error('Contato malformado:', contato);
        throw new Error('Dados do contato malformados');
    }

    const db = await getDBConnection();

    try {
        const insertQuery = `
            INSERT INTO ${tableName} (nome, sobrenome, telefone, email)
            VALUES (?, ?, ?, ?)
        `;
        await db.runAsync(insertQuery, [
            contato.nome,
            contato.sobrenome,
            contato.telefone,
            contato.email,
        ]);

    } catch (error) {
        console.error('erro ao executar insert', error);
    }
    
}


//atualiza um contato já existente 
export const updateContato = async (contato: Contato) => {
    if (contato.id == null) return;

    const db = await getDBConnection();

    const query = `UPDATE ${tableName}
                    SET 
                        nome = ?,
                        sobrenome = ?,
                        telefone = ?,
                        email = ?
                    WHERE id = ? `;
    try {
        await db.runAsync(query, [
            contato.nome,
            contato.sobrenome,
            contato.telefone,
            contato.email,
            contato.id,
        ]);
    } catch (error) {
        console.error('Erro ao atualizar o contato: ', error);
    }
}

//exclui um contato
export const deleteContato = async (id: number) => {
    
    const db = await getDBConnection(); 
    const query = `DELETE from ${tableName} WHERE id = ?`;
    try {
        await db.runAsync(query, [id]);
    } catch (error) {
        console.error('Erro ao excluir o contato: ', error);
    }
}

/*exclui a tabela contatos
export const deleteTable = async () => {
    const db = await getDBConnection();
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
}
*/