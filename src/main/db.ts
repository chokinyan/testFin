import mariadb from "mariadb";

export default interface DBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    userCollum: string;
    passwordCollum: string;
    table: string;
};

export default class DB {
    private pollConnexion: mariadb.PoolConnection | undefined;
    public host: string;
    public port: number;
    public user: string;
    public password: string;
    public database: string;
    public userCollum: string;
    public passwordCollum: string;
    public table: string;

    constructor(config: DBConfig) {
        this.host = config.host;
        this.port = config.port;
        this.user = config.user;
        this.password = config.password;
        this.database = config.database;
        this.userCollum = config.userCollum;
        this.passwordCollum = config.passwordCollum;
        this.table = config.table;
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

    public GetUser(user: string, password: string): Promise<boolean | void> {
        return new Promise((resolve, reject) => {
            if (this.pollConnexion) {
                this.pollConnexion.query(`SELECT * FROM ${this.database}.${this.table} WHERE ${this.userCollum} = ? AND ${this.passwordCollum} = ?`, [user, password]).then((res) => {
                    if (res.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }).catch(() => {
                    reject();
                });
            } else {
                reject();
            }
        });
    };


    public async CloseConnexion(): Promise<void> {
        if (this.pollConnexion) {
            this.pollConnexion.release();
        }
    };

    public GetPollConnexion(): mariadb.PoolConnection | undefined {
        return this.pollConnexion;
    };

}