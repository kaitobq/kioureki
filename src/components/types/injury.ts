const category = ["リハビリ", "復帰", "離脱無し", "保留", "その他"];

export type injury = {
  id: string;
  name: string;
  category: string;
  injuryDate: Date;
  part: string;
  diagnosis: string;
  note: string;
};
