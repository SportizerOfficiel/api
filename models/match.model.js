class Match {
  constructor(id, homeTeam, awayTeam, date, place, category, sport, homePoints, awayPoints, homeFouls, awayFouls, duration, createdAt, updatedAt) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.date = date;
    this.place = place;
    this.sport = sport;
    this.category = category;
    this.homePoints = homePoints
    this.awayPoints = awayPoints
    this.homeFouls = homeFouls
    this.awayFouls = awayFouls
    this.duration = duration
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static matchConverter = {
    toFirestore(match) {
      const returnValue = {
        id: match.id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        date: match.date,
        place: match.place,
        sport: match.sport,
        categoy: match.category,
        homePoints: match.homePoints,
        awayPoints: match.awayPoints,
        homeFouls: match.homeFouls,
        awayFouls: match.awayFouls,
        duration: match.duration,
        createdAt: match.createdAt,
        updatedAt: match.updatedAt
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
      const match = snapshot.data();
      let formatedDate;
      if (match.createdAt) {
        formatedDate = match.createdAt.toDate();
      }
      let formatedUpdatedDate;
      if (match.updatedAt) {
        formatedUpdatedDate = match.updatedAt.toDate();
      }

      const returnValue = new Match(
        snapshot.id,
        match.homeTeam,
        match.awayTeam,
        match.date,
        match.place,
        match.sport,
        match.category,
        match.homePoints,
        match.awayPoints,
        match.homeFouls,
        match.awayFouls,
        match.duration,
        formatedDate,
        formatedUpdatedDate
      );
      return returnValue;
    },
  };
}
export default Match;