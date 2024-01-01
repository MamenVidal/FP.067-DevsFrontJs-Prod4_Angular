export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAVUxS20D4ilBqqK94VPNBjKjxC0UUms1I",
        authDomain: "misviajes-d61aa.firebaseapp.com",
        databaseURL: 'https://misviajes-d61aa.firebaseapp.com',
        projectId: "misviajes-d61aa",
        storageBucket: "misviajes-d61aa.appspot.com",
        messagingSenderId: "398595674992",
        appId: "1:398595674992:web:1b573fde23396d497735b5",
        measurementId: "G-YZZECZZEPY",
        vapidKey: "BDo-bkvV-RNFApJjou_nrRyEjFGJrURUykrRmhx52BtKOWZEiVV8pkIOGhAjlcb1xH0YGJBKpVZoonGOE20i5Dc",
    },
    useEmulators: true, // Cambiar a true para usar emuladores
    emulatorConfig: { // Y esta sección para configurar los emuladores
        firestore: {
            host: 'localhost',
            port: 8080
        },
        functions: {
            host: 'localhost',
            port: 5001
        },
        database: {
            host: 'localhost',
            port: 9001
        },
        storage: {
            host: 'localhost',
            port: 9199
        }
    }
};
