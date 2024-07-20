import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
import { text } from "stream/consumers"

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
      textColor: "text-blue-500",
    },
    {
      value: "TODO",
      label: "Todo",
      icon: CircleIcon,
      textColor: "text-red-500",
    },
    {
      value: "IN_PROGRESS",
      label: "In Progress",
      icon: StopwatchIcon,
      textColor: "text-yellow-500",
    },
    {
      value: "DONE",
      label: "Done",
      icon: CheckCircledIcon,
      textColor: "text-green-500",
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