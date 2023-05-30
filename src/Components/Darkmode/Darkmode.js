import { atom } from "recoil";

export const isDark = atom
(
    {
        key: "isDark",
        default: localStorage.getItem("mode") === "true" ? true : false,
    }
)