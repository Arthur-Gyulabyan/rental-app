import { v4 as uuidv4 } from 'uuid';

class Inspection {
  constructor({
    id = uuidv4(),
    turnoverId,
    scheduledAt,
    assignedToEmail,
    inspectorName,
    locationNotes,
    nextActorEmail,
    completedAt,
    findingsSummary,
    hasDamages,
    photosUrl,
    passedAt,
    certificateUrl,
    checklist,
    rescheduledReason,
    cancellationReason,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!turnoverId) throw new Error('turnoverId is required');
    if (!scheduledAt) throw new Error('scheduledAt is required');

    this.id = id;
    this.turnoverId = turnoverId;
    this.scheduledAt = new Date(scheduledAt);
    this.assignedToEmail = assignedToEmail;
    this.inspectorName = inspectorName;
    this.locationNotes = locationNotes;
    this.nextActorEmail = nextActorEmail;
    this.completedAt = completedAt ? new Date(completedAt) : null;
    this.findingsSummary = findingsSummary;
    this.hasDamages = hasDamages;
    this.photosUrl = photosUrl;
    this.passedAt = passedAt ? new Date(passedAt) : null;
    this.certificateUrl = certificateUrl;
    this.checklist = checklist;
    this.rescheduledReason = rescheduledReason;
    this.cancellationReason = cancellationReason;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  update({
    scheduledAt,
    assignedToEmail,
    inspectorName,
    locationNotes,
    nextActorEmail,
    completedAt,
    findingsSummary,
    hasDamages,
    photosUrl,
    passedAt,
    certificateUrl,
    checklist,
    rescheduledReason,
    cancellationReason
  }) {
    if (scheduledAt !== undefined) this.scheduledAt = new Date(scheduledAt);
    if (assignedToEmail !== undefined) this.assignedToEmail = assignedToEmail;
    if (inspectorName !== undefined) this.inspectorName = inspectorName;
    if (locationNotes !== undefined) this.locationNotes = locationNotes;
    if (nextActorEmail !== undefined) this.nextActorEmail = nextActorEmail;
    if (completedAt !== undefined) this.completedAt = completedAt ? new Date(completedAt) : null;
    if (findingsSummary !== undefined) this.findingsSummary = findingsSummary;
    if (hasDamages !== undefined) this.hasDamages = hasDamages;
    if (photosUrl !== undefined) this.photosUrl = photosUrl;
    if (passedAt !== undefined) this.passedAt = passedAt ? new Date(passedAt) : null;
    if (certificateUrl !== undefined) this.certificateUrl = certificateUrl;
    if (checklist !== undefined) this.checklist = checklist;
    if (rescheduledReason !== undefined) this.rescheduledReason = rescheduledReason;
    if (cancellationReason !== undefined) this.cancellationReason = cancellationReason;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      turnoverId: this.turnoverId,
      scheduledAt: this.scheduledAt.toISOString(),
      assignedToEmail: this.assignedToEmail,
      inspectorName: this.inspectorName,
      locationNotes: this.locationNotes,
      nextActorEmail: this.nextActorEmail,
      completedAt: this.completedAt ? this.completedAt.toISOString() : null,
      findingsSummary: this.findingsSummary,
      hasDamages: this.hasDamages,
      photosUrl: this.photosUrl,
      passedAt: this.passedAt ? this.passedAt.toISOString() : null,
      certificateUrl: this.certificateUrl,
      checklist: this.checklist,
      rescheduledReason: this.rescheduledReason,
      cancellationReason: this.cancellationReason,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

export default Inspection;