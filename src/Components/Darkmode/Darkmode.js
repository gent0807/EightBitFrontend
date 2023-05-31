import { atom } from "recoil";

export const isDark = atom
(
    {
        key: "isDark",
        default: localStorage.getItem("mode") === "false" ? false : true,
    }
)