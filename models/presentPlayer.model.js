class PresentPlayer {
  constructor(id, lastName, firstName, fouls, points, num, category, home, createdAt, updatedAt) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.fouls = fouls;
    this.points = points;
    this.num = num;
    this.home = home
    this.category = category;
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static playerConverter = {
    toFirestore(player) {
      const returnValue = {
        id: player.id,
        lastName: player.lastName,
        firstName: player.firstName,
        fouls: player.fouls,
        points: player.points,
        num: player.num,
        category: player.category,
        home: player.home,
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

      const returnValue = new PresentPlayer(
        snapshot.id,
        datas.lastName,
        datas.firstName,
        datas.fouls,
        datas.points,
        datas.num,
        datas.category,
        datas.home,
        formatedDate,
        formatedUpdatedDate
      );
      return returnValue;
    },
  };
}
export default PresentPlayer;