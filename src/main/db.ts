import mariadb from "mariadb";

export interface DBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    userCollum: string;
    passwordCollum: string;
    table: string;
};

export class DB {
    private pollConnexion: mariadb.PoolConnection | undefined;
    public host: string;
    public port: number;
    public user: string;
    public password: string;
    public database: string;

    constructor(config: DBConfig) {
        this.host = config.host;
        this.port = config.port;
        this.user = config.user;
        this.password = config.password;
        this.database = config.database;
        this.Connexion().then((conn) => {
            this.pollConnexion = (conn as mariadb.PoolConnection);
        }).catch(() => {
            console.error('Database connection failed');
        });
    };

    private Connexion(): Promise<mariadb.PoolConnection | void> {
        return new Promise((resolve, reject) => {
            try {
                resolve(mariadb.createPool({
                    host: this.host,
                    port: this.port,
                    user: this.user,
                    password: this.password,
                    database: this.database,
                    connectionLimit: 5,
                }).getConnection());
            }
            catch (err) {
                console.error('Database connection failed:', err);
                reject();
            }
        });
    };

    public Reconnect(): void {
        this.CloseConnexion().then(() => {
            this.Connexion().then((conn) => {
                this.pollConnexion = (conn as mariadb.PoolConnection);
            }).catch(() => {
                console.error('Database connection failed');
            });
        }).catch(() => {
            console.error('Database connection failed');
        });
    };

    //async function query<T>(sql: string, params?: any[]): Promise<T> {
    //    let conn;
    //    try {
    //        conn = await pool.getConnection();
    //        return await conn.query(sql, params) as T;
    //    } finally {
    //        if (conn) conn.release();
    //    }
    //}


    public async CloseConnexion(): Promise<void> {
        if (this.pollConnexion) {
            this.pollConnexion.release();
        }
    };

    public GetPollConnexion(): mariadb.PoolConnection | undefined {
        return this.pollConnexion;
    };

}