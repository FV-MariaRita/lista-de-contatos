import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Contato } from "../models/contato";


const tableName = 'contatos';

enablePromise (true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'agendaContatos.db', location: 'default' });
};

//cria a tabela contatos
export const createTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL, 
        sobrenome TEXT NOT NULL, 
        telefone TEXT NOT NULL, 
        email TEXT NOT NULL
    );`;

    await db.executeSql(query);
};

//retorna uma lista com id e nome de todos os contatos existentes no banco de dados 
export const getContatos = async (db: SQLiteDatabase): Promise<Contato[]> => {
    try {
        const contatos: Contato[] = [];
        const resultados = await db.executeSql(`SELECT id, nome 
                                                FROM ${tableName}`);
        resultados?.forEach( (result: any) => {
            for (let i = 0; i < result.rows.length; i++) {
                contatos.push(result.rows.item(i))
            }
        });

        return contatos;

    } catch (error) {
        console.error('Erro ao carregar as notas', error);
        return [];
    }
}

//retorna todos os dados de um contato específico
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

//cria um novo contato
export const saveContato = async (db: SQLiteDatabase, contatos: Contato[]) => {
    const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(nome, sobrenome, telefone, email) values`+
        contatos.map(i => `(
            '${i.nome}', 
            '${i.sobrenome}',
            '${i.telefone}',
            '${i.email}' 
        )`).join(',');

    return db.executeSql(insertQuery);
}

//atualiza um contato já existente 
export const updateContato = async (db: SQLiteDatabase, id: number, nome: string, sobrenome: string, telefone: string, email: string) => {
    if (id == null) return;

    const query = `UPDATE ${tableName}
                    SET 
                        nome = '${nome}',
                        sobrenome = '${sobrenome}',
                        telefone = '${telefone}',
                        email = '${email}'
                    WHERE id = ${id} `;
    try {
        await db.executeSql(query);
    } catch (error) {
        console.error('Erro ao atualizar o contato: ', error);
        throw error;
    }
}

//exclui um contato
export const deleteContato = async (db: SQLiteDatabase, id: number) => {
    const query = `DELETE from ${tableName} 
                   WHERE rowid = ${id}`;

    try {
        await db.executeSql(query);
    } catch (error) {
        console.error('Erro ao excluir o contato: ', error);
        throw error;
    }
}

//exclui a tabela contatos
export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
}