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
    label: "Coordinación",
  },
  {
    value: "PARTIAL",
    label: "Parcial",
  },
  {
    value: "COMPREHENSIVE",
    label: "Integral",
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
    label: "Generador Eléctrico",
  },
  {
    id: "green_space",
    label: "Espacio Verde",
  },
  {
    id: "parking",
    label: "Estacionamiento",
  },
  {
    id: "bridal_suite",
    label: "Suite Nupcial",
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
    label: "Seguridad",
  },
  {
    id: "wifi",
    label: "Wifi",
  },
  {
    id: "audiovisual_equipment",
    label: "Equipamiento Audiovisual",
  },
  {
    id: "air_conditioning",
    label: "Aire Acondicionado",
  },
  {
    id: "heating",
    label: "Calefacción",
  },
  {
    id: "elevator",
    label: "Ascensor",
  },
  {
    id: "wheelchair_access",
    label: "Acceso para Silla de Ruedas",
  },
  {
    id: "stage",
    label: "Escenario",
  },
  {
    id: "dance_floor",
    label: "Pista de Baile",
  },
  {
    id: "sound_system",
    label: "Sistema de Sonido",
  },
  {
    id: "lighting",
    label: "Iluminación de Fiesta",
  },
  {
    id: "furniture",
    label: "Mobiliario",
  },
  {
    id: "tables",
    label: "Mesas",
  },
  {
    id: "chairs",
    label: "Sillas",
  },
  {
    id: "tableware",
    label: "Vajilla",
  },
  {
    id: "tablecloths",
    label: "Mantelería",
  },
  {
    id: "glassware",
    label: "Cristalería",
  },
  {
    id: "decorations",
    label: "Decoración",
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
