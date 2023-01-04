class Club {
    constructor(id, idTH, name, sport, address, createdAt, updatedAt) {
            this.id = id;
            this.idTH = idTH
            this.name = name;
            this.sport = sport;
            this.address = address;
            this.createdAt = createdAt
            this.updatedAt = updatedAt
    }

    static clubConverter = {
        toFirestore(club) {
          const returnValue = {
            id: club.id,
            idTH: club.idTH,
            name: club.name,
            sport: club.sport,
            address: club.address,
            createdAt: club.createdAt,
            updatedAt: club.updatedAt
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
    
          const returnValue = new Club(
            snapshot.id,
            datas.idTH,
            datas.name,
            datas.sport,
            datas.address,
            formatedDate,
            formatedUpdatedDate
          );
          return returnValue;
        },
      };
}
export default Club;