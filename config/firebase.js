import admin from "firebase-admin"
import "dotenv/config"
export class FirebaseService {

  static townHallsNode = "townhalls"
  static clubsNode = "clubs"
  static playersNode = "players"
  static matchsNode = "matchs"
  static presentPlayersNode = "presentPlayers"
  static disciplinesNode = "disciplines"
  static categoriesNode = "catgeories"

  constructor(){

    const {
      TYPE,
      PROJECT_ID,
      PRIVATE_KEY_ID,
      PRIVATE_KEY,
      CLIENT_EMAIL,
      CLIENT_ID,
      AUTH_URI,
      TOKEN_URI,
      AUTH_PROVIDER_X509_CERT_URL,
      CLIENT_X509_CERT_URL
    } = process.env;
    
    const firebaseConfig = {
      type: TYPE,
      project_id: PROJECT_ID,
      private_key_id: PRIVATE_KEY_ID,
      private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: CLIENT_EMAIL,
      client_id: CLIENT_ID,
      auth_uri: AUTH_URI,
      token_uri: TOKEN_URI,
      auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: CLIENT_X509_CERT_URL
    };

    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig)
    });

    this.db = admin.firestore()

    console.log("Created new instance of FirestoreService");
  }

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}