import db from '../../infrastructure/db/index.js';

class GetAllTurnoversReadModel {
  static async query() {
    const turnovers = await db.findAll('Turnover');
    return turnovers
      .filter((turnover) => turnover.listingReady === 'true')
      .map((turnover) => ({
        "id": turnover.id,
        "finalInspectionPassedAt": turnover.finalInspectionPassedAt,
        "openWorkOrdersCount": turnover.openWorkOrdersCount,
        "marketingEmail": turnover.marketingEmail,
        "readyToRentDate": turnover.readyToRentDate,
        "listingReady": turnover.listingReady
      }));
  }
}

export default GetAllTurnoversReadModel;