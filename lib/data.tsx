import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const types = [
  {
    value: "WEDDING",
    label: "Wedding",
  },
  {
    value: "BIRTHDAY",
    label: "Birthday",
  },
  {
    value: "OPENING",
    label: "Opening",
  },
  {
    value: "MEETING",
    label: "Meeting",
  },
  {
    value: "OTHER",
    label: "Other",
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
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "TODO",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "LOW",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
];
