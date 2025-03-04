import mariadb from "mariadb";

// Database connection configuration
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'testFin',
    connectionLimit: 10
};

// Create connection pool
const pool = mariadb.createPool(dbConfig);

// Test the connection
async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Database connection established');
        return true;
    } catch (err) {
        console.error('Database connection failed:', err);
        return false;
    } finally {
        if (conn) conn.release();
    }
}

// Execute query and return results
async function query<T>(sql: string, params?: any[]): Promise<T> {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query(sql, params) as T;
    } finally {
        if (conn) conn.release();
    }
}

// Close the connection pool
async function closePool(): Promise<void> {
    return pool.end();
}

export default {
    query,
    testConnection,
    closePool
};