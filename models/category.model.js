class Category {
  constructor(id, sport, parties, partyTime, halfTime, createdAt, updatedAt) {
    this.id = id;
    this.sport = sport;
    this.parties = parties;
    this.partyTime = partyTime;
    this.halfTime = halfTime;
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static categoryConverter = {
    toFirestore(category) {
      const returnValue = {
        id: category.id,
        name: category.name,
        sport: category.sport,
        parties: category.parties,
        partyTime: category.partyTime,
        halfTime: category.halfTime,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
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

      const returnValue = new Category(
        snapshot.id,
        datas.sport,
        datas.parties,
        datas.partyTime,
        datas.halfTime,
        formatedDate,
        formatedUpdatedDate
      );
      return returnValue;
    },
  };
}
export default Category;