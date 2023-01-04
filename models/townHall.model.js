class TownHall {
    constructor(id , name, address, createdAt, updatedAt) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.createdAt = createdAt
            this.updatedAt = updatedAt
    }

    static townHallConverter = {
        toFirestore(townHall) {
          const returnValue = {
            id: townHall.id,
            name: townHall.name,
            address: townHall.address,
            createdAt: townHall.createdAt,
            updatedAt: townHall.updatedAt
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
    
          const returnValue = new TownHall(
            snapshot.id,
            datas.name,
            datas.address,
            formatedDate,
            formatedUpdatedDate
          );
          return returnValue;
        },
      };
}
export default TownHall;