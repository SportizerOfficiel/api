class Player {
    constructor(id, idTH, idClub, lastName, firstName, birthDate, category, matchsPlayed, createdAt, updatedAt) {
            this.id = id;
            this.idTH = idTH
            this.idClub = idClub
            this.lastName = lastName;
            this.firstName = firstName;
            this.birthDate = birthDate;
            this.category = category;
            this.matchsPlayed = matchsPlayed;
            this.createdAt = createdAt
            this.updatedAt = updatedAt
    }

    static playerConverter = {
        toFirestore(player) {
          const returnValue = {
            id: player.id,
            idTH: player.idTH,
            idCLub: player.idClub,
            lastName: player.lastName,
            firstName: player.firstName,
            birthDate: player.birthDate,
            category: player.category,
            matchsPlayed: player.matchsPlayed,
            createdAt: player.createdAt,
            updatedAt: player.updatedAt
          };
    
          Object.keys(returnValue).forEach((key) => {
            
            if (returnValue[key] === undefined) {
              delete returnValue[key];
            }
            if (returnValue[key] === null) {
              returnValue[key] = null
            }
          })
    
          return returnValue;
        },
        fromFirestore(snapshot) {
          const datas = snapshot.data();
          let formatedDate;
          if (datas.createdAt) {
            formatedDate = datas.createdAt.toDate();
          }
          let formatedUpdatedDate;
          if (datas.updatedAt) {
            formatedUpdatedDate = datas.updatedAt.toDate();
          }
          if (!Array.isArray(datas.category)) {
            datas.category = datas.category.split()
          }
    
          const returnValue = new Player(
            snapshot.id,
            datas.idTH,
            datas.idClub,
            datas.lastName,
            datas.firstName,
            datas.birthDate,
            datas.category,
            datas.matchsPlayed,
            formatedDate,
            formatedUpdatedDate
          );
          return returnValue;
        },
      };
}
export default Player;