import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"

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
  ]
  
  export const labels = [
    {
      value: "ANA",
      label: "Ana",
    },
    {
      value: "BELU",
      label: "Belu",
    },
  ]
  
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
    {
      value: "CANCELED",
      label: "Canceled",
      icon: CrossCircledIcon,
    },
  ]
  
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
  ]