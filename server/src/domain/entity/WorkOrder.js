import { v4 as uuidv4 } from 'uuid';

class WorkOrder {
  constructor({
    id = uuidv4(),
    renovationCaseId,
    scopeSummary,
    accessDetails,
    materialsList,
    nextActorEmail,
    startDate,
    endDate,
    crewName,
    assignedToEmail,
    materialsReady,
    actualStartDate,
    actualEndDate,
    completionNotes,
    photosUrl,
    varianceNotes,
    cancellationReason,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!renovationCaseId) throw new Error('renovationCaseId is required');
    if (!scopeSummary) throw new Error('scopeSummary is required');
    if (!materialsList) throw new Error('materialsList is required');

    this.id = id;
    this.renovationCaseId = renovationCaseId;
    this.scopeSummary = scopeSummary;
    this.accessDetails = accessDetails;
    this.materialsList = materialsList;
    this.nextActorEmail = nextActorEmail;
    this.startDate = startDate;
    this.endDate = endDate;
    this.crewName = crewName;
    this.assignedToEmail = assignedToEmail;
    this.materialsReady = materialsReady;
    this.actualStartDate = actualStartDate;
    this.actualEndDate = actualEndDate;
    this.completionNotes = completionNotes;
    this.photosUrl = photosUrl;
    this.varianceNotes = varianceNotes;
    this.cancellationReason = cancellationReason;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  update({
    scopeSummary,
    accessDetails,
    materialsList,
    nextActorEmail,
    startDate,
    endDate,
    crewName,
    assignedToEmail,
    materialsReady,
    actualStartDate,
    actualEndDate,
    completionNotes,
    photosUrl,
    varianceNotes,
    cancellationReason
  }) {
    if (scopeSummary !== undefined) this.scopeSummary = scopeSummary;
    if (accessDetails !== undefined) this.accessDetails = accessDetails;
    if (materialsList !== undefined) this.materialsList = materialsList;
    if (nextActorEmail !== undefined) this.nextActorEmail = nextActorEmail;
    if (startDate !== undefined) this.startDate = startDate;
    if (endDate !== undefined) this.endDate = endDate;
    if (crewName !== undefined) this.crewName = crewName;
    if (assignedToEmail !== undefined) this.assignedToEmail = assignedToEmail;
    if (materialsReady !== undefined) this.materialsReady = materialsReady;
    if (actualStartDate !== undefined) this.actualStartDate = actualStartDate;
    if (actualEndDate !== undefined) this.actualEndDate = actualEndDate;
    if (completionNotes !== undefined) this.completionNotes = completionNotes;
    if (photosUrl !== undefined) this.photosUrl = photosUrl;
    if (varianceNotes !== undefined) this.varianceNotes = varianceNotes;
    if (cancellationReason !== undefined) this.cancellationReason = cancellationReason;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      renovationCaseId: this.renovationCaseId,
      scopeSummary: this.scopeSummary,
      accessDetails: this.accessDetails,
      materialsList: this.materialsList,
      nextActorEmail: this.nextActorEmail,
      startDate: this.startDate,
      endDate: this.endDate,
      crewName: this.crewName,
      assignedToEmail: this.assignedToEmail,
      materialsReady: this.materialsReady,
      actualStartDate: this.actualStartDate,
      actualEndDate: this.actualEndDate,
      completionNotes: this.completionNotes,
      photosUrl: this.photosUrl,
      varianceNotes: this.varianceNotes,
      cancellationReason: this.cancellationReason,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

export default WorkOrder;