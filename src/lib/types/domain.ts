export type UploadStatus = "processing" | "succeeded" | "failed";

export type UploadSummary = {
  id: string;
  versionNo: number;
  status: UploadStatus;
};

export type SlotLocation = {
  cabinetNo: number;
  row: number;
  col: number;
  boxId: string;
};

export type SampleSummary = {
  id: string;
  labelN: string;
  lifecycleStatus: "active" | "reserved" | "disposed" | "missing";
  expiryAt: string | null;
  location?: SlotLocation;
};
