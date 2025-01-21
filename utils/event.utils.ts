import { Event } from "@/types/event.types";

export const getStatusColors = (status: Event["status"]) => {
  switch (status) {
    case "SCHEDULED":
      return {
        background: "rgba(14, 128, 86, 1)", // Vert plus foncé
        border: "rgba(6, 64, 43, 0.5)", // Vert très foncé
      };
    case "STARTED":
      return {
        background: "rgba(33, 97, 140, 1)", // Bleu plus foncé
        border: "rgba(16, 48, 70, 0.5)", // Bleu très foncé
      };
    case "CANCELLED":
      return {
        background: "rgba(161, 20, 18, 1)", // Rouge plus foncé
        border: "rgba(128, 16, 14, 0.5)", // Rouge très foncé
      };
    case "FINISHED":
      return {
        background: "rgba(97, 97, 97, 1)", // Gris plus foncé
        border: "rgba(48, 48, 48, 0.5)", // Gris très foncé
      };
    default:
      return {
        background: "rgba(97, 97, 97, 1)",
        border: "rgba(48, 48, 48, 0.5)",
      };
  }
};

export const getStatusText = (status: Event["status"]) => {
  switch (status) {
    case "SCHEDULED":
      return "Prévu";
    case "STARTED":
      return "En cours";
    case "CANCELLED":
      return "Annulé";
    case "FINISHED":
      return "Terminé";
    default:
      return status;
  }
};
