export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export const stats: Stat[] = [
  {
    value: 20000,
    suffix: "+",
    label: "University Students",
  },
  {
    value: 4800,
    suffix: " ft",
    label: "Elevation",
  },
  {
    value: 100,
    suffix: "+",
    label: "Miles of Trails",
  },
  {
    value: 95,
    suffix: "%",
    label: "Air Quality Rating",
  },
  {
    value: 2,
    suffix: " hrs",
    label: "To Charlotte",
  },
  {
    value: 15,
    suffix: "+",
    label: "Breweries & Distilleries",
  },
];
