import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const organizations = [
  {
    value: "COORDINATION",
    label: "Coordination",
  },
  {
    value: "PARTIAL",
    label: "Partial",
  },
  {
    value: "COMPREHENSIVE",
    label: "Comprehensive",
  },
];

export const types = [
  {
    value: "WEDDING",
    label: "Casamiento",
  },
  {
    value: "BIRTHDAY",
    label: "Cumpleaños",
  },
  {
    value: "OPENING",
    label: "Inaguración",
  },
  {
    value: "ANNIVERSARY",
    label: "Aniversario",
  },
  {
    value: "PARTY",
    label: "Fiesta",
  },
  {
    value: "PARADE",
    label: "Desfile",
  },
  {
    value: "CONGRESS",
    label: "Congreso",
  },
  {
    value: "PRODUCT_LAUNCH",
    label: "Lanzamiento de producto",
  },
  {
    value: "OTHER",
    label: "Otro",
  },
];

export const labels = [
  {
    value: "ANA",
    label: "Ana",
  },
  {
    value: "BELEN",
    label: "Belen",
  },
];

export const statuses = [
  {
    value: "BACKLOG",
    label: "Pendiente",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "TODO",
    label: "Por Hacer",
    icon: CircleIcon,
  },
  {
    value: "IN_PROGRESS",
    label: "En Progreso",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Hecho",
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    label: "Baja",
    value: "LOW",
    icon: ArrowDownIcon,
  },
  {
    label: "Media",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  {
    label: "Alta",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
];

export const features = [
  {
    id: "genset",
    label: "Genset",
  },
  {
    id: "green_space",
    label: "Green Space",
  },
  {
    id: "parking",
    label: "Parking",
  },
  {
    id: "bridal_suite",
    label: "Bridal Suite",
  },
  {
    id: "catering",
    label: "Catering",
  },
  {
    id: "bar",
    label: "Bar",
  },
  {
    id: "security",
    label: "Security",
  },
  {
    id: "wifi",
    label: "Wifi",
  },
  {
    id: "audiovisual_equipment",
    label: "Audiovisual Equipment",
  },
  {
    id: "air_conditioning",
    label: "Air Conditioning",
  },
  {
    id: "heating",
    label: "Heating",
  },
  {
    id: "elevator",
    label: "Elevator",
  },
  {
    id: "wheelchair_access",
    label: "Wheelchair Access",
  },
  {
    id: "stage",
    label: "Stage",
  },
  {
    id: "dance_floor",
    label: "Dance Floor",
  },
  {
    id: "sound_system",
    label: "Sound System",
  },
  {
    id: "lighting",
    label: "Lighting",
  },
  {
    id: "furniture",
    label: "Furniture",
  },
  {
    id: "tables",
    label: "Tables",
  },
  {
    id: "chairs",
    label: "Chairs",
  },
  {
    id: "tableware",
    label: "Tableware",
  },
  {
    id: "tablecloths",
    label: "Tablecloths",
  },
  {
    id: "glassware",
    label: "Glassware",
  },
  {
    id: "decorations",
    label: "Decorations",
  },
];

export const cities = [
  {
    value: "SAN_MIGUEL_DE_TUCUMAN",
    label: "San Miguel de Tucumán",
  },
  {
    value: "TAFI_VIEJO",
    label: "Tafí Viejo",
  },
  {
    value: "YERBA_BUENA",
    label: "Yerba Buena",
  },
  {
    value: "LULES",
    label: "Lules",
  },
  {
    value: "TAFI_DEL_VALLE",
    label: "Tafí del Valle",
  },
];

export const invitations = [
  {
    value: "BANQUET",
    label: "Almuerzo/Cena",
  },
  {
    value: "PARTY",
    label: "Fiesta",
  },
  {
    value: "TO_BE_CONFIRMED",
    label: "Tiene que confirmar",
  },
];
